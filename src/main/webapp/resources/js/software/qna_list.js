var currPage = '';
jq(document).ready(function () {
	//jq(".mobile_main_menu_service").addClass("menu_active");
	//jq(".sub_service_menu_5").addClass("num3").addClass("ov");
	jq(".gnb-service").removeClass("active");
	jq(".gnb-software").addClass("active");
	jq(".sub_software_menu_5").addClass("active").addClass("ov");
	goSoftwareStyle();
	if (jq("#page").val() == '') {
		doRows(1);
	} else {
		doRows(jq("#page").val());
	}
});

/**
 * 메소드명: doRows
 * 작성자: 김영탁
 * 설 명: 리스트 조회 Process
 *
 * @param int page 선택된 페이지 번호
 * 
 * 최초작성일: 2017.10.10
 * 최종수정일: 2017.10.10
 * ---
 * Date              Auth        Desc
 */
function doRows(page) {
	/*
	// url: 요청이 전송되는 URL (프로세스명은 뒤에 꼭 _prc 가 붙여져야 함)
	//       Ex) /폴더명/Controllers 폴더 안 php 파일명(컨트롤러명)/실행할 메소드명(프로세스)
	currPage = page;
	jq.ajax({
		url: "/software/qna/qnaList_prc",
		type: "get",
		dataType: "json",
		data : {
			page: page
		},
		success: function (res, status, xhr) {
			// 프레임워크 에러코드가 0 (성공)인 경우
			if (res.returnCode == 0) {
				jq("#qna_html").html(res.data.qnaHtml);
				jq("#count").html(res.data.count);
				jq("#pagination_html").html(res.data.paginationHtml);
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
			jq(window).scrollTop(0); 
		}
	});
	*/
} // end of function doRows

/**
 * 메소드명: goRegister
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
function goRegister() {
	location.href = '/software/qna/qnaRegister?page='+currPage;
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
function doDetailRows(swQnAIdx) {
	location.href = '/software/qna/qnaDetail?swQnAIdx='+swQnAIdx+'&page='+currPage;
}
//# sourceURL=service_qna_list.js

