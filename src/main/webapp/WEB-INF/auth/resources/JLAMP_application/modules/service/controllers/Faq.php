<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * 클래스명: Faq
 * 작성자: 김영탁
 * 클래스설명: 의료서비스
 *
 * 최초작성일: 2017.12.11
 * 최종수정일: 2017.12.11
 * ---
 * Date         Auth        Desc
 */
class Faq extends JLAMP_Controller {

	public function index() {
		if (parent::isAuth()) {
			header('Location: /');
		} else {
			$this->serviceFaq();
		}
	}

	/**
	 * 메소드명: serviceFaq
	 * 작성자: 김영탁
	 * 설 명: 의료서비스 > 자주 묻는 질문 화면
	 *
	 * 최초작성일: 2017.12.11
	 * 최종수정일: 2017.12.11
	 * ---
	 * Date              Auth        Desc
	*/
	public function serviceFaq() {
		$cssPart = array(
			'<link rel="stylesheet" href="/css/service/faq.css">'
		);
		$jsPart = array(
			'<script src="/js/service/faq.js"></script>'
		);

		$this->jlamp_comm->setCSS($cssPart);
		$this->jlamp_comm->setJS($jsPart);

    	$this->jlamp_tp->assign(array(
			//'returnURL' => urldecode($returnURL)
			'menuSelection' => 'service'
		));

    	$this->jlamp_tp->setURLType(array(
    		'tpl' => 'faq.html'
	    ));
	} // end of function serviceFaq

	/**
	 * 메소드명: categoryFaq_prc
	 * 작성자: 김영탁
	 * 설 명: 의료서비스 > 자주 묻는 질문 Process
	 *
	 * @return string $result JSON Data
	 *
	 * 최초작성일: 2017.12.11
	 * 최종수정일: 2017.12.11
	 * ---
	 * Date              Auth        Desc
	*/
	public function categoryFaq_prc() {
		$result = array (
			'returnCode' => 0,
			'returnMsg' => '',
			'data' => ''
		);


		// 유효성 검사

		// Rows 변수 설정
		$currPage = 1;
		$isArray = false; // 반환값 배열 여부
		$rowCount = 100; // 페이지당 조회될 row count
		$column = ' ServiceFAQCategoryIdx, Adminidx, Category '; // 검색할 Columns
		$filter = ''; // 조건절
		$sort = ''; // 정렬 기준
		$group = ''; // 그룹 기준

		$categoryHtml = '';
		$paginationHtml = '';
		$i = 0;

		try {
			// DB 설정
			$this->jlamp_common_mdl->DBConnect('JLAMPBiz');
			// Table 설정
			$this->jlamp_common_mdl->setTable('ServiceFAQCategory');

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
					if ($i == 0) {
						$categoryHtml .=
							'
							<li class="active" style="border-left: 1px solid #d1d1d1;"><a style="cursor:pointer;" class="category" onclick="categoryClick(\''.$val->ServiceFAQCategoryIdx.'\',\'1\')">'.$val->Category.'</a></li>';
					} else {
						$categoryHtml .=
							'
							<li><a style="cursor:pointer;" class="category" onclick="categoryClick(\''.$val->ServiceFAQCategoryIdx.'\',\'1\')">'.$val->Category.'</a></li>';
					}
					$i++;
				}

			}
		}
		$result['data']['category'] = $res['rows'];
		$result['data']['categoryHtml'] = $categoryHtml;

		$this->jlamp_comm->jsonEncEnd($result);
	} // end of function categoryFaq_prc

	/**
	 * 메소드명: faqList_prc
	 * 작성자: 김영탁
	 * 설 명: 의료서비스 > 자주 묻는 질문 Process
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
		$serviceFAQCategoryIdx = $this->jlamp_comm->xssInput ( 'serviceFAQCategoryIdx', 'get' ); // FAQ 카테고리 번호
		$currPage = $this->jlamp_comm->xssInput ( 'page', 'get' ); // 현재 페이지 번호

		$pageBlockSize = 5;

		// 유효성 검사

		// Rows 변수 설정
		$isArray = false; // 반환값 배열 여부
		$rowCount = 5; // 페이지당 조회될 row count
		$column = ' ServiceFAQIdx,ServiceFAQCategoryIdx, Adminidx, Subject, Content '; // 검색할 Columns
		$filter = array(
            array (
				'ServiceFAQCategoryIdx' => $serviceFAQCategoryIdx // 조건 Column => 조건 값
            ),
            array (
				'ServiceFAQCategoryIdx'=> '=' // 조건 Column => Operator
            )
        );

		$sort = ''; // 정렬 기준
		$group = ''; // 그룹 기준

		$faqHtml = '<ul id="accordion" >';
		$paginationHtml = '';
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
						$faqHtml .=
							'
						<li>
							<div class="panel-title">
								<span class="faq_q">Q</span>
								<span class="faq_title">'.$val->Subject.'</span>
							</div>
							<div class="panel-content">
								<span class="faq_a">A</span>
								<span class="faq_content">'.$val->Content.'</span>
							</div>
						</li>';
						$count++;
				}
				if ($count >0) {
					$offsetPage = (floor(($currPage-1) / $pageBlockSize) * $pageBlockSize) + 1;
					$endPage = $offsetPage + ($pageBlockSize - 1);
					$totalPage = ceil($res['count'] / $rowCount);
					$numBtn = '';

					if ($endPage > $totalPage) $endPage = $totalPage;
					$prevBlockPage = (($offsetPage - 1) < 1) ? $offsetPage: $offsetPage - 1;
					$nextBlockPage = (($endPage+1) > $totalPage) ? $totalPage: $endPage + 1;

					$fistBtn = '<li class="m-none"><a class="first"  title="처음" onclick="categoryClick(\''.$serviceFAQCategoryIdx.'\',\'1\')"><<</a></li>';
					$prevBtn = '<li><a class="prev"  title="이전" onclick="categoryClick(\''.$serviceFAQCategoryIdx.'\',\''.$prevBlockPage.'\')"><</a></li>';


					$endBtn = '<li class="m-none"><a class="last" title="마지막"  onclick="categoryClick(\''.$serviceFAQCategoryIdx.'\',\''.$endPage.'\')">>></a></li>';
					$nextBtn = ' <li><a class="next" title="다음"  onclick="categoryClick(\''.$serviceFAQCategoryIdx.'\',\''.$nextBlockPage.'\')">></a></li>';

					for ($i = $offsetPage; $i <= $endPage; $i++) {
						if ($i == $currPage)
							$numBtn .= '<li><a class="current" onclick="categoryClick(\''.$serviceFAQCategoryIdx.'\',\''.$i.'\')">'.$i.'</a></li>';
						else
							$numBtn .= '<li><a class="" onclick="categoryClick(\''.$serviceFAQCategoryIdx.'\',\''.$i.'\')">'.$i.'</a></li>';
					}

					$paginationHtml = $fistBtn.$prevBtn.$numBtn.$nextBtn.$endBtn;
				} else {
					$faqHtml .= '
						<li>
							<div style="text-align:center;padding-top:20px">등록된 데이터가 없습니다.</div>
						</li>';
				}
			}
		}

		$faqHtml .= '</ul>';
		$result['data']['faq'] = $res['rows'];
		$result['data']['faqHtml'] = $faqHtml;
		$result['data']['paginationHtml'] = $paginationHtml;


		$this->jlamp_comm->jsonEncEnd($result);
	} // end of function faqList_prc

}