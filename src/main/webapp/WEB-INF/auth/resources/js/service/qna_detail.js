jq(document).ready(function () {
	//jq(".mobile_main_menu_service").addClass("menu_active");
	jq(".gnb-service").addClass("active");
	jq(".sub_service_menu_5").addClass("active").addClass("ov");

	goServiceStyle();
	doDetailRows();
});

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
	var serviceQnAIdx = jq("#service_qna_idx").val();
	var selfAuth = false;
	var modifyPossible = true;
	jq.ajax({
		url: "/service/qna/qnaDetail_prc",
		type: "get",
		dataType: "json",
		data : {
			serviceQnAIdx: serviceQnAIdx
		},
		success: function (res, status, xhr) {
			// 프레임워크 에러코드가 0 (성공)인 경우
			if (res.returnCode == 0) {
				jq("#detail_subject_html").html(res.data.detailSubjectHtml);
				jq("#detail_content_html").html(res.data.detailContentHtml);
				if (res.data.detailReplySubjectHtml == '') {
					jq("#detail_reply_subject_html").removeClass('view-head');
					jq("#detail_reply_subject_html").removeClass('mT50');
				} else {
					jq("#detail_reply_subject_html").html(res.data.detailReplySubjectHtml);
				}
				if (res.data.detailReplyContentHtml == '') {
					jq("#detail_reply_content_html").removeClass('view-content');
				} else {
					jq("#detail_reply_content_html").html(res.data.detailReplyContentHtml);
				}
				selfAuth = res.data.selfAuth;
				modifyPossible = res.data.modifyPossible;
			}
			// 프레임워크 에러코드가 E이거나 I 인 경우
			else {
				// 알림메시지 표시
				alert(res.returnMsg);
			}
		},
		error: function (xhr, status, error) {
			alert(error);
		},
		complete: function (xhr, status) {
			if (selfAuth == false) {
				jq("#li_button").html('<a onclick="goList()" class="button">리스트</a>');
			} else if (modifyPossible == false) {
				jq("#li_button").html('<a style="margin-left: 5px;" onclick="doDelete()" id="btn_delete" class="button m-none">삭제</a><a style="margin-left: 5px;" onclick="goList()" class="button">리스트</a>');
			} else {
				jq("#li_button").html('<a onclick="doModify()" id="btn_modify" class="button m-none">수정</a><a style="margin-left: 5px;" onclick="doDelete()" id="btn_delete" class="button m-none">삭제</a><a style="margin-left: 5px;" onclick="goList()" class="button">리스트</a>');
			}
		}
	});
} // end of function doDetailRows

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
 * 메소드명: doDelete
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
function doDelete() {
	// url: 요청이 전송되는 URL (프로세스명은 뒤에 꼭 _prc 가 붙여져야 함)
	//       Ex) /폴더명/Controllers 폴더 안 php 파일명(컨트롤러명)/실행할 메소드명(프로세스)
	var serviceQnAIdx = jq("#service_qna_idx").val();
	var returnCode = 1;
	if (serviceQnAIdx == '' || serviceQnAIdx == null) {
		alert('서비스 Q&A 번호가 없습니다.');
		return;
	}
	if (confirm('삭제하시면 다시 복구 할 수 없습니다.\n삭제하시겠습니까?')) {
		jq.ajax({
			url: "/service/qna/qnaDelete_prc",
			type: "post",
			dataType: "json",
			data : {
				serviceQnAIdx: serviceQnAIdx
			},
			success: function (res, status, xhr) {
				returnCode = res.returnCode;
				// 프레임워크 에러코드가 0 (성공)인 경우
				if (res.returnCode == 0) {
				}
				// 프레임워크 에러코드가 E이거나 I 인 경우
				else {
					// 알림메시지 표시
					alert(res.returnMsg);
				}
			},
			error: function (xhr, status, error) {
				alert(error);
			},
			complete: function (xhr, status) {
				if (returnCode == 0) {
					location.href = '/service/qna/qnaList?page='+jq("#page").val();
				}
			}
		});
	}
} // end of function doDelete

/**
 * 메소드명: doModify
 * 작성자: 김영탁
 * 설 명: 수정 화면 이동 Process
 *
 * @param int page 선택된 페이지 번호
 *
 * 최초작성일: 2017.10.10
 * 최종수정일: 2017.10.10
 * ---
 * Date              Auth        Desc
 */
function doModify() {
	var serviceQnAIdx = jq("#service_qna_idx").val();
	location.href = '/service/qna/qnaModify?serviceQnAIdx='+serviceQnAIdx+'&page='+jq("#page").val();
}

//# sourceURL=service_qna_list.js