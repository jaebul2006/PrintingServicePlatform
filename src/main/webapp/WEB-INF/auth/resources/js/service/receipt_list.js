jq(document).ready(function () {

	// 선택한 메뉴 style
	jq(".gnb-service").addClass("active");
	jq(".sub_service_menu_2").addClass("active").addClass("ov");

	goServiceStyle();
	// 업체 & 서비스 세팅
	doRows(jq("#hd_page").val());
});

/**
 * 메소드명: doRows
 * 작성자: 최영은
 * 설 명:  서비스 신청된 리스트 가져오기 Process
 *
 * 최초작성일: 2017.12.20
 * 최종수정일: 2017.12.20
 * ---
 * Date              Auth        Desc
 2018.01.05			김영탁		파라미터 추가
*/
function doRows(page){
	var searchCol = '';
	var searchStr = '';

	if(!page) page = 1;
	jq("#hd_page").val(page);

    // Loading Indicator
    JLAMP.common.loading('#list_html', 'pulse');

	var html = '';
	jq.ajax({
		url: '/service/receipt/getServiceApplyList_prc',
		data: {
			page: page,
			searchCol: searchCol,
			searchStr: searchStr
		},
		type: 'get',
		async: false,
		dataType: 'json',
		success: function(res, status, xhr) {
			if (res) {
				if (res.returnCode == 0) {
					var statuslistData = new kendo.data.DataSource({
						data: res.data.statusList,
						schema: {
							model: {
								fields: {
									ServiceCD: { type: "string"},
									ProcName: { type: "string" },
									insertDate: { type: "string" },
									DelivNum: { type: "string" },
									StatusName: { type: "string" },
									StatusCode: { type: "string" },
									ServiceApplyIdx: { type: "string" },
									IsWorkStatusCnt: { type: "number" }
								}
							}
						},
						pageSize: 5
					});
                    jq("#status_list_html").kendoGrid({
                        columns: [
                            {
                                field: "ServiceCD",
                                title: "서비스 코드",
                                width: "170px",
								headerAttributes:{style: "text-align: center;font-size:17px;vertical-align:middle"},
								attributes:{style: "text-align: center;font-size:17px"}
                            },
                            {
                                field: "ApplyComName",
                                title: "신청 기관",
                                width: "170px",
								headerAttributes:{style: "text-align: center;font-size:17px;vertical-align:middle"},
								attributes:{style: "text-align: center;font-size:17px"}
                            },
                            {
                                field: "PatientName",
                                title: "환자이름",
                                width: "170px",
								headerAttributes:{style: "text-align: center;font-size:17px;vertical-align:middle"},
								attributes:{style: "text-align: center;font-size:17px"}
                            },
                            {
                                field: "Birthday",
                                title: "생년월일",
                                width: "120px",
								headerAttributes:{style: "text-align: center;font-size:17px;vertical-align:middle"},
								attributes:{style: "text-align: center;font-size:15px"}
                            },
                            {
                                field: "genderName",
                                title: "성별",
                                width: "100px",
								headerAttributes:{style: "text-align: center;font-size:17px;vertical-align:middle"},
								attributes:{style: "text-align: center;font-size:17px"}
                            },
                            {
                                field: "StatusName",
                                title: "진행 상태",
                                width: "170px",
								headerAttributes:{style: "text-align: center;font-size:17px;vertical-align:middle"},
								attributes:{style: "text-align: center;font-size:17px"}
                            },
                            {
                                field: "insertDate",
                                title: "신청 일자",
                                width: "120px",
								headerAttributes:{style: "text-align: center;font-size:17px;vertical-align:middle"},
								attributes:{style: "text-align: center;font-size:17px"}
                            },
                            {
                                field: "DelivNum",
                                title: "송장 번호",
                                width: "185px",
								headerAttributes:{style: "text-align: center;font-size:17px;vertical-align:middle"},
								attributes:{style: "text-align: center;font-size:17px"}
                            },
							{ field: '',
								title: '-',
								width: "100px",
								headerAttributes:{style: "text-align: center;font-size:17px;vertical-align:middle"},
								attributes:{style: "text-align: center;"},
								template: '<input type="button" class="button grid_btn_black button-md" value="상세 보기" onclick="goApplyDetail(\'#= ServiceApplyIdx #\',\'#= ServiceCD #\')">'
							}
                        ],
                        dataSource: statuslistData,
                        sortable: true,
    					//selectable: true,
						scrollable: true,
						pageable: {
							pageSize:5,
							messages:{display:"{0}-{1}/{2}",itemsPerPage:"",empty: ""},
							buttonCount:5
						},
						noRecords: {
							template: '<div class="setNoRecords"><span>조회된 데이터가 없습니다.</span></div>'
						},
						change: function (e) {

						},
						detailTemplate: kendo.template(jq("#service_template").html()),
						detailInit: detailInit,
                        dataBound: function(e) {
							pagechange();
                        }
                    });
					var grid = jq("#status_list_html").data("kendoGrid");
					var currentPage = grid.dataSource.page(page);

					var pager = grid.pager;
					pager.bind('change', pagechange);
				}
			}
		},
		error: function (xhr, status, error) {
			alert(error);
		},
		complete: function (xhr, status) {
			JLAMP.common.loadingClose('#list_html');
			jq(".k-grid tr.k-alt").removeClass('k-alt');
		}
	});
} // end of function doRows

