<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * 클래스명: Qna
 * 작성자: 김영탁
 * 클래스설명: 의료서비스
 *
 * 최초작성일: 2017.12.11
 * 최종수정일: 2017.12.11
 * ---
 * Date         Auth        Desc
 */
class Qna extends JLAMP_Controller {

	public function index() {
		if (parent::isAuth()) {
			header('Location: /');
		} else {
			$this->qnaList();
		}
	}

	/**
	 * 메소드명: qnaList
	 * 작성자: 김영탁
	 * 설 명: 의료서비스 > Q&A 리스트 화면
	 *
	 * 최초작성일: 2017.12.11
	 * 최종수정일: 2017.12.11
	 * ---
	 * Date              Auth        Desc
	*/
	public function qnaList() {
		//$returnURL = $this->jlamp_comm->xssInput('returnURL', 'get');		// 권한이 없는 이전 페이지 경로
		
		$page = $this->jlamp_comm->xssInput('page', 'get');		// 페이지
		$cssPart = array(
			'<link rel="stylesheet" href="/css/service/qna_list.css">'
		);
		$jsPart = array(
			'<script src="/js/service/qna_list.js"></script>'
		);

		$this->jlamp_comm->setCSS($cssPart);
		$this->jlamp_comm->setJS($jsPart);

    	$this->jlamp_tp->assign(array(
			//'returnURL' => urldecode($returnURL)
			'page' => $page,
			'menuSelection' => 'service'
		));

    	$this->jlamp_tp->setURLType(array(
    		'tpl' => 'qna_list.html'
	    ));
	} // end of function qnaList

	/**
	 * 메소드명: qnaRegister
	 * 작성자: 김영탁
	 * 설 명: 의료서비스 > Q&A 등록 화면
	 *
	 * 최초작성일: 2017.12.11
	 * 최종수정일: 2017.12.11
	 * ---
	 * Date              Auth        Desc
	*/
	public function qnaRegister() {

		if (parent::isAuth() == '') {
			$this->jlamp_js->replace('/user/login', '로그인 후 이용해 주십시오');
		}
		//$returnURL = $this->jlamp_comm->xssInput('returnURL', 'get');		// 권한이 없는 이전 페이지 경로
		$page = $this->jlamp_comm->xssInput('page', 'get');		// 페이지

		$cssPart = array(
			'<link rel="stylesheet" href="/css/service/qna_register.css">'
		);
		$jsPart = array(
			'<script src="/js/service/qna_register.js"></script>'
		);

		$this->jlamp_comm->setCSS($cssPart);
		$this->jlamp_comm->setJS($jsPart);

    	$this->jlamp_tp->assign(array(
			//'returnURL' => urldecode($returnURL)
			'page' => $page,
			'menuSelection' => 'service'
		));

    	$this->jlamp_tp->setURLType(array(
    		'tpl' => 'qna_register.html'
	    ));
	} // end of function qnaRegister

	/**
	 * 메소드명: qnaModify
	 * 작성자: 김영탁
	 * 설 명: 의료서비스 > Q&A 수정 화면
	 *
	 * 최초작성일: 2017.12.11
	 * 최종수정일: 2017.12.11
	 * ---
	 * Date              Auth        Desc
	*/
	public function qnaModify() {

		if (parent::isAuth() == '') {
			$this->jlamp_js->replace('/user/login', '로그인 후 이용해 주십시오');
		}
		$serviceQnAIdx = $this->jlamp_comm->xssInput('serviceQnAIdx', 'get');		// 서비스 Q&A
		$page = $this->jlamp_comm->xssInput('page', 'get');		// 페이지

		$cssPart = array(
			'<link rel="stylesheet" href="/css/service/qna_modify.css">'
		);
		$jsPart = array(
			'<script src="/js/service/qna_modify.js"></script>'
		);

		$this->jlamp_comm->setCSS($cssPart);
		$this->jlamp_comm->setJS($jsPart);

    	$this->jlamp_tp->assign(array(
			'serviceQnAIdx' => $serviceQnAIdx,
			'page' => $page,
			'menuSelection' => 'service'
		));

    	$this->jlamp_tp->setURLType(array(
    		'tpl' => 'qna_modify.html'
	    ));
	} // end of function qnaModify

	/**
	 * 메소드명: qnaDetail
	 * 작성자: 김영탁
	 * 설 명: 의료서비스 > Q&A 상세 화면
	 *
	 * 최초작성일: 2017.12.11
	 * 최종수정일: 2017.12.11
	 * ---
	 * Date              Auth        Desc
	*/
	public function qnaDetail() {

		$serviceQnAIdx = $this->jlamp_comm->xssInput('serviceQnAIdx', 'get');		// 서비스 Q&A
		$page = $this->jlamp_comm->xssInput('page', 'get');		// 페이지

		$cssPart = array(
			'<link rel="stylesheet" href="/css/service/qna_detail.css">'
		);
		$jsPart = array(
			'<script src="/js/service/qna_detail.js"></script>'
		);

		$this->jlamp_comm->setCSS($cssPart);
		$this->jlamp_comm->setJS($jsPart);

    	$this->jlamp_tp->assign(array(
			'serviceQnAIdx' => $serviceQnAIdx,
			'page' => $page,
			'menuSelection' => 'service'
		));

    	$this->jlamp_tp->setURLType(array(
    		'tpl' => 'qna_detail.html'
	    ));
	} // end of function qnaDetail

