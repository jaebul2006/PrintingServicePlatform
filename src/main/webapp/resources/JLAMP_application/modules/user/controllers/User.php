<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * 클래스명: User
 * 작성자: 최영은
 * 클래스설명: 로그인/회원가입/비밀번호찾기
 *
 * 최초작성일: 2017.12.11
 * 최종수정일: 2017.12.11
 * ---
 * Date         Auth        Desc
 */
class User extends JLAMP_Controller {

	public function index() {
		if (parent::isAuth()) {
			header('Location: /');
		} else {
			$this->login();
		}
	}

	/**
	 * 메소드명: login
	 * 작성자: 최영은
	 * 설 명: 로그인 화면
	 *
	 * 최초작성일: 2017.12.11
	 * 최종수정일: 2017.12.11
	 * ---
	 * Date              Auth        Desc
	*/
	public function login() {
		$returnURL = $this->jlamp_comm->xssInput('returnURL', 'get'); // 권한이 없는 이전 페이지 경로

		$cssPart = array(
			'<link rel="stylesheet" href="/css/user/login.css">'
		);
		$jsPart = array(
			'<script src="/js/user/login.js"></script>'
		);

		$this->jlamp_comm->setCSS($cssPart);
		$this->jlamp_comm->setJS($jsPart);

    	$this->jlamp_tp->assign(array(
			'returnURL' => urldecode($returnURL),
			'menuSelection' => 'service'
		));

    	$this->jlamp_tp->setURLType(array(
    		'tpl' => 'login.html'
	    ));
	} // end of function login

	/**
	 * 메소드명: login_prc
	 * 작성자: 최영은
	 * 설 명: 로그인 Process
	 *
	 * @return string $result JSON Data
	 *
	 * 최초작성일: 2017.12.11
	 * 최종수정일: 2017.12.11
	 * ---
	 * Date              Auth        Desc
	*/
	public function login_prc() {
		$result = array (
			'returnCode' => 0,
			'returnMsg' => '',
			'data' => ''
		);
		$loginType = $this->jlamp_comm->xssInput('loginType', 'post'); // 로그인 회원 타입
		$loginMail = $this->jlamp_comm->xssInput('loginMail', 'post'); // 이메일
		$password = $this->jlamp_comm->xssInput('password', 'post'); // 비밀번호
		//$servicecode = $this->jlamp_comm->xssInput('servicecode', 'post'); // 서비스 코드

		// 유효성 검사
		// 아이디
		if (!$loginMail) {
			$result['returnCode'] = 'I002';
			$result['returnMsg'] = '이메일을 입력해 주십시오';
			$this->jlamp_comm->jsonEncEnd($result);
		}

		// 비밀번호
		if (!$password) {
			$result['returnCode'] = 'I003';
			$result['returnMsg'] = '비밀번호를 입력해 주십시오';
			$this->jlamp_comm->jsonEncEnd($result);
		}

		// SQL 조건절
        $addWhere = '';
        if($loginType == 'sp'){
            $addWhere = 'AND b.IsSP > 0';
        } else {
            $addWhere = 'AND b.IsHospital > 0';
        }

		// SQL 문
		$sql = "SELECT a.UserIdx, a.CompanyIdx, a.StatusCode AS UserStatusCode, a.UserEmail, a.Password, a.Name, a.IsManager, b.CompanyIdx, b.ComName, b.StatusCode AS ComStatusCode, b.IsHospital, b.IsSP
                  FROM User a Left Join Company b ON a.CompanyIdx = b.CompanyIdx
                WHERE UserEmail = '".$loginMail."' ".$addWhere."
                GROUP BY a.CompanyIdx";
		try {
			// DB 설정
			$this->jlamp_common_mdl->DBConnect('JLAMPBiz');
			$res = $this->jlamp_common_mdl->sqlRows($sql);

			if (isset($res[0][0])) {
                $res = $res[0][0];

                // 업체 승인 여부 체크
                if ($res->ComStatusCode != 'G0030002') {
                    $result['returnCode'] = 'I004';
                    $result['returnMsg'] = '접속 권한이 없는 업체입니다.';
                    $this->jlamp_comm->jsonEncEnd($result);
                }

                // 회원 승인 여부 체크
                if ($res->UserStatusCode != 'G0020002') {
                    $result['returnCode'] = 'I005';
                    $result['returnMsg'] = '접속 권한이 없는 회원입니다.';
                    $this->jlamp_comm->jsonEncEnd($result);
                }

				$passwdHash = $this->jlamp_comm->compareHash($password, $res->Password);
				if ($passwdHash[0]) {
                     // 개인정보
					parent::setCookie('UserIdx', $res->UserIdx, 0); // 회원일련번호
					parent::setCookie(LOGIN_KEY, $res->UserEmail, 0); // 회원 이메일
					parent::setCookie("UserName", $res->Name, 0); // 회원이름
                    $IsManager = $res->IsManager > 0 ? "Y" : "N";
                    parent::setCookie('IsManager', $IsManager, 0); // 담당자 여부
                    // 회사정보
                    $isHospital = $res->IsHospital > 0 ? "Y" : "N";
                    parent::setCookie('IsHospital', $isHospital, 0); // 진료기관 여부
                    $isSP= $res->IsSP > 0 ? "Y" : "N";
					parent::setCookie('IsSP', $isSP, 0); // 서비스 제공업체 여부
					parent::setCookie("CompanyIdx", $res->CompanyIdx, 0); // 기관(업체) 일련번호
					parent::setCookie("ComName", $res->ComName, 0); // 기관(업체) 이름
					parent::setCookie("LoginType", $loginType, 0); // 기관(업체) 이름

				} else {
					$result['returnCode'] = 'I006';
					$result['returnMsg'] = '비밀번호가 일치하지 않습니다.';
				}
			} else {
				$result['returnCode'] = 'I001';
				$result['returnMsg'] = '일치하는 정보가 없습니다.';
			}
		} catch (Exception $e) {
			$result['returnCode'] = 'E001';
	        $result['returnMsg'] = $e->getMessage();
		}

		$this->jlamp_comm->jsonEncEnd($result);
	} // end of function login_prc

	/**
	 * 메소드명: logout_prc
	 * 작성자: 최영은
	 * 설 명: 로그아웃 Process
	 *
	 * 최초작성일: 2017.12.11
	 * 최종수정일: 2017.12.11
	 * ---
	 * Date              Auth        Desc
	*/
	public function logout_prc() {
		$result = array (
			'returnCode' => 0,
			'returnMsg' => '',
			'data' => ''
		);

		foreach ($_COOKIE as $key => $val) {
             parent::delCookie($key);
		}

		header("Location: /");
	} // end of function logout_prc

	/**
	 * 메소드명: join
	 * 작성자: 최영은
	 * 설 명: 회원가입 화면
	 *
	 * 최초작성일: 2017.12.11
	 * 최종수정일: 2017.12.11
	 * ---
	 * Date              Auth        Desc
	*/
	public function join() {
		$cssPart = array(
			'<link rel="stylesheet" href="/css/user/join.css">'
		);
		$jsPart = array(
			'<script src="/js/user/join.js"></script>'
		);

		$this->jlamp_comm->setCSS($cssPart);
		$this->jlamp_comm->setJS($jsPart);

    	$this->jlamp_tp->assign(array(
			'menuSelection' => 'service'
		));

    	$this->jlamp_tp->setURLType(array(
    		'tpl' => 'join.html'
	    ));
	} // end of function Join

