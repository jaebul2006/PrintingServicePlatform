<?php (defined('BASEPATH')) OR exit('No direct script access allowed');
header("Cache-Control: no-cache, must-revalidate");
header("Pragma: no-cache");

/**
 * 클래스명: Main
 * 작성자:
 * 클래스설명: Main
 *
 * 최초작성일:
 * 최종수정일:
 * ---
 * Date         	Auth        Desc
 */
class Main extends JLAMP_Controller {
	function __construct() {
		parent::__construct();
	}

	/**
	 * 메소드명: index
	 * 작성자: 최영은
	 * 설 명: 메인 페이지
	 *
	 * 최초작성일: 2017.12.11
	 * 최종수정일: 2017.12.11
	 * ---
	 * Date     Auth        Desc
	 */
	public function index() {
		$cssPart = array(
		);

		$jsPart = array(
			'<script src="/js/main.js"></script>'
		);

		$this->jlamp_comm->setCSS($cssPart);
		$this->jlamp_comm->setJS($jsPart);

		$this->jlamp_tp->setCompileDir();
		$this->jlamp_tp->setTemplateDir();

		$this->jlamp_tp->assign(array(
			'menuSelection' => 'service'
		));

		$this->jlamp_tp->define(array(
			'tpl' => 'main.html'
		));
	} // end of function index

	
	/**
	 * 메소드명: faqList_prc
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
	public function faqList_prc() {
		$result = array (
			'returnCode' => 0,
			'returnMsg' => '',
			'data' => ''
		);
		// ajax로 전달받은 Input 데이터
		// 첫번째 인수는 ajax data에서 설정한 Key 값이며, 두번째 인수는 ajax type에서 설정한 (get/post) 값
		// ajax에서 get으로 전송하는데 post로 데이터를 받는 경우 값이 없으므로 데이터 전달되지 않는 경우가 있으니, 이를 주의하여 동일한 방식으로 설정해야 한다.
		//$serviceFAQCategoryIdx = $this->jlamp_comm->xssInput ( 'serviceFAQCategoryIdx', 'get' ); // FAQ 카테고리 번호
		$currPage = 1; // 현재 페이지 번호


		// 유효성 검사

		$pageBlockSize = 5;
		// Rows 변수 설정
		$isArray = false; // 반환값 배열 여부
		$rowCount = 5; // 페이지당 조회될 row count
		$column = ' ServiceFAQIdx,ServiceFAQCategoryIdx, Adminidx, Subject, Content, RegDT'; // 검색할 Columns
		$filter = '';

		$sort = ' RegDT DESC'; // 정렬 기준
		$group = ''; // 그룹 기준

		// SQL 변수
		/*
		$isArray = false;						   				  // 배열여부
		$sql='
		SELECT s.ServiceFAQIdx, s.ServiceFAQCategoryIdx, s.UserIdx, s.StatusCode, s.Subject, s.Nickname, s.Content, s.AdminIdx, s.Reply, s.ReplyDT, s.ReadCount, s.RegDT,
		(SELECT u.Name FROM User u Where u.UserIdx = s.UserIdx Limit 1 ) AS Name,
		(SELECT c.CodeName FROM Code c Where c.Code = s.StatusCode Limit 1 ) AS CodeName FROM ServiceFAQ s Where s.StatusCode != \'G0100004\'';
		*/
		$faqHtml = '';
		$count = 0;

		try {
			// DB 설정
			$this->jlamp_common_mdl->DBConnect('JLAMPBiz');
			// Table 설정
			$this->jlamp_common_mdl->setTable('ServiceFAQ');

			$res = $this->jlamp_common_mdl->rows($isArray, $currPage, $rowCount, $column, $filter, $sort, $group);

		} catch (Exception $e) {
			$result['returnCode'] = 'E001';
	        $result['returnMsg'] = $e->getMessage();
		}
		if ($res) {
            // 데이터가 있는 경우, 데이터는 rows 배열에 포함
			if ($res['rows']) {
                // 본문 List HTML 가공
				foreach ($res['rows'][0] as $key => $val) {
					$classColor = '';

						$faqHtml .=
							'
						<li><a style="cursor:pointer;" onclick="doFaqListRows(\''.$val->ServiceFAQCategoryIdx.'\')">'.$val->Subject.'</a><span class="date">'.date('Y-m-d', $val->RegDT).'</span></li>';
						$count++;
				}

			} else {
				$faqHtml .= '
					<li>                  	  
						<div style="text-align:center;padding-top:20px">등록된 데이터가 없습니다.</div>
					</li>';
			}
		} else {
			$faqHtml .= '
				<li>                  	  
					<div style="text-align:center;padding-top:20px">등록된 데이터가 없습니다.</div>
				</li>';
		}
		

		$result['data']['count'] = $res['count'];
		$result['data']['faqHtml'] = $faqHtml;

		$this->jlamp_comm->jsonEncEnd($result);
	} // end of function faqList_prc
	
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
		$currPage = 1; // 현재 페이지 번호


		// 유효성 검사

		$pageBlockSize = 5;
		// Rows 변수 설정
		$isArray = false; // 반환값 배열 여부
		$rowCount = 5; // 페이지당 조회될 row count
		$column = ' ServiceQnAIdx, ServiceQnACategoryIdx, UserIdx, StatusCode, Subject, Nickname, Content, AdminIdx, Reply, ReplyDT, ReadCount, RegDT'; // 검색할 Columns
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
				foreach ($res['rows'][0] as $key => $val) {
					$classColor = '';

						$qnaHtml .=
							'
						<li><a style="cursor:pointer;" onclick="doQnaDetailRows(\''.$val->ServiceQnAIdx.'\')">'.$val->Subject.'</a><span class="date">'.date('Y-m-d', $val->RegDT).'</span></li>';
						$count++;
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
		

		$result['data']['count'] = $res['count'];
		$result['data']['qnaHtml'] = $qnaHtml;

		$this->jlamp_comm->jsonEncEnd($result);
	} // end of function qnaList_prc

}
