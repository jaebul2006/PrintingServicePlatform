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
class Service extends JLAMP_Controller {

	public function index() {
        $this->intro();
	}

	/**
	 * 메소드명: intro
	 * 작성자: 최영은
	 * 설 명: 서비스 소개 화면
	 *
	 * 최초작성일: 2017.12.18
	 * 최종수정일: 2017.12.18
	 * ---
	 * Date              Auth        Desc
	*/
	public function intro() {
		$cssPart = array(
			'<link rel="stylesheet" href="/css/service/intro.css">'
		);
		$jsPart = array(
			'<script src="/js/service/intro.js"></script>'
		);

		$this->jlamp_comm->setCSS($cssPart);
		$this->jlamp_comm->setJS($jsPart);

    	$this->jlamp_tp->assign(array(
			'menuSelection' => 'service'
		));

    	$this->jlamp_tp->setURLType(array(
    		'tpl' => 'intro.html'
	    ));
	} // end of function intro

}