	/**
	 * 메소드명: checkEmail_prc
	 * 작성자: 최영은
	 * 설 명: 이메일 중복체크 Process
	 *
	 * @return string $result JSON Data
	 *
	 * 최초작성일: 2017.12.11
	 * 최종수정일: 2017.12.11
	 * ---
	 * Date              Auth        Desc
	*/
	public function checkEmail_prc() {
		$result = array (
			'returnCode' => 0,
			'returnMsg' => '',
			'data' => ''
		);

		$email = $this->jlamp_comm->xssInput('email', 'post'); // 이메일 ID
		$emailAddress = $this->jlamp_comm->xssInput('emailAddress', 'post'); // 이메일 도메인

		// SQL 변수
		$isArray = false; // 배열여부
		$column = 'count(UserEmail) AS cnt'; // SELECT문
		$filter = array(); // 조건절

		// 유효성 검사
		// 이메일 2~30자 체크
		if (strlen($email) < 2 || strlen($email) > 30) {
			$result['returnCode'] = 'I001';
			$result['returnMsg'] = '이메일 주소 앞자리는 2~30자로 입력해 주십시오';
			$this->jlamp_comm->jsonEncEnd($result);
		}
		// 이메일 뒷자리 체크
		if (!$emailAddress) {
			$result['returnCode'] = 'I002';
			$result['returnMsg'] = '이메일 주소 뒷자리를 입력해 주십시오';
			$this->jlamp_comm->jsonEncEnd($result);
		}

		// 조건절 설정
		$filter = array (
			array (
				'UserEmail' => $email.'@'.$emailAddress
			),
			array (
				'UserEmail' => '='
			)
		);

		try {
			// DB 설정
			$this->jlamp_common_mdl->DBConnect('JLAMPBiz');
			// Table 설정
			$this->jlamp_common_mdl->setTable('User');

			$res = $this->jlamp_common_mdl->row($isArray, $column, $filter);

            $result['data']['isEmail'] = $res->cnt > 0 ? 'N' : 'Y';
		} catch (Exception $e) {
			$result['returnCode'] = 'E001';
	        $result['returnMsg'] = $e->getMessage();
		}
		$this->jlamp_comm->jsonEncEnd($result);
	} // end of function checkEmail_prc

	/**
	 * 메소드명: checkComNum_prc
	 * 작성자: 최영은
	 * 설 명: 사업자 등록 번호 중복체크 Process
	 *
	 * @return string $result JSON Data
	 *
	 * 최초작성일: 2017.12.13
	 * 최종수정일: 2017.12.13
	 * ---
	 * Date              Auth        Desc
	*/
	public function checkComNum_prc() {
		$result = array (
			'returnCode' => 0,
			'returnMsg' => '',
			'data' => ''
		);
        $medicalDept = array();
        $serviceProc = array();
		$comNum1 = $this->jlamp_comm->xssInput('comNum1', 'post');
		$comNum2 = $this->jlamp_comm->xssInput('comNum2', 'post');
		$comNum3 = $this->jlamp_comm->xssInput('comNum3', 'post');

		// SQL 변수
		$isArray = false; // 배열여부
		$column = 'count(CompanyIdx) AS cnt, CompanyIdx, IsHospital, IsSp, ComNumber, ComName, ComName, CEOName, Tel, RegionCode, ServiceHospital, Characteristic, StatusCode '; // SELECT문
		$filter = array(); // 조건절

		// 조건절 설정
		$filter = array (
			array (
				'ComNumber' => $comNum1.'-'.$comNum2.'-'.$comNum3
			),
			array (
				'ComNumber' => '='
			)
		);

		try {
			// DB 설정
			$this->jlamp_common_mdl->DBConnect('JLAMPBiz');
			// Table 설정
			$this->jlamp_common_mdl->setTable('Company');

			$res = $this->jlamp_common_mdl->row($isArray, $column, $filter);

            $result['data']['isComNum'] = $res->cnt > 0 ? 'N' : 'Y';
		} catch (Exception $e) {
			$result['returnCode'] = 'E001';
	        $result['returnMsg'] = $e->getMessage();
		}

        if($res->cnt > 0) {
            $result['data']['companyData'] = $res;

            // SQL 변수
            $isArray = false; // 배열여부
            $column = 'ProcCode, SubProcCode'; // SELECT문
            $filter = array(); // 조건절

            // 조건절 설정
            $filter = array (
                array (
                    'CompanyIdx' => $res->CompanyIdx
                ),
                array (
                    'CompanyIdx' => '='
                )
            );
            try {
                // Table 설정
                $this->jlamp_common_mdl->setTable('CompanyService');
                // 쿼리 실행
                $resService = $this->jlamp_common_mdl->rows($isArray, 1, 0, $column, $filter, 'ProcCode ASC');
            } catch (Exception $e) {
                $result['returnCode'] = 'E002';
                $result['returnMsg'] = $e->getMessage();
            }
            $serviceProcCodeArr = array(
                'G0070001' => 'scanning',
                'G0070002' => 'modeling',
                'G0070003' => 'printing'
            );
            if (isset($resService['rows'][0])) {
                $resService = $resService['rows'][0];
                if(is_array($resService)){
                    foreach($resService as $k => $v){
                        if(array_key_exists($v->ProcCode, $serviceProcCodeArr)) {
                            $serviceProc[$serviceProcCodeArr[$v->ProcCode]][] = $v;
                        } else {
                            $medicalDept[$v->ProcCode][] = $v;
                        }
                    }
                    $result['data']['medicalDept'] = $medicalDept;
                    $result['data']['serviceProc'] = $serviceProc;
                }
            }
        }

		$this->jlamp_comm->jsonEncEnd($result);
	} // end of function checkComNum_prc

	/**
	 * 메소드명: getServiceCompanyList_prc
	 * 작성자: 최영은
	 * 설 명: 업체선택 리스트 가져오기 Process
	 *
	 * @return string $result JSON Data
	 *
	 * 최초작성일: 2017.12.11
	 * 최종수정일: 2017.12.11
	 * ---
	 * Date              Auth        Desc
	*/
	public function getServiceCompanyList_prc() {
		$result = array (
			'returnCode' => 0,
			'returnMsg' => '',
			'data' => ''
		);
        $procCompanyList = array();
		// SQL 문
		$sql = "SELECT a.CompanyIdx, a.ProcCode, b.ComName
                  FROM CompanyService a Left Outer Join Company b ON a.CompanyIdx = b.CompanyIdx
                WHERE a.ProcCode in ('G0070001', 'G0070002', 'G0070003') AND b.StatusCode = 'G0030002'
                GROUP BY a.ProcCode, a.CompanyIdx";
		try {
			// DB 설정
			$this->jlamp_common_mdl->DBConnect('JLAMPBiz');
			$res = $this->jlamp_common_mdl->sqlRows($sql);
            if(isset($res[0]) && is_array($res[0])){
                foreach($res[0] as $k => $v){
                    $result['data']['procCompanyList'][$v->ProcCode][] = $v;
                }
            }
		} catch (Exception $e) {
			$result['returnCode'] = 'E001';
	        $result['returnMsg'] = $e->getMessage();
		}
		$this->jlamp_comm->jsonEncEnd($result);

	} // end of function getServiceCompanyList_prc

