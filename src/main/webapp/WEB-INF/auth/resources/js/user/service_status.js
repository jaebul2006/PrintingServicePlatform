var receivedServiceCode = '';
jq(document).ready(function () {

	// 선택한 메뉴 style
	jq(".mobile_main_menu_service").addClass("menu_active");
	jq(".sub_service_menu_3").addClass("active").addClass("ov");

	goServiceStyle();
	jq(".status_arrow_area").html('');
	// 서비스 신청 진행 현황 리스트 set
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
*/
function doRows(page){
	jq("#hd_page").val(page);
	//var page = jq("#hdPage").val();
	//if(!page)
	var serviceCode = jq("#service_code").val();
	var searchCol = '';
	var searchStr = '';

    // Loading Indicator
    JLAMP.common.loading('#list_html', 'pulse');

	var html = '';
	jq.ajax({
		url: '/user/getServiceApplyList_prc',
		data: {
			page: page,
			searchCol: searchCol,
			searchStr: searchStr,
			serviceCode: serviceCode
		},
		type: 'get',
		async: false,
		dataType: 'json',
		success: function(res, status, xhr) {
			if (res) {
				if (res.returnCode == 0) {
					//jq("#list_html").html(res.data.listHtml);
					//jq("#pagination_html").html(res.data.paginationHtml);
					//jq("#status_list_html").html(res.data.statusListHtml);
					receivedServiceCode = res.data.receivedServiceCode;
					var noRecordsMassage = '';
					var gridColummn = [];
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
									PayStatusName: { type: "string" },
									PayStatusCode: { type: "string" },
									AssiPrice: { type: "string" },
									ServiceApplyIdx: { type: "string" }
									/*,
									ProcCode:  { type: "string" },
									SubProcCode: { type: "string" },
									SPCompanyIdx: { type: "string" },
									UserIdx : { type: "string" }
									*/
								}
							}
						},
						pageSize: 5
					});
					if (res.data.completeTF) {
						noRecordsMassage = '<div class="setNoRecords"><span>이미 작업 완료된 서비스입니다.</span></div>';
					} else {
						noRecordsMassage = '<div class="setNoRecords"><span>조회된 데이터가 없습니다.</span></div>';
					}
					gridColummn = 
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
                                field: "AssiPrice",
                                title: "가격",
                                width: "120px",
								headerAttributes:{style: "text-align: center;font-size:17px;vertical-align:middle"},
								attributes:{style: "text-align: center;font-size:17px"}
                            },
                            {
                                field: "PayStatusName",
                                title: "결제 상태",
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
								width: "200px",
								headerAttributes:{style: "text-align: center;font-size:17px;vertical-align:middle"},
								attributes:{style: "text-align: center;"},
								template: '<input type="button" class="button grid_btn_black button-md" style="padding: 0px 8px 0px 3px;font-size:14px;height: 33px;line-height: 33px" value="상세 보기" onclick="goApplyDetail(\'#= ServiceApplyIdx #\',\'#= ServiceCD #\')">&nbsp;<input type="button" id="btn_#= ServiceApplyIdx #" class="button grid_btn_black button-md" style="padding: 0px 8px 0px 3px;font-size:14px;height: 33px;line-height: 33px" value="결재" onclick="goPay(\'#= ServiceApplyIdx #\',\'#= PayStatusCode #\')">'
							}
                        ],
                        dataSource: statuslistData,
                        sortable: true,
    					selectable: true,
						scrollable: true,
						pageable: {
							pageSize:5,
							messages:{display:"{0}-{1}/{2}",itemsPerPage:"",empty: ""},
							buttonCount:5
						},
						noRecords: {
							template: noRecordsMassage
						},
						change: function (e) {
							var selectedRow = e.sender.select();
							var selRowData = this.dataItem(selectedRow);
							var imgPath = selImg(selRowData.StatusCode);
							jq('#status_img').attr('src', imgPath);
							jq('#confirm_apply_status_0').css('background', '#eef3f8');
							jq("#status_text").html('현재 <span class="font-p1">[' + selRowData.ServiceCD + ']</span> 작업이 <span class="font-p1">' + selRowData.StatusName + '</span> 상태 입니다.');
						},
						detailTemplate: kendo.template(jq("#service_template").html()),
						detailInit: detailInit,
                        dataBound: function(e) {
                            this.expandRow(this.tbody.find("tr.k-master-row").first());
    						this.tbody.find("tr.k-master-row").first().addClass("k-state-selected");
                        }
                    });
					var grid = jq("#status_list_html").data("kendoGrid");
					var currentPage = grid.dataSource.page(page);
					var pager = grid.pager;
					var rowsLength = 0;
					pager.bind('change', pagechange);
					if (res.data.statusList.length > 5) {
						rowsLength = 5;
					} else {
						rowsLength = res.data.statusList.length;
					}
					for (var i=0; i<rowsLength;i++ ) {
						if (res.data.statusList[i].PayStatusCode == 'G0220002') {
							jq("#btn_"+res.data.statusList[i].ServiceApplyIdx).removeClass("grid_btn_black");
							jq("#btn_"+res.data.statusList[i].ServiceApplyIdx).addClass("grid_btn_grey");
							jq("#btn_"+res.data.statusList[i].ServiceApplyIdx).attr('disabled','disabled');
						}
					}
					jq("#user_name").text(res.data.userName);
					if(res.data.selData){
						var d = res.data.selData;
						var imgPath = selImg(d.StatusCode);
						jq('#status_img').attr('src', imgPath);
						jq('#confirm_apply_status_0').css('background', '#eef3f8');
						jq("#status_text").html('현재 <span class="font-p1">[' + d.ServiceCD + ']</span> 작업이 <span class="font-p1">' + d.StatusName + '</span> 상태 입니다.');
						jq(".confirm_apply_status").click(function() {
							jq(".confirm_apply_status").css('background', '#fff');
							imgPath = selImg( jq(this).attr('status_code'));
							jq('#status_img').attr('src', imgPath);
							jq(this).css('background', '#eef3f8');
							jq("#status_text").html('현재 <span class="font-p1">[' + jq(this).attr('service_cd') + ']</span> 작업이 <span class="font-p1">' + jq(this).attr('status_name') + '</span> 상태 입니다.');
						});
					} else {
						jq("#status_process").hide();
					}
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


