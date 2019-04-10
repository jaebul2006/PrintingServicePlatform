<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * 클래스명: Apply
 * 작성자: 최영은
 * 클래스설명: 서비스 신청
 *
 * 최초작성일: 2017.12.18
 * 최종수정일: 2017.12.18
 * ---
 * Date         Auth        Desc
 */
class Apply extends JLAMP_Controller {

	public function index() {
		$this->applyIntro();
	}

	/**
	 * 메소드명: applyIntro
	 * 작성자: 최영은
	 * 설 명: 서비스 소개 화면
	 *
	 * 최초작성일: 2017.12.18
	 * 최종수정일: 2017.12.18
	 * ---
	 * Date              Auth        Desc
	*/
	public function applyIntro() {
        $deptCode = $this->jlamp_comm->xssInput('cd', 'get');

		$cssPart = array(
			'<link rel="stylesheet" href="/css/service/apply.css">'
		);
		$jsPart = array(
			'<script src="/js/service/apply.js"></script>'
		);

		$this->jlamp_comm->setCSS($cssPart);
		$this->jlamp_comm->setJS($jsPart);

    	$this->jlamp_tp->assign(array(
			'deptCode' => $deptCode,
			'menuSelection' => 'service'
		));

    	$this->jlamp_tp->setURLType(array(
    		'tpl' => 'apply.html'
	    ));
	} // end of function applyIntro

	/**
	 * 메소드명: applyList
	 * 작성자: 최영은
	 * 설 명: 서비스 신청 현황 조회 화면
	 *
	 * 최초작성일: 2018.01.08
	 * 최종수정일: 2018.01.08
	 * ---
	 * Date              Auth        Desc
	*/
	public function applyList() {
		$cssPart = array(
			'<link rel="stylesheet" href="/css/service/apply_list.css">'
		);
		$jsPart = array(
			'<script src="/js/service/apply_list.js"></script>'
		);

        $deptCode = $this->jlamp_comm->xssInput('cd', 'get');
        $page = $this->jlamp_comm->xssInput('page', 'get');
		$userName = parent::getCookie('UserName');

		$this->jlamp_comm->setCSS($cssPart);
		$this->jlamp_comm->setJS($jsPart);

    	$this->jlamp_tp->assign(array(
			'deptCode' => $deptCode,
			'page' => $page,
			'userName' => $userName,
			'menuSelection' => 'service'
		));

    	$this->jlamp_tp->setURLType(array(
    		'tpl' => 'apply_list.html'
	    ));
	} // end of function applyList

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
        if(!parent::isAuth()) {
            $this->jlamp_js->replace('/user/login', '로그인 후 이용해 주십시오');
        }

		$result = array (
			'returnCode' => 0,
			'returnMsg' => '',
			'data' => ''
		);
        $listHtml = '';
        $paginationHtml = '';
        $addWhere = '';
        $userIdx = parent::getCookie("UserIdx");
		$currPage = $this->jlamp_comm->xssInput('page', 'get');
		$patientName = $this->jlamp_comm->xssInput('patientName', 'get');
		$birthday = $this->jlamp_comm->xssInput('birthday', 'get');
		$gender = $this->jlamp_comm->xssInput('gender', 'get');
		$statusCode = $this->jlamp_comm->xssInput('statusCode', 'get');

        // limit 설정
		if ($currPage < 1) $currPage = 1;
		$rowCount = 5;
        $offset =  ($currPage-1) * $rowCount;
        // 검색어
        // 1. 환자명
        if($patientName) $addWhere .= " AND a.PatientName Like ('%".$patientName."%')";
        // 2. 생년월일
        if($birthday) $addWhere .= " AND a.Birthday = '".$birthday."'";
        // 3. 성별
        if($gender) $addWhere.= " AND a.Gender = '".$gender."'";
        // 4. 진행상태
        if($statusCode) $addWhere.= " AND a.StatusCode = '".$statusCode."'";


        // SQL 문
        $sql = "SELECT a.ServiceApplyIdx, a.ServiceCD, a.StatusCode, a.RegDT, a.MedDeptCode,
                       (SELECT CodeName FROM `Code` WHERE `Code`.`Code` = a.StatusCode ) AS StatusName,
                       (SELECT CodeName FROM `Code` WHERE `Code`.`Code` = a.PayStatusCode ) AS PayStatusName,
                       (SELECT Name FROM User WHERE User.UserIdx = a.UserIdx ) AS UserName,
					   a.PatientName, a.Birthday, a.Gender, a.AssiPrice,
					   a.DelivNum, a.DelivCompany,
                       (SELECT CodeName FROM `Code` WHERE `Code`.`Code` = a.DelivCompany ) AS DelivCompanyName
                  FROM ServiceApply a
                 WHERE a.UserIdx =". $userIdx. $addWhere . "
                 ORDER BY a.ServiceCD DESC ";

		try {
			// DB 설정
			$this->jlamp_common_mdl->DBConnect('JLAMPBiz');
			$res = $this->jlamp_common_mdl->sqlRows($sql);
		} catch (Exception $e) {
			$result['returnCode'] = 'E001';
	        $result['returnMsg'] = $e->getMessage();
		}