	/**
	 * 메소드명: saveData_prc
	 * 작성자: 최영은
	 * 설 명: 회원가입 등록 Process
	 *
	 * @return string $result JSON Data
	 *
	 * 최초작성일: 2017.12.11
	 * 최종수정일: 2017.12.11
	 * ---
	 * Date              Auth        Desc
	*/
	public function saveData_prc() {
		$result = array (
			'returnCode' => 0,
			'returnMsg' => '',
			'data' => ''
		);

        $workType = $this->jlamp_comm->xssInput('work_type', 'post'); // 저장 타입
        $userIdx = $this->jlamp_comm->xssInput('user_idx', 'post'); // 회원 일련번호
		$companyIdx = $this->jlamp_comm->xssInput('company_idx', 'post'); // 기관(업체) 일련번호
		$agreePersonal = $this->jlamp_comm->xssInput('agree_personal', 'post'); // 개인정보 수직/이용/보유 동의
		$agreeUnique = $this->jlamp_comm->xssInput('agree_unique', 'post'); // 고유식별정보 수직/이용/보유 동의
		$isHospital = $this->jlamp_comm->xssInput('is_hospital', 'post'); // 진료기관 여부
        $isHospital = $isHospital ? 1 : 0;
		$isSP = $this->jlamp_comm->xssInput('is_sp', 'post'); // 서비스 제공 업체 여부
        $isSP =  $isSP ? 1 : 0;
		$email = $this->jlamp_comm->xssInput('email', 'post'); // 이메일 앞자리
		$emailAddress = $this->jlamp_comm->xssInput('email_address', 'post'); // 이메일 뒷자리
		$userName = $this->jlamp_comm->xssInput('user_name', 'post'); // 성명(담당자)
		$password = $this->jlamp_comm->xssInput('password', 'post'); // 비밀번호
		$passwordConfirm = $this->jlamp_comm->xssInput('password_confirm', 'post'); // 비밀번호 확인
		$comNum1 = $this->jlamp_comm->xssInput('com_num1', 'post'); // 사업자 번호 1
		$comNum2 = $this->jlamp_comm->xssInput('com_num2', 'post'); // 사업자 번호 2
		$comNum3 = $this->jlamp_comm->xssInput('com_num3', 'post'); // 사업자 번호 3
		$comName = $this->jlamp_comm->xssInput('com_name', 'post'); // 기관(업체)명
		$ceoName = $this->jlamp_comm->xssInput('ceo_name', 'post'); // 대표자명
		$comTel1 = $this->jlamp_comm->xssInput('com_tel1', 'post'); // 전화번호 1
		$comTel2 = $this->jlamp_comm->xssInput('com_tel2', 'post'); // 전화번호 2
		$comTel3 = $this->jlamp_comm->xssInput('com_tel3', 'post'); // 전화번호 3
		$regionCode = $this->jlamp_comm->xssInput('region_code', 'post'); // 지역 코드
		$deptCode = $this->jlamp_comm->xssInput('dept_code', 'post'); // 진료과목 코드
		$deptServiceCode = $this->jlamp_comm->xssInput('dept_service_code', 'post'); // 진료과목 > 서비스 항목 코드
		$selScanningCompany = $this->jlamp_comm->xssInput('sel_scanning_company', 'post'); // Scanning 업체
		$selModelingCompany = $this->jlamp_comm->xssInput('sel_modeling_company', 'post'); // Modeling 업체
		$selPrintingCompany = $this->jlamp_comm->xssInput('sel_printing_company', 'post'); // Printing 업체
		$serviceHospital = $this->jlamp_comm->xssInput('service_hospital', 'post'); // 서비스 병원
		$characteristic = $this->jlamp_comm->xssInput('characteristic', 'post'); // 특장점
		$selStatusCode = $this->jlamp_comm->xssInput('sel_status_code', 'post'); // 업체 상태
		
		$scanningServiceCode = $this->jlamp_comm->xssInput('scanning_service_code', 'post'); // Scanning 제공 서비스
		$modelingServiceCode = $this->jlamp_comm->xssInput('modeling_service_code', 'post'); // Modeling 제공 서비스
		$printingServiceCode = $this->jlamp_comm->xssInput('printing_service_code', 'post'); // Printing 제공 서비스
        $isManager = $companyIdx > 0 ? 0 : 1;

        // 유효성 검사 (회원가입용)
        if($workType == 'join') {
            // 개인정보 수직/이용/보유 동의 여부
            if (!$agreePersonal) {
                $result['returnCode'] = 'I001';
                $result['returnMsg'] = '개인정보 수집 / 이용 / 보유 에 동의해주세요.';
                $this->jlamp_comm->jsonEncEnd($result);
            }

            // 고유식별정보 수직/이용/보유 동의 여부
            if (!$agreeUnique) {
                $result['returnCode'] = 'I002';
                $result['returnMsg'] = '고유식별정보 수집 / 이용 / 보유 에 동의해주세요.';
                $this->jlamp_comm->jsonEncEnd($result);
            }

            // 회원구분
            if (!$isHospital && !$isSP) {
                $result['returnCode'] = 'I003';
                $result['returnMsg'] = '회원구분을 선택해 주십시오.';
                $this->jlamp_comm->jsonEncEnd($result);
            }

            // 이메일
            if (!$email) {
                $result['returnCode'] = 'I004';
                $result['returnMsg'] = '이메일을 입력해 주십시오.';
                $this->jlamp_comm->jsonEncEnd($result);
            }

            // 이메일 2~30자 체크
            if (strlen($email) < 2 || strlen($email) > 30) {
                $result['returnCode'] = 'I005';
                $result['returnMsg'] = '이메일 주소 앞자리는 2~30자로 입력해 주십시오';
                $this->jlamp_comm->jsonEncEnd($result);
            }

            // 이메일 주소 (뒷자리)
            if (!$emailAddress) {
                $result['returnCode'] = 'I006';
                $result['returnMsg'] = '이메일 주소를 입력해 주십시오';
                $this->jlamp_comm->jsonEncEnd($result);
            }

            // 성명
            if (!$userName) {
                $result['returnCode'] = 'I007';
                $result['returnMsg'] = '성명을 입력해 주십시오';
                $this->jlamp_comm->jsonEncEnd($result);
            }

            // 비밀번호
            if (!$password) {
                $result['returnCode'] = 'I008';
                $result['returnMsg'] = '비밀번호를 입력해 주십시오';
                $this->jlamp_comm->jsonEncEnd($result);
            }

            // 비밀번호 8~15자 체크
            if (strlen($password) < 8 || strlen($password) > 15) {
                $result['returnCode'] = 'I009';
                $result['returnMsg'] = '비밀번호는 8~15자로 입력해 주십시오';
                $this->jlamp_comm->jsonEncEnd($result);
            }

            // 비밀번호 확인
            if (!$passwordConfirm) {
                $result['returnCode'] = 'I010';
                $result['returnMsg'] = '비밀번호 확인을 입력해 주십시오';
                $this->jlamp_comm->jsonEncEnd($result);
            }

            // 비밀번호 8~15자 체크
            if (strlen($passwordConfirm) < 8 || strlen($passwordConfirm) > 15) {
                $result['returnCode'] = 'I011';
                $result['returnMsg'] = '비밀번호 확인은 8~15자로 입력해 주십시오';
                $this->jlamp_comm->jsonEncEnd($result);
            }

            // 비밀번호, 비밀번호 확인 일치여부
            if ($password != $passwordConfirm) {
                $result['returnCode'] = 'I012';
                $result['returnMsg'] = '비밀번호가 일치하지 않습니다. 확인해주시기 바랍니다';
                $this->jlamp_comm->jsonEncEnd($result);
            }
            // 사업자 등록 번호
            if (!$comNum1 || !$comNum2 || !$comNum3) {
                $result['returnCode'] = 'I013';
                $result['returnMsg'] = '사업자 등록 번호를 입력해 주십시오';
                $this->jlamp_comm->jsonEncEnd($result);
            }
            if (strlen($comNum1) != 3) {
                $result['returnCode'] = 'I014';
                $result['returnMsg'] = '사업자 등록 번호 세번째 자리는 3자로 입력해 주십시오';
                $this->jlamp_comm->jsonEncEnd($result);
            }
            if (strlen($comNum2) != 2) {
                $result['returnCode'] = 'I015';
                $result['returnMsg'] = '사업자 등록 번호 세번째 자리는 2자로 입력해 주십시오';
                $this->jlamp_comm->jsonEncEnd($result);
            }
            if (strlen($comNum3) != 5) {
                $result['returnCode'] = 'I016';
                $result['returnMsg'] = '사업자 등록 번호 세번째 자리는 5자로 입력해 주십시오';
                $this->jlamp_comm->jsonEncEnd($result);
            }

            // 기관/업체명
            if (!$comName) {
                $result['returnCode'] = 'I017';
                $result['returnMsg'] = '기관/업체명을 입력해 주십시오';
                $this->jlamp_comm->jsonEncEnd($result);
            }

            // 전화번호 (국번)
            if (!$comTel1 || !$comTel2 || !$comTel3) {
                $result['returnCode'] = 'I018';
                $result['returnMsg'] = '전화번호를 입력해 주십시오';
                $this->jlamp_comm->jsonEncEnd($result);
            }

            // 지역
            if (!$regionCode) {
                $result['returnCode'] = 'I019';
                $result['returnMsg'] = '지역을 선택해 주십시오';
                $this->jlamp_comm->jsonEncEnd($result);
            }
        }

        // 유효성 검사 (정보수정용)
        if($workType == "mypage"){
            if(!parent::isAuth()) {
                $this->jlamp_js->replace('/user/login?returnURL='.urlencode("/user/mypage"), '로그인 후 이용해 주십시오');
            }
        }
        // 진료과목 > 서비스 항목 설정여부 체크
        if($isHospital) {
            if(!$deptCode) {
                $result['returnCode'] = 'I020';
                $result['returnMsg'] = '진료과목을 선택해 주십시오';
                $this->jlamp_comm->jsonEncEnd($result);
            }
            if(!$deptServiceCode) {
                $result['returnCode'] = 'I021';
                $result['returnMsg'] = '서비스 항목을 선택해 주십시오';
                $this->jlamp_comm->jsonEncEnd($result);
            }
        }

        // 제공서비스 > 세부 서비스 설정 여부 체크
        if($isSP) {
            if(!$scanningServiceCode && !$modelingServiceCode && !$printingServiceCode) {
                $result['returnCode'] = 'I022';
                $result['returnMsg'] = '제공 서비스를 선택해 주십시오';
                $this->jlamp_comm->jsonEncEnd($result);
            }

        }

        // DB 설정
        $this->jlamp_common_mdl->DBConnect('JLAMPBiz');

        // 트랜잭션 Start
        $this->jlamp_common_mdl->tBegin();

        // 1. Company table 처리
		$data = array();

        if(!$companyIdx) {
            $data['StatusCode'] = $selStatusCode; // 상태 코드
            $data['IsHospital'] = (int)$isHospital;
            $data['IsSp'] = (int)$isSP;
            $data['ComNumber'] = $comNum1.'-'.$comNum2.'-'.$comNum3;
            $data['ComName'] = $comName;
            $data['CEOName'] = $ceoName;
            $data['Tel'] = $comTel1.'-'.$comTel2.'-'.$comTel3;
            $data['RegionCode'] = $regionCode;
            $data['ServiceHospital'] = $serviceHospital;
            $data['Characteristic'] = $characteristic;
            $data['RegDT'] = time();

            try {
                // Table 설정
                $this->jlamp_common_mdl->setTable('Company');

                $res = $this->jlamp_common_mdl->insert($data);

                if (!$res) {
                    $result['returnCode'] = 'I025';
                    $result['returnMsg'] = '기업 정보 등록에 실패하였습니다.';
                    $this->jlamp_comm->jsonEncEnd($result);
                } else {
                    $companyIdx = $res;
                }

            } catch (Exception $e) {
                $result['returnCode'] = 'E001';
                $result['returnMsg'] = $e->getMessage();
                $this->jlamp_comm->jsonEncEnd($result);
            }
        } else {
            $data['IsHospital'] = (int)$isHospital;
            $data['IsSp'] = (int)$isSP;
            $data['ServiceHospital'] = $serviceHospital;
            $data['Characteristic'] = $characteristic;
            $data['ModDT'] = time();
            try {
                // Table 설정
                $this->jlamp_common_mdl->setTable('Company');

                $res = $this->jlamp_common_mdl->update('CompanyIdx', $companyIdx, $data);
                if (!$res) {
                    $result['returnCode'] = 'I026';
                    $result['returnMsg'] = '업체구분 수정에 실패하였습니다.';
                    $this->jlamp_comm->jsonEncEnd($result);
                }
            } catch (Exception $e) {
                $result['returnCode'] = 'E003';
                $result['returnMsg'] = $e->getMessage();
                $this->jlamp_comm->jsonEncEnd($result);
            }
        }

        // 2. User table 처리
		$data = array();
        if(!$userIdx) {
            $data['CompanyIdx'] = $companyIdx;
            $data['StatusCode'] = 'G0020002'; // 무조건 승인처리
            $data['AgreePersonal'] = (int)$agreePersonal;
            $data['AgreeUnique'] = (int)$agreeUnique;
            $data['UserEmail'] = $email.'@'.$emailAddress;
            $data['Name'] = $userName;
            $data['Password'] = $this->jlamp_comm->makeHash($password);
            $data['IsManager'] = (int)$isManager;
            $data['ScanningCompanyIdx'] = $selScanningCompany;
            $data['ModelingCompanyIdx'] = $selModelingCompany;
            $data['PrintingCompanyIdx'] = $selPrintingCompany;
            $data['RegDT'] = time();

            try {
                // Table 설정
                $this->jlamp_common_mdl->setTable('User');

                $res = $this->jlamp_common_mdl->insert($data);
                if (!$res) {
                    $result['returnCode'] = 'I027';
                    $result['returnMsg'] = '회원 가입에 실패하였습니다.';
                    $this->jlamp_comm->jsonEncEnd($result);
                } else {
                    $userIdx = $res;
                }
            } catch (Exception $e) {
                $result['returnCode'] = 'E002';
                $result['returnMsg'] = $e->getMessage();
                $this->jlamp_comm->jsonEncEnd($result);
            }
        } else {
            $data['Name'] = $userName;
            $data['ScanningCompanyIdx'] = $selScanningCompany;
            $data['ModelingCompanyIdx'] = $selModelingCompany;
            $data['PrintingCompanyIdx'] = $selPrintingCompany;
            $data['ModDT'] = time();

            try {
                // Table 설정
                $this->jlamp_common_mdl->setTable('User');

                $res = $this->jlamp_common_mdl->update('UserIdx', $userIdx, $data);
                if (!$res) {
                    $result['returnCode'] = 'I028';
                    $result['returnMsg'] = '회원 수정에 실패하였습니다.';
                    $this->jlamp_comm->jsonEncEnd($result);
                }
            } catch (Exception $e) {
                $result['returnCode'] = 'E003';
                $result['returnMsg'] = $e->getMessage();
                $this->jlamp_comm->jsonEncEnd($result);
            }
        }

        // 3. CompanyService table 처리
        if($userIdx && $companyIdx){
            // 3-1. 진료기관 : 진료과목 > 서비스 항목 data
            $servoceProcArr = array();
            if(isset($deptCode) && isset($deptServiceCode)) $servoceProcArr[$deptCode[0]] = $deptServiceCode;

            // 3-2. 서비스 제공 업체 : 제공 서비스 > 세부 서비스 항목 data
            if(isset($scanningServiceCode)) $servoceProcArr['G0070001'] = $scanningServiceCode; // scanning
            if(isset($modelingServiceCode)) $servoceProcArr['G0070002'] = $modelingServiceCode; // modeling
            if(isset($printingServiceCode)) $servoceProcArr['G0070003'] = $printingServiceCode; // printing

            // 3-3. data CRUD process
            if($servoceProcArr) {
                // Table 설정
                $this->jlamp_common_mdl->setTable('CompanyService');
                try {
                    // 3-3-1. 기존 data 삭제
                    $res = $this->jlamp_common_mdl->delete('CompanyIdx', $companyIdx, $data);
                } catch (Exception $e) {
                    $result['returnCode'] = 'E004';
                    $result['returnMsg'] = $e->getMessage();
                    $this->jlamp_comm->jsonEncEnd($result);
                }

                // 3-3-2. 새 data insert
                foreach($servoceProcArr as $key => $val){
                    if(is_array($val)){
                        foreach($val as $k => $v) {
                            $data = array();
                            $data['ProcCode'] = $key;
                            $data['SubProcCode'] = $v;
                            $data['CompanyIdx'] = $companyIdx;
                            $data['RedDT'] = time();
                            try {
                                $res1 = $this->jlamp_common_mdl->insert($data);
                            } catch (Exception $e) {
                                $result['returnCode'] = 'E005';
                                $result['returnMsg'] = $e->getMessage();
                                $this->jlamp_comm->jsonEncEnd($result);
                            }
                        }
                    }
                }
            }
        }
        // 트랜잭션 완료
        $this->jlamp_common_mdl->tComplete();

    	$this->jlamp_comm->jsonEncEnd($result);
	} // end of function saveData_prc

