<?php
namespace Services;

interface ErrCode
{
    const errNormal = 0;   //操作成功
    const errFailed = -1;  //操作失败
    const errExpire = -2;  //登陆过期
    const errPasswd = -3;  //必须改密
}

/**
 * 请求信息反馈
 */
trait ErrReply
{
    /**
     * 返回请求消息
     * @param string $err
     * @param int $errno
     * @param array $data
     * @return \Illuminate\Http\Response|\Illuminate\Contracts\Routing\ResponseFactory
     */
    private static function err($err, $errno, $data = array())
    {
        $string = json_encode(
            [
                'msg'  => $err,
                'code' => $errno,
                'data' => $data,
            ]
        );
        return response(
            preg_replace(
                [
                    '/":null/',
                    '/":true/',
                    '/":false/',
                ],
                [
                    '":""',
                    '":1',
                    '":0',
                ],
                $string
            )
        );
    }

    /**
     * 返回请求成功消息
     * @param string $err
     * @param array $data
     * @return \Illuminate\Http\Response|\Illuminate\Contracts\Routing\ResponseFactory
     */
    public static function errNormal($err, $data = array())
    {
        return self::err($err, self::errNormal, $data);
    }

    /**
     * 返回请求失败消息
     * @param string $err
     * @param array $data
     * @return \Illuminate\Http\Response|\Illuminate\Contracts\Routing\ResponseFactory
     */
    public static function errFailed($err, $data = array())
    {
        return self::err($err, self::errFailed, $data);
    }

    /**
     * 返回登录过期消息
     * @param string $err
     * @param array $data
     * @return \Illuminate\Http\Response|\Illuminate\Contracts\Routing\ResponseFactory
     */
    public static function errExpire($err, $data = array())
    {
        return self::err($err, self::errExpire, $data);
    }
    
    /**
     * 返回必须改密消息
     * @param string $err
     * @param array $data
     * @return \Illuminate\Http\Response|\Illuminate\Contracts\Routing\ResponseFactory
     */
    public static function errPasswd($err, $data = array())
    {
        return self::err($err, self::errPasswd, $data);
    }

    /**
     * 抛出请求失败消息
     * @param string $err
     * @param array $data
     * @return void
     */
    public static function errThrow($err, $data = array())
    {
        self::err($err, self::errFailed, $data)->throwResponse();
    }

    /**
     * 弹出浏览器提示,点确定后返回上一页
     * @param string $err
     * @return \Illuminate\Http\Response|\Illuminate\Contracts\Routing\ResponseFactory
     */
    public static function errBack($err)
    {
        return response("<script type=\"text/javascript\">alert('$err');history.go(-1);</script>");
    }

    /**
     * 弹出浏览器提示,点确定后跳转指定网址
     * @param string $err
     * @param string $url
     * @return \Illuminate\Http\Response|\Illuminate\Contracts\Routing\ResponseFactory
     */
    public static function errJump($err, $url)
    {
        return response("<script type=\"text/javascript\">alert('$err');window.location.href='$url';</script>");
    }
}
