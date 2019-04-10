//JLAMP.common.repHangul(this);
jq(document).ready(function () {
	goServiceStyle();
    // 이메일 입력 체크
    jq("#email").keyup(function() {
        var inputVal = jq(this).val();
        jq(this).val(inputVal.replace(/[^a-z0-9@/./_/-]/gi, ''));
    });

    // 성명 입력 체크
    jq("#user_name").keyup(function() {
        jq(this).val(JLAMP.common.repName(jq(this).val()));
    });

    jq("#email").focus();
});

/**
 * 메소드명: findPassword
 * 작성자: 김목영
 * 설 명: 비밀번호 찾기 Process
 *
 * 최초작성일: 2017.07.24
 * 최종수정일: 2017.07.24
 * ---
 * Date              Auth        Desc
*/
function findPassword() {
    var email = jq("#email").val();                     // 이메일
    var userName = jq("#user_name").val();
    var regExp = /^([a-z0-9_-])+\@(([a-z0-9-])+\.)+([a-z0-9]{2,4})+$/;

    // 유효성 검사
    // 이메일
    if (!email) {
        alert("이메일을 입력해 주십시오");
        jq("#email").focus();
        return false;
    } else if (!JLAMP.common.isEmail(email)) {
        alert("이메일 주소가 유효하지 않습니다.");
        jq("#email").focus();
        return false;
    }
	// 성명
    if (!userName) {
        alert("성명을 입력해 주십시오");
        jq("#user_name").focus();
        return false;
    }

    // Loading Indicator
    JLAMP.common.loading('#frm_find_password', 'pulse');

    jq.ajax({
		url: '/user/findPassword_prc',
		data: {
			email: email,
            userName: userName
        },
		type: 'post',
		dataType: 'json',
		success: function(res, status, xhr) {
			if (res) {
				if (res.returnCode == 0) {
                    alert("메일이 발송되었습니다.");
                    location.href = '/user/login';
				}  else {
					alert(res.returnMsg);
				}
			}
        },
        error: function (xhr, status, error) {
			alert(error);
		},
		complete: function (xhr, status) {
			JLAMP.common.loadingClose('#frm_find_password');
		}
	});

    return false;
} // end of function findPassword

//# sourceURL=find_password.js