	/**
	 * 메소드명: mypage
	 * 작성자: 최영은
	 * 설 명: 정보수정 화면
	 *
	 * 최초작성일: 2017.12.14
	 * 최종수정일: 2017.12.14
	 * ---
	 * Date              Auth        Desc
	*/
	public function mypage() {
        if(!parent::isAuth()) {
            $this->jlamp_js->replace('/user/login?returnURL='.urlencode("/user/mypage"), '로그인 후 이용해 주십시오');
        }

		$cssPart = array(
			'<link rel="stylesheet" href="/css/user/mypage.css">'
		);
		$jsPart = array(
			'<script src="/js/user/mypage.js"></script>'
		);

		$this->jlamp_comm->setCSS($cssPart);
		$this->jlamp_comm->setJS($jsPart);

        $userIdx = parent::getCookie("UserIdx");
        $isManager = parent::getCookie("IsManager");

    	$this->jlamp_tp->assign(array(
            "userIdx" => $userIdx,
            "isManager" => $isManager,
			'menuSelection' => 'service'
		));

    	$this->jlamp_tp->setURLType(array(
    		'tpl' => 'mypage.html'
	    ));
	} // end of function mypage

	/**
	 * 메소드명: getUserData_prc
	 * 작성자: 최영은
	 * 설 명: 정보수정 data 가져오기
	 *
	 * 최초작성일: 2017.12.14
	 * 최종수정일: 2017.12.14
	 * ---
	 * Date              Auth        Desc
	*/
	public function getUserData_prc() {
        if(!parent::isAuth()) {
            $this->jlamp_js->replace('/user/login?returnURL='.urlencode("/user/mypage"), '로그인 후 이용해 주십시오');
        }

		$result = array (
			'returnCode' => 0,
			'returnMsg' => '',
			'data' => ''
		);
        $basicInfo = array();
        $medicalDept = array();
        $serviceProc = array();

		$userIdx = $this->jlamp_comm->xssInput('userIdx', 'get'); // 회원 일련번호

		$this->jlamp_common_mdl->DBConnect('JLAMPBiz');

        // 1. user 정보 가져오기
		// SQL 문
		$sql = "SELECT a.UserIdx, a.UserEmail, a.Name, a.ScanningCompanyIdx, a.ModelingCompanyIdx, a.PrintingCompanyIdx,
                       b.ComNumber, b.ComName, b.CEOName, b.CompanyIdx, b.Tel, b.IsHospital, b.IsSp, b.ServiceHospital, b.Characteristic, b.StatusCode,
                       (SELECT CodeName From Code WHere Code = b.RegionCode) AS RegionName
                  FROM User a Left Join Company b ON a.CompanyIdx = b.CompanyIdx
                WHERE UserIdx = ".$userIdx;
		try {
			// DB 설정
			$res = $this->jlamp_common_mdl->sqlRows($sql);
		} catch (Exception $e) {
			$result['returnCode'] = 'E001';
	        $result['returnMsg'] = $e->getMessage();
		}

        // 2. 진료과목 & 제공 서비스 항목 data 가져오기
        if (isset($res[0][0])) {
            $basicInfo = $res[0][0];
            $result['data']['basicInfo'] = $basicInfo;

            // SQL 변수
            $isArray = false; // 배열여부
            $column = 'ProcCode, SubProcCode'; // SELECT문
            $filter = array(); // 조건절

            // 조건절 설정
            $filter = array (
                array (
                    'CompanyIdx' => $basicInfo->CompanyIdx
                ),
                array (
                    'CompanyIdx' => '='
                )
            );
            try {
                // Table 설정
                $this->jlamp_common_mdl->setTable('CompanyService');
                // 쿼리 실행
                $resService = $this->jlamp_common_mdl->rows($isArray, 1, 0, $column, $filter, 'ProcCode ASC');
            } catch (Exception $e) {
                $result['returnCode'] = 'E002';
                $result['returnMsg'] = $e->getMessage();
            }
            $serviceProcCodeArr = array(
                'G0070001' => 'scanning',
                'G0070002' => 'modeling',
                'G0070003' => 'printing'
            );
            if (isset($resService['rows'][0])) {
                $resService = $resService['rows'][0];
                if(is_array($resService)){
                    foreach($resService as $k => $v){
                        if(array_key_exists($v->ProcCode, $serviceProcCodeArr)) {
                            $serviceProc[$serviceProcCodeArr[$v->ProcCode]][] = $v;
                        } else {
                            $medicalDept[$v->ProcCode][] = $v;
                        }
                    }
                    $result['data']['medicalDept'] = $medicalDept;
                    $result['data']['serviceProc'] = $serviceProc;
                }
            }
        } else {
            $result['returnCode'] = 'I001';
            $result['returnMsg'] = '일치하는 정보가 없습니다.';
        }

    	$this->jlamp_comm->jsonEncEnd($result);
	} // end of function getUserData_prc

