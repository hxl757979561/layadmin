<?php
namespace App\Api\Controllers;

use App\Admin;
use App\Roles;
use App\Permissions;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use App\Http\Resources\UserList as UserListResource;
use App\Http\Resources\RoleList as RoleListResource;
use App\Http\Resources\PermissionList as PermissionListResource;

class AuthController extends BaseController
{
    use ThrottlesLogins;

    //最多可尝试输入密码次数
    protected $maxAttempts = 5;
    //密码输入次数过多需等待的分钟数
    protected $decayMinutes = 5;
    //
    protected $guardName = "web";

    /**
     * The authentication guard that should be used.
     *
     * @var string
     */
    public function __construct()
    {
        parent::__construct();

    }

    /**
     * 返回请求中用户名字段
     * @return string
     */
    protected function username()
    {
        return "username";
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function authenticate(Request $request)
    {
        $rules = [
            'username' => "bail|required",
            'password' => "bail|required|between:6,16",
            'captcha'  => 'required|captcha',
        ];

        $messages = [
            'captcha' => ":attribute 输入不正确",
        ];

        $attributes = [
            'username' => "用户账号",
            'password' => "用户密码",
            'captcha'  => "图形验证码",
        ];

        $this->validate($request, $rules, $messages, $attributes);

        $credentials = [
            'username' => $request->get('username'),
            'password' => $request->get('password')
        ];

        $remember_token = str_random(60);
        $customClaims = [
            'remember_token' => $remember_token,
        ];

        try {
            if (!$token = JWTAuth::attempt($credentials, $customClaims)) {
                $passKey  = $this->throttleKey($request);
                if ($this->hasTooManyLoginAttempts($request)){
                    $seconds = $this->limiter()->availableIn($passKey);
                    return self::errFailed("输入密码错误次数过多,账户已被锁定,请等待" . $seconds . "秒后再试!");
                }
                $this->incrementLoginAttempts($request);
                $chance = $this->limiter()->retriesLeft(
                    $passKey,
                    $this->maxAttempts()
                );
                return self::errFailed("登陆失败,用户名或密码错误,你还有" . $chance . "次机会!");
            }
        } catch (JWTException $e) {
            return self::errFailed("不能创建令牌!");
        }
        $this->clearLoginAttempts($request);

        /** @var Admin $user */
        $user = JWTAuth::toUser($token);
        if ($user->status !== Admin::status_passed) {
            return self::errFailed("该账户状态暂时无法登录!");
        }

        $user->setRememberToken($remember_token);
        $user->saveOrFail();

        return self::errNormal("用户登录成功!",[
            'access_token' => $token
        ]);
    }

    /**
     * @param Request $request
     */
    public function register(Request $request)
    {
        $rules = [
            'id' => [
                "bail",
                "nullable",
                "sometimes",
                Rule::exists(Admin::getModel()->getTable(), "id")
            ],
            'username'=> "required|alpha_dash",
            'password'=> "required_without:id",
            'email'   => "required|email",
            'status'  => [
                "bail",
                "required",
                Rule::in([
                    Admin::status_verify,
                    Admin::status_passed,
                    Admin::status_banned,
                ])
            ]
        ];

        $attributes = [
            'id'       => "管理员账号",
            'username' => "管理员名称",
            'email'    => "管理员邮箱",
            'status'   => "管理员状态",
            'password' => "管理员密码",
        ];
        $this->validate($request, $rules, [], $attributes);

        $id       = $request->get('id');
        $username = $request->get('username');
        $email    = $request->get('email');
        $phone    = $request->get('phone');
        $status   = $request->get('status');
        $password = $request->get('password');
        $roles    = $request->get('role');

        $data = compact([
            'username', 'email', 'phone', 'status'
        ]);
        blank($password) || $data['password'] = bcrypt($password);

        $found = Admin::where('username', $username)->first();
        if($id = $request->get('id')){
            if ($found && $id != $found->getKey()) {
                return self::errFailed("已有该用户名称被占用!");
            }
            $user = Admin::findOrFail($id);
            //更新用户信息
            Admin::whereKey($id)->update($data);
        }else{
            if ($found) return self::errFailed("已有该账户名称存在!");
            $user = Admin::create($data);
        }
        //分配角色
        $user->syncRoles(explode(',', $roles));
        return self::errNormal("用户操作成功!");
    }

    /**
     * 获取用户信息
     * @return \Illuminate\Http\Response
     */
    public function AuthenticatedUser()
    {
        try {
            if (!$user = JWTAuth::parseToken()->authenticate()) {
                return self::errExpire("user_not_found");
            }
        } catch (TokenExpiredException $e) {
            return self::errExpire("token_expired");
        } catch (TokenInvalidException $e) {
            return self::errExpire("token_invalid");
        } catch (JWTException $e) {
            return self::errExpire("token_absent");
        }
        // the token is valid and we have found the user via the sub claim
        return self::errNormal("请求成功", $user);
    }

    /**
     * 用户退出登陆
     * @param \Illuminate\Http\Request $request
     * @return Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        $user = $request->user();

        $remember_token = str_random(60);
        $user->setRememberToken($remember_token);
        $user->save();
        return self::errNormal("用户退出登录成功");
    }

    /**
     * 修改用户密码
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function changePasswd(Request $request) {
        $rules = [
            'oldPassword' => 'bail|required|between:6,16',
            'newPassword'    => 'bail|required|between:6,16',
        ];

        $attributes = [
            'oldPassword' => "用户原密码",
            'newPassword'    => "用户新密码",
        ];

        $this->validate($request, $rules, [], $attributes);

        /** @var Admin $user */
        $user = $request->user();

        $oldPassword = $request->get('oldPassword');
        $newPassword = $request->get('newPassword');
        if (!Hash::check($oldPassword, $user->password)) {
            return self::errFailed("修改失败,旧密码输入不正确!");
        }

        if (Hash::check($newPassword, $user->password)) {
            return self::errFailed("修改失败,旧密码不能与新密码相同!");
        }

        $this->resetPassword($user, $newPassword);
        return self::errNormal("修改成功,请使用新密码进行登陆!");
    }

