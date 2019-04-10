<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * 클래스명: Receipt
 * 작성자: 최영은
 * 클래스설명: 서비스 신청 접수
 *
 * 최초작성일: 2017.12.20
 * 최종수정일: 2017.12.20
 * ---
 * Date         Auth        Desc
 */
class Receipt extends JLAMP_Controller {

	public function index() {
		if(!parent::isAuth()) {
			$this->jlamp_js->replace('/user/login', '로그인 후 이용해 주십시오');
		}

		$this->receiptList();
	}

	/**
	 * 메소드명: receiptList
	 * 작성자: 최영은
	 * 설 명: 서비스 소개 화면
	 *
	 * 최초작성일: 2017.12.18
	 * 최종수정일: 2017.12.18
	 * ---
	 * Date              Auth        Desc
	*/
	public function receiptList() {
		$cssPart = array(
			'<link rel="stylesheet" href="/css/service/receipt_list.css">'
		);
		$jsPart = array(
			'<script src="/js/service/receipt_list.js"></script>'
		);

		$this->jlamp_comm->setCSS($cssPart);
		$this->jlamp_comm->setJS($jsPart);

		$page = $this->jlamp_comm->xssInput('page', 'get');
        if(!$page) $page = 1;
        $comName = parent::getCookie('ComName');

    	$this->jlamp_tp->assign(array(
			'comName' => $comName,
            'page' => $page,
			'menuSelection' => 'service'
		));

    	$this->jlamp_tp->setURLType(array(
    		'tpl' => 'receipt_list.html'
	    ));
	} // end of function receiptList

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
		$statusListHtml = '<ul id="accordion" >
						<li>
					<div>
						<span class="service_apply_list_title" style="width:15%;min-width:15%;max-width:15%;">서비스 코드</span>
						<span class="service_apply_list_title" style="width:15%;min-width:15%;max-width:15%;">서비스</span>
						<span class="service_apply_list_title" style="width:15%;min-width:15%;max-width:15%;">신청 일자</span>
						<span class="service_apply_list_title" style="width:15%;min-width:15%;max-width:15%;">송장 번호</span>
						<span class="service_apply_list_title" style="width:15%;min-width:15%;max-width:15%;">진행 상태</span>
						<span class="service_apply_list_title" style="width:15%;min-width:15%;max-width:15%;">상세보기</span>
						<span class="service_apply_list_title" style="width:5%;min-width:5%;max-width:5%;"></span>
					</div>
				</li>';
        $paginationHtml = '';
        $userName = '';
        //$userIdx = parent::getCookie("UserIdx");

        $companyIdx = parent::getCookie("CompanyIdx");



		$currPage = $this->jlamp_comm->xssInput('page', 'get');
		$searchCol = $this->jlamp_comm->xssInput('searchCol', 'get');
		$searchStr = $this->jlamp_comm->xssInput('searchStr', 'get');
		//$serviceCode = trim($this->jlamp_comm->xssInput('serviceCode', 'get'));

        // limit 설정
		if ($currPage < 1) $currPage = 1;
		$rowCount = 5;
        $offset =  ($currPage-1) * $rowCount;
        // 검색어
        $addWhere = $searchCol && $searchStr ? " And ".$searchCol." Like '%".$searchStr."%' " : "";
        // 로그인 회원 일련번호
        //if($userIdx)  $addWhere .= " AND a.UserIdx =". $userIdx;
        // 서비스 코드
        //if($serviceCode) $addWhere .= " AND ServiceCD = '".$serviceCode."'";

        // SQL 문
        $sql = "SELECT DISTINCT a.ServiceApplyIdx, a.ServiceCD, a.StatusCode, a.RegDT,
                       (SELECT CodeName FROM `Code` WHERE `Code`.`Code` = a.StatusCode ) AS StatusName,
                       (SELECT Name FROM User WHERE User.UserIdx = a.UserIdx ) AS UserName,
                        (SELECT ComName FROM Company WHERE Company.CompanyIdx = c.CompanyIdx ) AS ApplyComName,
                        (SELECT count(*) FROM ServiceApplyDetail WHERE a.ServiceApplyIdx = ServiceApplyDetail.ServiceApplyIdx AND ServiceApplyDetail.IsWorkStatus = 1 AND ServiceApplyDetail.SPCompanyIdx = ". $companyIdx." ) AS IsWorkStatusCnt,

