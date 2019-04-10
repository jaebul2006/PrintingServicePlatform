jq(document).ready(function () {
	var deptCode = jq("#dept_code").val();

	jq(".gnb-service").addClass("active");
	jq(".sub_service_menu_2").addClass("active").addClass("ov");
	jq("#service_menuBox").css('display', 'block');
	jq("#service_menu_" + deptCode).css('text-decoration', 'underline');

	goServiceStyle();

	// 생년월일
	jq("#search_birthday").kendoDateInput({
        format: "yyyy-MM-dd",
        messages:{
            "year": "____",
            "month": "__",
            "day": "__"
        }
    });
	jq("#search_birthday").kendoDatePicker({
        culture: 'ko-KR',
        depth: "month",
        start: "month",
        format: "yyyy-MM-dd",
        footer: "<span></span>",
		change: function(e){
			doRows(1);
		}
    });
	jq("#search_birthday").closest(".k-datepicker").add(jq("#search_birthday")).removeClass("k-textbox");


    // 성별 설정
    jq("#search_gender").kendoDropDownList({
        dataSource: {
            data: [
                {code: "m", name: "남"},
                {code: "f", name: "여"}
            ]
        },
        dataTextField: "name",
        dataValueField: "code",
		optionLabel: '선택',
        animation: false,
		change: function(e){
			doRows(1);
		}
    });

	var dataStatusCode = getStatusCode();
    // 성별 설정
    jq("#search_status_code").kendoDropDownList({
        dataSource: {
            data: dataStatusCode
        },
        dataTextField: "CodeName",
        dataValueField: "Code",
		optionLabel: '선택',
        animation: false
    });

	// 리스트
	doRows(jq("#hd_page").val());

	// 검색 버튼 클릭
	jq("#btn_search").click(function () {
		doRows(1);
	});

	// 엔터키 처리
    jq("#search_patient_name, #search_birthday").keydown(function (key) {
        if(key.keyCode == 13){
            doRows(1);
        }
    });

	// 체크박스 1개만 선택 가능하도록 처리
	jq("input[id^=sel_service_]").change(function(e){
		var checked = jq(this).prop('checked');
		if(checked){
			jq("input[id^=sel_service_]").prop('checked', false);
		}
		jq(this).prop('checked', checked);
	});

	// 서비스 신청 버튼 클릭
	jq("#btn_service_apply").click(function () {
		var idx = jq("input[id^=sel_service_]:checked").val();
		if(idx){
			if(confirm('선택하신 서비스 신청 내역의 환자정보로 자동 설정됩니다. \n신청하시겠습니까?')){
				location.href='/service/apply/applyStep1?cd=' + deptCode + '&tp=exist&idx=' + idx;
			}
		} else {
			location.href='/service/apply/applyStep1?cd=' + deptCode + '&tp=new&idx=';
		}
	});
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
	if(!page) page = 1;
	jq("#hd_page").val(page);

	var patientName = jq("#search_patient_name").val();
	var birthday = jq("#search_birthday").val();
	if( birthday == '____-__-__') birthday = '';
	var gender = jq("#search_gender").data("kendoDropDownList").value();
	var statusCode = jq("#search_status_code").data("kendoDropDownList").value();

    // Loading Indicator
    JLAMP.common.loading('#list_html', 'pulse');

	var html = '';
	jq.ajax({
		url: '/service/apply/getServiceApplyList_prc',
		data: {
			page: page,
			patientName: patientName,
			birthday: birthday,
			gender: gender,
			statusCode: statusCode
		},
		type: 'get',
		async: false,
		dataType: 'json',
		success: function(res, status, xhr) {
			if (res) {
				if (res.returnCode == 0) {
					//console.log(res.data);
					//jq("#list_html").html(res.data.listHtml);
					//jq("#pagination_html").html(res.data.paginationHtml);
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
									PayStatusName: { type: "string" },
									AssiPrice: { type: "string" },
									MedDeptCode: { type: "string" },
									DelivCompanyName: { type: "string" }
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
                    jq("#status_list_html").kendoGrid({
                        columns: [
							{
								field: "ServiceApplyIdx",
								title: "-",
								width: "35px",
								headerAttributes:{style: "text-align: center;font-size:17px;vertical-align:middle"},
								template: '<div class="check-wrap"><input type="checkbox" id="sel_service_#= ServiceApplyIdx#" class="sel_service" value="#= ServiceApplyIdx#"><label for="sel_service_#= ServiceApplyIdx#" class="sel_service"><span class="checkbox sel_service"></span></label></div>'
							},
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
                            {
                                field: "DelivCompanyName",
                                title: "운송 업체",
                                width: "185px",
								headerAttributes:{style: "text-align: center;font-size:17px;vertical-align:middle"},
								attributes:{style: "text-align: center;font-size:17px"}
                            },
							{ field: '',
								title: '-',
								width: "100px",
								headerAttributes:{style: "text-align: center;font-size:17px;vertical-align:middle"},
								attributes:{style: "text-align: center;"},
								template: '<input type="button" class="button grid_btn_black button-md" style="padding: 0px 8px 0px 3px;font-size:14px;height: 33px;line-height: 33px" value="상세 보기" onclick="goApplyDetail(\'#= ServiceApplyIdx #\',\'#= MedDeptCode #\')">'
							},
								
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
                            //this.expandRow(this.tbody.find("tr.k-master-row").first());
    						//this.tbody.find("tr.k-master-row").first().addClass("k-state-selected");
                        }
                    });
					var grid = jq("#status_list_html").data("kendoGrid");
					var currentPage = grid.dataSource.page(page);

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

/**
 * 메소드명: goApplyDetail
 * 작성자: 최영은
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
	location.href = "/service/apply/applyDetail?idx=" + idx + "&cd=" + cd + "&page=" + currentPage + "&tp=applyList";
} // end of function goApplyDetail

/**
 * 메소드명: doRows
 * 작성자: 최영은
 * 설 명:  서비스 진행상태 이미지 set
 *
 * @param - ㄴstring code 서비스 진행 상태 코드
 *
 * 최초작성일: 2018.01.09
 * 최종수정일: 2018.01.09
 * ---
 * Date              Auth        Desc
*/
function selImg(code){
	var imgPath = '';
	var arrowImg = '<img src="/image/arrow_ing.gif" >';

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
		url: '/service/apply/getServiceApplyDetail_prc',
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
} // end of function detailInit

/**
 * 메소드명: getStatusCode
 * 작성자: 김영탁
 * 설 명: 상태 코드 가져오기 Process
 *
 * @return - data object 지역코드 data
 *
 * 최초작성일: 2017.12.12
 * 최종수정일: 2017.12.12
 * ---
 * Date              Auth        Desc
*/
function getStatusCode(){
	var data = [];
	jq.ajax({
		url: '/common/getCode_prc',
		data: {
			groupCode: 'G009'
		},
		type: 'get',
		async: false,
		dataType: 'json',
		success: function(res, status, xhr) {
			if (res) {
				if (res.returnCode == 0) {
					data = res.data.codeData;
				}
			}
		},
		error: function (xhr, status, error) {
			alert(error);
		},
		complete: function (xhr, status) {
		}
	});
	return data;
} // end of function getStatusCode

//# sourceURL=apply_list.js