    /**
     * Reset the given user's password.
     * @param  App\Admin  $user
     * @param  string  $password
     * @return boolean
     */
    protected function resetPassword($user, $password)
    {
        return $user->forceFill([
            'password'       => bcrypt($password),
            'remember_token' => str_random(60),
        ])->save();
    }

    /**
     * 删除管理员
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function userDelete(Request $request)
    {
        $list = $request->get('list', []);
        $list = array_column($list, 'id');
        
        foreach ($list as $userId) {
            $user = Admin::findOrFail($userId);
            if ($user->isAdmin()) {
                return self::errFailed("系统用户无法删除!");
            }
            Admin::whereKey($userId)->delete();
        }
        return self::errNormal("删除用户成功!");
    }

    /**
     * @param Request $request
     * @return UserListResource
     */
    public function userList(Request $request)
    {
        $where = $request->only([
            "username", "phone"
        ]);
        $query = Admin::latest();
        $this->layuiWhere($where, $query);
        $lists = $this->layuiPagination($request, $query);
        return new UserListResource($lists);
    }

    /**
     * @param Request $request
     * @return RoleListResource
     */
    public function roleList(Request $request)
    {
        $query = Role::latest();
        $roleList = $this->layuiPagination($request, $query);
        return new RoleListResource($roleList);
    }

    /**
     * @param Request $request
     * @return PermissionListResource
     */
    public function permissionList(Request $request)
    {
        $query = Permission::latest();
        $lists = $this->layuiPagination($request, $query);
        return new PermissionListResource($lists);
    }

    /**
     * 新增和编辑权限
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function permissionAdd(Request $request)
    {
        $name       = $request->get("name");
        $show_name  = $request->get("show_name");
        $status     = stringToBoolean($request->get("status"));
        $visible    = stringToBoolean($request->get("visible"));
        $parent_id  = $request->get("parent_id", 0);
        $icon       = $request->get('icon');
        $jump       = $request->get("jump");
        $guard_name = $this->guardName;

        $data = compact([
            'name', 'show_name', 'status', 'visible', 'parent_id', 'icon', 'jump'
        ]);

        if (blank($name) || blank($show_name)) {
            return self::errFailed("权限名称或显示名称未填写");
        }

        if ($parent_id && !($parent = Permission::find($parent_id))) {
            return self::errFailed("父级权限标识不存在!");
        }

        $found = Permission::where(compact(['name', 'guard_name']))->first();
        if ($id = $request->get('id')) {
            $permission = Permission::findById($id);    //throw
            if ($parent_id == $permission->getKey()) {
                return self::errFailed("父级权限不能是自己!");
            }
            if ($found && $id != $found->getKey()) {
                return self::errFailed("已有该权限名称被占用!");
            }
            Permission::whereKey($id)->update($data);
        }else {
            if ($found) return self::errFailed("已有该权限名称存在!");
            Permission::create(
                array_merge($data, compact(['guard_name']))
            );
        }
        return self::errNormal("请求成功!");
    }

    /**
     * 删除权限
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function permissionDelete(Request $request)
    {
        $list = $request->get('list', []);
        $list = array_column($list, 'id');

        //倒序处理删除
        foreach (array_reverse($list) as $permissionId) {
            $permission = Permission::findById($permissionId);  //throw
            if (Permission::where("parent_id", $permission->getKey())->exists()) {
                return self::errFailed("请先删除[{$permission->show_name}]子级的节点!");
            }
            Permission::whereKey($permissionId)->delete();
        }
        return self::errNormal("删除成功!");
    }

    /**
     * 获取可用权限
     * @return PermissionListResource
     */
    public function allPermission(Request $request)
    {
        $permissions = Permission::where('status', Permissions::status_on)->get();
        if ($id = $request->get('id')) {
            $role = Role::findOrFail($id);
            $permissionIds = $role->permissions()->allRelatedIds()->toArray();
            foreach ($permissions as $v) {
                $v->checked = '';
                if (in_array($v->id, $permissionIds)) {
                    $v->checked = 'checked';
                }
            }
            request()->offsetSet('name', $role->name);
        }
        return new PermissionListResource($permissions);
    }

