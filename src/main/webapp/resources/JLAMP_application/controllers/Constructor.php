<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class constructor extends JLAMP_Controller {
	public function index() {
		$this->jlamp_tp->assign(array(
			'userName' => parent::getCookie('UserName'),
			'loginType' => parent::getCookie('LoginType'),
			'ComName' => parent::getCookie('ComName'),
			'userEmail' => parent::getCookie(LOGIN_KEY),
			'companyIdx' => parent::getCookie('CompanyIdx'),
			'isManager' => parent::getCookie('IsManager')
		));
	}
}