	/**
	 * 메소드명: qnaRegisterSave_prc
	 * 작성자: 김영탁
	 * 설 명: Q&A 저장 Process
	 *
	 * @return string $result JSON DATA
	 *
	 * 최초작성일: 2017.08.01
	 * 최종수정일: 2017.08.16
	 * ---
	 * Date              Auth        Desc
	 */
	public function qnaRegisterSave_prc() {
		$result = array (
			'returnCode' => 0,
			'returnMsg' => '',
			'data' => ''
		);
		$nickname = $this->jlamp_comm->xssInput('nickname', 'post'); // 닉네임
		$subject = $this->jlamp_comm->xssInput('subject', 'post'); // 제목
		$content = $this->jlamp_comm->xssInput('txtarea_content', 'post'); // 내용
		$workType = $this->jlamp_comm->xssInput('work_type', 'post'); // 내용
		$serviceQnAIdx = ''; //서비스 인덱스
		$dateFolder = Date('Ymd'); //현재날짜
		$date = date('Y-m-d H:i:s');
		$decodeContent = str_replace("&nbsp;","",html_entity_decode($content));
		if (trim($decodeContent) == '') {
			$result['returnCode'] = 'I002';
			$result['returnMsg'] = '내용을 입력해 주십시오';
			$this->jlamp_comm->jsonEncEnd($result);
		}
		$data = array(
			'ServiceQnACategoryIdx' => 1,
			'UserIdx' => parent::getCookie("UserIdx"),
			'StatusCode' => 'G0100001',
			'Subject' => $this->jlamp_comm->htmlEttSQ($subject),
			'Nickname' => $this->jlamp_comm->htmlEttSQ($nickname),
			'Content' => $this->jlamp_comm->htmlEttSQ($content),
			'ReadCount' => 0,
			'RegDT' => time()
		);
		try {
			// DB 설정
			$this->jlamp_common_mdl->DBConnect('JLAMPBiz');
			$this->jlamp_common_mdl->tStart(); 
			// Table 설정
			$this->jlamp_common_mdl->setTable('ServiceQnA');

			$res = $this->jlamp_common_mdl->insert($data);

			$serviceQnAIdx = $res;
			/*
			if (!$res) {
				$result['returnCode'] = 'E001';
				$result['returnMsg'] = '정보관리 수정에 실패하였습니다.  \n관리자에게 문의바랍니다.';
			}
			*/
			// 사진 이미지 등록
			for($i = 0; $i < count($_FILES['files']['name'])-1; $i++) {

				if (isset($_FILES['files']['name'][$i])) {
					$filesName = $_FILES['files']['name'][$i];
					$filesArray = explode(".", $filesName);
					if (strcasecmp($filesArray[count($filesArray)-1],'jpg')!= 0 &&strcasecmp($filesArray[count($filesArray)-1],'gif')!= 0&&strcasecmp($filesArray[count($filesArray)-1],'png')!= 0) {
						$result['returnCode'] = 'I001';
						$result['returnMsg'] = 'gif, jpg, png만 업로드 가능합니다';
						$this->jlamp_comm->jsonEncEnd($result);
					}

					$_FILES['files_'.$i]['name'] = $_FILES['files']['name'][$i];
					$_FILES['files_'.$i]['type'] = $_FILES['files']['type'][$i];
					$_FILES['files_'.$i]['tmp_name'] = $_FILES['files']['tmp_name'][$i];
					$_FILES['files_'.$i]['error'] = $_FILES['files']['error'][$i];
					$_FILES['files_'.$i]['size'] = $_FILES['files']['size'][$i];

					//$newFileUid = uniqid();
					$this->jlamp_upload->setAllowType(array('jpg', 'png', 'gif'));
					$this->jlamp_upload->isUniqueFilename(true);
					//$this->jlamp_upload->setFilename($newFileUid);
					$this->jlamp_upload->setOverWrite(true);
					$uploadData = $this->jlamp_upload->doUpload('files_'.$i, 'service/qna', true, false, 137, 176);
					if ($uploadData['upload_data']) {
						$uploadData = $uploadData['upload_data'];
						$photoName = $uploadData['file_name'];
					}
					// Photo Data Setting
					$photoData = array (
						'ServiceQnAIdx' => $serviceQnAIdx, // 서비스 Q&A 일련번호
						'SavePath' => '/data/service/qna/'.$dateFolder.'/', // 저장경로
						'SaveFilename' => $uploadData['file_name'], // 저장파일명
						'RealFilename' => $_FILES['files_'.$i]['name'], // 실제파일명
						'Mime' => $uploadData['file_type'], // 파일MIME타입
						'FileSize' =>  ((int)$uploadData['file_size'])*1024, // 파일사이즈
						'RegDT' => time() // 등록일시
					);

					// Table 설정
					$this->jlamp_common_mdl->setTable('ServiceQnAFile');

					$res = $this->jlamp_common_mdl->insert($photoData);

				}
			}
			$this->jlamp_common_mdl->tComplete();
		} catch (Exception $e) {
			$result['returnCode'] = 'E001';
			$result['returnMsg'] = $e->getMessage();
			$this->jlamp_comm->jsonEncEnd($result);
		}
		$result['data']['serviceQnAIdx']  = $serviceQnAIdx;
		$this->jlamp_comm->jsonEncEnd($result);
	}