	/**
	 * 메소드명: changePassword_prc
	 * 작성자: 최영은
	 * 설 명: 비밀번호 변경 Process
	 *
	 * @return string $result JSON Data
	 *
	 * 최초작성일: 2017.12.15
	 * 최종수정일: 2017.12.15
	 * ---
	 * Date              Auth        Desc
	*/
	public function changePassword_prc() {
        if(!parent::isAuth()) {
            $this->jlamp_js->replace('/user/login?returnURL='.urlencode("/user/mypage"), '로그인 후 이용해 주십시오');
        }

		$result = array (
			'returnCode' => 0,
			'returnMsg' => '',
			'data' => ''
		);

		$userIdx = $this->jlamp_comm->xssInput('userIdx', 'post'); // 회원 일련번호
		$passwd = $this->jlamp_comm->xssInput('passwd', 'post'); // 기존 비밀번호
		$newPasswd = $this->jlamp_comm->xssInput('newPasswd', 'post'); // 신규 비밀번호
		$newPasswdConfirm = $this->jlamp_comm->xssInput('newPasswdConfirm', 'post'); // 신규 비밀번호 확인

		// 유효성 검사
		// 비밀번호
		if (!$passwd) {
			$result['returnCode'] = 'I001';
			$result['returnMsg'] = '비밀번호를 입력해 주십시오';
			$this->jlamp_comm->jsonEncEnd($result);
		}

		// 비밀번호 8~15자 체크
		if (strlen($passwd) < 8 || strlen($passwd) > 15) {
			$result['returnCode'] = 'I002';
			$result['returnMsg'] = '비밀번호는 8~15자로 입력해 주십시오';
			$this->jlamp_comm->jsonEncEnd($result);
		}

		// 신규 비밀번호
		if (!$newPasswd) {
			$result['returnCode'] = 'I003';
			$result['returnMsg'] = '신규 비밀번호를 입력해 주십시오';
			$this->jlamp_comm->jsonEncEnd($result);
		}

		// 신규 비밀번호 8~15자 체크
		if (strlen($newPasswd) < 8 || strlen($newPasswd) > 15) {
			$result['returnCode'] = 'I004';
			$result['returnMsg'] = '신규 비밀번호는 8~15자로 입력해 주십시오';
			$this->jlamp_comm->jsonEncEnd($result);
		}

		// 신규 비밀번호 확인
		if (!$newPasswdConfirm) {
			$result['returnCode'] = 'I005';
			$result['returnMsg'] = '신규 비밀번호 확인을 입력해 주십시오';
			$this->jlamp_comm->jsonEncEnd($result);
		}

		// 비밀번호, 비밀번호 확인 일치여부
		if ($newPasswd != $newPasswdConfirm) {
			$result['returnCode'] = 'I006';
			$result['returnMsg'] = '신규 비밀번호가 일치하지 않습니다. 확인해주시기 바랍니다';
			$this->jlamp_comm->jsonEncEnd($result);
		}

		// SQL 변수
		$isArray = false; // 배열여부
		$column = 'UserIdx, Password'; // SELECT문
		// 조건절 설정
		$filter = array (
			array (
				'UserIdx' => $userIdx
			),
			array (
				'UserIdx' => '='
			)
		);

		try {
			// DB 설정
			$this->jlamp_common_mdl->DBConnect('JLAMPBiz');
			// Table 설정
			$this->jlamp_common_mdl->setTable('User');

			$res = $this->jlamp_common_mdl->row($isArray, $column, $filter);

			if ($res) {
				$passwdHash = $this->jlamp_comm->compareHash($passwd, $res->Password);

				if ($passwdHash[0]) {

					// 비밀번호 변경
					$data['Password'] = $this->jlamp_comm->makeHash($newPasswd);

					$updateRes = $this->jlamp_common_mdl->update('UserIdx', $userIdx, $data);

					if (!$updateRes) {
						$result['returnCode'] = 'E002';
	        			$result['returnMsg'] = '비밀번호 변경에 실패하였습니다.';
					}
				} else {
					$result['returnCode'] = 'I007';
					$result['returnMsg'] = '기존 비밀번호가 일치하지 않습니다.';
				}
			} else {
				$result['returnCode'] = 'I008';
				$result['returnMsg'] = '일치하는 정보가 없습니다.';
			}
		} catch (Exception $e) {
			$result['returnCode'] = 'E001';
	        $result['returnMsg'] = $e->getMessage();
			$this->jlamp_comm->jsonEncEnd($result);
		}

		$this->jlamp_comm->jsonEncEnd($result);
	} // end of function changePassword_prc


