jq(document).ready(function () {
	//jq(".mobile_main_menu_service").addClass("menu_active");
	//jq(".sub_service_menu_5").addClass("num3").addClass("ov");
	jq(".gnb-service").removeClass("active");
	jq(".gnb-software").addClass("active");
	jq(".sub_software_menu_5").addClass("active").addClass("ov");
	goSoftwareStyle();
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
	doDetailRows();
	jq("#nickname").keyup(function() {
		getNicknameRepSpecial();
	});
	jq("#subject").keyup(function() {
		getSubjectRepSpecial();
	});
});

/**
 * 메소드명: doDeleteImg
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
function doDeleteImg(serviceQnAFileIdx) {
	jq("#"+serviceQnAFileIdx).remove();
	var deleteImg = jq("#delete_img").val();
	jq("#delete_img").val(serviceQnAFileIdx+','+deleteImg);
}

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
	var swQnAIdx = jq("#sw_qna_idx").val();
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
		url: '/software/qna/qnaModifySave_prc',
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
				location.href = '/software/qna/qnaDetail?swQnAIdx='+swQnAIdx+'&page='+jq("#page").val();
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
	location.href = '/software/qna/qnaList?page='+jq("#page").val();
}

/**
 * 메소드명: doDetailRows
 * 작성자: 김영탁
 * 설 명: 상세 조회 Process
 *
 * @param int page 선택된 페이지 번호
 * 
 * 최초작성일: 2017.10.10
 * 최종수정일: 2017.10.10
 * ---
 * Date              Auth        Desc
 */
function doDetailRows() {
	// url: 요청이 전송되는 URL (프로세스명은 뒤에 꼭 _prc 가 붙여져야 함)
	//       Ex) /폴더명/Controllers 폴더 안 php 파일명(컨트롤러명)/실행할 메소드명(프로세스)
	var swQnAIdx = jq("#sw_qna_idx").val();
	var returnCode = 1;
	jq.ajax({
		url: "/software/qna/qnaModifyDetail_prc",
		type: "get",
		dataType: "json",
		data : {
			swQnAIdx: swQnAIdx
		},
		success: function (res, status, xhr) {
			// 프레임워크 에러코드가 0 (성공)인 경우
			returnCode = res.returnCode;
			if (res.returnCode == 0) {
				jq("#nickname").val(res.data.qna.Nickname);
				jq("#subject").val(res.data.qna.Subject);
				jq("#txtarea_content").data('kendoEditor').value(res.data.qna.Content);
				jq("#detail_img_html").html(res.data.detailImgHtml);
			} 
			// 프레임워크 에러코드가 E이거나 I 인 경우
			else if(res.returnCode == 'I001'){
			} else {
				// 알림메시지 표시
				alert(res.returnMsg);
			}
		},
		error: function (xhr, status, error) {
			alert(error);
		},
		complete: function (xhr, status) {
			if(returnCode == 'I001'){
				// 알림메시지 표시
				alert('이글은 고객님이 등록한 글이 아니므로\n수정할 수 없습니다.');
				history.back();
			}
		}
	});
} // end of function doDetailRows

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