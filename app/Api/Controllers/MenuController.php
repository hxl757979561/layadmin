<?
namespace App\Api\Controllers;

use App\Admin;
use App\Permissions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Permission;

class MenuController extends BaseController
{
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
     * 获取用户可用菜单数据
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function menuList(Request $request)
    {
        /** @var Admin $user */
        $user  = $request->user();
        $query = Permission::oldest();
        if (!$user->isAdmin()) {
            $query->where('visible', true);
            $query->where('status', Permissions::status_on);
        }

        $permissions = [];
        $query->each(function ($item) use ($user, &$permissions) {
            if ($user->can($item->name)) {
                $permissions[] = [
                    'id'        => $item->id,
                    'parent_id' => $item->parent_id,
                    'title'     => $item->show_name,
                    'icon'      => $item->icon,
                    'jump'      => $item->jump,
                ];
            }
        });

        $userMenus = $this->buildTree($permissions);
        return $this->errNormal("请求成功", $userMenus);
    }

    function buildTree($elements, $parentId = 0)
    {
        $branch = array();
        foreach ($elements as $element) {
            if ($element['parent_id'] == $parentId) {
                $children = $this->buildTree($elements, $element['id']);
                if ($children) {
                    $element['list'] = $children;
                }
                $branch[] = $element;
            }
        }
        return $branch;
    }
}