	/**
	 * 메소드명: withdrawal_prc
	 * 작성자: 최영은
	 * 설 명: 회원 탈퇴 Process
	 *
	 * @return string $result JSON Data
	 *
	 * 최초작성일: 2017.12.15
	 * 최종수정일: 2017.12.15
	 * ---
	 * Date              Auth        Desc
	*/
	public function withdrawal_prc() {
        if(!parent::isAuth()) {
            $this->jlamp_js->replace('/user/login?returnURL='.urlencode("/user/mypage"), '로그인 후 이용해 주십시오');
        }
		$result = array (
			'returnCode' => 0,
			'returnMsg' => '',
			'data' => ''
		);

		$userIdx = $this->jlamp_comm->xssInput('userIdx', 'post'); // 회원 일련번호

		// 유효성 검사
		if ($userIdx) {
            // DB 설정
            $this->jlamp_common_mdl->DBConnect('JLAMPBiz');
            // Table 설정
            $this->jlamp_common_mdl->setTable('User');

            $data = array();
            $data['StatusCode'] = 'G0020004'; // 탈퇴
            $data['Name'] = '';
            $data['Password'] = '';
            $data['Tel'] = '';
            $data['ScanningCompanyIdx'] = '';
            $data['ModelingCompanyIdx'] = '';
            $data['PrintingCompanyIdx'] = '';
            $data['WithdrawalDT'] = time(); // 탈퇴일시
            try {
				$res = $this->jlamp_common_mdl->update('UserIdx', $userIdx, $data);
            } catch (Exception $e) {
                $result['returnCode'] = 'E001';
                $result['returnMsg'] = $e->getMessage();
                $this->jlamp_comm->jsonEncEnd($result);
            }

            if (!$res) {
                $result['returnCode'] = 'I001';
                $result['returnMsg'] = '회원 탈퇴에 실패하였습니다.';
            }
        }
		$this->jlamp_comm->jsonEncEnd($result);
	} // end of function withdrawal_prc

	/**
	 * 메소드명: findPassword
	 * 작성자: 최영은
	 * 설 명: 비밀번호 찾기 화면
	 *
	 * 최초작성일: 2017.12.15
	 * 최종수정일: 2017.12.15
	 * ---
	 * Date              Auth        Desc
	*/
	public function findPassword() {
		$cssPart = array(
			'<link rel="stylesheet" href="/css/user/find_password.css">'
		);
		$jsPart = array(
			'<script src="/js/user/find_password.js"></script>'
		);

		$this->jlamp_comm->setCSS($cssPart);
		$this->jlamp_comm->setJS($jsPart);

    	$this->jlamp_tp->assign(array(
			'menuSelection' => 'service'
		));

    	$this->jlamp_tp->setURLType(array(
    		'tpl' => 'find_password.html'
	    ));
	} // end of function findPassword

	/**
	 * 메소드명: findPassword_prc
	 * 작성자: 최영은
	 * 설 명: 비밀번호 찾기 Process
	 *
	 * @return string $result JSON Data
	 *
	 * 최초작성일: 2017.12.15
	 * 최종수정일: 2017.12.15
	 * ---
	 * Date              Auth        Desc
	*/
	public function findPassword_prc() {
		$result = array (
			'returnCode' => 0,
			'returnMsg' => '',
			'data' => ''
		);

		$email = $this->jlamp_comm->xssInput('email', 'post'); // 이메일
 		$userName = $this->jlamp_comm->xssInput('userName', 'post'); // 성명
		$password = '';	// 임시 비밀번호
		$res = '';

		// 유효성 검사
		// 이메일
		if (!$email) {
			$result['returnCode'] = 'I001';
			$result['returnMsg'] = '이메일을 입력해 주십시오';
			$this->jlamp_comm->jsonEncEnd($result);
		}
		// 이름
		if (!$userName) {
			$result['returnCode'] = 'I002';
			$result['returnMsg'] = '이름을 입력해 주십시오';
			$this->jlamp_comm->jsonEncEnd($result);
		}

		// SQL 변수
		$isArray = false; // 배열여부
		$column = 'UserIdx, UserEmail, Name'; // SELECT문
		// 조건절 설정
		$filter = array (
			array (
				'UserEmail' => trim($email),
				'Name' => trim($userName)
			),
			array (
				'UserEmail' => '=',
				'Name' => '='
			)
		);
		try {
			// DB 설정
			$this->jlamp_common_mdl->DBConnect('JLAMPBiz');
			// Table 설정
			$this->jlamp_common_mdl->setTable('User');

			$res = $this->jlamp_common_mdl->row($isArray, $column, $filter);
		} catch (Exception $e) {
			$result['returnCode'] = 'E001';
	        $result['returnMsg'] = $e->getMessage();
			$this->jlamp_comm->jsonEncEnd($result);
		}

		if ($res) {
			// 임시 비밀번호 발급
			$randStr = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
			for ($i=0; $i < 11; $i++) {
				$password .= substr($randStr, rand(0, strlen($randStr)-1), 1);
			}

			// 비밀번호 설정
			$data = array (
				'Password' => $this->jlamp_comm->makeHash($password)
			);

			try {
				// 비밀번호 변경
				$passRes = $this->jlamp_common_mdl->update("UserIdx", $res->UserIdx, $data);

				if ($passRes) {
					// 메일 제목
					$subject = '[ KOMED3D ] 비밀번호 초기화 안내';

					// 메일 내용
                    $content = '
                    <div style="width:798px; border:1px solid #efeff0;">
                        <div><img src="'.BASE_URL.'Image/mail.png" alt="" style="padding:0; margin:0;"></div>
                        <div style="padding:10px;">
                        <div style="height:200px; padding-top: 30px;"><span style="font-weight:bold;">'.$res->Name.'</span>님의 비밀번호는
                            <span style="color:#d95b44;font-weight:bold;:12pt;">'.$password.'</span>로 초기화 되었습니다.<br><br>
                         </div>
                        </div>
                        <div style="background-color:#efeff0; padding:10px 0; text-align:center; :11px; color:#898989;"><a href="'.BASE_URL.'">'.BASE_URL.'</a></div>
                    </div>';

					// 메일 전송
					$this->jlamp_mail->setFrom(NO_REPLY, "KOMED3D 관리자");
					$this->jlamp_mail->setSubject($subject);
					$this->jlamp_mail->setMailBody($content, true);
					$this->jlamp_mail->addTo($res->UserEmail);
					$send = $this->jlamp_mail->send();
					// 발송 결과 체크
					if( !$send ) {
						$result['returnCode'] = 'I004';
						$result['returnMsg'] = '발송실패 되었습니다.';
					}
				} else {
					$result['returnCode'] = 'E003';
					$result['returnMsg'] = "비밀번호 초기화 도중 에러가 발생하였습니다.";
				}
			} catch (Exception $e) {
				$result['returnCode'] = 'E002';
				$result['returnMsg'] = $e->getMessage();
			}
		} else {
			$result['returnCode'] = 'I003';
			$result['returnMsg'] = '일치하는 정보가 없습니다.';
		}

		$this->jlamp_comm->jsonEncEnd($result);
	} // end of function findPassword_prc

	/**
	 * 메소드명: serviceStatus
	 * 작성자: 최영은
	 * 설 명: 서비스 진행 현황 화면
	 *
	 * 최초작성일: 2017.12.21
	 * 최종수정일: 2017.12.21
	 * ---
	 * Date              Auth        Desc
	*/
	public function serviceStatus() {
		$cssPart = array(
			'<link rel="stylesheet" href="/css/user/service_status.css">'
		);
		$jsPart = array(
			'<script src="/js/user/service_status.js"></script>'
		);

		$this->jlamp_comm->setCSS($cssPart);
		$this->jlamp_comm->setJS($jsPart);

		$page = $this->jlamp_comm->xssInput('page', 'get');
		$tp = $this->jlamp_comm->xssInput('tp', 'get');
		$serviceCode = $this->jlamp_comm->xssInput('servicecode', 'get');

        if(!parent::isAuth() && $tp != 'view' && !$serviceCode) {
            $this->jlamp_js->replace('/user/login?returnURL='.urlencode("/user/servicestatus"), '로그인 후 이용해 주십시오');
        }

        if(!$page) $page = 1;
        $userName = parent::getCookie('UserName');

        $this->jlamp_tp->assign(array(
			'userName' => $userName,
            'hdPage' => $page,
            'serviceCode' => $serviceCode,
			'menuSelection' => 'service'
		));

    	$this->jlamp_tp->setURLType(array(
    		'tpl' => 'service_status.html'
	    ));
	} // end of function serviceStatus