/**
 * 메소드명: goDetail
 * 작성자: 최영은
 * 설 명:  서비스 신청 상세 내용 이동
 *
 * @param - string applyIdx 서비스 신청 일련번호
 * @param - string procCode 서비스 프로세스 일련번호
 * @param - string subProcCode 세부 서비스 프로세스 일련번호
 * @param - int spCompanyIdx 제작 업체 일련번호
 *
 * 최초작성일: 2017.12.21
 * 최종수정일: 2017.12.21
 * ---
 * Date              Auth        Desc
*/
function goDetail(applyIdx, procCode, subProcCode, spCompanyIdx){
	var grid = jq("#status_list_html").data("kendoGrid");
	var currentPage = grid.dataSource.page();
	location.href="/service/receipt/receiptDetail?page=" + currentPage + "&applyIdx=" + applyIdx + "&procCode=" + procCode + "&subProcCode=" + subProcCode + "&spCompanyIdx=" + spCompanyIdx;
} // end of function goDetail

/**
 * 함수명: detailInit
 * 작성자: 김영탁
 * 함수설명: 지원현황 상세 리스트 상세 생성
 *
 * 최초작성일: 2018.01.11
 * 최종수정일: 2018.01.11
-----------------------------------------------------------------------
Date              Auth        Desc
*/
function detailInit(e) {
	var parentRow = jq("#status_list_html").closest(".k-detail-row").prev(".k-master-row");
	jq(parentRow).addClass(".k-state-selected");
	jq.ajax({
		url: '/service/receipt/getServiceApplyDetail_prc',
		type: 'get',
		data: {
			serviceApplyIdx: e.data.ServiceApplyIdx
			/*,
			procCode: e.data.ProcCode,
			subProcCode: e.data.SubProcCode,
			sPCompanyIdx: e.data.SPCompanyIdx
			*/
		},
		dataType: 'json',
		async: false,
		success: function(res, status, xhr) {
			if (res) {
				if (res.returnCode == 0) {
							var detailRow = e.detailRow;

						var detailData = new kendo.data.DataSource({
							autoSync: true,
							data: res.data.statusDetail
						});

						detailRow.find("#service_subjectivity").kendoGrid({
							dataSource: detailData,
							scrollable: false,
							sortable: true,
							selectable: false,
							columns: [
								{ field: "ProcName", title:"서비스", width: "100px", headerAttributes:{style: "text-align: center;font-size:17px;vertical-align:middle"},
									attributes:{style: "text-align: center;font-size:17px"} },
								{ field: "SubProcName", title:"서비스 항목", width: "100px", headerAttributes:{style: "text-align: center;font-size:17px;vertical-align:middle"},
									attributes:{style: "text-align: center;font-size:17px"} },
								{ field: "ComName", title:"업체명", width: "120px", headerAttributes:{style: "text-align: center;font-size:17px;vertical-align:middle"},
									attributes:{style: "text-align: center;font-size:17px"} },
								{ field: "ComTel", title:"전화번호", width: "170px", headerAttributes:{style: "text-align: center;font-size:17px;vertical-align:middle"},
									attributes:{style: "text-align: center;font-size:17px"} },
								{ field: "WorkStartDate", title:"시작일자", width: "120px", headerAttributes:{style: "text-align: center;font-size:17px;vertical-align:middle"},
									attributes:{style: "text-align: center;font-size:17px"} },
								{ field: "WorkEndDate", title:"종료일자", width: "120px", headerAttributes:{style: "text-align: center;font-size:17px;vertical-align:middle"},
									attributes:{style: "text-align: center;font-size:17px"} },
								{ field: 'viewerHtml', title: '-', width: "170px", headerAttributes:{style: "text-align: center;font-size:17px;vertical-align:middle"},
									attributes:{style: "text-align: center;font-size:17px"},
									template: '#=viewerHtml#'
								}
								/*
								,
								{ field: 'detailHtml', title: '-', width: "100px", headerAttributes:{style: "text-align: center;font-size:17px;vertical-align:middle"},
									attributes:{style: "text-align: center;font-size:17px"},
									template: '#=detailHtml#'
								}
								*/
							]
						});

						jq('.service_subjectivity').parent().css('padding-left','0px');
						jq('.service_subjectivity').css('border-width','0px');
						jq('.service_subjectivity').parent().css('background-color','#ffffff');
						jq(".service_subjectivity").hover( function () {
							jq('.service_subjectivity').parent().parent().children().first().css('background-color','#ffffff');
							jq('.service_subjectivity').parent().parent().css('background-color','#ffffff');
							jq('.service_subjectivity').parent().css('background-color','#ffffff');
						}, function () {
						});

				} else {
					doClientMsg(res.returnMsg);
				}
			}
		},
		error: function (xhr, status, error) {
			doClientMsg(error);
		},
		complete: function (xhr, status) {
			jq(".k-grid tr.k-alt").removeClass('k-alt');
		}
	});
} // end of function HRV3100_detailInit

