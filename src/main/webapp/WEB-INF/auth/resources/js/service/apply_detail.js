jq(document).ready(function () {
	var deptCode = jq("#dept_code").val();

	// 선택한 메뉴 style
	jq(".gnb-service").addClass("active");
	jq(".sub_service_menu_2").addClass("active").addClass("ov");
	jq("#service_menuBox").css('display', 'block');
	jq("#service_menu_" + deptCode).css('text-decoration', 'underline');

	goServiceStyle();
	// 신청 완료 내역 set
	setServiceCompleteData();

	// 리스트 버튼 클릭
	jq("#btn_go_list").click(function () {
		var url = '';
		var listType = jq("#list_type").val();
		switch(listType){
			// 서비스 접수 리스트
			case "receipt":
				url = '/service/receipt?page=' + jq("#hd_page").val();
				break;

			// 서비스 진행 현황 리스트
			case "status":
				if (jq("#is_login").val() == '' || jq("#is_login").val() == null) {
					url = '/user/serviceStatus?page=' + jq("#hd_page").val()+'&servicecode=' + jq("#dept_code").val();
				} else {
					url = '/user/serviceStatus?page=' + jq("#hd_page").val();
				}
				break;

			// 서비스 신청 현황 조회 리스트
			case "applyList":
			default:
				url = '/service/apply/applyList?cd=' + deptCode + '&page=' + jq("#hd_page").val();
				break;
		}
		location.href = url;
	});
});

/**
 * 메소드명: setServiceCompleteData
 * 작성자: 최영은
 * 설 명:  설정할 서비스 옵션 리스트 가져오기 Process
 *
 * 최초작성일: 2017.12.19
 * 최종수정일: 2017.12.19
 * ---
 * Date              Auth			Desc
*/
function setServiceCompleteData() {
	var idx = jq("#service_apply_idx").val();
    // Loading Indicator
    JLAMP.common.loading('#service_apply_contents_area', 'pulse');

	jq.ajax({
		url: '/service/apply/getServiceCompleteData_prc',
		data: {
			idx: idx
		},
		type: 'get',
		dataType: 'json',
		success: function(res, status, xhr) {
			if (res) {
				if (res.returnCode == 0) {
					if(res.data.serviceApplyList) {
						// 기본정보 & 처방정보
						var data = res.data.serviceApplyList[0];
						jq("#service_cd").text(data.ServiceCD);
						jq("#patient_name").text(data.PatientName);
						var gender = data.Gender == 'm' ? '남자' : '여자';
						jq("#gender").text(gender);
						jq("#birthday").text(data.Birthday);
						jq("#region_code").text(data.RegionCode);
						jq("#tel").text(data.Tel);
						jq("#email").text(data.Email);
						var address = '('+ data.Post + ') <br>' + data.Addr + '<br>' + data.AddrDetail;
						jq("#address").html(address);
						jq("#prescription_date").text(data.PrescriptionDate);
						jq("#height").text(data.Height + ' Cm');
						jq("#weight").text(data.Weight + ' Kg');
						var assiType = data.AssiTypeCode == 'G0130002' ? data.AssiTypeName : data.AssiTypeName;
						jq("#assi_type").text(assiType);
						var lrType = data.LRType == 'l' ? '좌' : '우';
						jq("#lr_type").text(lrType);
						jq("#patient_type").text(data.PatientTypeCode);
						var extention = '.jpg';
						if (data.DesignType == 'G0180006' ||data.DesignType == 'G0180007') {
							extention = '.png';
						}
						jq("#design_type").html('<img src="/data/service/design/'+ data.DesignType + extention+'" alt="" onerror="this.src=\'/image/no_picture.jpg\'" onClick="showImgViewer(\'/data/service/design/'+ data.DesignType + extention+'\', \''+ data.ExistImg +'\');">');
						
						jq("#thickness_code").text(data.ThicknessCode);
						jq("#material_code").text(data.MaterialCode);
						jq("#color_code").text(data.ColorCode);
						jq("#pay_status_code").text(data.PayStatusCode);
						jq("#assi_price").text(data.AssiPrice);
						jq("#equipment_num").text(data.EquipmentNum);
						if (data.AssiTypeCode == 'G0130002' && data.LRType == 'l') {
							jq('#lr_type_left_area').show();
							jq("#fsjr_left").text(data.FSJR);
							jq("#ftjr_left").text(data.FTJR);
						} else if (data.AssiTypeCode == 'G0130002' && data.LRType == 'r') {
							jq('#lr_type_right_area').show();
							jq("#fsjr_right").text(data.FSJR);
							jq("#ftjr_right").text(data.FTJR);
						}

						// 서비스 신청 정보
						var html = '';
						jq.each(res.data.serviceApplyList, function(i, d){
							var procNameUp = d.ProcName.toUpperCase();
							var procNameLow = d.ProcName.toLowerCase();
							var procOptName = '';// d.ProcOptName ? d.ProcOptName  : '-';
							var desc = d.Desc ? d.Desc.replace(/\n/g, '<br>')  : '';
							if(jq("#list_type").val() == "receipt" && d.ReceiptDesc){
								desc += '<br><br><br><span style="font-weight:500;font-size:15px;color:#37415b">※ 접수 세부 내용 ※ </span><br><p style="padding-left:20px;padding-top:8px;font-size:14px;color:#37415b">' +  d.ReceiptDesc.replace(/\n/g, '<br>') + '</p>';
							}
							html += '<tr>';
							html += '<td>';
							html += '<img src="/image/icon_' + procNameLow + '.png" alt="" style="width:50px; display:inline-block; vertical-align: middle">&nbsp; ' + procNameUp;
							html += '</td>';
							html += '<td class="left">' + d.SPCompanyName + '</td>';
							html += '<td class="left">' + d.SubProcName + '</td>';
							html += '</tr>';
							html += '<tr>';
							html += '<td class="left">' + res.data.optDetailList[d.ProcCode] + '</td>';
							html += '<td colspan="2" class="left">'+ desc +'</td>';
							html += '</tr>';

						});
						jq("#service_apply_contents_area").html(html);
					}
				}
			}
		},
		error: function (xhr, status, error) {
			alert(error);
		},
		complete: function (xhr, status) {
			JLAMP.common.loadingClose('#service_apply_contents_area');
		}
	});
} // end of function setServiceCompleteData


//# sourceURL=apply_detail.js