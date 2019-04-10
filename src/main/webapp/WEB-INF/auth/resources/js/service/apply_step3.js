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

	jq("#btn_complete").click(function () {
		location.href = '/';
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
 * Date              Auth        Desc
*/
function setServiceCompleteData(){
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
						jq("#service_cd_text").text(res.data.serviceApplyList[0].ServiceCD);
						var html = '';
						jq.each(res.data.serviceApplyList, function(i, d){
							var procNameUp = d.ProcName.toUpperCase();
							var procNameLow = d.ProcName.toLowerCase();
							var procOptName = d.ProcOptName ? d.ProcOptName  : '-';
							var desc = d.Desc ? d.Desc.replace(/\n/g, '<br>')  : '';
							html += '<tr>';
							html += '<td>';
							html += '<img src="/image/icon_' + procNameLow + '.png" alt="" style="width:50px; display:inline-block; vertical-align: middle">&nbsp; ' + procNameUp;
							html += '</td>';
							html += '<td class="left">' + d.ComName + '</td>';
							html += '<td class="left">' + d.SubProcName + '</td>';
							html += '</tr>';
							html += '<tr>';
							html += '<td>' + procOptName + '</td>';
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


//# sourceURL=apply_step3.js