	/**
	 * 메소드명: getServiceApplyList_prc
	 * 작성자: 최영은
	 * 설 명: 신청된 서비스 리스트 가져오기 process
	 *
	 * @return string $result JSON Data
	 *
	 * 최초작성일: 2017.12.20
	 * 최종수정일: 2017.12.20
	 * ---
	 * Date              Auth        Desc
	*/
	public function getServiceApplyList_prc() {
		$result = array (
			'returnCode' => 0,
			'returnMsg' => '',
			'data' => ''
		);
        $listHtml = '';
		$statusListHtml = '';
        $paginationHtml = '';
        $userName = '';
        $userIdx = parent::getCookie("UserIdx");
		$currPage = $this->jlamp_comm->xssInput('page', 'get');
		$searchCol = $this->jlamp_comm->xssInput('searchCol', 'get');
		$searchStr = $this->jlamp_comm->xssInput('searchStr', 'get');
		$serviceCode = trim($this->jlamp_comm->xssInput('serviceCode', 'get'));

        // limit 설정
		if ($currPage < 1) $currPage = 1;
		$rowCount = 5;
        $offset =  ($currPage-1) * $rowCount;
        // 검색어
        $addWhere = $searchCol && $searchStr ? " And ".$searchCol." Like '%".$searchStr."%' " : "";
        // 로그인 회원 일련번호
        if($userIdx)  $addWhere .= " AND a.UserIdx =". $userIdx;
        // 서비스 코드
        if($serviceCode) $addWhere .= " AND ServiceCD = '".$serviceCode."'";

        // SQL 문
        $sql = "SELECT a.ServiceApplyIdx, a.ServiceCD, a.StatusCode, a.RegDT,
                       (SELECT CodeName FROM `Code` WHERE `Code`.`Code` = a.StatusCode ) AS StatusName,
                       (SELECT CodeName FROM `Code` WHERE `Code`.`Code` = a.PayStatusCode ) AS PayStatusName,
                       (SELECT Name FROM User WHERE User.UserIdx = a.UserIdx ) AS UserName,
					   a.PatientName, a.Birthday, a.Gender, a.AssiPrice, a.PayStatusCode,
					   a.DelivNum
                  FROM ServiceApply a
                 WHERE a.isComplete=0 ". $addWhere . "
                 ORDER BY a.ServiceCD DESC ";

        $completeSql = "SELECT a.ServiceApplyIdx, a.ServiceCD, a.StatusCode, a.RegDT,
                       (SELECT CodeName FROM `Code` WHERE `Code`.`Code` = a.StatusCode ) AS StatusName,
                       (SELECT Name FROM User WHERE User.UserIdx = a.UserIdx ) AS UserName,
					   a.PatientName, a.Birthday, a.Gender,
					   a.DelivNum
                  FROM ServiceApply a
                 WHERE a.isComplete=1 ". $addWhere . "
                 ORDER BY a.ServiceCD DESC ";

		$completeTF=false;
		try {
			// DB 설정
			$this->jlamp_common_mdl->DBConnect('JLAMPBiz');
			$res = $this->jlamp_common_mdl->sqlRows($sql);
			$completeRes = $this->jlamp_common_mdl->sqlRows($completeSql);
		} catch (Exception $e) {
			$result['returnCode'] = 'E001';
	        $result['returnMsg'] = $e->getMessage();
		}

        if(isset($res[0]) && is_array($res[0]) && count($res[0]) > 0) {
            foreach($res[0] as $k => $v) {
				if($k === 0) {
                    $result['data']['selData'] = $v;
                    $userName = $v->UserName;
                }
				if ($v->Gender == 'm') {
					$res[0][$k]->genderName = '남자';
				} elseif ($v->Gender == 'f') {
					$res[0][$k]->genderName = '여자';
				}
                // 신청일자
                $res[0][$k]->insertDate = date("Y-m-d",$v->RegDT);/* date('Y', $v->RegDT)."-".date('n', $v->RegDT)."-".date('j', $v->RegDT).""*/
			}

        } else {
			/*
            $listHtml = '
            <tr>
                <td colspan="7">서비스 신청 내역이 없습니다.</td>
            </tr>';
			$statusListHtml .= '
						<li>
							<div style="text-align:center;padding-top:20px">서비스 신청 내역이 없습니다.</div>
						</li>';
			*/
			if(!parent::isAuth() && isset($completeRes[0]) && is_array($completeRes[0]) && count($completeRes[0]) > 0) {
				$completeTF = true;
			}
        }
		$statusListHtml .= '</ul>';

        $result['data']['userName'] = $userName;
        $result['data']['listHtml'] = $listHtml;
		$result['data']['statusListHtml'] = $statusListHtml;
        $result['data']['paginationHtml'] = $paginationHtml;
		$result['data']['statusList'] = $res[0];
		$result['data']['completeTF'] = $completeTF;
		$result['data']['receivedServiceCode'] = $serviceCode;

        $this->jlamp_comm->jsonEncEnd($result);

	} // end of function getServiceApplyList_prc



	/**
	 * 메소드명: getServiceApplyDetail_prc
	 * 작성자: 최영은
	 * 설 명: 신청된 서비스 리스트 가져오기 process
	 *
	 * @return string $result JSON Data
	 *
	 * 최초작성일: 2017.12.20
	 * 최종수정일: 2017.12.20
	 * ---
	 * Date              Auth        Desc
	*/
	public function getServiceApplyDetail_prc() {
		$result = array (
			'returnCode' => 0,
			'returnMsg' => '',
			'data' => ''
		);
		$serviceApplyIdx = $this->jlamp_comm->xssInput('serviceApplyIdx', 'get');
        $userIdx = parent::getCookie("UserIdx");
		$procCode = '';
		$subProcCode = '';
		$sPCompanyIdx = '';
		$serviceCode = trim($this->jlamp_comm->xssInput('receivedServiceCode', 'get'));

        // 검색어
        $addWhere = "b.ServiceApplyIdx= ".$serviceApplyIdx;
        // 로그인 회원 일련번호
        if($userIdx)  $addWhere .= " AND b.UserIdx =". $userIdx;
        // 서비스 코드
        //if($serviceCode) $addWhere .= " AND b.ServiceCD = '".$serviceCode."'";


        // SQL 문
		/*$detailSql = "SELECT  b.ProcCode, b.SubProcCode, b.SPCompanyIdx, b.WorkStartDate, b.WorkEndDate,
					   (SELECT ComName FROM Company WHERE Company.CompanyIdx = b.SPCompanyIdx ) AS ComName,
					   (SELECT CodeName FROM `Code` WHERE `Code`.`Code` = b.ProcCode ) AS ProcName,
					   (SELECT CodeName FROM `Code` WHERE `Code`.`Code` = b.SubProcCode ) AS SubProcName,
					   (SELECT ProcOptName FROM ServiceProcOpt WHERE ServiceProcOpt.ProcOptIdx = b.ProcOptIdx ) AS ProcOptName,
					   (SELECT ComName FROM Company AS Company WHERE Company.CompanyIdx = b.SPCompanyIdx ) AS ComName,
					   (SELECT Tel FROM Company AS Company WHERE Company.CompanyIdx = b.SPCompanyIdx ) AS ComTel,
					   c.ServiceApplyFileIdx, c.RealFilename
				  FROM ServiceApplyDetail b LEFT OUTER JOIN ServiceApplyFile c
				  ON b.ServiceApplyIdx= c.ServiceApplyIdx AND b.userIdx=c.userIdx AND b.ProcCode=c.ProcCode AND b.SubProcCode=c.SubProcCode AND b.SPCompanyIdx=c.SPCompanyIdx
				  WHERE b.ServiceApplyIdx= ".$serviceApplyIdx." AND b.userIdx=".$userIdx." Order by b.ProcCode, b.SubProcCode, b.SPCompanyIdx";
				  */
        // SQL 문
		$detailSql = "SELECT  b.ProcCode, b.SubProcCode, b.SPCompanyIdx, b.WorkStartDate, b.WorkEndDate,
					   (SELECT ComName FROM Company WHERE Company.CompanyIdx = b.SPCompanyIdx ) AS ComName,
					   (SELECT CodeName FROM `Code` WHERE `Code`.`Code` = b.ProcCode ) AS ProcName,
					   (SELECT CodeName FROM `Code` WHERE `Code`.`Code` = b.SubProcCode ) AS SubProcName,
					   (SELECT ProcOptName FROM ServiceProcOpt WHERE ServiceProcOpt.ProcOptIdx = b.ProcOptIdx ) AS ProcOptName,
					   (SELECT ComName FROM Company AS Company WHERE Company.CompanyIdx = b.SPCompanyIdx ) AS ComName,
					   (SELECT Tel FROM Company AS Company WHERE Company.CompanyIdx = b.SPCompanyIdx ) AS ComTel,
					   (SELECT ServiceApplyFileIdx FROM ServiceApplyFile WHERE  b.ServiceApplyIdx= ServiceApplyIdx AND b.userIdx=userIdx AND b.ProcCode=ProcCode AND b.SubProcCode=SubProcCode AND b.SPCompanyIdx=SPCompanyIdx Order By RegDT DESC Limit 1) AS ServiceApplyFileIdx,
					   (SELECT RealFilename FROM ServiceApplyFile WHERE  b.ServiceApplyIdx= ServiceApplyIdx AND b.userIdx=userIdx AND b.ProcCode=ProcCode AND b.SubProcCode=SubProcCode AND b.SPCompanyIdx=SPCompanyIdx Order By RegDT DESC Limit 1) AS RealFilename
				  FROM ServiceApplyDetail b
				  WHERE ".$addWhere." Order by b.ProcCode, b.SubProcCode, b.SPCompanyIdx";

		try {
			// DB 설정
			$this->jlamp_common_mdl->DBConnect('JLAMPBiz');
			$res = $this->jlamp_common_mdl->sqlRows($detailSql);
		} catch (Exception $e) {
			$result['returnCode'] = 'E001';
	        $result['returnMsg'] = $e->getMessage();
		}

        if(isset($res[0]) && is_array($res[0]) && count($res[0]) > 0) {
            foreach($res[0] as $k => $v) {
				if ($v->RealFilename != '' || $v->RealFilename != null) {
					$res[0][$k]->viewerHtml = '<input type="button" class="button grid_btn_black button-md" style="padding: 0px 8px 0px 3px;font-size:14px;height: 33px;line-height: 33px" value="STL뷰어" onclick="goSTLViewer();"><!--onclick="goApplyDetail(\''.$res[0][$k]->ServiceApplyFileIdx.'\',\''.$res[0][$k]->ServiceApplyFileIdx.'\')"-->';
				} else {
					$res[0][$k]->viewerHtml = '';
				}
				/*
				if ($procCode == $v->ProcCode && $subProcCode == $v->SubProcCode && $sPCompanyIdx == $v->SPCompanyIdx) {
					$res[0][$k]->ProcName = '';
					$res[0][$k]->SubProcName = '';
					$res[0][$k]->ComName = '';
					$res[0][$k]->ComTel = '';
					$res[0][$k]->WorkStartDate = '';
					$res[0][$k]->WorkEndDate = '';
				}
				$procCode = $v->ProcCode;
				$subProcCode = $v->SubProcCode;
				$sPCompanyIdx = $v->SPCompanyIdx;
				*/
			}
        } else {
        }

		$result['data']['statusDetail'] = $res[0];
        $this->jlamp_comm->jsonEncEnd($result);

	} // end of function getServiceApplyDetail_prc

