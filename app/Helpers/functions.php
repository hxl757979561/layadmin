<?php

use Monolog\Logger;
use Monolog\Handler\StreamHandler;
use Brick\Money\Money;
use Brick\Money\Currency;
use Webmozart\PathUtil\Path;

if (!function_exists('load_mono_logger')) {
    /**
     * 加载扩展日志库
     * @param string $name
     * @return Logger
     */
    function load_mono_logger($name, $level = Logger::INFO)
    {
        $logger = new Logger($name);
        $hander = new StreamHandler(storage_path("logs/{$name}.log"), $level);
        $logger->pushHandler($hander);
        return $logger;
    }
}

if (!function_exists('getMillisecond')){
    // 毫秒级时间戳
    function getMillisecond()
    {
        list($t1, $t2) = explode(' ', microtime());
        return (float)sprintf('%.0f', (floatval($t1) + floatval($t2)) * 1000);
    }
}

if (!function_exists('stringToBoolean')) {
    /**
     * 字符串转逻辑值
     * @param string $src
     * @return Boolean
     */
    function stringToBoolean($src) {
        switch (trim(strtolower($src))) {
            case "true": case "yes": case "1": case "on": return true;
            case "false": case "no": case "0": case "off": case "": case null: return false;
            default: return !!$src;
        }
    }
}

if (!function_exists('array_filter_recursive')) {
    /** 
     * 过滤多维数组
     * @param array
     * @param string optional callback function name
     * @param bool optional flag removal of empty arrays after filtering
     * @return array merged array
     */
    function array_filter_recursive($array, $callback = null, $remove_empty_arrays = false)
    {
        foreach ($array as $key => &$value) {
            if (is_array($value)) {
                $value = array_filter_recursive($value, $callback, $remove_empty_arrays);
                if ($remove_empty_arrays && !(bool)$value) {
                    unset($array[$key]);
                }
            } else {
                if (!is_null($callback) && !$callback($value, $key)) {
                    unset($array[$key]);
                } elseif (!(bool)$value) {
                    unset($array[$key]);
                }
            }
        }
        unset($value);
        return $array;
    }
}

if (! function_exists('user')){
    /**
     * 获取已登陆用户信息
     * @param string $parameter
     * @return \app\User|mixed
     */
    function user($parameter = null){
        if (!\Auth::check()) {
            return null;
        }
        if ($parameter) {
            return \Auth::user()->$parameter;
        }
        return \Auth::user();
    }
}

if (! function_exists('rmb')){
    /**
     * 人民币
     * @param number|string $amount
     * @return Brick\Money\Money
     */
    function rmb(string $amount){
        return Money::of($amount, Currency::of("CNY"));
    }
}

if (! function_exists('toAmount')){
    /**
     * 金额转换为浮点值
     * @param Brick\Money\Money $money
     * @return float
     */
    function toAmount($money){
        return $money->getAmount()->toFloat();
    }
}