	/**
	 * 메소드명: qnaList_prc
	 * 작성자: 김영탁
	 * 설 명: 의료서비스 > Q&A 리스트 Process
	 *
	 * @return string $result JSON Data
	 *
	 * 최초작성일: 2017.12.11
	 * 최종수정일: 2017.12.11
	 * ---
	 * Date              Auth        Desc
	*/
	public function qnaList_prc() {
		$result = array (
			'returnCode' => 0,
			'returnMsg' => '',
			'data' => ''
		);
		// ajax로 전달받은 Input 데이터
		// 첫번째 인수는 ajax data에서 설정한 Key 값이며, 두번째 인수는 ajax type에서 설정한 (get/post) 값
		// ajax에서 get으로 전송하는데 post로 데이터를 받는 경우 값이 없으므로 데이터 전달되지 않는 경우가 있으니, 이를 주의하여 동일한 방식으로 설정해야 한다.
		//$serviceFAQCategoryIdx = $this->jlamp_comm->xssInput ( 'serviceFAQCategoryIdx', 'get' ); // FAQ 카테고리 번호
		$currPage = $this->jlamp_comm->xssInput ( 'page', 'get' ); // 현재 페이지 번호

		$auth = false;

		// 유효성 검사

		$pageBlockSize = 5;
		// Rows 변수 설정
		$isArray = false; // 반환값 배열 여부
		$rowCount = 5; // 페이지당 조회될 row count
		$column = ' ServiceQnAIdx, ServiceQnACategoryIdx, UserIdx, StatusCode, Subject, Nickname, Content, AdminIdx, Reply, ReplyDT, ReadCount, RegDT,
		(SELECT u.Name FROM User u Where u.UserIdx = UserIdx Limit 1 ) AS Name,
		(SELECT c.CodeName FROM Code c Where c.Code = StatusCode Limit 1 ) AS CodeName'; // 검색할 Columns
		$filter = array(
            array (
				'StatusCode' => 'G0100004' // 조건 Column => 조건 값
            ),
            array (
				'StatusCode'=> '!=' // 조건 Column => Operator
            )
        );

		$sort = ' RegDT DESC'; // 정렬 기준
		$group = ''; // 그룹 기준

		// SQL 변수
		/*
		$isArray = false;						   				  // 배열여부
		$sql='
		SELECT s.ServiceQnAIdx, s.ServiceQnACategoryIdx, s.UserIdx, s.StatusCode, s.Subject, s.Nickname, s.Content, s.AdminIdx, s.Reply, s.ReplyDT, s.ReadCount, s.RegDT,
		(SELECT u.Name FROM User u Where u.UserIdx = s.UserIdx Limit 1 ) AS Name,
		(SELECT c.CodeName FROM Code c Where c.Code = s.StatusCode Limit 1 ) AS CodeName FROM ServiceQnA s Where s.StatusCode != \'G0100004\'';
		*/
		$qnaHtml = '';
		$paginationHtml = '';
		$count = 0;

		try {
			// DB 설정
			$this->jlamp_common_mdl->DBConnect('JLAMPBiz');
			// Table 설정
			$this->jlamp_common_mdl->setTable('ServiceQnA');

			$res = $this->jlamp_common_mdl->rows($isArray, $currPage, $rowCount, $column, $filter, $sort, $group);

		} catch (Exception $e) {
			$result['returnCode'] = 'E001';
	        $result['returnMsg'] = $e->getMessage();
		}
		if ($res) {
            // 데이터가 있는 경우, 데이터는 rows 배열에 포함
			if ($res['rows']) {
                // 본문 List HTML 가공
				$qnaHtml .= '			<table cellspacing="0" border="1" summary="리스트" class="tbl-list mT20">
						<caption>목록</caption>
						<colgroup>
								<col width="15%"><col width="85%">
						</colgroup>
						<tbody>';
				foreach ($res['rows'][0] as $key => $val) {
					$classColor = '';
						if ($val->StatusCode == 'G0100001') {
							$classColor = 'green';
						} elseif ($val->StatusCode == 'G0100002') {
							$classColor = 'blue';
						} elseif ($val->StatusCode == 'G0100003') {
							$classColor = 'yellow';
						}
						/*style="white-space: nowrap;text-overflow: ellipsis;overflow: hidden;width:30%"*/
						/*white-space: nowrap;text-overflow: ellipsis;overflow: hidden;width:60%;*/
						$qnaHtml .=
							'
						<tr>
							<td>
								<div class="tbl-qna-name">
									<p class="tbl-name"  >'.$val->Nickname.'</p>
									<span class="label '.$classColor.'" style="line-height: 25px;">'.$val->CodeName.'</span>
								</div>
							</td>
							<td class="left">
								<a onclick="doDetailRows(\''.$val->ServiceQnAIdx.'\')" >
									<div class="tbl-qna">
										<span class="tbl-q">Q</span>
										<div class="tbl-title" style="cursor:pointer;">'.$val->Subject.'</div>
										<span class="tbl-date">'.date('Y-m-d', $val->RegDT).'<span class="bar">|</span>  조회수 '.$val->ReadCount.'</span>
									</div>
								</a>
							</td>
						</tr>';
						$count++;
				}

				$qnaHtml .= '
					</tbody>
				</table>';
				if ($count >0) {
					// Lib_comm
					$this->load->library('lib_comm');
					$paginationHtml = $this->lib_comm->pagination($currPage, $rowCount, $res['count']);
					/*
					$offsetPage = (floor(($currPage-1) / $pageBlockSize) * $pageBlockSize) + 1;
					$endPage = $offsetPage + ($pageBlockSize - 1);
					$totalPage = ceil($res['count'] / $rowCount);
					$numBtn = '';

					if ($endPage > $totalPage) $endPage = $totalPage;
					$prevBlockPage = (($offsetPage - 1) < 1) ? $offsetPage: $offsetPage - 1;
					$nextBlockPage = (($endPage+1) > $totalPage) ? $totalPage: $endPage + 1;

					if ($currPage == 1) {
						$fistBtn = '<li style="padding-top:20px;" class="m-none"><a class="first"  title="처음" >|<</a></li>';
						$prevBtn = '<li style="padding-top:20px;" class="m-none"><a class="prev"  title="이전" ><<</a></li>';
						$rightPrevBtn = '<li style="padding-top:20px;"><a class="prev"  title="이전" ><</a></li>';
					} else {
						$fistBtn = '<li style="padding-top:20px;" class="m-none"><a class="first" style="cursor:pointer" title="처음" onclick="doRows(\'1\')">|<</a></li>';
						$prevBtn = '<li style="padding-top:20px;" class="m-none"><a class="prev"  title="이전" style="cursor:pointer" onclick="doRows(\''.$prevBlockPage.'\')"><<</a></li>';
						$rightPrevBtn = '<li style="padding-top:20px;"><a class="prev"  title="이전" style="cursor:pointer" onclick="doRows(\''.($currPage-1).'\')"><</a></li>';
					}

						$endBtn = '<li style="padding-top:20px;" class="m-none"><a class="last" title="마지막" style="cursor:pointer" onclick="doRows(\''.$totalPage.'\')">>|</a></li>';
						$nextBtn = ' <li style="padding-top:20px;" class="m-none"><a class="next" title="다음" style="cursor:pointer" onclick="doRows(\''.$nextBlockPage.'\')">>></a></li>';
						$rightNextBtn = ' <li style="padding-top:20px;" ><a class="next" title="다음" style="cursor:pointer" onclick="doRows(\''.($currPage+1).'\')">></a></li>';
					//}

					for ($i = $offsetPage; $i <= $endPage; $i++) {
						if ($i == $currPage)
							$numBtn .= '<li style="padding-top:20px;"><a class="current" style="cursor:pointer" onclick="doRows(\''.$i.'\')">'.$i.'</a></li>';
						else
							$numBtn .= '<li style="padding-top:20px;"><a class="" style="cursor:pointer" onclick="doRows(\''.$i.'\')">'.$i.'</a></li>';
					}

					$paginationHtml = $fistBtn.$prevBtn.$rightPrevBtn.$numBtn.$rightNextBtn.$nextBtn.$endBtn;
					*/
				}
			} else {
				$qnaHtml .= '
					<li>                  	  
						<div style="text-align:center;padding-top:20px">등록된 데이터가 없습니다.</div>
					</li>';
			}
		} else {
			$qnaHtml .= '
				<li>                  	  
					<div style="text-align:center;padding-top:20px">등록된 데이터가 없습니다.</div>
				</li>';
		}
		
		if (parent::isAuth() != '') {
			$paginationHtml .= '<li class="fr"><a style="height: 65px;" onclick="goRegister()" class="button">등록</a></li>	';
		}

		$result['data']['count'] = $res['count'];
		$result['data']['faq'] = $res['rows'][0];
		$result['data']['qnaHtml'] = $qnaHtml;
		$result['data']['paginationHtml'] = $paginationHtml;

		$this->jlamp_comm->jsonEncEnd($result);
	} // end of function qnaList_prc

