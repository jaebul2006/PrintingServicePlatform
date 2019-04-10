jq(document).ready(function () {
	var deptCode = jq("#dept_code").val();
	jq(".gnb-service").addClass("active");
	jq(".sub_service_menu_2").addClass("active").addClass("ov");
	jq("#service_menuBox").css('display', 'block');
	jq("#service_menu_" + deptCode).css('text-decoration', 'underline');

	goServiceStyle();

	jq("#scanning_files_area").hide();
	jq("#modeling_files_area").hide();
	jq("#printing_files_area").hide();

	jq(".scanning_desc_area").hide();
	jq(".modeling_desc_area").hide();
	jq(".printing_desc_area").hide();
	if(jq("#scanning_service").val()) {
		jq(".scanning_desc_area").show();
		jq(".scanning_files_area").hide();
	} else {
		jq("#scanning_files_area").show(); // 스캐닝 서비스 선택된 것 없으면 스캐닝 첨부파일 업로드 부분 show
	}
	if(jq("#modeling_service").val()) {
		jq(".modeling_desc_area").show();
		jq(".modeling_files_area").hide();
	} else {
		jq(".modeling_files_area").show(); // 모델링 서비스 선택된 것 없으면 스캐닝 첨부파일 업로드 부분 show
	}
	if(jq("#printing_service").val()) jq(".printing_desc_area").show();


	jq("#scanning_files").kendoUpload({
		localization: {
			select: '파일 선택'
		}
	});

	jq("#modeling_files").kendoUpload({
		localization: {
			select: '파일 선택'
		}
	});

	// 서비스 별 옵션
	setServiceDetail('G0070001');
	setServiceDetail('G0070002');
	setServiceDetail('G0070003');

	// 서비스 별 옵션
	// setServiceOpt();

    // 세부내용 입력 체크
    jq("#scanning_desc, #modeling_desc, #printing_desc").keyup(function() {
		var obj = {
			obj: this,
			space: true,
			br: true,
			allowSC: true
		}
        JLAMP.common.repSpecialChar(obj, '');
    });

	// 신청하기 버튼 클릭
	jq("#btn_sevice_apply").click(function () {
		applyService();
	});

	// 이전 단계 버튼 클릭
	jq("#btn_go_step1").click(function () {
		if(confirm('현재페이지의 입력 내용과 \n이전단계에서 설정한 서비스 정보는 모두 초기화됩니다. \n이동하시겠습니까?')) {
			var idx = jq('#service_apply_idx').val();

			var $form = jq('<form></form>');
			$form.attr('action', '/service/apply/applyStep1?cd='+ deptCode + '&tp=rollback&idx=');
			$form.attr('method', 'post');
			$form.appendTo('body');

			var step1Datas = jq("<input type='hidden' name='step1_datas' value='" + jq('#step1_datas').val() + "' >");
			$form.append(step1Datas);
			$form.submit();
		}
	});
});

/**
 * 메소드명: setServiceDetail
 * 작성자: 최영은
 * 설 명:  스캐닝 세부설정 가져오기 Process
 *
 * @param - procCode object 제공 서비스 코드 data
 *
 * 최초작성일: 2018.01.08
 * 최종수정일: 2018.01.08
 * ---
 * Date              Auth        Desc
*/
function setServiceDetail(procCode){

    // Loading Indicator
    JLAMP.common.loading('#frm_step2', 'pulse');

	var procName;
	switch(procCode){
		case "G0070001" : procName = 'scanning'; break;
		case "G0070002" : procName = 'modeling'; break;
		case "G0070003" : procName = 'printing'; break;
	}

	jq.ajax({
		url: '/common/getCode_prc',
		data: {
			groupCode: 'G015',
			pCode: procCode
		},
		type: 'get',
		//async: false,
		dataType: 'json',
		success: function(res, status, xhr) {
			if (res) {
				if (res.returnCode == 0) {
					var html = '<ul>';
					jq.each(res.data.codeData, function(i, data){
						var detailHtml = getServiceDetailItems(data, procName);
						html +=  '<li> <span style="font-size:13px;font-weight:700;">' + data.CodeName + '</span> - ' + detailHtml + '</li>';
						jq("#" + procName + "_detail_setting").html(html);
					});


					html += '</ul>';
				}
			}
		},
		error: function (xhr, status, error) {
			alert(error);
		},
		complete: function (xhr, status) {
			JLAMP.common.loadingClose('#frm_step2');
		}
	});
} // end of function setServiceDetail