    /**
     * 添加和编辑角色
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function roleAdd(Request $request)
    {
        $name        = $request->get("name");
        $show_name   = $request->get("show_name");
        $permissions = $request->get("permissions", []);
        $guard_name  = $this->guardName;

        $data = compact([
            'name', 'show_name', 
        ]);
        
        if (blank($name) || blank($show_name)) {
            return self::errFailed("角色名称或显示名称未填写");
        }

        $found = Role::where(compact(['name', 'guard_name']))->first();
        if ($id = $request->get('id')) {
            $role = Role::findById($id);
            if ($found && $id != $found->getKey()) {
                return self::errFailed("已有该角色名称被占用!");
            }
            //删除原permission
            $permission = $role->permissions()->allRelatedIds()->toArray();
            $permission = Permission::whereIn('id', $permission)->get();
            $role->revokePermissionTo($permission);
            //更新角色信息
            Role::whereKey($id)->update($data);
        } else {
            if ($found) return self::errFailed("已有该角色名称存在!");
            $role = Role::create(
                array_merge($data, compact(['guard_name']))
            );
        }

        //赋予permission
        $permission = Permission::whereIn('id', $permissions)->get();
        if ($role && $role->givePermissionTo($permission)) {
            return self::errNormal("角色操作成功!");
        }
        return self::errFailed("角色操作失败!");
    }
    
    /**
     * 删除角色
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function roleDelete(Request $request)
    {
        $list = $request->get('list', []);
        $list = array_column($list, 'id');

        foreach ($list as $roleId) {
            $role = Role::findById($roleId);
            if ($role->name == Roles::adminRole) {
                return self::errFailed("系统角色无法删除!");
            }
            //删除权限
            $permission = $role->permissions()->allRelatedIds()->toArray();
            $permission = Permission::whereIn('id', $permission)->get();
            $role->revokePermissionTo($permission);
            //删除角色
            Role::whereKey($roleId)->delete();
        }
        return self::errNormal("删除角色成功!");
    }

    /**
     * 获取可用角色
     * @param $request
     * @return RoleListResource
     */
    public function allRoles(Request $request)
    {
        $roles = Role::get();
        if ($id = $request->get('id')) {
            $user = Admin::findOrFail($id);
            $hasRole = $user->roles()->pluck('id')->toArray();
            foreach ($roles as $v) {
                $v->selected = '';
                if (in_array($v->id, $hasRole)) {
                    $v->selected = 'selected';
                }
            }
            request()->offsetSet('name', $user->username);
            request()->offsetSet('email', $user->email);
            request()->offsetSet('status', $user->status);
        }
        return new RoleListResource($roles);
    }

    /**
     * 修改管理员状态
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function changeAdminStatus(Request $request)
    {
        $rules = [
            'id' => [
                "bail",
                "required",
                Rule::exists(Admin::getModel()->getTable(), "id")
            ],
            'status' => [
                "bail",
                "required",
                Rule::in([
                    Admin::status_verify,
                    Admin::status_passed,
                    Admin::status_banned,
                ])
            ]
        ];

        $attributes = [
            'id'     => "管理员账号",
            'status' => "管理员状态",
        ];
        $this->validate($request, $rules, [], $attributes);

        $id     = $request->get('id');
        $status = $request->get('status');
        if (Admin::whereKey($id)->update(compact('status'))) {
            return self::errNormal("操作成功!");
        }
        return self::errFailed("操作失败!");
    }
    
    /**
     * 修改权限状态
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function changePermissionStatus(Request $request)
    {
        $rules = [
            'id' => [
                "bail",
                "required",
                Rule::exists(Permission::getModel()->getTable(), "id")
            ],
            'status' => [
                "bail",
                "required",
                Rule::in([
                    Permissions::status_off,
                    Permissions::status_on,
                ])
            ]
        ];

        $attributes = [
            'id'     => "权限标识",
            'status' => "权限状态",
        ];
        $this->validate($request, $rules, [], $attributes);

        $id     = $request->get('id');
        $status = $request->get('status');
        if (Permission::whereKey($id)->update(compact('status'))) {
            return self::errNormal("操作成功!");
        }
        return self::errFailed("操作失败!");
    }
}
