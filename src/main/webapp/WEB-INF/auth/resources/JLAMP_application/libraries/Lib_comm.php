<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * 클래스명: Lib_comm
 * 작성자: 김목영
 * 클래스설명:
 *
 * 최초작성일: 2017.06.14
 * 최종수정일: 2017.06.14
 * ---
 * Date             Auth        Desc
 */
class Lib_comm
{
	function __construct() {
	}


	public function isIE() {
        if(isset($_SERVER['HTTP_USER_AGENT']) && (strpos($_SERVER['HTTP_USER_AGENT'], 'MSIE') !== false || strpos($_SERVER['HTTP_USER_AGENT'], 'Trident') !== false)) {
            return true;
        } else {
            return false;
        }
	} // end of function isIE

	/**
	 * 메소드명: pagination
	 * 작성자: 김영탁
	 * 설 명: 페이지네이션을 만듭니다.
	 *
	 * @param int $page 현재 페이지
	 * @param int $rowSize 한 페이지에 표시될 레코드 수
	 * @param int $rowsCount - 전체 레코드 수
	 * @return string 페이징 HTML
	 *
	 * 최초작성일: 2018.01.05
	 * 최종수정일: 2018.01.05
	 *---
	 * Date        Auth        Desc
	 */
	function pagination($page, $rowSize, $rowsCount) {
		$offsetPage = (floor(($page-1) / PAGE_BLOCK_SIZE) * PAGE_BLOCK_SIZE) + 1;
		$endPage = $offsetPage + (PAGE_BLOCK_SIZE - 1);
		$totalPage = ceil($rowsCount / $rowSize);
		$numBtn = '';

		if ($endPage > $totalPage) $endPage = $totalPage;
		$prevBlockPage = (($offsetPage - 1) < 1) ? $offsetPage: $offsetPage - 1;
		$nextBlockPage = (($endPage+1) > $totalPage) ? $totalPage: $endPage + 1;

		if ($page == 1) {
			$fistBtn = '<li style="padding-top:20px;" class="m-none"><a class="first"  title="처음" >|<</a></li>';
			$prevBtn = '<li style="padding-top:20px;" class="m-none"><a class="prev"  title="이전" ><<</a></li>';
			$rightPrevBtn = '<li style="padding-top:20px;"><a class="prev"  title="이전" ><</a></li>';
		} else {
			$fistBtn = '<li style="padding-top:20px;" class="m-none"><a class="first" style="cursor:pointer" title="처음" onclick="doRows(\'1\')">|<</a></li>';
			$prevBtn = '<li style="padding-top:20px;" class="m-none"><a class="prev"  title="이전" style="cursor:pointer" onclick="doRows(\''.$prevBlockPage.'\')"><<</a></li>';
			$rightPrevBtn = '<li style="padding-top:20px;"><a class="prev"  title="이전" style="cursor:pointer" onclick="doRows(\''.($page-1).'\')"><</a></li>';
		}

		if ($page == $endPage) {
			$endBtn = '<li style="padding-top:20px;" class="m-none"><a class="last" title="마지막" >>|</a></li>';
			$nextBtn = ' <li style="padding-top:20px;"><a class="next" title="다음">>></a></li>';
			$rightNextBtn = ' <li style="padding-top:20px;"><a class="next" title="다음">></a></li>';
		} else {
			$endBtn = '<li style="padding-top:20px;" class="m-none"><a class="last" title="마지막" style="cursor:pointer" onclick="doRows(\''.$totalPage.'\')">>|</a></li>';
			$nextBtn = ' <li style="padding-top:20px;" class="m-none"><a class="next" title="다음" style="cursor:pointer" onclick="doRows(\''.$nextBlockPage.'\')">>></a></li>';
			$rightNextBtn = ' <li style="padding-top:20px;" ><a class="next" title="다음" style="cursor:pointer" onclick="doRows(\''.($page+1).'\')">></a></li>';
		}

		for ($i = $offsetPage; $i <= $endPage; $i++) {
			if ($i == $page)
				$numBtn .= '<li style="padding-top:20px;"><a class="current" style="cursor:pointer" onclick="doRows(\''.$i.'\')">'.$i.'</a></li>';
			else
				$numBtn .= '<li style="padding-top:20px;"><a class="" style="cursor:pointer" onclick="doRows(\''.$i.'\')">'.$i.'</a></li>';
		}

		$paginationHtml = $fistBtn.$prevBtn.$rightPrevBtn.$numBtn.$rightNextBtn.$nextBtn.$endBtn;
		return $paginationHtml;
	}
}

