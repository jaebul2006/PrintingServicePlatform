<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
|--------------------------------------------------------------------------
| File and Directory Modes
|--------------------------------------------------------------------------
|
| These prefs are used when checking and setting modes when working
| with the file system.  The defaults are fine on servers with proper
| security, but you may wish (or even need) to change the values in
| certain environments (Apache running a separate process for each
| user, PHP under CGI with Apache suEXEC, etc.).  Octal values should
| always be used to set the mode correctly.
|
*/
define('FILE_READ_MODE', 0644);
define('FILE_WRITE_MODE', 0666);
define('DIR_READ_MODE', 0755);
define('DIR_WRITE_MODE', 0755);

/*
|--------------------------------------------------------------------------
| File Stream Modes
|--------------------------------------------------------------------------
|
| These modes are used when working with fopen()/popen()
|
*/

define('FOPEN_READ', 'rb');
define('FOPEN_READ_WRITE', 'r+b');
define('FOPEN_WRITE_CREATE_DESTRUCTIVE', 'wb'); // truncates existing file data, use with care
define('FOPEN_READ_WRITE_CREATE_DESTRUCTIVE', 'w+b'); // truncates existing file data, use with care
define('FOPEN_WRITE_CREATE', 'ab');
define('FOPEN_READ_WRITE_CREATE', 'a+b');
define('FOPEN_WRITE_CREATE_STRICT', 'xb');
define('FOPEN_READ_WRITE_CREATE_STRICT', 'x+b');

/*
|--------------------------------------------------------------------------
| Display Debug backtrace
|--------------------------------------------------------------------------
|
| If set to TRUE, a backtrace will be displayed along with php errors. If
| error_reporting is disabled, the backtrace will not display, regardless
| of this setting
|
*/
define('SHOW_DEBUG_BACKTRACE', TRUE);

/*
|--------------------------------------------------------------------------
| Exit Status Codes
|--------------------------------------------------------------------------
|
| Used to indicate the conditions under which the script is exit()ing.
| While there is no universal standard for error codes, there are some
| broad conventions.  Three such conventions are mentioned below, for
| those who wish to make use of them.  The CodeIgniter defaults were
| chosen for the least overlap with these conventions, while still
| leaving room for others to be defined in future versions and user
| applications.
|
| The three main conventions used for determining exit status codes
| are as follows:
|
|    Standard C/C++ Library (stdlibc):
|       http://www.gnu.org/software/libc/manual/html_node/Exit-Status.html
|       (This link also contains other GNU-specific conventions)
|    BSD sysexits.h:
|       http://www.gsp.com/cgi-bin/man.cgi?section=3&topic=sysexits
|    Bash scripting:
|       http://tldp.org/LDP/abs/html/exitcodes.html
|
*/
define('EXIT_SUCCESS', 0); // no errors
define('EXIT_ERROR', 1); // generic error
define('EXIT_CONFIG', 3); // configuration error
define('EXIT_UNKNOWN_FILE', 4); // file not found
define('EXIT_UNKNOWN_CLASS', 5); // unknown class
define('EXIT_UNKNOWN_METHOD', 6); // unknown class member
define('EXIT_USER_INPUT', 7); // invalid user input
define('EXIT_DATABASE', 8); // database error
define('EXIT__AUTO_MIN', 9); // lowest automatically-assigned error code
define('EXIT__AUTO_MAX', 125); // highest automatically-assigned error code

// 도메인 관련
if ($_SERVER['SERVER_ADDR'] == '192.168.173.161')
	// define('URL_PREFIX', 'dev.');
    define('URL_PREFIX', '');
else
	define('URL_PREFIX', '');

define('BASE_URL', $GLOBALS['JLAMPConfig']->site->domain);
define('FULL_URL', URL_PREFIX.BASE_URL);

// 페이징 관련
define('ROW_SIZE', 15);
define('PAGE_BLOCK_SIZE', 5);

// 로그인 Key Column
define('LOGIN_KEY', 'UserID');

// config.json 관련
// 서비스 도메인
define('SERVICE_DOMAIN', $GLOBALS['JLAMPConfig']->service->domain);
// 서비스 데이터 하위 폴더
define('SERVICE_DATAPATH', $GLOBALS['JLAMPConfig']->service->dataPath);
// 서비스 언어
define('SERVICE_LANG_ID', $GLOBALS['JLAMPConfig']->service->langID);
// JLAMP5 Browser 여부
define('IS_USE_BROWSER', $GLOBALS['JLAMPConfig']->system->isUseBrowser);
// info 메일 주소
define('NO_REPLY', $GLOBALS['JLAMPConfig']->site->noReply);

// 로그 타입
define('LOG_TYPE_MOBILE', 'MPAGE');
define('LOG_TYPE_TABLET', 'TPAGE');
define('LOG_TYPE_PC', 'WPAGE');

// 디바이스 타입
define('DEVICE_MOBILE', 'mobile');
define('DEVICE_TABLET', 'tablet');
define('DEVICE_PC', 'pc');

// 디바이스 플랫폼
define('DEVICE_PLATFORM_IOS', 'ios');
define('DEVICE_PLATFORM_ANDROID', 'android');
define('DEVICE_PLATFORM_WEB', 'web');

// 개발서버 도메인
const DEV_SERVER_IP = array('1.212.52.170', '1.212.52.173', '192.168.173.1', '192.168.173.161');

// Cookie 삭제 제외
const NON_LOGOUT_COOKIE = array('SaveUserID', 'DiviceType', 'DevicePlatform');

// 1년
define('ONE_YEAR', 31536000); // 60 * 60 * 24 * 365 1년
// 30일
define('ONE_MONTH', 2592000); // 60*60*24*30 30일

// 세션
// 라이센스 유지기간
define('SESS_LIC_EXPIRED', ONE_MONTH);
// 서비스메시지 유지기간
define('SESS_SYSMSG_EXPIRED', ONE_MONTH);
// STL Viewer URL
define('STL_VIEWER', 'https://stephaneginier.com/sculptgl');
