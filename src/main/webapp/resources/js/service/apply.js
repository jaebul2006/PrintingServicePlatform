jq(document).ready(function () {
	var deptCode = jq("#dept_code").val();

	jq(".gnb-service").addClass("active");
	jq(".sub_service_menu_2").addClass("active").addClass("ov");
	jq("#service_menuBox").css('display', 'block');
	jq("#service_menu_" + deptCode).css('text-decoration', 'underline');

	goServiceStyle();
	// 신청하기 페이지
	jq("#btn_service_apply").click(function() {
		if (m_is_login){
			location.href='/service/apply/applyStep1?cd=' + deptCode + '&tp=new&idx=';
		} else {
			alert('로그인 후 이용해 주십시오.');
			//location.href='/user/login?returnURL=' + urlencode('/service/apply?cd=' + deptCode);
			location.href='/user/login';
		}
	});

	// 서비스 현황조회 페이지
	jq("#btn_go_apply_list").click(function() {
		if (m_is_login){
			location.href='/service/apply/applyList?cd=' + deptCode;
		} else {
			alert('로그인 후 이용해 주십시오.');
			//location.href='/user/login?returnURL=' + urlencode('/service/apply?cd=' + deptCode);
			location.href='/user/login';
		}
	});
});

//# sourceURL=apply.js