<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * 클래스명: Apply
 * 작성자: 김영탁
 * 클래스설명: 서비스 신청
 *
 * 최초작성일: 2017.12.18
 * 최종수정일: 2017.12.18
 * ---
 * Date         Auth        Desc
 */
class Apply extends JLAMP_Controller {

	public function index() {
//        if(!parent::isAuth()) {
//            $this->jlamp_js->replace('/user/login', '로그인 후 이용해 주십시오');
//        }

		$this->applyIntro();
	}

	/**
	 * 메소드명: applyIntro
	 * 작성자: 김영탁
	 * 설 명: 서비스 소개 화면
	 *
	 * 최초작성일: 2017.12.18
	 * 최종수정일: 2017.12.18
	 * ---
	 * Date              Auth        Desc
	*/
	public function applyIntro() {
        if(!parent::isAuth()) {
            $this->jlamp_js->replace('/user/login', '로그인 후 이용해 주십시오');
        }

        $deptCode = $this->jlamp_comm->xssInput('cd', 'get');

		$cssPart = array(
			'<link rel="stylesheet" href="/css/software/apply.css">'
		);
		$jsPart = array(
			'<script src="/js/software/apply.js"></script>'
		);

		$this->jlamp_comm->setCSS($cssPart);
		$this->jlamp_comm->setJS($jsPart);

    	$this->jlamp_tp->assign(array(
			'deptCode' => $deptCode,
			'menuSelection' => 'software'
		));

    	$this->jlamp_tp->setURLType(array(
    		'tpl' => 'apply.html'
	    ));
	} // end of function applyIntro

	/**
	 * 메소드명: getRegion_prc
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
	public function getRegion_prc() {
		$result = array (
			'returnCode' => 0,
			'returnMsg' => '',
			'data' => ''
		);
		$companyIdx = $this->jlamp_comm->xssInput('companyIdx', 'get');
        $procCompanyList = array();
		// SQL 문
		$sql = "SELECT a.CompanyIdx,
				(SELECT CodeName From Code WHere Code = a.RegionCode) AS RegionName
                  FROM Company a 
                WHERE a.CompanyIdx=".$companyIdx;
		try {
			// DB 설정
			$this->jlamp_common_mdl->DBConnect('JLAMPBiz');
			$res = $this->jlamp_common_mdl->sqlRow($sql);
			$result['data']['res'] = $res;
		} catch (Exception $e) {
			$result['returnCode'] = 'E001';
	        $result['returnMsg'] = $e->getMessage();
		}
		$this->jlamp_comm->jsonEncEnd($result);

	} // end of function getRegion_prc
	/**
	 * 메소드명: saveData_prc
	 * 작성자: 최영은
	 * 설 명: 업체 별 서비스 신청 data 저장 Process
	 *
	 * @return string $result JSON Data
	 *
	 * 최초작성일: 2017.12.19
	 * 최종수정일: 2017.12.19
	 * ---
	 * Date              Auth        Desc
	*/
	public function saveData_prc() {
		if(!parent::isAuth()) {
			$this->jlamp_js->replace('/user/login', '로그인 후 이용해 주십시오');
		}
		$result = array (
			'returnCode' => 0,
			'returnMsg' => '',
			'data' => ''
		);
        // 저장 data 정리
		$userIdx = parent::getCookie('UserIdx');
        $statusCode = $this->jlamp_comm->xssInput('status_code', 'post');
        $swTypeCode = $this->jlamp_comm->xssInput('sw_type_code', 'post');
        $serviceTypeCode = $this->jlamp_comm->xssInput('service_type_code', 'post');
        $priceCode = $this->jlamp_comm->xssInput('price_code', 'post');
        $osCode = $this->jlamp_comm->xssInput('os_code', 'post');
        $systemId = $this->jlamp_comm->xssInput('system_id', 'post');
        $licenseStartDate = $this->jlamp_comm->xssInput('license_start_date', 'post');
        $licenseEndDate = $this->jlamp_comm->xssInput('license_end_date', 'post');
        $licenseFile = $this->jlamp_comm->xssInput('license_file', 'post');
		
        $saveData = array();
        $saveData['UserIdx'] = $userIdx;
        $saveData['StatusCode'] = $statusCode;
        $saveData['SWTypeCode'] = $swTypeCode;
        $saveData['ServiceTypeCode'] = $serviceTypeCode;
        $saveData['PriceCode'] = $priceCode;
        $saveData['OSCode'] = $osCode;
        $saveData['SystemId'] = $systemId;
        $saveData['LicenseStartDate'] = $licenseStartDate;
        $saveData['LicenseEndDate'] = $licenseEndDate;
        $saveData['LicenseFile'] = $licenseFile;
        $saveData['RedDT'] =  time();
		
        // DB 설정
        $this->jlamp_common_mdl->DBConnect('JLAMPBiz');

        // 트랜잭션 Start
        $this->jlamp_common_mdl->tBegin();
        try {
            // 서비스 신청 DB insert
            $this->jlamp_common_mdl->setTable('SWService');
            $res = $this->jlamp_common_mdl->insert($saveData);
        } catch (Exception $e) {
            $result['returnCode'] = 'E002';
            $result['returnMsg'] = $e->getMessage();
            $this->jlamp_comm->jsonEncEnd($result);
        }
        // 트랜잭션 완료
        $this->jlamp_common_mdl->tComplete();

		$this->jlamp_comm->jsonEncEnd($result);

	}
}