function selImg(code){
	var imgPath = '';
	var arrowImg = '<img id="status_arrow_img" src="/image/arrow_ing.gif" >';
	jq(".status_arrow_area").html('');

	switch(code){
		case"G0090001":
		case"G0090004":
		case"G0090007":
			imgPath = '/image/svc-step-01.png';
			jq("#svc_step_01_arrow").html(arrowImg);
			break;
		case"G0090002":
		case"G0090003":
			imgPath = '/image/svc-step-02-01.png';
			jq("#svc_step_02_01_arrow").html(arrowImg);
			break;
		case"G0090005":
		case"G0090006":
			imgPath = '/image/svc-step-02-02.png';
			jq("#svc_step_02_02_arrow").html(arrowImg);
			break;
		case"G0090008":
		case"G0090009":
			imgPath = '/image/svc-step-02-03.png';
			jq("#svc_step_02_03_arrow").html(arrowImg);
			break;
		case"G0090010":
		case"G0090011":
			imgPath = '/image/svc-step-03.png';
			jq("#svc_step_03_arrow").html(arrowImg);
			break;
	}
	return imgPath;
} // end of function doRows

/**
 * 함수명: detailInit
 * 작성자: 김영탁
 * 함수설명: 지원현황 리스트 상세 생성
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
		url: '/user/getServiceApplyDetail_prc',
		type: 'get',
		data: {
			serviceApplyIdx: e.data.ServiceApplyIdx,
			receivedServiceCode: receivedServiceCode
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
								{ field: 'viewerHtml', title: '-', width: "100px", headerAttributes:{style: "text-align: center;font-size:17px;vertical-align:middle"},
									attributes:{style: "text-align: center;font-size:17px"},
									template: '#=viewerHtml#'
								}
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
	location.href = "/service/apply/applyDetail?idx=" + idx + "&cd=" + cd + "&page="+currentPage + "&tp=status";
} // end of function goApplyDetail

/**
 * 함수명: goPay
 * 작성자: 김영탁
 * 함수설명: 지원현황 리스트 상세 생성
 *
 * 최초작성일: 2018.01.11
 * 최종수정일: 2018.01.11
-----------------------------------------------------------------------
Date              Auth        Desc
*/
function goPay(serviceApplyIdx,  PayStatusCode) {
	var returnCode = '';
	if (PayStatusCode != 'G0220002') {
		var payConfirm = confirm('결제를 진행 하시겠습니까?');
		if (payConfirm) {
			jq.ajax({
				url: '/user/getPayment_prc',
				data: {
					serviceApplyIdx: serviceApplyIdx
				},
				type: 'post',
				async: false,
				dataType: 'json',
				success: function(res, status, xhr) {
					if (res) {
						if (res.returnCode == 0) {
							returnCode = res.returnCode;
						}
					}
				},
				error: function (xhr, status, error) {
					alert(error);
				},
				complete: function (xhr, status) {
					if (returnCode == 0) {
						var grid = jq("#status_list_html").data("kendoGrid");
						var currentPage = grid.dataSource.page();
						location.href = "/user/serviceStatus?page="+currentPage;
					}
				}
			});
		}
	} else {
		alert('이미 결제 완료 상태입니다.');
	}
} // end of function goPay

/**
 * 함수명: pagechange
 * 작성자: 김영탁
 * 함수설명: 지원현황 리스트 상세 생성
 *
 * 최초작성일: 2018.01.11
 * 최종수정일: 2018.01.11
-----------------------------------------------------------------------
Date              Auth        Desc
*/
function pagechange(e) {
	console.log(e.sender.dataSource._view.length);
	for (var i=0; i<e.sender.dataSource._view.length;i++ ) {
		if (e.sender.dataSource._view[i].PayStatusCode == 'G0220002') {
			jq("#btn_"+e.sender.dataSource._view[i].ServiceApplyIdx).removeClass("grid_btn_black");
			jq("#btn_"+e.sender.dataSource._view[i].ServiceApplyIdx).addClass("grid_btn_grey");
			jq("#btn_"+e.sender.dataSource._view[i].ServiceApplyIdx).attr('disabled','disabled');
		}
	}
}