	/**
	 * 메소드명: qnaDetail_prc
	 * 작성자: 김영탁
	 * 설 명: 의료서비스 > Q&A 상세 Process
	 *
	 * @return string $result JSON Data
	 *
	 * 최초작성일: 2017.12.11
	 * 최종수정일: 2017.12.11
	 * ---
	 * Date              Auth        Desc
	*/
	public function qnaDetail_prc() {
		$result = array (
			'returnCode' => 0,
			'returnMsg' => '',
			'data' => ''
		);
		// ajax로 전달받은 Input 데이터
		// 첫번째 인수는 ajax data에서 설정한 Key 값이며, 두번째 인수는 ajax type에서 설정한 (get/post) 값
		// ajax에서 get으로 전송하는데 post로 데이터를 받는 경우 값이 없으므로 데이터 전달되지 않는 경우가 있으니, 이를 주의하여 동일한 방식으로 설정해야 한다.

		$serviceQnAIdx = $this->jlamp_comm->xssInput ( 'serviceQnAIdx', 'get' ); // 서비스 Q&A 번호


		// 유효성 검사
		// 서비스 Q&A 번호
		if (!$serviceQnAIdx) {
			$result['returnCode'] = 'I001';
			$result['returnMsg'] = '서비스 Q&A 번호가 없습니다.';
			$this->jlamp_comm->jsonEncEnd($result);
		}

		// SQL 변수
		$isArray = false;						   				  // 배열여부
		$sql='
		SELECT s.ServiceQnAIdx, s.ServiceQnACategoryIdx, s.UserIdx, s.StatusCode, s.Subject, s.Nickname, s.Content, s.AdminIdx, s.Reply, s.ReplyDT, s.ReadCount, s.RegDT,
		(SELECT u.Name FROM User u Where u.UserIdx = s.UserIdx Limit 1 ) AS Name,
		(SELECT a.Name FROM Admin a Where a.AdminIdx = s.AdminIdx Limit 1 ) AS AdminName,
		(SELECT c.CodeName FROM Code c Where c.Code = s.StatusCode Limit 1 ) AS CodeName FROM ServiceQnA s Where s.ServiceQnAIdx='.$serviceQnAIdx;

		$detailSubjectHtml = '';
		$detailContentHtml = '';
		$detailReplySubjectHtml = '';
		$detailReplyContentHtml = '';
		$detailImgHtml = '';
		$readCount = 0;
		$selfAuth = false;
		$modifyPossible = true;

		try {
			// DB 설정
			$this->jlamp_common_mdl->DBConnect('JLAMPBiz');
			// Table 설정
			$this->jlamp_common_mdl->setTable('ServiceQnA');

			$res = $this->jlamp_common_mdl->sqlRows($sql, $isArray);

		} catch (Exception $e) {
			$result['returnCode'] = 'E001';
	        $result['returnMsg'] = $e->getMessage();
		}
				// Rows 변수 설정
		$fileIsArray = false; // 반환값 배열 여부
		$filePage = 1;
		$fileRowCount = 0; // 페이지당 조회될 row count
		$fileColumn = ' ServiceQnAFileIdx, SavePath, SaveFilename, RealFilename, Mime, FileSize '; // 검색할 Columns
		$fileFilter = array(
            array (
				'ServiceQnAIdx' => $serviceQnAIdx // 조건 Column => 조건 값
            ),
            array (
				'ServiceQnAIdx'=> '=' // 조건 Column => Operator
            )
        );

		$fileSort = ''; // 정렬 기준
		$fileGroup = ''; // 그룹 기준


		try {
			// DB 설정
			$this->jlamp_common_mdl->DBConnect('JLAMPBiz');
			// Table 설정
			$this->jlamp_common_mdl->setTable('ServiceQnAFile');

			$fileRes = $this->jlamp_common_mdl->rows($fileIsArray, $filePage, $fileRowCount, $fileColumn, $fileFilter, $fileSort, $fileGroup);

		} catch (Exception $e) {
			$result['returnCode'] = 'E001';
	        $result['returnMsg'] = $e->getMessage();
		}
		if ($res) {
            // 데이터가 있는 경우, 데이터는 rows 배열에 포함
			if ($res[0]) {
                // 본문 List HTML 가공
				foreach ($res[0] as $key => $val) {
					$regDt = '';
					$replyDt = '';
					$classColor = '';
					if ($val->StatusCode == 'G0100001') {
						$classColor = 'green';
					} elseif ($val->StatusCode == 'G0100002') {
						$classColor = 'blue';
					} elseif ($val->StatusCode == 'G0100003') {
						$classColor = 'yellow';
						$modifyPossible = false;
					}
					if ($val->RegDT != '' &&$val->RegDT != null) {
						$regDt = date('Y-m-d', $val->RegDT);
					}
					if ($val->ReplyDT != '' &&$val->ReplyDT != null) {
						$replyDt = date('Y-m-d', $val->ReplyDT);
					}

					if (parent::isAuth() == '') {
						$selfAuth = false;
					}
					elseif (parent::getCookie("UserIdx") == $val->UserIdx) {
						$selfAuth = true;
					}

					$detailSubjectHtml .=
							'
					<div class="title" style="width:100%">
						<span class="label '.$classColor.'" style="line-height: 25px;">'.$val->CodeName.'</span>
						<!--<li class="fr">
							<span class="date m-only-block m-show">'.$regDt.'</span>
						</li>-->
						<span style="word-break: break-all">'.$val->Subject.'</span>
					</div>
					<ul class="f0 pT10">
						<li class="fl">
							<span class="tbl-q">Q</span>
							<span class="name" style="word-break: break-all">'.$val->Nickname.'</span>
						</li>
						<li class="fr">
							<span class="date">'.$regDt.'</span>
						</li><!--  m-none -->
					</ul>   ';
					$detailContentHtml .=
							html_entity_decode($val->Content);
					if ($val->AdminName != '' && html_entity_decode($val->Reply) != '') {
						$detailReplySubjectHtml .=
								'
						<ul class="f0">
							<li class="fl">
								<span class="tbl-q">A</span>
								<span class="name">'.$val->AdminName.'</span>
							</li>
							<li class="fr">
								<span class="date">'.$replyDt.'</span>
							</li>
						</ul>     ';
						$detailReplyContentHtml .=
								html_entity_decode($val->Reply);
					}
					$readCount = (int)$val->ReadCount;
					$readCount++;
				}

			}
		}
		if ($fileRes) {
            // 데이터가 있는 경우, 데이터는 rows 배열에 포함
			if ($fileRes['rows']) {
                // 본문 List HTML 가공
				foreach ($fileRes['rows'][0] as $key => $val) {
					$detailImgHtml .='<div style="padding-bottom:10px">';
					$detailImgHtml .= '<img src="'.$val->SavePath.$val->SaveFilename.'" style="max-width:100%"/>';
					$detailImgHtml .='</div>';
				}

			}
		}
		$detailContentHtml = $detailImgHtml.$detailContentHtml;
		$data = array(
			'ReadCount' => $readCount
		);
		try {
			// DB 설정
			$this->jlamp_common_mdl->DBConnect('JLAMPBiz');

			// Table 설정
			$this->jlamp_common_mdl->setTable('ServiceQnA');

			$res = $this->jlamp_common_mdl->update('ServiceQnaIdx', $serviceQnAIdx, $data);
			/*
			if (!$res) {
				$result['returnCode'] = 'E001';
				$result['returnMsg'] = '정보관리 수정에 실패하였습니다.  \n관리자에게 문의바랍니다.';
			}
			*/
		} catch (Exception $e) {
			$result['returnCode'] = 'E001';
			$result['returnMsg'] = $e->getMessage();
			$this->jlamp_comm->jsonEncEnd($result);
		}


		$result['data']['detailSubjectHtml'] = $detailSubjectHtml;
		$result['data']['detailContentHtml'] = $detailContentHtml;
		$result['data']['detailReplySubjectHtml'] = $detailReplySubjectHtml;
		$result['data']['detailReplyContentHtml'] = $detailReplyContentHtml;
		$result['data']['selfAuth'] = $selfAuth;
		$result['data']['modifyPossible'] = $modifyPossible;
		$result['data']['faq'] = $res[0];
		

		$this->jlamp_comm->jsonEncEnd($result);
	} // end of function qnaDetail_prc
	
