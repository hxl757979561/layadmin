<?
namespace App\Api\Controllers;  

use App\Admin;
use Illuminate\Http\Request;
use Mews\Captcha\Facades\Captcha;

class HomeController extends BaseController
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
     * 获取图形验证码
     * @param Request $request
     * @return void
     */
    public function verifyImage(Request $request)
    {
        return Captcha::create();
    }

}