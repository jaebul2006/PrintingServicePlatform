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
			'menuSelection' => 'software'
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

        $division = $this->jlamp_comm->xssInput('division', 'get');
        if(!parent::isAuth()) {
            $this->jlamp_js->replace('/user/login?returnURL='.urlencode("/software/software/softwareDetail?division=".$division), '로그인 후 이용해 주십시오');
			return;
        }
		$result = array(
			'returnCode' => 0,
            'returnMsg' => ''
		);

        $fileName = $this->jlamp_comm->xssInput('fileName', 'get');
		$realFileName = '';
		if ($fileName == 'Setup') {
			$realFileName = 'MediACE3D_Seutp.zip';
		} elseif ($fileName == 'Tutorial') {
			$realFileName = 'MediACE3D_Tutorial.pdf';
		} elseif ($fileName == 'FootSample') {
			$realFileName = 'Foot_Sample01.stl';
		} elseif ($fileName == 'HandSample') {
			$realFileName = 'Hand_Sample01.stl';
		}
		if ($realFileName) {

			$path = '/image/'.$realFileName;
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
						$realFileName = iconv('UTF-8', 'cp949//IGNORE', $realFileName);
						header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
						header("Pragma: public");
					} else {
						$realFileName = $realFileName;
						header("Cache-Control: no-cache, must-revalidate");
						header("Pragma: no-cache");
					}
					header("Content-Disposition: attachment; filename=\"" . $realFileName . "\"");
					header("Content-Type: application/octet-stream");
					//header("Content-Type: file/unknown");
					//header("Content-Length: " . $fileSize);
					header('Content-Transfer-Encoding: binary');
					header('Expires:0');

					ob_end_clean();
					if (!fpassthru($fhandle))
						fclose($fhandle);
				}
            }
		} else {
			$result['returnCode'] = 'I002';
			$result['returnMsg'] = '올바른 접속경로가 아닙니다.';

			$this->jlamp_js->back($result['returnMsg']);
		}
	} // end od function fileDownload_prc
}