	/**
	 * 메소드명: qnaDelete_prc
	 * 작성자: 김영탁
	 * 설 명: 의료서비스 > Q&A 상세 Process
	 *
	 * @return string $result JSON Data
	 *
	 * 최초작성일: 2017.12.11
	 * 최종수정일: 2017.12.11
	 * ---
	 * Date              Auth        Desc
	*/
	public function qnaDelete_prc() {
		$result = array (
			'returnCode' => 0,
			'returnMsg' => '',
			'data' => ''
		);
		// ajax로 전달받은 Input 데이터
		// 첫번째 인수는 ajax data에서 설정한 Key 값이며, 두번째 인수는 ajax type에서 설정한 (get/post) 값
		// ajax에서 get으로 전송하는데 post로 데이터를 받는 경우 값이 없으므로 데이터 전달되지 않는 경우가 있으니, 이를 주의하여 동일한 방식으로 설정해야 한다.

		$serviceQnAIdx = $this->jlamp_comm->xssInput ( 'serviceQnAIdx', 'post' ); // 서비스 Q&A 번호


		// 유효성 검사

		// 서비스 Q&A 번호
		if (!$serviceQnAIdx) {
			$result['returnCode'] = 'I001';
			$result['returnMsg'] = '서비스 Q&A 번호가 없습니다.';
			$this->jlamp_comm->jsonEncEnd($result);
		}


		$data = array(
			'StatusCode' => 'G0100004'
		);

		try {
			// DB 설정
			$this->jlamp_common_mdl->DBConnect('JLAMPBiz');
			// Table 설정
			$this->jlamp_common_mdl->setTable('ServiceQnA');

			$res = $this->jlamp_common_mdl->update('ServiceQnaIdx', $serviceQnAIdx, $data);

		} catch (Exception $e) {
			$result['returnCode'] = 'E001';
	        $result['returnMsg'] = $e->getMessage();
		}
		if ($res) {
		}

		$result['data']['count'] = $res;
		

		$this->jlamp_comm->jsonEncEnd($result);
	} // end of function qnaDelete_prc
	