        if(isset($res[0]) && count($res[0]) > 0) {
            foreach($res[0] as $k => $v){
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
            $listHtml = '
            <tr>
                <td colspan="11">서비스 신청 내역이 없습니다.</td>
            </tr>';
        }
        $result['data']['listHtml'] = $listHtml;
        $result['data']['paginationHtml'] = $paginationHtml;
		$result['data']['statusList'] = $res[0];

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

        // 검색어
        $addWhere = "b.ServiceApplyIdx= ".$serviceApplyIdx;
        // 로그인 회원 일련번호
        if($userIdx)  $addWhere .= " AND b.UserIdx =". $userIdx;


        // SQL 문
		$detailSql = "SELECT  b.ServiceApplyIdx, b.ProcCode, b.SubProcCode, b.SPCompanyIdx, b.WorkStartDate, b.WorkEndDate,
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

			}
        } else {
        }

		$result['data']['statusDetail'] = $res[0];
        $this->jlamp_comm->jsonEncEnd($result);

	} // end of function getServiceApplyDetail_prc

	/**
	 * 메소드명: applyStep1
	 * 작성자: 최영은
	 * 설 명: 서비스 신청 > stip1 화면
	 *
	 * 최초작성일: 2017.12.18
	 * 최종수정일: 2017.12.26
	 * ---
	 * Date             Auth        Desc
	*/
	public function applyStep1() {
        $deptCode = $this->jlamp_comm->xssInput('cd', 'get');
		if(!parent::isAuth()) {
			//$this->jlamp_js->replace('/user/login?returnURL='.urlencode('/service/apply?cd='.$deptCode), '로그인 후 이용해 주십시오');
            $this->jlamp_js->replace('/user/login', '로그인 후 이용해 주십시오');
		}
		$cssPart = array(
			'<link rel="stylesheet" href="/css/service/apply_step1.css">'
		);
		$jsPart = array(
			'<script src="/js/service/apply_step1.js?v=20180109001"></script>'
		);

        // 진료과목 명 가져오기
		// SQL 변수
		$isArray = false; // 배열여부
		$column = 'CodeName'; // SELECT문
		$filter = array(); // 조건절

		// 조건절 설정
		$filter = array (
			array (
                'CodeGroup' => 'G005',
				'Code' => $deptCode
			),
			array (
				'CodeGroup' => '=',
				'Code' => '='
			)
		);
		try {
			// DB 설정
			$this->jlamp_common_mdl->DBConnect('JLAMPBiz');
			// Table 설정
			$this->jlamp_common_mdl->setTable('Code');

			$res = $this->jlamp_common_mdl->row($isArray, $column, $filter);
		} catch (Exception $e) {
			$result['returnCode'] = 'E001';
	        $result['returnMsg'] = $e->getMessage();
		}
        $deptName = isset($res->CodeName) ? $res->CodeName : '';

        // 서비스 신청 idx
        $idx = $this->jlamp_comm->xssInput('idx', 'get');

        // work type
        $workType = $this->jlamp_comm->xssInput('tp', 'get');

        if($workType != 'rollback'){
            // 신청 1단계 관련 쿠키 삭제
            parent::delCookie('ApplyStep1');
        }
        // step1 data
        $step1Datas = $this->jlamp_comm->xssInput('step1_datas', 'post');

        $this->jlamp_comm->setCSS($cssPart);
		$this->jlamp_comm->setJS($jsPart);

    	$this->jlamp_tp->assign(array(
			'deptCode' => $deptCode,
			'deptName' => $deptName,
			'serviceApplyIdx' => $idx,
			'workType' => $workType,
			'step1Datas' => $step1Datas,
			'menuSelection' => 'service'
		));

    	$this->jlamp_tp->setURLType(array(
    		'tpl' => 'apply_step1.html'
	    ));
	} // end of function applyStep1

	/**
	 * 메소드명: getPatientData_prc
	 * 작성자: 최영은
	 * 설 명: 환자 기본 정보 data 가져오기 Process
	 *
	 * @return string $result JSON Data
	 *
	 * 최초작성일: 2017.12.19
	 * 최종수정일: 2017.12.19
	 * ---
	 * Date              Auth        Desc
	*/
	public function getPatientData_prc() {
		if(!parent::isAuth()) {
			$this->jlamp_js->replace('/user/login', '로그인 후 이용해 주십시오');
		}

		$result = array (
			'returnCode' => 0,
			'returnMsg' => '',
			'data' => ''
		);
        $workType = $this->jlamp_comm->xssInput('workType', 'get');
        $idx = $this->jlamp_comm->xssInput('idx', 'get');

        if($workType == 'rollback') {
            $data = parent::getCookie('ApplyStep1');
            $data = json_decode($data);
            $result['data']['patientData'] = $data;
        }
        if($workType == 'exist' && (int)$idx > 0) {

            // SQL 문
            $sql = "SELECT *
                     FROM ServiceApply
                    WHERE ServiceApplyIdx =".$idx;
            try {
                // DB 설정
                $this->jlamp_common_mdl->DBConnect('JLAMPBiz');
                $res = $this->jlamp_common_mdl->sqlRow($sql);
            } catch (Exception $e) {
                $result['returnCode'] = 'E001';
                $result['returnMsg'] = $e->getMessage();
            }
            if($res){
                $data = array();
                $data['patient_name'] = $res->PatientName;
                $data['gender'] = $res->Gender;
                $data['birthday'] = $res->Birthday;
                $data['region_code'] = $res->RegionCode;
                $tel = explode('-', $res->Tel);
                $data['tel1'] = $tel[0];
                $data['tel2'] = $tel[1];
                $data['tel3'] = $tel[2];
                $email = explode('@', $res->Email);
                $data['email'] = $email[0];
                $data['email_address'] = $email[1];
                $data['post'] = $res->Post;
                $data['addr'] = $res->Addr;
                $data['addr_detail'] = $res->AddrDetail;
                $data['prescription_date'] = $res->PrescriptionDate;
                $data['height'] = $res->Height;
                $data['weight'] = $res->Weight;
                $data['assi_type'] = $res->AssiTypeCode;
                //$data['assi_sub_type'] = $res->AssiSubTypeCode;
                $data['lr_type'] = $res->LRType;
                $data['patient_type'] = $res->PatientTypeCode;
                $data['design_type'] = $res->DesignType;

                $result['data']['patientData'] = $data;
            }
        }

		$this->jlamp_comm->jsonEncEnd($result);

	} // end of function getPatientData_prc


	/**
	 * 메소드명: getServiceCompanyList_prc
	 * 작성자: 최영은
	 * 설 명: 업체선택 리스트 가져오기 Process
	 *
	 * @return string $result JSON Data
	 *
	 * 최초작성일: 2017.12.18
	 * 최종수정일: 2017.12.18
	 * ---
	 * Date              Auth        Desc
	*/
	public function getServiceCompanyList_prc() {
		if(!parent::isAuth()) {
			$this->jlamp_js->replace('/user/login', '로그인 후 이용해 주십시오');
		}

		$result = array (
			'returnCode' => 0,
			'returnMsg' => '',
			'data' => ''
		);
        $scanningList = array();
        $modelingList = array();
        $printingList = array();
        $selCompany = array(
            'ScanningCompanyIdx' => 0,
            'ModelingCompanyIdx' => 0,
            'PrintingCompanyIdx' => 0
        );
		$userIdx = parent::getCookie('UserIdx');


		// SQL 문
		$sql = "SELECT a.CompanyIdx, a.ProcCode, b.ComName
                  FROM CompanyService a Left Outer Join Company b ON a.CompanyIdx = b.CompanyIdx
                WHERE a.ProcCode in ('G0070001', 'G0070002', 'G0070003') AND b.StatusCode = 'G0030002'
                GROUP BY a.ProcCode, a.CompanyIdx";
		try {
			// DB 설정
			$this->jlamp_common_mdl->DBConnect('JLAMPBiz');
			$res = $this->jlamp_common_mdl->sqlRows($sql);
		} catch (Exception $e) {
			$result['returnCode'] = 'E001';
	        $result['returnMsg'] = $e->getMessage();
		}

        if(isset($res[0]) && is_array($res[0])) {

            // SQL 변수
            $isArray = false; // 배열여부
            $column = 'ScanningCompanyIdx, ModelingCompanyIdx, PrintingCompanyIdx'; // SELECT문
            $filter = array(); // 조건절

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
                // Table 설정
                $this->jlamp_common_mdl->setTable('User');
                // 쿼리 실행
                $resUser = $this->jlamp_common_mdl->row($isArray, $column, $filter);
                if($resUser) $selCompany = $resUser;
            } catch (Exception $e) {
                $result['returnCode'] = 'E002';
                $result['returnMsg'] = $e->getMessage();
            }
            foreach($res[0] as $k => $v){
                switch($v->ProcCode){
                    case "G0070001":
                        $scanningList[] = $v;
                        break;

                    case "G0070002":
                        $modelingList[] = $v;
                        break;

                    case "G0070003":
                        $printingList[] = $v;
                        break;
                }
            }
        }
        $result['data']['scanningList'] = $scanningList;
        $result['data']['modelingList'] = $modelingList;
        $result['data']['printingList'] = $printingList;
        $result['data']['selCompany'] = $selCompany;

		$this->jlamp_comm->jsonEncEnd($result);

	} // end of function getServiceCompanyList_prc

	/**
	 * 메소드명: getServiceList_prc
	 * 작성자: 최영은
	 * 설 명: 업체별 서비스 선택 리스트 가져오기 Process
	 *
	 * @return string $result JSON Data
	 *
	 * 최초작성일: 2017.12.19
	 * 최종수정일: 2017.12.19
	 * ---
	 * Date              Auth        Desc
	*/
	public function getServiceList_prc() {
		if(!parent::isAuth()) {
			$this->jlamp_js->replace('/user/login', '로그인 후 이용해 주십시오');
		}

		$result = array (
			'returnCode' => 0,
			'returnMsg' => '',
			'data' => ''
		);
        $serviceList = array();
        $companyIdx = $this->jlamp_comm->xssInput('companyIdx', 'get');
        $procCode = $this->jlamp_comm->xssInput('procCode', 'get');

		// SQL 문
		$sql = "SELECT a.CompanyIdx, a.SubProcCode,
                       (SELECT CodeName From Code c WHERE c.Code = a.SubProcCode) AS SubProcMame
                  FROM CompanyService a Left Outer Join Company b ON a.CompanyIdx = b.CompanyIdx
                WHERE b.StatusCode = 'G0030002' AND a.ProcCode = '".$procCode."' AND a.CompanyIdx = ".$companyIdx;
		try {
			// DB 설정
			$this->jlamp_common_mdl->DBConnect('JLAMPBiz');
			$res = $this->jlamp_common_mdl->sqlRows($sql);

            if(isset($res[0]) && is_array($res[0])) {
                $serviceList = $res[0];
            }
		} catch (Exception $e) {
			$result['returnCode'] = 'E001';
	        $result['returnMsg'] = $e->getMessage();
		}

        $result['data']['serviceList'] = $serviceList;

		$this->jlamp_comm->jsonEncEnd($result);

	} // end of function getServiceList_prc


	/**
	 * 메소드명: applyStep2
	 * 작성자: 최영은
	 * 설 명: 서비스 신청 > step2 화면
	 *
	 * 최초작성일: 2017.12.19
	 * 최종수정일: 2017.12.26
	 * ---
	 * Date             Auth        Desc
	 * 2017.12.26       김희태     로그인 안한 사용자 처리
	*/
	public function applyStep2() {
		if(!parent::isAuth()) {
			$this->jlamp_js->replace('/user/login', '로그인 후 이용해 주십시오');
		}

		$cssPart = array(
			'<link rel="stylesheet" href="/css/service/apply_step2.css">'
		);
		$jsPart = array(
			'<script src="/js/service/apply_step2.js?v=20180108002"></script>'
		);
        $deptCode = $this->jlamp_comm->xssInput('dept_code', 'post');
        $scanningCompany = $this->jlamp_comm->xssInput('sp_scanning_company', 'post');
        $scanningService = $this->jlamp_comm->xssInput('sp_scanning_service', 'post');
        $modelingCompany = $this->jlamp_comm->xssInput('sp_modeling_company', 'post');
        $modelingService = $this->jlamp_comm->xssInput('sp_modeling_service', 'post');
        $printingCompany = $this->jlamp_comm->xssInput('sp_printing_company', 'post');
        $printingService = $this->jlamp_comm->xssInput('sp_printing_service', 'post');

        // 이전단계 data 삭제하고 새로운 data로 set
        parent::delCookie('ApplyStep1');
        parent::setCookie('ApplyStep1', json_encode($_POST), 0);

		$this->jlamp_comm->setCSS($cssPart);
		$this->jlamp_comm->setJS($jsPart);

    	$this->jlamp_tp->assign(array(
            'deptCode' => $deptCode,
            'scanningCompany' => $scanningCompany,
            'scanningService' => $scanningService,
            'modelingCompany' => $modelingCompany,
            'modelingService' => $modelingService,
            'printingCompany' => $printingCompany,
            'printingService' => $printingService,
			'menuSelection' => 'service'
		));

    	$this->jlamp_tp->setURLType(array(
    		'tpl' => 'apply_step2.html'
	    ));
	} // end of function applyStep2

	/**
	 * 메소드명: getServiceOpt_prc
	 * 작성자: 최영은
	 * 설 명: 업체 별 서비스 옵션 리스트 가져오기 Process
	 *
	 * @return string $result JSON Data
	 *
	 * 최초작성일: 2017.12.19
	 * 최종수정일: 2017.12.19
	 * ---
	 * Date              Auth        Desc
	*/
	public function getServiceOpt_prc() {
		if(!parent::isAuth()) {
			$this->jlamp_js->replace('/user/login', '로그인 후 이용해 주십시오');
		}

		$result = array (
			'returnCode' => 0,
			'returnMsg' => '',
			'data' => ''
		);
        $optList = array();
        $procCode = $this->jlamp_comm->xssInput('procCode', 'get');
        // $subProcCode = $this->jlamp_comm->xssInput('subProcCode', 'get');

        // SQL 변수
        $isArray = false; // 배열여부
        $column = 'ProcOptIdx, ProcCode, ProcOptName, Thickness, Color, `Desc`, SavePath, SaveFilename,
                   (SELECT CodeName FROM Code WHERE Code.Code = ServiceProcOpt.ProcCode) AS ProcCodeName'; // SELECT문
        $filter = array(); // 조건절

        // 조건절 설정
        $filter = array (
            array (
                "ProcCode" => "ProcCode in ('G0070001','G0070002','G0070003') "
            ),
            array (
                "ProcCode" => ""
            )
        );

        try {
            // Table 설정
            $this->jlamp_common_mdl->setTable('ServiceProcOpt');
            // 쿼리 실행
            $res = $this->jlamp_common_mdl->rows($isArray, 1, 0, $column, $filter );
        } catch (Exception $e) {
            $result['returnCode'] = 'E002';
            $result['returnMsg'] = $e->getMessage();
        }
        if(isset($res['rows'])) {
            //$optList = $res['rows'][0];
            foreach($res['rows'][0] as $k => $v) {
                $optList[$v->ProcCode]['procCode'] = $v->ProcCode;
                $optList[$v->ProcCode]['codeName'] = strtolower($v->ProcCodeName);
                $optList[$v->ProcCode]['procOpt'][] = $v;
            }
        }
        $result['data']['optList'] = $optList;
		$this->jlamp_comm->jsonEncEnd($result);

	} // end of function getServiceOpt_prc

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
        $insertID = 0;

        // step1 data 정리
        $step1Data = parent::getCookie('ApplyStep1');
        $step1Data = json_decode($step1Data);
        // 저장 data 정리
		$userIdx = parent::getCookie('UserIdx');
        $deptCode = $this->jlamp_comm->xssInput('dept_code', 'post');
        $scanningCompany = $this->jlamp_comm->xssInput('scanning_company', 'post');
        $scanningService = $this->jlamp_comm->xssInput('scanning_service', 'post');
        $scanningOpt = $this->jlamp_comm->xssInput('scanning_opt', 'post');
        $scanningDesc = $this->jlamp_comm->xssInput('scanning_desc', 'post');
        $modelingCompany = $this->jlamp_comm->xssInput('modeling_company', 'post');
        $modelingService = $this->jlamp_comm->xssInput('modeling_service', 'post');
        $modelingOpt = $this->jlamp_comm->xssInput('modeling_opt', 'post');
        $modelingDesc = $this->jlamp_comm->xssInput('modeling_desc', 'post');
        $printingCompany = $this->jlamp_comm->xssInput('printing_company', 'post');
        $printingService = $this->jlamp_comm->xssInput('printing_service', 'post');
        $printingOpt = $this->jlamp_comm->xssInput('printing_opt', 'post');
        $printingDesc = $this->jlamp_comm->xssInput('printing_desc', 'post');
        $detail = $this->jlamp_comm->xssInput('detail', 'post');

        $dataArr = array();
        $statusCode = 'G0090001';
        $isScanningDetail = true;
        $isModelingDetail = true;
        $isPrintingDetail = true;
        if($printingService) {
            $statusCode = 'G0090007'; // 프린팅 신청( 모델링 신청 안하고 프린팅만 신청)
            $dataArr['printing']['procCode'] = 'G0070003';
            $dataArr['printing']['procName'] = 'printing';
            $dataArr['printing']['spCompany'] = $printingCompany;
            $dataArr['printing']['subProcCode'] = $printingService;
            //$dataArr['printing']['option'] = $printingOpt;
            $dataArr['printing']['desc'] = $printingDesc;
            $dataArr['printing']['detail'] = isset($detail['printing']) ? $detail['printing'] : array();
            if($_FILES['modeling_files']['name'][0]) {
                $dataArr['printing']['filesProcCode'] = 'G0070002';
                $dataArr['printing']['filesSubProcCode'] = $modelingService ? $modelingService : '';
                $dataArr['printing']['filesSPCompanyIdx'] =  $modelingService ? $modelingCompany : '';
                $dataArr['printing']['files'] = $_FILES['modeling_files'];
            }
        }
        if($modelingService) {
            $statusCode = 'G0090004'; // 모델링 신청(스캐닝 신청 안하고 모델링 부터 신청)
            $dataArr['modeling']['procCode'] = 'G0070002';
            $dataArr['modeling']['procName'] = 'modeling';
            $dataArr['modeling']['spCompany'] = $modelingCompany;
            $dataArr['modeling']['subProcCode'] = $modelingService;
            //$dataArr['modeling']['option'] = $modelingOpt;
            $dataArr['modeling']['desc'] = $modelingDesc;
            $dataArr['modeling']['detail'] = isset($detail['modeling']) ? $detail['modeling'] : array();
            if($_FILES['scanning_files']['name'][0]) {
                $dataArr['modeling']['filesProcCode'] = 'G0070001';
                $dataArr['modeling']['filesSubProcCode'] = $scanningService ? $scanningService : '';
                $dataArr['modeling']['filesSPCompanyIdx'] =  $scanningService ? $scanningCompany : '';
                $dataArr['modeling']['files'] = $_FILES['scanning_files'];
            }
        }
        if($scanningService) {
            $statusCode = 'G0090001'; // 스캐닝 신청
            $dataArr['scanning']['procCode'] = 'G0070001';
            $dataArr['scanning']['procName'] = 'scanning';
            $dataArr['scanning']['spCompany'] = $scanningCompany;
            $dataArr['scanning']['subProcCode'] = $scanningService;
            //$dataArr['scanning']['option'] = $scanningOpt;
            $dataArr['scanning']['desc'] = $scanningDesc;
            $dataArr['scanning']['detail'] = isset($detail['scanning']) ? $detail['scanning'] : array();
        }

        // 유효성 검사
        // 회원 일련번호 확인
        if(!$userIdx) {
			$result['returnCode'] = 'I001';
	        $result['returnMsg'] = '올바른 접속 경로가 아닙니다.';
		    $this->jlamp_comm->jsonEncEnd($result);
        }
        // 세부 서비스 선택 여부
        if(!$dataArr) {
			$result['returnCode'] = 'I002';
	        $result['returnMsg'] = '선택된 세부 서비스 항목이 없습니다.';
		    $this->jlamp_comm->jsonEncEnd($result);
        }
        // 옵션 설정 확인
        if(isset($dataArr['scanning']['detail'])) {
            if(count($dataArr['scanning']['detail']) < 2) {
                $result['returnCode'] = 'I003';
                $result['returnMsg'] = 'SCANNING 세부 옵션을  모두 선택해 주십시오.';
                $this->jlamp_comm->jsonEncEnd($result);
            }
        }
        if(isset($dataArr['modeling']['detail'])) {
            if(count($dataArr['modeling']['detail']) < 3) {
                $result['returnCode'] = 'I004';
                $result['returnMsg'] = 'MODELING 세부 옵션을  모두 선택해 주십시오.';
                $this->jlamp_comm->jsonEncEnd($result);
            }
        }
        if(isset($dataArr['printing']['detail'])) {
            if(count($dataArr['printing']['detail']) < 2) {
                $result['returnCode'] = 'I005';
                $result['returnMsg'] = 'PRINTING 세부 옵션을  모두 선택해 주십시오.';
                $this->jlamp_comm->jsonEncEnd($result);
            }
        }

        // 모델링 신청 > 스캐닝 파일 첨부 확인
        if(!isset($dataArr['scanning']) && isset($dataArr['modeling'])) {
            if(!isset($dataArr['modeling']['files'])) {
                // 유효성 검사
                $result['returnCode'] = 'I006';
                $result['returnMsg'] = 'Scanning File을 첨부해주십시오.';
                $this->jlamp_comm->jsonEncEnd($result);
            }
        }
        // 프린팅 신청 > 모델링 파일 첨부 확인
        if(!isset($dataArr['modeling']) && isset($dataArr['printing'])) {
            if(!isset($dataArr['printing']['files'])) {
                // 유효성 검사
                $result['returnCode'] = 'I007';
                $result['returnMsg'] = 'Modeling File을 첨부해주십시오.';
                $this->jlamp_comm->jsonEncEnd($result);
            }
        }

        // DB 설정
        $this->jlamp_common_mdl->DBConnect('JLAMPBiz');

        // 트랜잭션 Start
        $this->jlamp_common_mdl->tBegin();

        // 서비스 신청 저장
        $time = time();
        $data = array();
        $data['UserIdx'] = $userIdx;
        $data['StatusCode'] = $statusCode;
        $data['MedDeptCode'] = $deptCode;
        $data['ServiceCD'] = 'SC'.$time;
        $data['PreStatusCode'] = '';
        $data['IsComplete'] = 0;
        $data['PatientName'] = $step1Data->patient_name;
        $data['Gender'] = $step1Data->gender;
        $data['Birthday'] = $step1Data->birthday;
        $data['RegionCode'] = $step1Data->region_code;
        $tel = $step1Data->tel1.'-'. $step1Data->tel2.'-'. $step1Data->tel3;
        $data['Tel'] = $tel;
        $email = $step1Data->email.'@'. $step1Data->email_address;
        $data['Email'] = $email;
        $data['Post'] = $step1Data->post;
        $data['Addr'] = $step1Data->addr;
        $data['AddrDetail'] = $step1Data->addr_detail;
        $data['PrescriptionDate'] = $step1Data->prescription_date;
        $data['Height'] = $step1Data->height;
        $data['Weight'] = $step1Data->weight;
        $data['AssiTypeCode'] = $step1Data->assi_type;
        $data['LRType'] = $step1Data->lr_type;
        if($step1Data->assi_type == 'G0130002' && $step1Data->lr_type ='l') {
            $data['FTJR'] = $step1Data->ftjr_left;
            $data['FSJR'] = $step1Data->fsjr_left;
        } else if($step1Data->assi_type == 'G0130002' && $step1Data->lr_type ='r') {
            $data['FTJR'] = $step1Data->ftjr_right;
            $data['FSJR'] = $step1Data->fsjr_right;
        }
        $data['ThicknessCode'] = $step1Data->thickness_code;
        $data['MaterialCode'] = $step1Data->material_code;
        $data['ColorCode'] = $step1Data->color_code;
        $data['AssiPrice'] = $step1Data->assi_price;
        $data['EquipmentNum'] = $step1Data->equipment_num;
        $data['PayStatusCode'] = $step1Data->pay_status_code;
        $data['PatientTypeCode'] = $step1Data->patient_type;
        $data['DesignType'] = $step1Data->design_type;
        $data['RegDT'] = $time;
        try {
            // 서비스 신청 DB insert
            $this->jlamp_common_mdl->setTable('ServiceApply');
            $res = $this->jlamp_common_mdl->insert($data);
        } catch (Exception $e) {
            $result['returnCode'] = 'E002';
            $result['returnMsg'] = $e->getMessage();
            $this->jlamp_comm->jsonEncEnd($result);
        }

        // 서비스 신청 세부 내용 저장
        if($res > 0) {
            $insertID = $res;

            $dataArr = array_reverse($dataArr);
            foreach($dataArr as $k => $v){
                $data = array();
                $data['ServiceApplyIdx'] = $insertID;
                $data['UserIdx'] = $userIdx;
                $data['SPCompanyIdx'] = $v['spCompany'];
                $data['ProcCode'] = $v['procCode'];
                $data['SubProcCode'] = $v['subProcCode'];
                // 작업 가능 여부 설정
                // 스캐닝 신청
                if($statusCode == 'G0090001' && $v['procCode'] == 'G0070001') {
                    $data['IsWorkStatus'] = 1;
                }
                // 모델링 신청
                if($statusCode == 'G0090004' && $v['procCode'] == 'G0070002') {
                    $data['IsWorkStatus'] = 1;

                }
                // 프린팅 신청
                if($statusCode == 'G0090007' && $v['procCode'] == 'G0070003') {
                    $data['IsWorkStatus'] = 1;
                }

                //$data['ProcOptIdx'] = $v['option'];
                // 세부 옵션 설정
                if(count($v['detail']) > 0){
                    foreach($v['detail'] as $kk => $vv) {
                        $data[$kk] = $vv;
                    }
                }
                $data['Desc'] = $v['desc'];
                $data['RegDT'] = time();

                try {
                    // 서비스 세부내용 DB insert
                    $this->jlamp_common_mdl->setTable('ServiceApplyDetail');
                    $this->jlamp_common_mdl->insert($data);

                    // 첨부파일 업로드
                    $uploadData = array();
                    if(isset($v['files'])){
                        // 저장 가능한 파일 확장자 설정
                        $this->jlamp_upload->setAllowType(array('stl')); // stl파일만 저장
                        // $this->jlamp_upload->setAllowType(array('jpg', 'gif', 'png')); // 임시 test용

                        // 저장 가능한 파일 크기 설정(20MB 이하)
                        $this->jlamp_upload->setUploadFileSize(20480); // KB단위로 설정

                        // Table 설정
                        $this->jlamp_common_mdl->setTable('ServiceApplyFile');

                        $dateFolder = Date('Ymd'); // 현재날짜
                        foreach($v['files']['name'] as $kk =>$vv){
                            if($vv){
                                $this->jlamp_upload->isUniqueFilename(true);

                                $_FILES[$k.'_files_'.$kk]['name'] = $vv;
                                $_FILES[$k.'_files_'.$kk]['type'] = $v['files']['type'][$kk];
                                $_FILES[$k.'_files_'.$kk]['tmp_name'] = $v['files']['tmp_name'][$kk];
                                $_FILES[$k.'_files_'.$kk]['error'] = $v['files']['error'][$kk];
                                $_FILES[$k.'_files_'.$kk]['size'] = $v['files']['size'][$kk];

                                $uploadData = $this->jlamp_upload->doUpload($k.'_files_'.$kk, 'service/apply', true, false, 137, 176);
                                if ($uploadData['upload_data']) {
                                    $uploadData = $uploadData['upload_data'];
                                    $data = array();
                                    $data['ServiceApplyIdx'] = $insertID;
                                    $data['UserIdx'] = $userIdx;
                                    $data['ProcCode'] = $v['filesProcCode']; // 첨부한 파일의 서비스 항목 코드
                                    $data['SubProcCode'] = $v['filesSubProcCode']; // 첨부한 파일의 세부 서비스 항목 코드
                                    $data['SPCompanyIdx'] = $v['filesSPCompanyIdx']; // 첨부한 파일의 서비스 제공 업체 일련번호
                                    $filePath =  explode('public_html', $uploadData['file_path']);
                                    $data['SavePath'] = $filePath[1];
                                    $data['SaveFilename'] = $uploadData['file_name'];
                                    $data['RealFilename'] = $vv;
                                    $data['Mime'] = $uploadData['file_type'];
                                    $data['FileSize'] = $uploadData['file_size'] * 1024 * 1024;
                                    $data['RegDT'] = time();
                                    // 서비스 신청 첨부 파일 DB insert
                                    $resfile = $this->jlamp_common_mdl->insert($data);
                                }
                            }
                        }
                    }
                } catch (Exception $e) {
                    $result['returnCode'] = 'E003';
                    $result['returnMsg'] = strip_tags($e->getMessage());
                    $this->jlamp_comm->jsonEncEnd($result);
                }
            }
        }
        $result['data']['insertID'] = $insertID;

        // 트랜잭션 완료
        $this->jlamp_common_mdl->tComplete();

		$this->jlamp_comm->jsonEncEnd($result);

	} // end of function saveData_prc

	/**
	 * 메소드명: applyStep3
	 * 작성자: 최영은
	 * 설 명: 서비스 신청 > step3 (신청완료:신청내역 확인) 화면
	 *
	 * 최초작성일: 2017.12.19
	 * 최종수정일: 2017.12.26
	 * ---
	 * Date             Auth        Desc
	 * 2017.12.26       김희태     로그인 안한 사용자 처리
	*/
	public function applyDetail() {
		/*
		if(!parent::isAuth()) {
			$this->jlamp_js->replace('/user/login', '로그인 후 이용해 주십시오');
		}
		*/
		$cssPart = array(
			'<link rel="stylesheet" href="/css/service/apply_detail.css">'
		);
		$jsPart = array(
			'<script src="/js/service/apply_detail.js?v=20180110001"></script>'
		);

        $page = $this->jlamp_comm->xssInput('page', 'get'); // 서비스 신청 일련번호
        $serviceApplyIdx = $this->jlamp_comm->xssInput('idx', 'get'); // 서비스 신청 일련번호
        $deptCode = $this->jlamp_comm->xssInput('cd', 'get'); // 진료과목 코드
        $listType = $this->jlamp_comm->xssInput('tp', 'get'); // 상세조회 페이지 접속한 리스트 페이지

		$this->jlamp_comm->setCSS($cssPart);
		$this->jlamp_comm->setJS($jsPart);

    	$this->jlamp_tp->assign(array(
            'page' => $page,
            'serviceApplyIdx' => $serviceApplyIdx,
            'deptCode' => $deptCode,
            'listType' => $listType,
			'menuSelection' => 'service'
		));

    	$this->jlamp_tp->setURLType(array(
    		'tpl' => 'apply_detail.html'
	    ));
	} // end of function applyDetail

	/**
	 * 메소드명: getServiceCompleteData_prc
	 * 작성자: 최영은
	 * 설 명: 업체 별 서비스 신청 완료 상세 내역 가져오기 Process
	 *
	 * @return string $result JSON Data
	 *
	 * 최초작성일: 2017.12.19
	 * 최종수정일: 2017.12.19
	 * ---
	 * Date              Auth        Desc
	*/
	public function getServiceCompleteData_prc() {
        /*
		if(!parent::isAuth()) {
			$this->jlamp_js->replace('/user/login', '로그인 후 이용해 주십시오');
		}
		*/
		$result = array (
			'returnCode' => 0,
			'returnMsg' => '',
			'data' => ''
		);

        $serviceApplyList = array();
        $optDetailList = array(
            'G0070001' => '-',
            'G0070002' => '-',
            'G0070003' => '-'
        );
        $idx = $this->jlamp_comm->xssInput('idx', 'get');


        // DB 설정
        $this->jlamp_common_mdl->DBConnect('JLAMPBiz');

        $sql = "
        SELECT
                a.ServiceCD,
                a.PatientName,
                a.Tel,
                a.Post,
                a.Addr,
                a.AddrDetail,
                a.Gender,
                a.Birthday,
                a.Email,
                (SELECT CodeName FROM Code WHERE Code = a.RegionCode) AS RegionCode,
                a.Height,
                a.Weight,
                a.PrescriptionDate,
                (SELECT CodeName FROM Code WHERE Code = a.PatientTypeCode) AS PatientTypeCode,
                a.AssiTypeCode,
                (SELECT CodeName FROM Code WHERE Code = a.AssiTypeCode) AS AssiTypeName,
                a.LRType,
                a.DesignType,
                (SELECT `Desc` FROM Code WHERE Code = a.DesignType) AS ExistImg,
                a.RegDT,
                b.ProcCode,
                (SELECT CodeName FROM Code WHERE Code = b.ProcCode) AS ProcName,
                (SELECT CodeName FROM Code WHERE Code = b.SubProcCode) AS SubProcName,
                (SELECT ComName FROM Company WHERE CompanyIdx = b.SPCompanyIdx) AS SPCompanyName,
                (SELECT CodeName FROM Code WHERE Code = b.ScanAreaCode) AS ScanAreaCode,
                (SELECT CodeName FROM Code WHERE Code = b.MeshSizeCode) AS MeshSizeCode,
                (SELECT CodeName FROM Code WHERE Code = b.SplitDistanceCode) AS SplitDistanceCode,
                (SELECT CodeName FROM Code WHERE Code = b.KnotCode) AS KnotCode,
                (SELECT CodeName FROM Code WHERE Code = b.PatternCode) AS PatternCode,
                (SELECT CodeName FROM Code WHERE Code = b.PrinterCode) AS PrinterCode,
                (SELECT CodeName FROM Code WHERE Code = b.ASCode) AS ASCode,
                (SELECT CodeName FROM Code WHERE Code = a.ThicknessCode) AS ThicknessCode,
                (SELECT CodeName FROM Code WHERE Code = a.MaterialCode) AS MaterialCode,
                (SELECT CodeName FROM Code WHERE Code = a.ColorCode) AS ColorCode,
                (SELECT CodeName FROM Code WHERE Code = a.PayStatusCode) AS PayStatusCode,
				a.FTJR,
				a.FSJR,
				a.AssiPrice,
				a.EquipmentNum,
                b.`Desc`,
                b.ReceiptDesc
        FROM ServiceApply a LEFT OUTER JOIN ServiceApplyDetail b
                                 ON a.ServiceApplyIdx =  b.ServiceApplyIdx
        WHERE a.ServiceApplyIdx = ".$idx."
        ORDER BY b.ProcCode ASC";

		try {
			$res = $this->jlamp_common_mdl->sqlRows($sql);
		} catch (Exception $e) {
			$result['returnCode'] = 'E001';
	        $result['returnMsg'] = $e->getMessage();
		}

        if(isset($res[0]) && is_array($res[0])) {
            $serviceApplyList = $res[0];

            // SQL 문
            $sql = "SELECT a.PCode, a.Code, a.CodeName, a.`Desc`
                    FROM Code a
                        WHERE CodeGroup = 'G015'";
            $resOpt = $this->jlamp_common_mdl->sqlRows($sql);
            if(isset($resOpt[0]) && is_array($resOpt[0])) {
                foreach($resOpt[0] as $k => $v){
                    $optList[$v->PCode][$v->Desc] = $v->CodeName;
                }
                $temp = array();
                foreach($res[0] as $k => $v){
                    if(array_key_exists($v->ProcCode, $optList)) {
                        $val = (array)$v;
                        foreach($optList[$v->ProcCode] as $kk => $vv){
                            $temp[$v->ProcCode][] = '<li> <span style="font-size:12px;vertical-align:top;">＊</span> '.$vv.' - '. $val[$kk].'</li>';
                        }
                    }
                    $optDetailList[$v->ProcCode] = '<ul>'.implode(' ', $temp[$v->ProcCode]).'</ul>';
                }
            }
        }

        $result['data']['serviceApplyList'] = $serviceApplyList;
        $result['data']['optDetailList'] = $optDetailList;

		$this->jlamp_comm->jsonEncEnd($result);
	} // end of function getServiceCompleteData_prc
}