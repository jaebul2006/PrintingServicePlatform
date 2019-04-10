<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * 클래스명: Software
 * 작성자: 김영탁
 * 클래스설명: 소프트웨어
 *
 * 최초작성일: 2017.12.18
 * 최종수정일: 2017.12.18
 * ---
 * Date         Auth        Desc
 */
class Software extends JLAMP_Controller {

	public function index() {
        $this->softwareScreen();
	}

	/**
	 * 메소드명: softwareScreen
	 * 작성자: 김영탁
	 * 설 명: 소프트웨어 화면
	 *
	 * 최초작성일: 2017.12.18
	 * 최종수정일: 2017.12.18
	 * ---
	 * Date              Auth        Desc
	*/
	public function softwareScreen() {
		$cssPart = array(
			'<link rel="stylesheet" href="/css/software/software.css">'
		);
		$jsPart = array(
			'<script src="/js/software/software.js"></script>'
		);

		$this->jlamp_comm->setCSS($cssPart);
		$this->jlamp_comm->setJS($jsPart);

    	$this->jlamp_tp->assign(array(
		));

    	$this->jlamp_tp->setURLType(array(
    		'tpl' => 'software.html'
	    ));
	} // end of function softwareScreen

	/**
	 * 메소드명: softwareDetail
	 * 작성자: 김영탁
	 * 설 명: 소프트웨어 화면
	 *
	 * 최초작성일: 2017.12.18
	 * 최종수정일: 2017.12.18
	 * ---
	 * Date              Auth        Desc
	*/
	public function softwareDetail() {
		$division = $this->jlamp_comm->xssInput('division', 'get');		// 페이지
		$cssPart = array(
			'<link rel="stylesheet" href="/css/software/software_detail.css">',
			'<link rel="stylesheet" href="/css/lightslider.css">',
			'<link rel="stylesheet" href="/css/owl.carousel.css">'
		);
		$jsPart = array(
			'<script src="/js/software/software_detail.js"></script>',
			'<script src="/js/lightslider.js"></script>',
			'<script src="/js/owl.carousel.js"></script>'
		);

		$this->jlamp_comm->setCSS($cssPart);
		$this->jlamp_comm->setJS($jsPart);

    	$this->jlamp_tp->assign(array(
			'division' => $division
		));

    	$this->jlamp_tp->setURLType(array(
    		'tpl' => 'software_detail.html'
	    ));
	} // end of function softwareDetail
}