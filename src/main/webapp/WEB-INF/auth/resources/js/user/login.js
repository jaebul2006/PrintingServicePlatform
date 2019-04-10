jq(document).ready(function () {
	goServiceStyle();
	// 진료기관
    jq("#login_hospital").click(function() {
		jq("#login_type").val("hospital");
		jq("#login_email").val("");
		jq("#password").val("");
		jq("#service_code").val("");

		jq("#login_hospital").addClass("active");
		jq("#login_sp").removeClass("active");
		jq(".service_code_area").show();
		jq("#login_email").focus();
	});
	// 서비스 제공자
    jq("#login_sp").click(function() {
		jq("#login_type").val("sp");
		jq("#login_email").val("");
		jq("#password").val("");
		jq("#service_code").val("");

		jq("#login_sp").addClass("active");
		jq("#login_hospital").removeClass("active");
		jq(".service_code_area").hide();
		jq("#login_email").focus();
	});
    // 아이디 입력 체크
    jq("#login_email").keyup(function() {
        var inputVal = jq(this).val();
        jq(this).val(inputVal.replace(/[^a-z0-9@/./_/-]/gi, ''));
    });

	// 엔터키 처리
    jq("#login_email, #password, #service_code").keydown(function (key) {
        if(key.keyCode == 13){
            doLogin();
        }
    });

	// 이메일 란 focus
	jq("#login_email").focus();
});

/**
 * 메소드명: doLogin
 * 작성자: 최영은
 * 설 명:  로그인 Process
 *
 * 최초작성일: 2017.12.11
 * 최종수정일: 2017.12.11
 * ---
 * Date              Auth        Desc
*/
function doLogin() {
    var loginType = jq("#login_type").val(); // 로그인 회원 타입
    var loginMail = jq("#login_email").val(); // 이메일
    var password = jq("#password").val(); // 비밀번호
	var servicecode = jq("#service_code").val(); // 서비스코드
    var returnUrl = jq("#return_url").val(); // 이전 페이지 url

    var rtnVal = false;
    var returnUrl = returnUrl ? returnUrl : "/";

    // 유효성 검사
	if((loginType == 'hospital' && !servicecode ) || loginType == 'sp') {
		// 아이디
		if (!loginMail) {
			alert("이메일을 입력해 주십시오");
			jq("#login_email").focus();
			return false;
		} else if (!JLAMP.common.isEmail(loginMail)) {
			alert("이메일 주소가 유효하지 않습니다.");
			jq("#login_email").focus();
			return false;
		}

		// 비밀번호
		if (!password) {
			alert("비밀번호를 입력해 주십시오");
			jq("#password").focus();
			return false;
		}
	}

	var returnUrl =  servicecode ? '/user/serviceStatus?tp=view&servicecode=' + servicecode : returnUrl;

    // Loading Indicator
    JLAMP.common.loading('.login_wrap', 'pulse');

	if(loginType && loginMail && loginMail) {
		jq.ajax({
			url: '/user/login_prc',
			data: {
				loginType: loginType,
				loginMail: loginMail,
				password: password
			   // ,servicecode: servicecode
			},
			async: false,
			type: 'post',
			dataType: 'json',
			success: function(res, status, xhr) {
				if (res) {
					if (res.returnCode == 0) {
						location.href = returnUrl;
					}  else {
						alert(res.returnMsg);
					}
				}
			},
			error: function (xhr, status, error) {
				alert(error);
			},
			complete: function (xhr, status) {
				JLAMP.common.loadingClose('.login_wrap');
			}
		});
	} else {

		if(loginType == 'hospital' && servicecode) {
			location.href = '/user/serviceStatus?tp=view&servicecode=' + servicecode;
		}
	}



    return false;
} // end of function doLogin


//# sourceURL=Login.js