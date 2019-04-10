jq(document).ready(function () {
	// 선택한 메뉴 style
	jq(".mobile_main_menu_service").addClass("menu_active");

	goServiceStyle();

	jq("#deliv_info_area").hide();
    // 택배사 설정
	var data = getDelivCompanyCode();
    jq("#deliv_company").kendoDropDownList({
        dataSource: data,
        dataTextField: "CodeName",
        dataValueField: "Code",
		optionLabel: '선택',
        animation: false
    });

	// 송장번호 확인
    jq("#deliv_num").keyup(function() {
    	JLAMP.common.repNumberKey(this);
    });

	// 달력 설정
	// 종료일자
	jq("#work_end_date").kendoDateInput({
        format: "yyyy-MM-dd",
        messages:{
            "year": "____",
            "month": "__",
            "day": "__"
        }
    });
	jq("#work_end_date").kendoDatePicker({
        culture: 'ko-KR',
        depth: "month",
        start: "month",
        format: "yyyy-MM-dd",
        footer: "<span></span>"
    });
	jq("#work_end_date").closest(".k-datepicker").add(jq("#work_end_date")).removeClass("k-textbox");
	// 시작일자
	jq("#work_start_date").kendoDateInput({
        format: "yyyy-MM-dd",
        messages:{
            "year": "____",
            "month": "__",
            "day": "__"
        }
    });
	jq("#work_start_date").kendoDatePicker({
        culture: 'ko-KR',
        depth: "month",
        start: "month",
        format: "yyyy-MM-dd",
        footer: "<span></span>",
        change: function(e) {
            var toDate = jq("#work_end_date").data("kendoDatePicker").value();
            var toDt = kendo.toString(new Date(toDate), 'yyyyMMdd');
            var fromDt = kendo.toString(this.value(), 'yyyyMMdd');

            jq("#work_end_date").data("kendoDatePicker").min(this.value());
        }
    });
	jq("#work_start_date").closest(".k-datepicker").add(jq("#work_start_date")).removeClass("k-textbox");

	// 첨부파일 업로드
	jq("#files").kendoUpload({
		localization: {
			select: '파일 선택'
		}
	});

	// 서비스 신청 세부내용 세팅
	setDetailInfo();

	jq("#update_files").click(function(){
		jq("#proc_file_upload_area").show();
	});

	// 접수
	jq("#btn_receipt").click(function(){
		saveData('receipt');
	});
	// 반려
	jq("#btn_rollback").click(function(){
		saveData('rollback');
	});
	// 저장
	jq("#btn_save").click(function(){
		saveData('save');
	});
	// 작업완료
	jq("#btn_complete").click(function(){
		saveData('complete');
	});
	// 배송
	jq("#btn_delivery").click(function(){
		saveData('complete');
	});

	jq("#btn_go_list").click(function(){
		location.href = '/service/receipt?page=' + jq("#hd_page").val();
	});
});

