jq(document).ready(function () {
	//jq(".mobile_main_menu_service").addClass("menu_active");
	jq(".gnb-service").addClass("active");
	jq(".sub_service_menu_5").addClass("active").addClass("ov");

	goServiceStyle();
	jq("#files").kendoUpload({
		localization: {
			select: '파일 선택'
		}
	});
	var defaultTools = kendo.ui.Editor.defaultTools;
    defaultTools["insertLineBreak"].options.shift = false;
    delete defaultTools["insertParagraph"].options;
	JLAMP.editorMessages.linkWebAddress= "웹 주소" ;
	JLAMP.editorMessages.linkText= "텍스트" ;
	JLAMP.editorMessages.linkToolTip= "툴팁" ;
	JLAMP.editorMessages.linkOpenInNewWindow= "새로운 창에서 링크 열기" ;
	JLAMP.editorTools['7'] = '';
	jq("#txtarea_content").kendoEditor({
		resizable: JLAMP.editorResizable,
		messages: JLAMP.editorMessages,
		tools: JLAMP.editorTools
	});
	jq(".k-widget.k-editor.k-header.k-editor-widget").css('width','100%');
	jq("#nickname").keyup(function() {
		getNicknameRepSpecial();
	});
	jq("#subject").keyup(function() {
		getSubjectRepSpecial();
	});
});

/**
 * 메소드명: doSave
 * 작성자: 김영탁
 * 설 명: 저장 Process
 *
 * @param int page 선택된 페이지 번호
 *
 * 최초작성일: 2017.10.10
 * 최종수정일: 2017.10.10
 * ---
 * Date              Auth        Desc
 */
function doSave() {
	var form = jq("#frm_qna_save");
	var formData = new FormData(form[0]);
	var returnCode = 1;
	var serviceQnAIdx = '';
	var nickname = jq("#nickname").val();
	var subject = jq("#subject").val();
	var txtareaContent = jq("#txtarea_content").val();
	if (nickname.trim() == ''||nickname.trim() == null) {
		alert('닉네임을 입력해 주십시오');
		jq("#nickname").focus();
		return;
	}
	if (subject.trim() == ''||subject.trim() == null) {
		alert('제목을 입력해 주십시오');
		jq("#subject").focus();
		return;
	}
	if (txtareaContent.trim() == ''||txtareaContent.trim() == null) {
		alert('내용을 입력해 주십시오');
		jq("#txtarea_content").focus();
		return;
	}
	if (jq("#nickname").val().length > 20) {
		alert('닉네임을 10자 이하로 입력해 주십시오');
		jq("#nickname").focus();
		return;
	}
	if (jq("#subject").val().length > 50) {
		alert('제목을 25자 이하로 입력해 주십시오');
		jq("#subject").focus();
		return;
	}
	jq.ajax({
		url: '/service/qna/qnaRegisterSave_prc',
		type: 'post',
		data: formData,
		contentType: false,
		processData: false,
		dataType: 'json',
		async: true,
		success: function(res, status, xhr) {
			if (res) {
				returnCode = res.returnCode;
				
				if (res.returnCode == 0) {
					serviceQnAIdx = res.data.serviceQnAIdx;
				}  else {
					alert(res.returnMsg);
				}
			}
		},
		error: function (xhr, status, error) {
			alert(error);
		},
		complete: function (xhr, status) {
			if (returnCode == 0 ) {
				location.href = '/service/qna/qnaDetail?serviceQnAIdx='+serviceQnAIdx+'&page=1';
			}
		}
	});
}

/**
 * 메소드명: goList
 * 작성자: 김영탁
 * 설 명: 리스트 화면 이동 Process
 *
 * @param int page 선택된 페이지 번호
 *
 * 최초작성일: 2017.10.10
 * 최종수정일: 2017.10.10
 * ---
 * Date              Auth        Desc
 */
function goList() {
	location.href = '/service/qna/qnaList?page='+jq("#page").val();
}

/**
 * 메소드명: getNicknameRepSpecial
 * 작성자: 김영탁
 * 설 명: 닉네임 문자체크
 *
 * @param int page 선택된 페이지 번호
 *
 * 최초작성일: 2017.10.10
 * 최종수정일: 2017.10.10
 * ---
 * Date              Auth        Desc
 */
function getNicknameRepSpecial() {
	var obj  = { 
        obj: jq( "#nickname"), 
        space: true, 
        br: true, 
        allowSC: false
    };
    var msg  = '';
    JLAMP.common.repSpecialChar(obj,msg);
}

/**
 * 메소드명: getSubjectRepSpecial
 * 작성자: 김영탁
 * 설 명: 제목 문자체크
 *
 * @param int page 선택된 페이지 번호
 *
 * 최초작성일: 2017.10.10
 * 최종수정일: 2017.10.10
 * ---
 * Date              Auth        Desc
 */
function getSubjectRepSpecial() {
	var obj  = { 
        obj: jq( "#subject"), 
        space: true, 
        br: true, 
        allowSC: false
    };
    var msg  = '';
    JLAMP.common.repSpecialChar(obj,msg);
}
//# sourceURL=service_qna_register.js