/**
 * 메소드명: goApplyDetail
 * 작성자: 김영탁
 * 설 명:  서비스 신청 상세 페이지 이동
 *
 * @param - int idx 서비스 신청 일련번호
 * @param - string cd 진료과목 코드
 *
 * 최초작성일: 2018.01.09
 * 최종수정일: 2018.01.09
 * ---
 * Date              Auth        Desc
*/
function goApplyDetail(idx, cd){
	var grid = jq("#status_list_html").data("kendoGrid");
	var currentPage = grid.dataSource.page();
	location.href = "/service/apply/applyDetail?idx=" + idx + "&cd=" + cd + "&page="+currentPage + "&tp=receipt";
} // end of function goApplyDetail


/**
 * 메소드명: pagechange
 * 작성자: 김영탁
 * 설 명:  페이지 변화 되었을때 색깔 유지하게 하는 메소드
 *
 * @param - object e 그리드 내용
 *
 * 최초작성일: 2018.01.17
 * 최종수정일: 2018.01.17
 * ---
 * Date              Auth        Desc
*/
function pagechange(e){

	var grid = jq("#status_list_html").data("kendoGrid");
	var masterRow = grid.tbody.find("tr.k-master-row");
	jq.each(masterRow, function(i, d){
	var data = grid.dataItem(d);
		if(data.IsWorkStatusCnt > 0){
			jq(this).css('background', '#b2e5fc');
		} else {

			jq(this).css('background', '#fff');
		}
	});

}