/**
 * 메소드명: setServiceDetailItems
 * 작성자: 최영은
 * 설 명:  스캐닝 세부설정 가져오기 Process
 *
 * @param - d object 제공 서비스 세부 설정 종류
 * @param - n object 제공 서비스 명
 * @retrun - html string 제공 서비스 세부 설정 항목 UI
 *
 * 최초작성일: 2018.01.08
 * 최종수정일: 2018.01.08
 * ---
 * Date              Auth        Desc
*/
function getServiceDetailItems(d, n){
	var html = '';
	jq.ajax({
		url: '/common/getCode_prc',
		data: {
			groupCode: 'G016',
			pCode: d.Code
		},
		type: 'get',
		async: false,
		dataType: 'json',
		success: function(res, status, xhr) {
			if (res) {
				if (res.returnCode == 0) {
					jq.each(res.data.codeData, function(i, data){
						html += '<div class="check-wrap inline mR20">';
						html += '<input type="radio" id="detail_' + data.Code + '" name="detail[' + n + '][' + d.Desc + ']" value="' + data.Code + '">';
						html += '<label for="detail_' + data.Code + '"><span class="radiobtn"></span>';
						html += '<div class="tooltip">';
						html += '<span style="font-size:13px;">' + data.CodeName + '</span>&nbsp;&nbsp; ';
						html += '</div>';
						html += '</label>';
						html += '</div>';
					});
				}
			}
		},
		error: function (xhr, status, error) {
			alert(error);
		},
		complete: function (xhr, status) {
		}
	});

	return html;
} // end of function setServiceDetailItems

/**
 * 메소드명: setServiceOpt
 * 작성자: 최영은
 * 설 명:  설정할 서비스 옵션 리스트 가져오기 Process
 *
 * 최초작성일: 2017.12.19
 * 최종수정일: 2017.12.19
 * ---
 * Date              Auth        Desc
*/
function setServiceOpt(){

    // Loading Indicator
    JLAMP.common.loading('.service_opt_area', 'pulse');

	jq.ajax({
		url: '/service/apply/getServiceOpt_prc',
		data: {
			procCode: 'G0070002',
			subProcCode: ''
		},
		type: 'get',
		async: false,
		dataType: 'json',
		success: function(res, status, xhr) {
			if (res) {
				if (res.returnCode == 0) {
					if(res.data.optList) {
						jq.each(res.data.optList, function(index, dataList){
							var html = '';
							jq.each(dataList.procOpt, function(i, d){
								var desc = d.Desc ? d.Desc : '';
								html += '<div class="check-wrap inline mR20">';
								html += '<input type="checkbox" id="opt_' + d.ProcCode + '_' + d.ProcOptIdx + '" name="' + dataList.codeName + '_opt" class="opt_' + d.ProcCode + '_check_box" value="' + d.ProcOptIdx + '">';
								html += '<label for="opt_' + d.ProcCode + '_' + d.ProcOptIdx + '"><span class="checkbox"></span>';
								html += '<div class="tooltip">';
								html += '<span>' + d.ProcOptName + '</span>';
								html += '<div class="tooltip-content">';
								html += '<div class="tbl-cell opt-box">';
								html += '<ul>';
								html += '<li><img src="' + d.SavePath + d.SaveFilename + '" onerror="this.src=\'/image/no_picture.jpg\'" alt="" style="width:80px;"></li>';
								html += '<li>';
								if(d.Thickness > 0) html += '▪ 두께 : ' + d.Thickness + ' <br>';
								if(d.Color) html += '▪ 색상: ' + d.Color + ' <br>';
								if(desc) html += '▪ 기타: ' + desc + '';
								html += '</li>';
								html += '</ul>';
								html += '</div>';
								html += '</div>';
								html += '</div>';
								html += '</label>';
								html += '</div>';
							});
							jq("#" + dataList.codeName + "_opt_area").html(html);

							// 체크박스 1개만 선택 가능하도록 처리
							jq('.opt_' + dataList.procCode + '_check_box').click(function(){
								var checked = jq(this).prop("checked");
								if(checked) {
									jq('.opt_' + dataList.procCode + '_check_box').attr("checked", false);
								}
								jq(this).prop("checked", checked);
							});
						});
					}
				}
			}
		},
		error: function (xhr, status, error) {
			alert(error);
		},
		complete: function (xhr, status) {
			JLAMP.common.loadingClose('.service_opt_area');
		}
	});
} // end of function setServiceOpt

/**
 * 메소드명: applyService
 * 작성자: 최영은
 * 설 명:  서비스 신청 Process
 *
 * 최초작성일: 2017.12.20
 * 최종수정일: 2017.12.20
 * ---
 * Date              Auth        Desc
*/
function applyService(){
    // Loading Indicator
    JLAMP.common.loading('#frm_step2', 'pulse');

	var formData = new FormData(jq("#frm_step2")[0]);

	jq.ajax({
		url: '/service/apply/saveData_prc',
		data: formData,
		contentType: false,
		processData: false,
		type: 'post',
		async: false,
		dataType: 'json',
		success: function(res, status, xhr) {
			if (res) {
				if (res.returnCode == 0) {
					alert("서비스 신청이 완료되었습니다.");
					location.href = "/service/apply/applyDetail?idx=" + res.data.insertID + "&cd=" + jq("#dept_code").val();
				} else {
					alert(res.returnMsg);
				}
			} else {
				alert('서비스 신청이 실패되었습니다.\n재신청 해주시기 바랍니다.');
			}
		},
		error: function (xhr, status, error) {
			alert(error);
		},
		complete: function (xhr, status) {
			JLAMP.common.loadingClose('#frm_step2');
		}
	});
} // end of function applyService



//# sourceURL=apply_step2.js