					   a.PatientName, a.Birthday, a.Gender,
					   a.DelivNum
                  FROM ServiceApply a INNER JOIN ServiceApplyDetail b
                                               ON a.ServiceApplyIdx =  b.ServiceApplyIdx AND a.UserIdx =  b.UserIdx
                                     INNER JOIN User c
                                               ON a.UserIdx =  c.UserIdx
                 WHERE b.SPCompanyIdx = ". $companyIdx . $addWhere . "
                 ORDER BY a.ServiceCD DESC ";

		try {
			// DB 설정
			$this->jlamp_common_mdl->DBConnect('JLAMPBiz');
			$res = $this->jlamp_common_mdl->sqlRows($sql);
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
            $listHtml = '
            <tr>
                <td colspan="7">서비스 신청 내역이 없습니다.</td>
            </tr>';
			$statusListHtml .= '
						<li>
							<div style="text-align:center;padding-top:20px">서비스 신청 내역이 없습니다.</div>
						</li>';
        }
		$statusListHtml .= '</ul>';

        $result['data']['userName'] = $userName;
        $result['data']['listHtml'] = $listHtml;
		$result['data']['statusListHtml'] = $statusListHtml;
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
        $companyIdx = parent::getCookie("CompanyIdx");

        // SQL 문
		$detailSql = "SELECT  b.ProcCode, b.SubProcCode, b.SPCompanyIdx, b.WorkStartDate, b.WorkEndDate,
					   (SELECT StatusCode FROM ServiceApply WHERE ServiceApply.ServiceApplyIdx = b.ServiceApplyIdx  ) AS StatusCode,
					   (SELECT CodeName FROM `Code` WHERE `Code`.`Code` = b.ProcCode ) AS ProcName,
					   (SELECT CodeName FROM `Code` WHERE `Code`.`Code` = b.SubProcCode ) AS SubProcName,
					   (SELECT ProcOptName FROM ServiceProcOpt WHERE ServiceProcOpt.ProcOptIdx = b.ProcOptIdx ) AS ProcOptName,
					   (SELECT ComName FROM Company AS Company WHERE Company.CompanyIdx = b.SPCompanyIdx ) AS ComName,
					   (SELECT Tel FROM Company AS Company WHERE Company.CompanyIdx = b.SPCompanyIdx ) AS ComTel,
					   (SELECT ServiceApplyFileIdx FROM ServiceApplyFile WHERE  b.ServiceApplyIdx= ServiceApplyIdx AND b.userIdx=userIdx AND b.ProcCode=ProcCode AND b.SubProcCode=SubProcCode AND b.SPCompanyIdx=SPCompanyIdx Order By RegDT DESC Limit 1) AS ServiceApplyFileIdx,
					   (SELECT RealFilename FROM ServiceApplyFile WHERE  b.ServiceApplyIdx= ServiceApplyIdx AND b.userIdx=userIdx AND b.ProcCode=ProcCode AND b.SubProcCode=SubProcCode AND b.SPCompanyIdx=SPCompanyIdx Order By RegDT DESC Limit 1) AS RealFilename
				  FROM ServiceApplyDetail b
				  WHERE b.ServiceApplyIdx= ".$serviceApplyIdx."  AND b.SPCompanyIdx = ". $companyIdx." Order by b.ProcCode, b.SubProcCode, b.SPCompanyIdx";

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
					$res[0][$k]->viewerHtml = '<input type="button" class="button grid_btn_black button-md" value="STL뷰어" onclick="goSTLViewer();"/>&nbsp;';
				} else {
					$res[0][$k]->viewerHtml = '';
				}

                // 서비스 항목에 따른 접수버튼 UI 변경
                $btnHtml = '';
                $onclick = ' onclick="goDetail(\''.$serviceApplyIdx.'\',\''.$res[0][$k]->ProcCode.'\',\''.$res[0][$k]->SubProcCode.'\',\''.$res[0][$k]->SPCompanyIdx.'\')"';
                switch($v->ProcCode){
                    // 스캐닝
                    case "G0070001":
                        switch($v->StatusCode) {
                            // 스캐닝 신청 or 스캐닝 접수
                            case "G0090001":
                            case "G0090002":
                                $btnHtml = '<input type="button" class="button grid_btn_red button-md" value="접수상세내역" '.$onclick.'/>';
                                break;
                            // 스캐닝 완료 이후 상태
                            case "G0090003":
                            case "G0090004":
                            case "G0090005":
                            case "G0090006":
                            case "G0090007":
                            case "G0090008":
                            case "G0090009":
                            case "G0090010":
                            case "G0090011":
                                $btnHtml = '<input type="button" class="button grid_btn_black button-md" value="완료상세내역" '.$onclick.'/>';
                                break;
                        }
                        break;
                    // 모델링
                    case "G0070002":
                        switch($v->StatusCode) {
                            // 스캐닝 작업 중 상태
                            case "G0090001":
                            case "G0090002":
                                $btnHtml = '<input type="button" class="button grid_btn_red_disabled button-md" value="접수상세내역" onclick="alert(\'접수가능한 상태가 아닙니다.\');return false;"/>';
                                break;
                            // 스캐닝 완료 or 모델링 신청 or 모델링 접수
                            case "G0090003":
                            case "G0090004":
                            case "G0090005":
                                $btnHtml = '<input type="button" class="button grid_btn_red button-md" value="접수상세내역" '.$onclick.'/>';
                                break;
                            // 모델링 완료 이후 상태
                            case "G0090006":
                            case "G0090007":
                            case "G0090008":
                            case "G0090009":
                            case "G0090010":
                            case "G0090011":
                                $btnHtml = '<input type="button" class="button grid_btn_black button-md" value="완료상세내역" '.$onclick.'/>';
                                break;
                        }
                        break;
                    // 프린팅
                    case "G0070003":
                        switch($v->StatusCode) {
                            // 스캐닝 or 모델링 작업 중 상태
                            case "G0090001":
                            case "G0090002":
                            case "G0090003":
                            case "G0090004":
                            case "G0090005":
                                $btnHtml = '<input type="button" class="button grid_btn_red_disabled button-md" value="접수상세내역" onclick="alert(\'접수가능한 상태가 아닙니다.\');return false;"/>';
                                break;
                            // 모델링 완료 or 프린팅 신청 or 프린팅 접수 or 배송 전
                            case "G0090006":
                            case "G0090007":
                            case "G0090008":
                            case "G0090009":
                            case "G0090010":
                                $btnHtml = '<input type="button" class="button grid_btn_red button-md" value="접수상세내역" '.$onclick.'/>';
                                break;
                            //  배송
                            case "G0090011":
                                $btnHtml = '<input type="button" class="button grid_btn_black button-md" value="완료상세내역" '.$onclick.'/>';
                                break;
                        }
                        break;
                }
				$res[0][$k]->viewerHtml .= $btnHtml;
			}
        } else {
        }

		$result['data']['statusDetail'] = $res[0];

        $this->jlamp_comm->jsonEncEnd($result);

	} // end of function getServiceApplyDetail_prc

	/**
	 * 메소드명: receiptDetail
	 * 작성자: 최영은
	 * 설 명: 서비스 신청 내역 접수/완료 처리 화면
	 *
	 * 최초작성일: 2017.12.21
	 * 최종수정일: 2017.12.21
	 * ---
	 * Date              Auth        Desc
	*/
	public function receiptDetail() {
		if(!parent::isAuth()) {
			$this->jlamp_js->replace('/user/login', '로그인 후 이용해 주십시오');
		}

		$cssPart = array(
			'<link rel="stylesheet" href="/css/service/receipt_detail.css"></link>'
		);
		$jsPart = array(
			'<script src="/js/service/receipt_detail.js"></script>'
		);

		$this->jlamp_comm->setCSS($cssPart);
		$this->jlamp_comm->setJS($jsPart);

		$page = $this->jlamp_comm->xssInput('page', 'get');
		$applyIdx = $this->jlamp_comm->xssInput('applyIdx', 'get');
		$procCode = $this->jlamp_comm->xssInput('procCode', 'get');
		$subProcCode = $this->jlamp_comm->xssInput('subProcCode', 'get');
		$spCompanyIdx = $this->jlamp_comm->xssInput('spCompanyIdx', 'get');
        $comName = parent::getCookie('ComName');

    	$this->jlamp_tp->assign(array(
			'page' => $page,
			'applyIdx' => $applyIdx,
			'procCode' => $procCode,
			'subProcCode' => $subProcCode,
			'spCompanyIdx' => $spCompanyIdx,
			'comName' => $comName,
			'menuSelection' => 'service'
		));

    	$this->jlamp_tp->setURLType(array(
    		'tpl' => 'receipt_detail.html'
	    ));
	} // end of function receiptDetail

	/**
	 * 메소드명: getDetailData_prc
	 * 작성자: 최영은
	 * 설 명: 서비스 신청 세부내용 가져오기 Process
	 *
	 * @return string $result JSON Data
	 *
	 * 최초작성일: 2017.12.21
	 * 최종수정일: 2017.12.21
	 * ---
	 * Date              Auth        Desc
	*/
	public function getDetailData_prc() {
        if(!parent::isAuth()) {
            $this->jlamp_js->replace('/user/login', '로그인 후 이용해 주십시오');
        }

		$result = array (
			'returnCode' => 0,
			'returnMsg' => '',
			'data' => ''
		);

        $preProcFiles = array();
        $optDetailHtml = '';
        $procFiles = array();
		$applyIdx = $this->jlamp_comm->xssInput('applyIdx', 'get');
		$procCode = $this->jlamp_comm->xssInput('procCode', 'get');
		$subProcCode = $this->jlamp_comm->xssInput('subProcCode', 'get');
        $spCompanyIdx = parent::getCookie('CompanyIdx');

        // 유효성 검사
        if(!$applyIdx && !$procCode && !$subProcCode && !$spCompanyIdx){
            $result['returnCode'] = 'I001';
            $result['returnMsg'] = '올바른 접근 경로가 아닙니다.';
            $this->jlamp_comm->jsonEncEnd($result);
        }
        // SQL 문
		$sql = "SELECT a.UserIdx,
                       a.ServiceCD,
                       a.StatusCode,
                       (SELECT CodeName FROM `Code` WHERE `Code`.`Code` = a.StatusCode ) AS StatusName,
                       a.PreStatusCode,
                       a.PatientName,
                       a.Tel,
                       a.Post,
                       a.Addr,
                       a.AddrDetail,
					   a.Gender,
					   a.Birthday,
					   a.Email,
                       (SELECT CodeName FROM Code WHERE Code = a.RegionCode) AS RegionCode,
                       a.DelivCompany,
                       a.DelivNum,
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
                       b.WorkStartDate,
                       b.WorkEndDate,
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
                       b.`Desc`,
					   a.AssiPrice,
					   a.EquipmentNum,
                       b.ReceiptDesc
                  FROM ServiceApply a LEFT JOIN ServiceApplyDetail b
                                             ON a.UserIdx        = b.UserIdx
                                            AND a.ServiceApplyIdx= b.ServiceApplyIdx
                 WHERE b.ServiceApplyIdx = ".$applyIdx."
                   AND b.ProcCode = '".$procCode."'
                   AND b.SubProcCode = '".$subProcCode."'
                   AND b.SPCompanyIdx = ".$spCompanyIdx;
		try {
			// DB 설정
			$this->jlamp_common_mdl->DBConnect('JLAMPBiz');
			$res = $this->jlamp_common_mdl->sqlRow($sql);
		} catch (Exception $e) {
			$result['returnCode'] = 'E001';
	        $result['returnMsg'] = $e->getMessage();
		}
        if($res) {
            $result['data']['detailData'] = $res;
            $result['data']['detailData']->WorkStartDate =  $res->WorkStartDate && $res->WorkStartDate != "0000-00-00" ? $res->WorkStartDate : "";
            $result['data']['detailData']->WorkEndDate =  $res->WorkEndDate && $res->WorkEndDate != "0000-00-00" ? $res->WorkEndDate : "";

            // 첨부파일 data 가져오기
            // 이전 단계 서비스 프로세스 코드
            $preProcCodeArr = array(
                'G0070002' => 'G0070001',   // 모델링 -> 스캐닝
                'G0070003' => 'G0070002'    // 프린팅 -> 모델링
            );
            // SQL 문
            $sql = "SELECT ServiceApplyFileIdx, ServiceApplyIdx, ProcCode, SavePath, SaveFilename, RealFilename
                      FROM ServiceApplyFile
                     WHERE ServiceApplyIdx = ".$applyIdx;
            try {
                // DB 설정
                $this->jlamp_common_mdl->DBConnect('JLAMPBiz');
                $resFiles = $this->jlamp_common_mdl->sqlRows($sql);
                if(isset($resFiles[0])) {
                    $filesList = array();
                    foreach($resFiles[0] as $k => $v){
                        $filesList[$v->ProcCode][] = $v;
                    }
                    if(count($filesList) > 0) {
                        // 이전 프로세스 파일들
                        if (array_key_exists($procCode, $preProcCodeArr)) {
                            $preProcFiles = $filesList[$preProcCodeArr[$procCode]];
                        }
                        // 진행 프로세스 파일들
                        if (array_key_exists($procCode, $filesList)) {
                            $procFiles = $filesList[$procCode];
                        }
                    }
                }

                // 옵션 상세 설정 내용 가져오기
                // SQL 문
                $sql = "SELECT a.PCode, a.Code, a.CodeName, a.`Desc`
                        FROM Code a
                            WHERE CodeGroup = 'G015'
                            AND a.PCode = '".$res->ProcCode."' ";
                $resOpt = $this->jlamp_common_mdl->sqlRows($sql);

                if(isset($resOpt[0]) && is_array($resOpt[0])) {

                    $temp = array();
                    foreach($resOpt[0] as $k => $v){
                        $val = (array)$res;
                        $temp[] = '<li> <span style="font-size:12px;vertical-align:top;">＊</span> '.$v->CodeName.' - '. $val[$v->Desc].'</li>';
                    }
                    $optDetailHtml = '<ul>'.implode(' ', $temp).'</ul>';
                }

            } catch (Exception $e) {
                $result['returnCode'] = 'E001';
                $result['returnMsg'] = $e->getMessage();
            }
        }
        $result['data']['optDetailHtml'] = $optDetailHtml;
        $result['data']['preProcFiles'] = $preProcFiles;
        $result['data']['procFiles'] = $procFiles;

        $this->jlamp_comm->jsonEncEnd($result);
	} // end of function getDetailData_prc

	/**
	 * 메소드명: saveData_prc
	 * 작성자: 최영은
	 * 설 명: 서비스 신청 내역 data 저장 Process
	 *
	 * @return string $result JSON Data
	 *
	 * 최초작성일: 2017.12.21
	 * 최종수정일: 2017.12.21
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
        // 다음 단계 서비스 프로세스 코드
        $nextProcCodeArr = array(
            'G0070001' => 'G0070002',   // 스캐닝 -> 모델링
            'G0070002' => 'G0070003',   // 모델링 -> 프린팅
            'G0070003' => '',           // 프린팅
        );
        $IsComplete = 0;
        $saveType = $this->jlamp_comm->xssInput('save_type', 'post');
        $hasFiles = $this->jlamp_comm->xssInput('has_files', 'post');
        $applyIdx = $this->jlamp_comm->xssInput('apply_idx', 'post');
        $procCode = $this->jlamp_comm->xssInput('proc_code', 'post');
        $subProcCode = $this->jlamp_comm->xssInput('sub_proc_code', 'post');
        $spCompanyIdx = $this->jlamp_comm->xssInput('sp_company_idx', 'post');
        $applyUserIdx = $this->jlamp_comm->xssInput('apply_user_idx', 'post');
        $preStatusCode = $this->jlamp_comm->xssInput('pre_status_code', 'post');
        $oriStatusCode = $this->jlamp_comm->xssInput('ori_status_code', 'post');
        $statusCode = $this->jlamp_comm->xssInput('new_status_code', 'post');
        // 반려처리
        $statusCode = $saveType == "rollback" ? $preStatusCode : $statusCode;
        $startDate = $this->jlamp_comm->xssInput('work_start_date', 'post');
        $endDate = $this->jlamp_comm->xssInput('work_end_date', 'post');
        $delivCompany = $this->jlamp_comm->xssInput('deliv_company', 'post');
        $delivNum = $this->jlamp_comm->xssInput('deliv_num', 'post');
        $receiptDesc = $this->jlamp_comm->xssInput('receipt_desc', 'post');

        // 유효성 검사
        if(!$applyIdx || !$procCode || !$subProcCode || !$spCompanyIdx) {
			$result['returnCode'] = 'I001';
	        $result['returnMsg'] = '올바른 접속 경로가 아닙니다.';
		    $this->jlamp_comm->jsonEncEnd($result);
        }

        if($saveType == "complete") {
            if(!$startDate ||  !$endDate) {
                $result['returnCode'] = 'I002';
                $result['returnMsg'] = '작업 일자를 입력하여 주십시오.';
                $this->jlamp_comm->jsonEncEnd($result);
            }

            if($procCode != 'G0070003' && $hasFiles != "Y" && !$_FILES['files']['name'][0]){
                $result['returnCode'] = 'I003';
                $result['returnMsg'] = '첨부파일을 등록하여 주십시오.';
                $this->jlamp_comm->jsonEncEnd($result);
            }
        }

        // DB 설정
        $this->jlamp_common_mdl->DBConnect('JLAMPBiz');


        // 트랜잭션 Start
        $this->jlamp_common_mdl->tBegin();

        // 서비스 진행 상태 변경 (접수 / 작업완료 / 반려)
        if($saveType == "receipt" || $saveType == "complete" || $saveType == "rollback") {
            $data = array();
            $data['StatusCode'] = $statusCode; // 상태
            $data['PreStatusCode'] = $oriStatusCode; // 이전 상태
            $data['ModDT'] = time();

            if($saveType == "complete") {
                // SQL 문
                $sql = "SELECT count(*) AS cnt
                          FROM ServiceApplyDetail
                         WHERE ServiceApplyIdx =".$applyIdx."
                           AND ProcCode = '".$nextProcCodeArr[$procCode]."'";
                try {
                    $resNext = $this->jlamp_common_mdl->sqlRow($sql);

                    // 다음 단계 없으면 서비스 작업 전체 완료 처리
                    if($resNext->cnt == 0 ) $IsComplete = 1;
                } catch (Exception $e) {
                    $result['returnCode'] = 'E001';
                    $result['returnMsg'] = $e->getMessage();
                }
            }
            $data['IsComplete'] = $IsComplete;

            try {
                $this->jlamp_common_mdl->setTable('ServiceApply');
                $res = $this->jlamp_common_mdl->update('ServiceApplyIdx', $applyIdx, $data);
            } catch (Exception $e) {
                $result['returnCode'] = 'E002';
                $result['returnMsg'] = $e->getMessage();
                $this->jlamp_comm->jsonEncEnd($result);
            }
        }

        // 서비스 세부 내용 update (저장 / 작업완료)
        $isWorkStatus = 1;
        if($saveType == "save" || $saveType == "complete") {
            // 작업 완료 시 작업 가능 상태 바꾸기
            if( $saveType == "complete") {
                // 스캐닝 완료
                if($procCode == 'G0070001' && $statusCode == 'G0090003' ) {
                    $isWorkStatus = 0;
                }

                // 모델링 완료
                if($procCode == 'G0070002' && $statusCode == 'G0090006' ) {
                    $isWorkStatus = 0;
                }

                // 스캐닝 완료
                if($procCode == 'G0070003' && $statusCode == 'G0090011' ) {
                    $isWorkStatus = 0;
                }

                // 다음 단계가 존재하면 해당 단계의 작업 가능 여부를 1로 변경
                if($IsComplete == 0){
                    // SQL 문
                    $sql = "UPDATE ServiceApplyDetail
                               SET IsWorkStatus = 1 ,
                                   ModDT = ".time()."
                             WHERE ServiceApplyIdx = ".$applyIdx."
                               AND ProcCode = '".$nextProcCodeArr[$procCode]."'
                               AND SPCompanyIdx = ".$spCompanyIdx;
                    try {
                        $resNext = $this->jlamp_common_mdl->sqlRow($sql);
                    } catch (Exception $e) {
                        $result['returnCode'] = 'E001';
                        $result['returnMsg'] = $e->getMessage();
                    }
                }
            }

            // Printing : 택배사 / 송장번호 저장
            if($procCode == 'G0070003') {
                // SQL 문
                $sql = "UPDATE ServiceApply
                           SET DelivCompany = '".$delivCompany."',
                               DelivNum = '".$delivNum."'
                         WHERE ServiceApplyIdx = ".$applyIdx;
                try {
                    $resNext = $this->jlamp_common_mdl->sqlRow($sql);
                } catch (Exception $e) {
                    $result['returnCode'] = 'E001';
                    $result['returnMsg'] = $e->getMessage();
                }
            }

            // SQL 문
            $sql = "UPDATE ServiceApplyDetail
                       SET WorkStartDate = '".$startDate."',
                           WorkEndDate = '".$endDate."',
                           ReceiptDesc = '".$receiptDesc."',
                           IsWorkStatus = ".$isWorkStatus.",
                           ModDT = ".time()."
                     WHERE ServiceApplyIdx = ".$applyIdx."
                       AND ProcCode = '".$procCode."'
                       AND SubProcCode = '".$subProcCode."'
                       AND SPCompanyIdx = ".$spCompanyIdx;
            try {
                // data update
                $resFiles = $this->jlamp_common_mdl->sqlRows($sql);

                if($_FILES){
                    // 저장 가능한 파일 확장자 설정
                    $this->jlamp_upload->setAllowType(array('stl')); // stl파일만 저장
                    // $this->jlamp_upload->setAllowType(array('png')); // stl파일만 저장 가능
                    // 저장 가능한 파일 크기 설정
                    $this->jlamp_upload->setUploadFileSize(20480); // 20MB

                    // Table 설정
                    $this->jlamp_common_mdl->setTable('ServiceApplyFile');

                    $dateFolder = Date('Ymd'); //현재날짜
                    $v = $_FILES['files'];
                    $deleteOldFiles = false;
                    foreach($_FILES['files']['name'] as $kk =>$vv){
                        if($vv){
                            // 세부내용 기존 첨부파일 삭제
                            if(!$deleteOldFiles) {
                                // 1. 서버의 파일 삭제
                                $sql = "SELECT SavePath, SavePath
                                          FROM ServiceApplyFile
                                         WHERE ServiceApplyIdx =". $applyIdx." And ProcCode='".$procCode."'";

                                try {
                                    $resFiles = $this->jlamp_common_mdl->sqlRows($sql);
                                    if(isset($resFiles[0])) {
                                        foreach($resFiles[0] as $key => $val){
                                            $path = $val->SavePath.$val->SavePath;
                                            $filePath = $_SERVER['DOCUMENT_ROOT'].$path;
                                            if (file_exists($filePath)) {
                                                unlink($filePath);
                                            }
                                        }
                                    }
                                } catch (Exception $e) {
                                    $result['returnCode'] = 'E001';
                                    $result['returnMsg'] = $e->getMessage();
                                }
                                // 2. DB의 파일 삭제
                                // $this->jlamp_common_mdl->delete('ServiceApplyDetailIdx', $detailIdx);
                                $sql = "DELETE FROM ServiceApplyFile
                                         WHERE ServiceApplyIdx =". $applyIdx." And ProcCode='".$procCode."'";
                                try {
                                    $resFiles = $this->jlamp_common_mdl->sqlRows($sql);
                                } catch (Exception $e) {
                                    $result['returnCode'] = 'E001';
                                    $result['returnMsg'] = $e->getMessage();
                                }
                            }
                            $deleteOldFiles = true;

                            $this->jlamp_upload->isUniqueFilename(true);

                            $_FILES['files_'.$kk]['name'] = $vv;
                            $_FILES['files_'.$kk]['type'] = $v['type'][$kk];
                            $_FILES['files_'.$kk]['tmp_name'] = $v['tmp_name'][$kk];
                            $_FILES['files_'.$kk]['error'] = $v['error'][$kk];
                            $_FILES['files_'.$kk]['size'] = $v['size'][$kk];

                            $uploadData = $this->jlamp_upload->doUpload('files_'.$kk, 'service/apply', true, false, 137, 176);

                            if ($uploadData['upload_data']) {
                                $uploadData = $uploadData['upload_data'];
                                $data = array();
                                $data['ServiceApplyIdx'] = $applyIdx;
                                $data['UserIdx'] = $applyUserIdx;
                                $data['SPCompanyIdx'] = $spCompanyIdx;
                                $data['ProcCode'] = $procCode;
                                $data['SubProcCode'] = $subProcCode;
                                $filePath =  explode('public_html', $uploadData['file_path']);
                                $data['SavePath'] = $filePath[1];
                                $data['SaveFilename'] = $uploadData['file_name'];
                                $data['RealFilename'] = $vv;
                                $data['Mime'] = $uploadData['file_type'];
                                $data['FileSize'] = $uploadData['file_size'] * 1024 * 1024;
                                $data['RegDT'] = time();
                                $resFiles = $this->jlamp_common_mdl->insert($data);
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

        // 트랜잭션 완료
        $this->jlamp_common_mdl->tComplete();

		$this->jlamp_comm->jsonEncEnd($result);

	} // end of function saveData_prc

	/**
	 * 메소드명: fileDownload_prc
	 * 작성자: 최영은
	 * 설 명: 파일 다운로드 Process
	 *
	 * @return string $result JSON Data
	 *
	 * 최초작성일: 2017.12.26
	 * 최종수정일: 2017.12.26
	 * ---
	 * Date              Auth        Desc
	*/
	public function fileDownload_prc() {
        if(!parent::isAuth()) {
            $this->jlamp_js->replace('/user/login', '로그인 후 이용해 주십시오');
        }

		$result = array(
			'returnCode' => 0,
            'returnMsg' => ''
		);

        $idx = $this->jlamp_comm->xssInput('idx', 'get');

		if ($idx) {

            // SQL 문
            $sql = "SELECT *
                      FROM ServiceApplyFile
                     WHERE ServiceApplyFileIdx =". $idx;
            try {
                // DB 설정
                $this->jlamp_common_mdl->DBConnect('JLAMPBiz');
                $resFiles = $this->jlamp_common_mdl->sqlRow($sql);
            } catch (Exception $e) {
                $result['returnCode'] = 'E001';
                $result['returnMsg'] = $e->getMessage();
            }
            if($resFiles){
                $path = $resFiles->SavePath.$resFiles->SaveFilename;
                $filePath = $_SERVER['DOCUMENT_ROOT'].$path;

                if (file_exists($filePath)) {
                    $fileSize = filesize($filePath);
                    $fhandle = fopen($filePath, 'rb');

                    if ($fhandle) {
                        // Lib_comm
                        $this->load->library('lib_comm');
                        $isIE = $this->lib_comm->isIE();

                        // IE일 경우 파일명 한글로 변환 : 2016.08.29 최영은
                        if($isIE) {
                            $fileName = iconv('UTF-8', 'cp949//IGNORE', $resFiles->RealFilename);
                            header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
                            header("Pragma: public");
                        } else {
                            $fileName = $resFiles->RealFilename;
                            header("Cache-Control: no-cache, must-revalidate");
                            header("Pragma: no-cache");
                        }
                        header("Content-Disposition: attachment; filename=\"" . $fileName . "\"");
                        header("Content-Type: application/octet-stream");
                        //header("Content-Type: file/unknown");
                        //header("Content-Length: " . $fileSize);
                        header('Content-Transfer-Encoding: binary');
                        header('Expires:0');

                        ob_end_clean();
                        if (!fpassthru($fhandle))
                            fclose($fhandle);
                    }
                } else {
                    $result['returnCode'] = 'I001';
                    $result['returnMsg'] = '파일이 존재하지 않습니다.';

                    $this->jlamp_js->back($result['returnMsg']);
                }
            }
		} else {
			$result['returnCode'] = 'I002';
			$result['returnMsg'] = '올바른 접속경로가 아닙니다.';

			$this->jlamp_js->back($result['returnMsg']);
		}
	} // end od function fileDownload_prc
}