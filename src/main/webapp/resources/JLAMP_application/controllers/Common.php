<?php (defined('BASEPATH')) OR exit('No direct script access allowed');

/**
 * 클래스명: Common
 * 작성자:
 * 클래스설명: Common
 *
 * 최초작성일:
 * 최종수정일:
 * ---
 * Date         Auth        Desc
 */
class Common extends JLAMP_Controller {
	function __construct() {
		parent::__construct();
	}

	/**
	 * 메소드명: sessionValid_prc
	 * 작성자: 김목영
	 * 설 명: 세션 값 체크
	 *
	 * @return string $result JSON 결과 데이터
	 *
	 * 최초작성일: 2017.01.01
	 * 최종수정일: 2017.01.01
	 * ---
	 * Date     Auth        Desc
	 */
	public function sessionValid_prc() {
		$result = array(
			'returnCode' => 0,
			'returnMsg' => '',
			'data' => ''
		);

		if (!$this->isSession) {
			$result['returnCode'] = 'I001';
			$result['returnMsg'] = '세션이 만료되었습니다.';
		}

		$this->jlamp_comm->jsonEncEnd($result);
	} // end of function sessionValid_prc

	/**
	 * 메소드명: setSession_prc
	 * 작성자: 김목영
	 * 설 명: 비밀번호가 일치하면 세션 값을 다시 세팅 Process
	 *
	 * @return string $result JSON 결과 데이터
	 *
	 * 최초작성일: 2016.10.14
	 * 최종수정일: 2016.10.14
	 * ---
	 * Date     Auth        Desc
	 */
	public function setSession_prc() {
		$result = array(
			'returnCode' => 0,
			'returnMsg' => '',
            'data' => ''
		);

		$userId = parent::getCookie('UserID');
		$userPwd = $this->jlamp_comm->xssInput('userPwd', 'post');

		/* Valid Check */
		if (empty($userId)) {
			$result['returnCode'] = 'I001';
			$result['returnMsg'] = '사용자 아이디를 입력해 주십시오.';

			$this->jlamp_comm->jsonEncEnd($result);
		}

		if (empty($userPwd)) {
			$result['returnCode'] = 'I002';
			$result['returnMsg'] = '비밀번호를 입력해 주십시오.';

			$this->jlamp_comm->jsonEncEnd($result);
		}

		$loginInfo = array(
        	'p_user_id' => $loginID,
	        'p_password' => md5($loginPwd)
		);

        $result = parent::doLogin($loginInfo, '', false, $cookieExpire);

		$this->jlamp_comm->jsonEncEnd($result, true);
	} // end of function setSession_prc

	/**
	 * 메소드명: isIE
	 * 작성자: 최영은
	 * 설 명: 브라우저 체크
	 *
	 * @return bool IE 여부
	 *
	 * 최초작성일: 2016.10.17
	 * 최종수정일: 2016.10.17
	 * ---
	 * Date              Auth        Desc
	 */
	public function isIE() {
        if(isset($_SERVER['HTTP_USER_AGENT']) && (strpos($_SERVER['HTTP_USER_AGENT'], 'MSIE') !== false || strpos($_SERVER['HTTP_USER_AGENT'], 'Trident') !== false)) {
            return true;
        } else {
            return false;
        }
	} // end of function isIE

	/**
	 * 메소드명: getCode_prc
	 * 작성자: 최영은
	 * 설 명: 그룹별 코드/코드명 가져오기 Process
	 *
	 * @return string $result JSON Data
	 *
	 * 최초작성일: 2017.12.12
	 * 최종수정일: 2017.12.12
	 * ---
	 * Date              Auth        Desc
	*/
	public function getCode_prc() {
		$result = array (
			'returnCode' => 0,
			'returnMsg' => '',
			'data' => ''
		);

		$groupCode = $this->jlamp_comm->xssInput('groupCode', 'get'); // 그룹코드
		$pCode = $this->jlamp_comm->xssInput('pCode', 'get'); // 부모코드
		$code = $this->jlamp_comm->xssInput('code', 'get'); // 코드
		$inCodes = $this->jlamp_comm->xssInput('inCodes', 'get');
		$notInCodes = $this->jlamp_comm->xssInput('notInCodes', 'get');

        // SQL 변수
		$isArray = false; // 배열여부
		$column = 'Code, CodeName, `Order`, `Desc`'; // SELECT문
		$filter = array(); // 조건절

		// 조건절 설정
		$filter = array (
			array (
				'CodeGroup' => $groupCode,
				'UseYN' => 1
			),
			array (
				'CodeGroup' => '=',
				'UseYN' => '='
			)
		);

        if($pCode) {
            $filter[0]['PCode'] = $pCode;
            $filter[1]['PCode'] = '=';
        }

        if($code) {
            $filter[0]['Code'] = $code;
            $filter[1]['Code'] = '=';
        }

        if($inCodes) {
            $filter[0]['Code'] = ' Code in ('.$inCodes.')';
            $filter[1]['Code'] = '';
        }

        if($notInCodes) {
            $filter[0]['Code'] = ' Code not in ('.$notInCodes.')';
            $filter[1]['Code'] = '';
        }

		try {
			// DB 설정
			$this->jlamp_common_mdl->DBConnect('JLAMPBiz');
			// Table 설정
			$this->jlamp_common_mdl->setTable('Code');

			$res = $this->jlamp_common_mdl->rows($isArray, 1, 0, $column, $filter, '`Order`');

            if (isset($res['rows'])) $result['data']['codeData'] = $res['rows'][0];

		} catch (Exception $e) {
			$result['returnCode'] = 'E001';
	        $result['returnMsg'] = $e->getMessage();
		}

		$this->jlamp_comm->jsonEncEnd($result);
	} // end of function getCode_prc

	/**
	 * 함수명: getServiceApplyCount_prc
	 * 작성자: 최영은
	 * 함수설명: 서비스 신청 받은 count
	 *
	 * @access  public
	 * @param -
	 * @return -
	 *
	 * 최초작성일: 2017.12.20
	 * 최종수정일: 2017.12.20

	-----------------------------------------------------------------------
	Date              Auth        Desc
	*/
	public function getServiceApplyCount_prc() {
		$result = array (
			'returnCode' => 0,
			'returnMsg' => '',
			'data' => ''
		);

        if( parent::isAuth()){
            $userName = parent::getCookie('UserName');
            $isSP = parent::getCookie('IsSP');
            $companyIdx = parent::getCookie('CompanyIdx');

            // SQL 문 : '신청' 상태의 data count
            $sql = "SELECT count(a.ServiceApplyIdx) AS cnt
                      FROM ServiceApply a LEFT OUTER JOIN ServiceApplyDetail b
                                                       ON a.ServiceApplyIdx =  b.ServiceApplyIdx
                     WHERE b.SPCompanyIdx = ".$companyIdx." AND b.IsWorkStatus = 1" ;
            try {
                // DB 설정
                $this->jlamp_common_mdl->DBConnect('JLAMPBiz');
                $res = $this->jlamp_common_mdl->sqlRow($sql);
                $result['data']['count'] = $res->cnt;
            } catch (Exception $e) {
                $result['returnCode'] = 'E001';
                $result['returnMsg'] = $e->getMessage();
            }
            // 서비스 제공자 여부
            $result['data']['isSP'] = $isSP ;
            $result['data']['userName'] = $userName ;
        }
		$this->jlamp_comm->jsonEncEnd($result);
	} // end of function getServiceApplyCount_prc

}