/**
 * 메소드명: getDelivCompanyCode
 * 작성자: 최영은
 * 설 명:  택배사 코드 가져오기 Process
 *
 * @return - data object 지역코드 data
 *
 * 최초작성일: 2018.01.10
 * 최종수정일: 2018.01.10
 * ---
 * Date              Auth        Desc
*/
function getDelivCompanyCode(){
	var data = [];
	jq.ajax({
		url: '/common/getCode_prc',
		data: {
			groupCode: 'G017'
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
} // end of function getDelivCompanyCode

/**
 * 메소드명: setDetailInfo
 * 작성자: 최영은
 * 설 명:  서비스 신청 세부내용 가져오기 Process
 *
 * 최초작성일: 2018.01.10
 * 최종수정일: 2018.01.10
 * ---
 * Date              Auth        Desc
*/
function setDetailInfo(){
	var applyIdx = jq("#apply_idx").val();
	var procCode = jq("#proc_code").val();
	var subProcCode = jq("#sub_proc_code").val();
	var spCompanyIdx = jq("#sp_company_idx").val();

	// Loading Indicator
    JLAMP.common.loading('#contents', 'pulse');

	jq.ajax({
		url: '/service/receipt/getDetailData_prc',
		data: {
			applyIdx: applyIdx,
			procCode: procCode,
			subProcCode: subProcCode,
			spCompanyIdx: spCompanyIdx
		},
		type: 'get',
		async: false,
		dataType: 'json',
		success: function(res, status, xhr) {
			if (res) {
				if (res.returnCode == 0) {
					if(res.data.detailData){
						var d = res.data.detailData;
						jq("#ori_status_code").val(d.StatusCode);
						jq("#pre_status_code").val(d.PreStatusCode);
						jq("#apply_user_idx").val(d.UserIdx);
						// 처방정보
						jq("#prescription_date").text(d.PrescriptionDate);
						jq("#height").text(d.Height + ' Cm');
						jq("#weight").text(d.Weight + ' Kg');
						var assiType = d.AssiTypeCode == 'G0130002' ? d.AssiTypeName  : d.AssiTypeName;
						jq("#assi_type").text(assiType);
						var lrType = d.LRType == 'l' ? '좌' : '우';
						jq("#lr_type").text(lrType);
						jq("#patient_type").text(d.PatientTypeCode);
						///jq("#design_type").text(d.DesignType);
						var extention = '.jpg';
						if (d.DesignType == 'G0180006' ||d.DesignType == 'G0180007') {
							extention = '.png';
						}
						jq("#design_type").html('<img src="/data/service/design/'+ d.DesignType +extention+'" alt="" onerror="this.src=\'/image/no_picture.jpg\'" onClick="showImgViewer(\'/data/service/design/'+ d.DesignType +extention+'\', \''+ d.ExistImg +'\');">');
						if (d.AssiTypeCode == 'G0130002' && d.LRType == 'l') {
							jq('#lr_type_left_area').show();
							jq("#fsjr_left").text(d.FSJR);
							jq("#ftjr_left").text(d.FTJR);
						} else if (d.AssiTypeCode == 'G0130002' && d.LRType == 'r') {
							jq('#lr_type_right_area').show();
							jq("#fsjr_right").text(d.FSJR);
							jq("#ftjr_right").text(d.FTJR);
						}

						jq("#thickness_code").text(d.ThicknessCode);
						jq("#material_code").text(d.MaterialCode);
						jq("#color_code").text(d.ColorCode);
						jq("#assi_price").text(d.AssiPrice);
						jq("#equipment_num").text(d.EquipmentNum);
						jq("#pay_status_code").text(d.PayStatusCode);

						// 배송정보
						if(d.ProcCode == 'G0070003' && (d.StatusCode == 'G0090010' || d.StatusCode == 'G0090011')) {
							jq("#service_cd").text(d.ServiceCD);
							jq("#patient_name").text(d.PatientName);
							jq("#tel").text(d.Tel);
							jq("#email").text(d.Email);
							var address = '('+ d.Post + ') <br>' + d.Addr + '<br>' + d.AddrDetail;
							jq("#address").html(address);
							jq("#deliv_company").data("kendoDropDownList").value(d.DelivCompany);
							jq("#deliv_num").val(d.DelivNum);

							jq("#deliv_info_area").show();
						} else {
							jq("#deliv_info_area").hide();
						}

						// 서비스 신청 내역
						jq(".proc_name_text").text(d.ProcName);
						jq("#service_cd").text(d.ServiceCD);
						jq("#status_name").text(d.StatusName);
						var preProcName = '';
						if(d.ProcName == 'Modeling') preProcName = 'Scanning';
						if(d.ProcName == 'Printing') preProcName = 'Modeling';
						jq(".pre_proc_name_text").html(preProcName);
						jq("#sub_proc_name").text(d.SubProcName);
						var desc = d.Desc ? d.Desc.replace(/\n/g,'<br>') : '';
						jq("#desc").html(desc);

						// 옵션 선택
						jq("#proc_opt_area").html(res.data.optDetailHtml);
//						var desc = '';
//						var optHtml = '-';
//						if(d.ProcOptName) {
//							desc = d.OptDesc ? d.OptDesc.replace(/\n/g,'<br>') : '';
//							optHtml = '' + d.ProcOptName + '';
//							optHtml += '<div class="tbl-cell opt-box">';
//							optHtml += '<ul>';
//							var imgPath = d.OptSavePath + d.OptSaveFilename;
//							optHtml += '<li><img id="opt_img" src="' + imgPath + '" alt="" style="width:100px"></li>';
//							optHtml += '<li>';
//							if(d.Thickness > 0) optHtml += '▪ 두께 : ' + d.Thickness + 'mm <br>';
//							if(d.Color) optHtml += '▪ 색상: ' + d.Color + ' <br>';
//							if(desc) optHtml += '▪ 기타: ' + desc + '';
//							optHtml += '</li>';
//							optHtml += '</ul>';
//							optHtml += '</div>';
//						}
//						jq("#proc_opt_area").html(optHtml);
//
//						desc = d.Desc ? d.Desc.replace(/\n/g,'<br>') : '';
//						jq("#desc").html(desc);

						// 작업 시작 날짜
						var sdate = d.WorkStartDate ? new Date(d.WorkStartDate) : new Date();
						jq("#work_start_date").data("kendoDatePicker").value(sdate);
						//jq("#work_start_date").data("kendoDatePicker").min(sdate);
						// 작업 종료 날짜
						var edate = d.WorkEndDate ? new Date(d.WorkEndDate) : '';
						jq("#work_end_date").data("kendoDatePicker").value(edate);
						jq("#work_end_date").data("kendoDatePicker").min(sdate);

						// 첨부파일 처리
						var fileHtml = '';
						// 이전 프로세스 첨부파일 (서비스 신청 시 등록한 파일들)
						jq("#pre_proc_file_download_area").hide();
						var f = res.data.preProcFiles;
						if(f.length > 0){
							jq.each(f, function(i, data){
								fileHtml += '<p style="margin-bottom:2px;">' + data.RealFilename + ' <a href="/service/receipt/fileDownload_prc?idx='+ data.ServiceApplyFileIdx +'" class="button button-form" style="font-weight:bold;">Download</a></p>';
							});
							jq("#pre_proc_file_download").html(fileHtml);
							jq("#pre_proc_file_download_area").show();
						}
						if(d.ProcCode != 'G0070003') {
							// 현재 작업 프로세스 첨부파일 (서비스 접수 시 등록한 파일들)
							fileHtml = '';
							jq("#proc_file_upload_area").hide();
							jq("#proc_file_download_area").hide();
							f = res.data.procFiles;
							if(f.length > 0){
								jq.each(f, function(i, data){
									fileHtml += '<p style="margin-bottom:2px;">' + data.RealFilename + ' <a href="/service/receipt/fileDownload_prc?idx='+ data.ServiceApplyFileIdx +'" class="button button-form" style="font-weight:bold;">Download</a></p>';
								});
								jq("#has_files").val('Y');
								jq("#proc_file_download").html(fileHtml);
								jq("#proc_file_download_area").show();
								jq("#proc_file_upload_area").hide();
							} else {
								jq("#has_files").val('N');
								jq("#proc_file_download").html('');
								jq("#proc_file_download_area").hide();
								jq("#proc_file_upload_area").show();
							}
						} else {
							jq("#proc_file_download_area").hide();
							jq("#proc_file_upload_area").hide();
						}

						console.log(d);
						// 접수 세부내용
						jq("textarea#receipt_desc").val(d.ReceiptDesc);

						// 진행상태에 따른 버튼 UI set
						setButtonArea();
					}
				}
			}
		},
		error: function (xhr, status, error) {
			alert(error);
		},
		complete: function (xhr, status) {
			JLAMP.common.loadingClose('#contents');
		}
	});
} // end of function setDetailInfo


/**
 * 메소드명: setButtonArea
 * 작성자: 최영은
 * 설 명:  진행상태에 따른 버튼 UI set
 *
 * 최초작성일: 2018.01.10
 * 최종수정일: 2018.01.10
 * ---
 * Date              Auth        Desc
*/
function setButtonArea() {
	// 저장용 버튼 모두 숨김
	jq(".btn_save_group").hide();

	// 버튼 세팅
	var procCode = jq("#proc_code").val();
	var statusCode = jq("#ori_status_code").val();
	var preStatusCode = jq("#pre_status_code").val();

	//상태 구분
	switch(procCode) {
		// 스캐닝
		case "G0070001" :
			//상태 구분
			switch(statusCode) {
				// 스캐닝 신청 -> 접수
				case "G0090001" :
					jq("#btn_receipt").show();
					jq("#new_status_code").val('G0090002');
					jq(".receipt_area").hide();
					break;

				// 스캐닝 접수 -> 작업 완료
				case "G0090002" :
					jq("#btn_save").show();
					jq("#btn_complete").show();
					jq("#new_status_code").val('G0090003');
					jq(".receipt_area").show();
					break;
			}
		break;

		// 모델링
		case "G0070002" :
			//상태 구분
			switch(statusCode) {
				// 모델링 신청 -> 접수
				case "G0090003" :
				case "G0090004" :
					jq("#btn_receipt").show();
					jq("#new_status_code").val('G0090005');
					jq(".receipt_area").hide();

					// 스캐닝 서비스 신청 내역이 존재하면 반려버튼 추가
					if(statusCode == "G0090003" && preStatusCode == 'G0090002') {
						jq("#btn_rollback").show();
					} else {
						jq("#btn_rollback").hide();
					}
					break;

				// 모델링 접수 -> 작업 완료
				case "G0090005" :
					jq("#btn_save").show();
					jq("#btn_complete").show();
					jq("#new_status_code").val('G0090006');
					jq(".receipt_area").show();
					break;
			}
		break;

		// 프린팅
		case "G0070003" :
			//상태 구분
			switch(statusCode) {
				// 프린팅 신청 -> 접수
				case "G0090006" :
				case "G0090007" :
					jq("#btn_receipt").show();
					jq("#new_status_code").val('G0090008');
					jq(".receipt_area").hide();

					// 모델링 서비스 신청 내역이 존재하면 반려버튼 추가
					if(statusCode == "G0090006" &&preStatusCode == 'G0090005') {
						jq("#btn_rollback").show();
					} else {
						jq("#btn_rollback").hide();
					}
					break;

				// 프린팅 접수 -> 작업 완료
				case "G0090008" :
					jq("#btn_save").show();
					jq("#btn_complete").show();
					jq("#new_status_code").val('G0090009');
					jq(".receipt_area").show();
					break;

				// 프린팅 완료 -> 배송 전
				case "G0090009" :
					jq("#btn_delivery").val("배송 전");
					jq("#btn_delivery").show();
					jq("#new_status_code").val('G0090010');
					jq(".receipt_area").show();
					break;

				// 배송 전 -> 배송
				case "G0090010" :
					jq("#btn_delivery").val("배송");
					jq("#btn_delivery").show();
					jq("#new_status_code").val('G0090011');
					jq(".receipt_area").show();
					break;
			}

		break;
	}
} // end of function setButtonArea


/**
 * 메소드명: saveData
 * 작성자: 최영은
 * 설 명:  서비스 저장 Process
 *
 * @param - string code 변경할 상태 코드
 *
 *
 * 최초작성일: 2018.01.10
 * 최종수정일: 2018.01.10
 * ---
 * Date              Auth        Desc
*/
function saveData(type) {
	var idx = jq("#detail_idx").val();
	var page = jq("#hd_page").val();
	var sdate = jq("#work_start_date").data("kendoDatePicker").value();
	var edate = jq("#work_end_date").data("kendoDatePicker").value();

	// 유효성 검사
	if(type == 'complete'){
		if(!sdate || !edate){
			alert('작업 일자를 입력하여 주십시오.');
			return false;
		}
		var confirmText = jq("#proc_name_text").text() + '작업을 완료 하시겠습니까?';
		if(jq("#ori_status_code").val() == 'G0090009') confirmText = '배송 전 상태로 변경하시겠습니까?' ;
		if(jq("#ori_status_code").val() == 'G0090010') {
			if(!jq("#deliv_company").data("kendoDropDownList").value()){
				alert('택배사를 선택하여 주십시오.');
				return false;
			}
			if(!jq("#deliv_num").val()){
				alert('송장번호를 입력하여 주십시오.');
				return false;
			}
			confirmText = '배송 상태로 완료하시겠습니까?' ;
		}
		if(!confirm(confirmText)) {
			return false;
		}
	}

	// Loading Indicator
    JLAMP.common.loading('#contents', 'pulse');

	var formData = new FormData(jq("#frm_receipt")[0]);
	formData.append('save_type', type);

	jq.ajax({
		url: '/service/receipt/saveData_prc',
		data: formData,
		contentType: false,
		processData: false,
		type: 'post',
		async: false,
		dataType: 'json',
		success: function(res, status, xhr) {
			if (res) {
				if (res.returnCode == 0) {
					jq("#is_update_files").val('N');
					var typeText = '저장';
					switch(type){
						case "receipt": typeText = '접수'; break;
						case "rollback": typeText = '반려'; break;
						case "complete": typeText = '완료'; break;
					}
					alert(typeText + '되었습니다.');
					setDetailInfo();
//					if(type == 'receipt' || type == 'save'){
//						setDetailInfo();
//					} else {
//						location.href = '/service/receipt?page=' + page;
//					}
				} else {
					alert(res.returnMsg);
				}
			}
		},
		error: function (xhr, status, error) {
			alert(error);
		},
		complete: function (xhr, status) {
			JLAMP.common.loadingClose('#contents');
		}
	});
} // end of function saveData