	/**
	 * 메소드명: companyPopup
	 * 작성자: 김영탁
	 * 설 명: 업체 팝업 화면
	 *
	 * 최초작성일: 2018.01.24
	 * 최종수정일: 2018.01.24
	 * ---
	 * Date              Auth        Desc
	*/
	public function companyPopup() {
		$returnURL = $this->jlamp_comm->xssInput('returnURL', 'get'); // 권한이 없는 이전 페이지 경로
		$companyIdx = $this->jlamp_comm->xssInput('companyIdx', 'get'); // 회사 코드

		$cssPart = array(
			'<link rel="stylesheet" href="/css/user/company_popup.css">'
		);
		$jsPart = array(
			'<script src="/js/user/company_popup.js"></script>'
		);

		$this->jlamp_comm->setCSS($cssPart);
		$this->jlamp_comm->setJS($jsPart);

    	$this->jlamp_tp->assign(array(
			'returnURL' => urldecode($returnURL),
			'menuSelection' => 'service',
			'companyIdx' => $companyIdx
		));

    	$this->jlamp_tp->setURLType(array(
    		'tpl' => 'company_popup.html'
	    ));
	} // end of function companyPopup


	/**
	 * 메소드명: getCompanyPopupDetail_prc
	 * 작성자: 김영탁
	 * 설 명: 업체 팝업 상세 가져오기 process
	 *
	 * @return string $result JSON Data
	 *
	 * 최초작성일: 2018.01.24
	 * 최종수정일: 2018.01.24
	 * ---
	 * Date              Auth        Desc
	*/
	public function getCompanyPopupDetail_prc() {
		$result = array (
			'returnCode' => 0,
			'returnMsg' => '',
			'data' => ''
		);
		$companyIdx = $this->jlamp_comm->xssInput('companyIdx', 'get');

        // SQL 문
		$sql = "Select c.CompanyIdx, c.ComName, c.CEOName, c.Tel, c.ServiceHospital, c.Characteristic, c.StatusCode, 
			(Select CodeName FROM Code Where c.RegionCode = Code AND CodeGroup='G011' Limit 1) AS Region,
			(Select CodeName FROM Code Where c.StatusCode = Code AND CodeGroup='G003' Limit 1) AS Status
			From Company c  Where c.CompanyIdx=".$companyIdx;

		$detailSql = " Select cs.CompanyIdx, cs.ProcCode,
		(Select CodeName FROM Code Where cs.SubProcCode = Code AND CodeGroup='G008' Limit 1) AS SubProc
		From CompanyService cs Where cs.CompanyIdx=".$companyIdx;

		try {
			// DB 설정
			$this->jlamp_common_mdl->DBConnect('JLAMPBiz');
			$res = $this->jlamp_common_mdl->sqlRows($sql);
			$detailRes = $this->jlamp_common_mdl->sqlRows($detailSql);
		} catch (Exception $e) {
			$result['returnCode'] = 'E001';
	        $result['returnMsg'] = $e->getMessage();
		}

		$result['data']['company'] = $res[0];
		$result['data']['companyDetail'] = $detailRes[0];
        $this->jlamp_comm->jsonEncEnd($result);

	} // end of function getCompanyPopupDetail_prc

	/**
	 * 메소드명: getCompanyStatusList_prc
	 * 작성자: 김영탁
	 * 설 명: 업체선택 리스트 가져오기 Process
	 *
	 * @return string $result JSON Data
	 *
	 * 최초작성일: 2017.12.11
	 * 최종수정일: 2017.12.11
	 * ---
	 * Date              Auth        Desc
	*/
	public function getCompanyStatusList_prc() {
		$result = array (
			'returnCode' => 0,
			'returnMsg' => '',
			'data' => ''
		);
        $procCompanyList = array();
		// SQL 문
		$sql = "SELECT cd.Code, cd.CodeName
		FROM Code cd Where cd.CodeGroup ='G003' AND cd.UseYN =1 Order By cd.`Order`";
		try {
			// DB 설정
			$this->jlamp_common_mdl->DBConnect('JLAMPBiz');
			$res = $this->jlamp_common_mdl->sqlRows($sql);
            if(isset($res[0]) && is_array($res[0])){
            }
		} catch (Exception $e) {
			$result['returnCode'] = 'E001';
	        $result['returnMsg'] = $e->getMessage();
		}
		$result['data']['companyStatus'] = $res;
		$this->jlamp_comm->jsonEncEnd($result);

	} // end of function getCompanyStatusList_prc

	/**
	 * 메소드명: getPayment_prc
	 * 작성자: 최영은
	 * 설 명: 회원 탈퇴 Process
	 *
	 * @return string $result JSON Data
	 *
	 * 최초작성일: 2017.12.15
	 * 최종수정일: 2017.12.15
	 * ---
	 * Date              Auth        Desc
	*/
	public function getPayment_prc() {
		$result = array (
			'returnCode' => 0,
			'returnMsg' => '',
			'data' => ''
		);

        //$userIdx = parent::getCookie("UserIdx");
		$serviceApplyIdx = $this->jlamp_comm->xssInput('serviceApplyIdx', 'post'); // 서비스 신청 일련변호

		// 유효성 검사
		//if ($userIdx) {
            // DB 설정
            $this->jlamp_common_mdl->DBConnect('JLAMPBiz');
            // Table 설정
            $this->jlamp_common_mdl->setTable('ServiceApply');

            $data = array();
            $data['PayStatusCode'] = 'G0220002'; // 결재
            try {
				$res = $this->jlamp_common_mdl->update('ServiceApplyIdx', $serviceApplyIdx, $data);
            } catch (Exception $e) {
                $result['returnCode'] = 'E001';
                $result['returnMsg'] = $e->getMessage();
                $this->jlamp_comm->jsonEncEnd($result);
            }

            if (!$res) {
                $result['returnCode'] = 'I001';
                $result['returnMsg'] = '회원 탈퇴에 실패하였습니다.';
            }
        //}
		$this->jlamp_comm->jsonEncEnd($result);
	} // end of function getPayment_prc
}