	/**
	 * 메소드명: qnaModifyDetail_prc
	 * 작성자: 김영탁
	 * 설 명: 의료서비스 > Q&A 상세 Process
	 *
	 * @return string $result JSON Data
	 *
	 * 최초작성일: 2017.12.11
	 * 최종수정일: 2017.12.11
	 * ---
	 * Date              Auth        Desc
	*/
	public function qnaModifyDetail_prc() {
		$result = array (
			'returnCode' => 0,
			'returnMsg' => '',
			'data' => ''
		);
		// ajax로 전달받은 Input 데이터
		// 첫번째 인수는 ajax data에서 설정한 Key 값이며, 두번째 인수는 ajax type에서 설정한 (get/post) 값
		// ajax에서 get으로 전송하는데 post로 데이터를 받는 경우 값이 없으므로 데이터 전달되지 않는 경우가 있으니, 이를 주의하여 동일한 방식으로 설정해야 한다.

		$serviceQnAIdx = $this->jlamp_comm->xssInput ( 'serviceQnAIdx', 'get' ); // 서비스 Q&A 번호
		$detailImgHtml = '';

		// 유효성 검사
		// 서비스 Q&A 번호
		if (!$serviceQnAIdx) {
			$result['returnCode'] = 'I001';
			$result['returnMsg'] = '서비스 Q&A 번호가 없습니다.';
			$this->jlamp_comm->jsonEncEnd($result);
		}

		// SQL 변수
		$isArray = false; // 배열여부
		$column = 'ServiceQnAIdx, ServiceQnACategoryIdx, UserIdx, StatusCode, Subject, Nickname, Content '; // SELECT문
		// 조건절 설정
		$filter = array (
			array (
				'ServiceQnAIdx' => $serviceQnAIdx
			),
			array (
				'ServiceQnAIdx' => '='
			)
		);
				// Rows 변수 설정
		$fileIsArray = false; // 반환값 배열 여부
		$filePage = 1;
		$fileRowCount = 0; // 페이지당 조회될 row count
		$fileColumn = ' ServiceQnAFileIdx, SavePath, SaveFilename, RealFilename, Mime, FileSize '; // 검색할 Columns
		$fileFilter = array(
            array (
				'ServiceQnAIdx' => $serviceQnAIdx // 조건 Column => 조건 값
            ),
            array (
				'ServiceQnAIdx'=> '=' // 조건 Column => Operator
            )
        );

		$fileSort = ''; // 정렬 기준
		$fileGroup = ''; // 그룹 기준


		try {
			// DB 설정
			$this->jlamp_common_mdl->DBConnect('JLAMPBiz');
			// Table 설정
			$this->jlamp_common_mdl->setTable('ServiceQnA');

			$res = $this->jlamp_common_mdl->row($isArray, $column, $filter);
			if (parent::getCookie("UserIdx") != $res->UserIdx) {
				$result['returnCode'] = 'I001';
				$result['returnMsg'] = '이글은 고객님이 등록한 글이 아니므로\n수정할 수 없습니다.';
			}
			$res->Content = html_entity_decode($res->Content);

		} catch (Exception $e) {
			$result['returnCode'] = 'E001';
	        $result['returnMsg'] = $e->getMessage();
		}
		

		try {
			// DB 설정
			$this->jlamp_common_mdl->DBConnect('JLAMPBiz');
			// Table 설정
			$this->jlamp_common_mdl->setTable('ServiceQnAFile');

			$fileRes = $this->jlamp_common_mdl->rows($fileIsArray, $filePage, $fileRowCount, $fileColumn, $fileFilter, $fileSort, $fileGroup);

		} catch (Exception $e) {
			$result['returnCode'] = 'E001';
	        $result['returnMsg'] = $e->getMessage();
		}
		if ($fileRes) {
            // 데이터가 있는 경우, 데이터는 rows 배열에 포함
			if ($fileRes['rows']) {
                // 본문 List HTML 가공
				foreach ($fileRes['rows'][0] as $key => $val) {
					$detailImgHtml .='<div id="'.$val->ServiceQnAFileIdx.'">';
					$detailImgHtml .= $val->RealFilename;
					$detailImgHtml .= '<span style="color:#FF1D1D;cursor:pointer" onclick="doDeleteImg(\''.$val->ServiceQnAFileIdx.'\')">[삭제]</span>';
					$detailImgHtml .='</div>';
				}

			}
		}
		$result['data']['qna'] = $res;
		$result['data']['files'] = $fileRes;
		$result['data']['detailImgHtml'] = $detailImgHtml;
		

		$this->jlamp_comm->jsonEncEnd($result);
	} // end of function qnaModifyDetail_prc
	
