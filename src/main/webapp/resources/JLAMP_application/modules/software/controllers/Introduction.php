<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * 클래스명: Introduction
 * 작성자: 김영탁
 * 클래스설명: 서비스 신청
 *
 * 최초작성일: 2017.12.18
 * 최종수정일: 2017.12.18
 * ---
 * Date         Auth        Desc
 */
class Introduction extends JLAMP_Controller {

	public function index() {
        $this->serviceIntroduction();
	}

	/**
	 * 메소드명: serviceIntroduction
	 * 작성자: 최영은
	 * 설 명: 서비스 소개 화면
	 *
	 * 최초작성일: 2017.12.18
	 * 최종수정일: 2017.12.18
	 * ---
	 * Date              Auth        Desc
	*/
	public function serviceIntroduction() {
		$cssPart = array(
			'<link rel="stylesheet" href="/css/software/introduction.css">'
		);
		$jsPart = array(
			'<script src="/js/software/introduction.js"></script>'
		);
		$this->jlamp_comm->setCSS($cssPart);
		$this->jlamp_comm->setJS($jsPart);

		$this->jlamp_tp->assign(array(
			'menuSelection' => 'software'
		));

    	$this->jlamp_tp->setURLType(array(
    		'tpl' => 'introduction.html'
	    ));
	} // end of function introduction

}