	/**
	 * 메소드명: qnaModifySave_prc
	 * 작성자: 김영탁
	 * 설 명: Q&A 저장 Process
	 *
	 * @return string $result JSON DATA
	 *
	 * 최초작성일: 2017.08.01
	 * 최종수정일: 2017.08.16
	 * ---
	 * Date              Auth        Desc
	 */
	public function qnaModifySave_prc() {
		$result = array (
			'returnCode' => 0,
			'returnMsg' => '',
			'data' => ''
		);
		$nickname = $this->jlamp_comm->xssInput('nickname', 'post'); // 닉네임
		$subject = $this->jlamp_comm->xssInput('subject', 'post'); // 제목
		$content = $this->jlamp_comm->xssInput('txtarea_content', 'post'); // 내용
		$serviceQnAIdx = $this->jlamp_comm->xssInput('service_qna_idx', 'post'); // 서비스  Q&A 
		$deleteImg = $this->jlamp_comm->xssInput('delete_img', 'post'); // 이미지 삭제
		$deleteImgArray = explode(',',$deleteImg);
		$dateFolder = Date('Ymd'); //현재날짜
		$date = date('Y-m-d H:i:s');
		$decodeContent = str_replace("&nbsp;","",html_entity_decode($content));

		if (trim($decodeContent) == '') {
			$result['returnCode'] = 'I002';
			$result['returnMsg'] = '내용을 입력해 주십시오';
			$this->jlamp_comm->jsonEncEnd($result);
		}
		$data = array(
			'Subject' => $this->jlamp_comm->htmlEttSQ($subject),
			'Nickname' => $this->jlamp_comm->htmlEttSQ($nickname),
			'Content' => $this->jlamp_comm->htmlEttSQ($content)
		);
				// SQL 변수

		try {
			// DB 설정
			$this->jlamp_common_mdl->DBConnect('JLAMPBiz');

			$this->jlamp_common_mdl->tStart(); 
			// Table 설정
			$this->jlamp_common_mdl->setTable('ServiceQnA');

			$res = $this->jlamp_common_mdl->update('ServiceQnAIdx', $serviceQnAIdx, $data);
			
			for($i = 0 ; $i < count($deleteImgArray) ; $i++){
				// Table 설정
				if ($deleteImgArray[$i]) {

					$fileIsArray = false; // 배열여부
					$fileColumn = ' ServiceQnAFileIdx, SavePath, SaveFilename, RealFilename, Mime, FileSize  '; // SELECT문
					// 조건절 설정
					$fileFilter = array (
						array (
							'ServiceQnAFileIdx' => $deleteImgArray[$i]
						),
						array (
							'ServiceQnAFileIdx' => '='
						)
					);

					$this->jlamp_common_mdl->setTable('ServiceQnAFile');

					$fileRes = $this->jlamp_common_mdl->row($fileIsArray, $fileColumn, $fileFilter);
					if($fileRes->SaveFilename) {
						$oriPath = $_SERVER['DOCUMENT_ROOT'].$fileRes->SavePath.$fileRes->SaveFilename;
						if(file_exists($oriPath)) {
							unlink($oriPath);
						}
					}

					$this->jlamp_common_mdl->setTable('ServiceQnAFile');

					$res = $this->jlamp_common_mdl->delete('ServiceQnAFileIdx', $deleteImgArray[$i]);
				}
			}
			
			// 사진 이미지 등록
			for($i = 0; $i < count($_FILES['files']['name'])-1; $i++) {

				if (isset($_FILES['files']['name'][$i])) {
					$filesName = $_FILES['files']['name'][$i];
					$filesArray = explode(".", $filesName);
					if (strcasecmp($filesArray[count($filesArray)-1],'jpg')!= 0 &&strcasecmp($filesArray[count($filesArray)-1],'gif')!= 0&&strcasecmp($filesArray[count($filesArray)-1],'png')!= 0) {
						$result['returnCode'] = 'I001';
						$result['returnMsg'] = 'gif, jpg, png만 업로드 가능합니다';
						$this->jlamp_comm->jsonEncEnd($result);
					}

					$_FILES['files_'.$i]['name'] = $_FILES['files']['name'][$i];
					$_FILES['files_'.$i]['type'] = $_FILES['files']['type'][$i];
					$_FILES['files_'.$i]['tmp_name'] = $_FILES['files']['tmp_name'][$i];
					$_FILES['files_'.$i]['error'] = $_FILES['files']['error'][$i];
					$_FILES['files_'.$i]['size'] = $_FILES['files']['size'][$i];
					// 서버에 있는 기존의 이미지 삭제 처리

					//$newFileUid = uniqid();
					$this->jlamp_upload->setAllowType(array('jpg', 'png', 'gif'));
					$this->jlamp_upload->isUniqueFilename(true);
					//$this->jlamp_upload->setFilename($newFileUid);
					$this->jlamp_upload->setOverWrite(true);
					$uploadData = $this->jlamp_upload->doUpload('files_'.$i, 'service/qna', true, false, 137, 176);
					if ($uploadData['upload_data']) {
						$uploadData = $uploadData['upload_data'];
						$photoName = $uploadData['file_name'];
					}
					// Photo Data Setting
					$photoData = array (
						'ServiceQnAIdx' => $serviceQnAIdx, // 서비스 Q&A 일련번호
						'SavePath' => '/data/service/qna/'.$dateFolder.'/', // 저장경로
						'SaveFilename' => $uploadData['file_name'], // 저장파일명
						'RealFilename' => $_FILES['files_'.$i]['name'], // 실제파일명
						'Mime' => $uploadData['file_type'], // 파일MIME타입
						'FileSize' => ((int)$uploadData['file_size'])*1024, // 파일사이즈
						'RegDT' => time() // 등록일시
					);

					// Table 설정
					$this->jlamp_common_mdl->setTable('ServiceQnAFile');

					$res = $this->jlamp_common_mdl->insert($photoData);

				}
			}
			$this->jlamp_common_mdl->tComplete();
			/*
			if (!$res) {
				$result['returnCode'] = 'E001';
				$result['returnMsg'] = '정보관리 수정에 실패하였습니다.  \n관리자에게 문의바랍니다.';
			}
			*/
		} catch (Exception $e) {
			$result['returnCode'] = 'E001';
			$result['returnMsg'] = $e->getMessage();
			$this->jlamp_comm->jsonEncEnd($result);
		}
		$this->jlamp_comm->jsonEncEnd($result);
	}

}