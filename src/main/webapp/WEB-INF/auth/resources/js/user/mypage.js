jq(document).ready(function () {
	jq('.mobile_main_menu_mypage').addClass('menu_active');

	goServiceStyle();
    // 성명 입력 체크
    jq("#user_name").keyup(function() {
        jq(this).val(JLAMP.common.repName(jq(this).val()));
    });

	// 회원 구분 선택
	jq(".is_hospital_info_area").hide();
	jq(".is_sp_info_area").hide();

	jq(".user_type_class").change(function(){
		var id = this.id;
		var isChecked = jq(this).prop('checked');
		if(isChecked) {
			jq("." + id + "_info_area").show();
		} else {
			jq("." + id + "_info_area").hide();
		}
	});

    // 스캐닝 업체 설정용 리스트
	var serviceComData = getServiceCompanyList();
    jq("#sel_scanning_company").kendoDropDownList({
        dataSource: serviceComData['G0070001'],
        dataTextField: "ComName",
        dataValueField: "CompanyIdx",
		optionLabel: '선택',
        animation: false
    });
    // 모델링 업체 설정용 리스트
    jq("#sel_modeling_company").kendoDropDownList({
        dataSource: serviceComData['G0070002'],
        dataTextField: "ComName",
        dataValueField: "CompanyIdx",
		optionLabel: '선택',
        animation: false
    });
    // 프린팅 업체 설정용 리스트
    jq("#sel_printing_company").kendoDropDownList({
        dataSource: serviceComData['G0070003'],
        dataTextField: "ComName",
        dataValueField: "CompanyIdx",
		optionLabel: '선택',
        animation: false
    });

	// 진료과목 리스트 생성
	setMedicalDeptCode();

    // 제공서비스 설정
	jq("#scanning_service_area").hide();
	jq("#modeling_service_area").hide();
	jq("#printing_service_area").hide();
	jq("#scanning_service_list").html('');
	jq("#modeling_service_list").html('');
	jq("#printing_service_list").html('');

	// scanning
	var serviceProcData = getServiceProcCode('');
    jq("#sel_step1_proc").kendoDropDownList({
        dataSource: serviceProcData,
        dataTextField: "CodeName",
        dataValueField: "Code",
		optionLabel: '선택',
        animation: false,
		change: function(e){
			// dataSource set
			jq("#sel_step2_proc").data("kendoDropDownList").value('');
			jq("#sel_step3_proc").data("kendoDropDownList").value('');
			// 서비스 세부 항목 리스트
			jq("#scanning_service_area").hide();
			jq("#modeling_service_area").hide();
			jq("#printing_service_area").hide();
//			jq("#scanning_service_list").html('');
//			jq("#modeling_service_list").html('');
//			jq("#printing_service_list").html('');
			var code = this.value();
			if(code){
				var arr =  getServiceProcCode(code);
				if(arr.length > 0) {
					jq("#sel_step2_proc").data("kendoDropDownList").setDataSource(arr);
				} else {
					jq("#sel_step2_proc").data("kendoDropDownList").setDataSource([]);
					jq("#sel_step3_proc").data("kendoDropDownList").setDataSource([]);
				}

				var serviceProcName = this.listView._dataItems[0].CodeName.toLowerCase();
			}
			setSubProcList(code, serviceProcName);
		}
    });
	// modeling
    jq("#sel_step2_proc").kendoDropDownList({
        dataSource: [],
        dataTextField: "CodeName",
        dataValueField: "Code",
		optionLabel: '선택',
        animation: false,
		autobind: false,
		change: function(e){
			// dataSource set
			jq("#sel_step3_proc").data("kendoDropDownList").value('');

			// 서비스 세부 항목 리스트
			jq("#printing_service_area").hide();
//			jq("#printing_service_list").html('');

			var code = this.value();
			if(code){
				var arr =  getServiceProcCode(code);
				if(arr.length > 0) {
					jq("#sel_step3_proc").data("kendoDropDownList").setDataSource(arr);
				} else {
					jq("#sel_step3_proc").data("kendoDropDownList").setDataSource([]);
				}

				var serviceProcName = this.listView._dataItems[0].CodeName.toLowerCase();
				var beforeVal = e.sender._old;
			}
			setSubProcList(code, serviceProcName);
		}
    });
	// printing
    jq("#sel_step3_proc").kendoDropDownList({
        dataSource: [],
        dataTextField: "CodeName",
        dataValueField: "Code",
		optionLabel: '선택',
        animation: false,
		change: function(e){
			// 서비스 세부 항목 리스트
			jq("#printing_service_area").hide();
//			jq("#printing_service_list").html('');
			var code = this.value();
			if(code){
				var serviceProcName = this.listView._dataItems[0].CodeName.toLowerCase();
			}
			setSubProcList(code, serviceProcName);
		}
    });

	// 비밀번호 변경 클릭 -> modal show
	jq("#change_password").click(function(){
		jq("#mdl_passwd_change").modal("show");
	});

	// 엔터키 처리
    jq("#password, #mdl_new_passwd, #mdl_new_passwd_confirm").keydown(function (key) {
        if(key.keyCode == 13){
            changePassword();
        }
    });
	// 비밀번호 변경 저장
	jq("#btn_mdl_save").click(function(){
		changePassword();
	});

	// 업체정보조회(scanning)
	jq("#search_scanning_company").click(function(){
		var scanningCompany = jq("#sel_scanning_company").data("kendoDropDownList").value();
		getCompanyPopup(scanningCompany);
	});

	// 업체정보조회(modeling)
	jq("#search_modeling_company").click(function(){
		var modelingCompany = jq("#sel_modeling_company").data("kendoDropDownList").value();
		getCompanyPopup(modelingCompany);
	});

	// 업체정보조회(printing)
	jq("#search_printing_company").click(function(){
		var printingCompany = jq("#sel_printing_company").data("kendoDropDownList").value();
		getCompanyPopup(printingCompany);
	});

    // 업체 상태 리스트
	var companyStatusData = getCompanyStatusList();
    jq("#sel_status_code").kendoDropDownList({
        dataSource: companyStatusData,
        dataTextField: "CodeName",
        dataValueField: "Code",
        animation: false
    });
	// 회원정보 set
	getUserData();
});

/**
 * 메소드명: getServiceCompanyList
 * 작성자: 최영은
 * 설 명:  진료기관 > 설정할 서비스 업체 리스트 가져오기 Process
 *
 * 최초작성일: 2017.12.14
 * 최종수정일: 2017.12.14
 * ---
 * Date              Auth        Desc
*/
function getServiceCompanyList(){
	var data = [];
	jq.ajax({
		url: '/user/getServiceCompanyList_prc',
		type: 'get',
		async: false,
		dataType: 'json',
		success: function(res, status, xhr) {
			if (res) {
				if (res.returnCode == 0) {
					data = res.data.procCompanyList;
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
} // end of function getServiceCompanyList

/**
 * 메소드명: setMedicalDeptCode
 * 작성자: 최영은
 * 설 명: 진료과목 리스트 생성
 *
 * 최초작성일: 2017.12.12
 * 최종수정일: 2017.12.12
 * ---
 * Date              Auth        Desc
*/
function setMedicalDeptCode() {
	var listHtml = '';
	jq.ajax({
		url: '/common/getCode_prc',
		data: {
			groupCode: 'G005'
		},
		type: 'get',
		async: false,
		dataType: 'json',
		success: function(res, status, xhr) {
			if (res) {
				if (res.returnCode == 0) {
					// 진료과목 리스트 html
					jq.each(res.data.codeData, function(i, val) {
						if(val.Code == 'G0050001') {
							listHtml += '<div class="check-wrap inline mR20">';
							listHtml += '<input type="checkbox" id="dept_' + val.Code + '" name="dept_code[]" value="' + val.Code + '" class="dept_checkbox" checked>';
							listHtml += '<label for="dept_' + val.Code + '"><span class="checkbox join_check_cursor"></span> ' + val.CodeName + '</label>';
							listHtml += '</div>';
						} else {
							listHtml += '<div class="check-wrap inline mR20">';
							listHtml += '<input type="checkbox" id="dept_' + val.Code + '" name="dept_code[]" value="' + val.Code + '" class="dept_checkbox" disabled>';
							listHtml += '<label for="dept_' + val.Code + '"><span class="checkbox join_check_cursor" style="cursor:not-allowed;"></span> ' + val.CodeName + '</label>';
							listHtml += '</div>';
						}
					});
					jq("#medical_dept_list").html(listHtml);

					// 진료과목 선택에 따른 서비스항목 변경
					setMedicalDeptService('G0050001'); // init
//					jq(".dept_checkbox").click(function() {
//						var v = jq(this).val();
//						jq(".dept_checkbox").prop("checked", false);
//						jq("#dept_" + v).prop("checked", true);
//						setMedicalDeptService(v);
//					});
				}
			}
		},
		error: function (xhr, status, error) {
			alert(error);
		},
		complete: function (xhr, status) {
		}
	});
} // end of function setMedicalDeptCode

/**
 * 메소드명: setMedicalDeptService
 * 작성자: 최영은
 * 설 명: 진료과목 > 서비스 항목 리스트 생성
 *
 * @param - pCode string 진료과목 code
 *
 * 최초작성일: 2017.12.12
 * 최종수정일: 2017.12.12
 * ---
 * Date              Auth        Desc
*/
function setMedicalDeptService(pCode) {
	var listHtml ='';
	jq.ajax({
		url: '/common/getCode_prc',
		data: {
			groupCode: 'G006',
			pCode: pCode,
		},
		type: 'get',
		async: false,
		dataType: 'json',
		success: function(res, status, xhr) {
			if (res) {
				if (res.returnCode == 0) {
					// 진료과목 > 서비스항목 list 생성
					jq.each(res.data.codeData, function(i, val) {
						listHtml += '<div class="check-wrap inline mR20">';
						listHtml += '<input type="checkbox" id="dept_service_' + val.Code + '" name="dept_service_code[]" value="' + val.Code + '" class="dept_service_checkbox">';
						listHtml += '<label for="dept_service_' + val.Code + '"><span class="checkbox join_check_cursor"></span> ' + val.CodeName + '</label>';
						listHtml += '</div>';
					});
					jq("#medical_service_list").html(listHtml);
				}
			}
		},
		error: function (xhr, status, error) {
			alert(error);
		},
		complete: function (xhr, status) {
		}
	});
} // end of function setMedicalDeptService

/**
 * 메소드명: getServiceProcCode
 * 작성자: 최영은
 * 설 명:  서비스 프로세스 코드 가져오기 Process
 *
 * 최초작성일: 2017.12.12
 * 최종수정일: 2017.12.12
 * ---
 * Date              Auth        Desc
*/
function getServiceProcCode(code){
	var inCodes = '';
	if(code){
		var codeArr  = {
			// Scanning
			"G0070001":["'G0070002'"], // Modeling, Printing
			// Modeling
			"G0070002":["'G0070003'"], // Printing
			// Printing
			"G0070003":["'no'"],
		};
		inCodes =codeArr[code].join(',');
	}
	var data = [];
	jq.ajax({
		url: '/common/getCode_prc',
		data: {
			groupCode: 'G007',
			inCodes: inCodes
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
} // end of function getServiceProcCode

/**
 * 메소드명: setSubProcList
 * 작성자: 최영은
 * 설 명: 제공서비스 > 세부 서비스항목 리스트 생성
 *
 * @param - pCode string 제공서비스 code
 * @param - serviceProcName string 제공서비스 명
 *
 * 최초작성일: 2017.12.13
 * 최종수정일: 2017.12.13
 * ---
 * Date              Auth        Desc
*/
function setSubProcList(pCode, serviceProcName) {
	if(pCode) {
		var listHtml ='';
		jq.ajax({
			url: '/common/getCode_prc',
			data: {
				groupCode: 'G008',
				pCode: pCode,
			},
			type: 'get',
			async: false,
			dataType: 'json',
			success: function(res, status, xhr) {
				if (res) {
					if (res.returnCode == 0) {
						// 제공서비스 > 세부 서비스항목 list 생성
						jq.each(res.data.codeData, function(i, val) {
							listHtml += '<div class="check-wrap inline mR20">';
							listHtml += '<input type="checkbox" id="' + serviceProcName + '_service_' + val.Code + '" name="' + serviceProcName + '_service_code[]" value="' + val.Code + '" class="' + serviceProcName + '_service_checkbox">';
							listHtml += '<label for="' + serviceProcName + '_service_' + val.Code + '"><span class="checkbox join_check_cursor"></span> ' + val.CodeName + '</label>';
							listHtml += '</div>';
						});
						jq("#"+serviceProcName+"_service_list").html(listHtml);
						jq("#"+serviceProcName+"_service_area").show();
					}
				}
			},
			error: function (xhr, status, error) {
				alert(error);
			},
			complete: function (xhr, status) {
			}
		});
	} else {
		jq("#"+serviceProcName+"_service_area").hide();
		jq("#"+serviceProcName+"_service_list").html('');
	}
} // end of function setSubProcList


/**
 * 메소드명: getUserData
 * 작성자: 최영은
 * 설 명:  사용자 정보 set Process
 *
 * 최초작성일: 2017.12.14
 * 최종수정일: 2017.12.14
 * ---
 * Date              Auth        Desc
*/
function getUserData() {
	var userIdx = jq("#user_idx").val();

    // Loading Indicator
    JLAMP.common.loading('#frm_mypage', 'pulse');

	jq.ajax({
		url: '/user/getUserData_prc',
		data: {
			userIdx: userIdx
		},
		type: 'get',
		dataType: 'json',
		success: function(res, status, xhr) {
			if (res) {
				if (res.returnCode == 0) {
					setUserData(res.data);
				}
			}
		},
		error: function (xhr, status, error) {
			alert(error);
		},
		complete: function (xhr, status) {
			JLAMP.common.loadingClose('#frm_mypage');
		}
	});
} // end of function getUserData

/**
 * 메소드명: setUserData
 * 작성자: 최영은
 * 설 명:  기관(업체) 정보 set Process
 *
 * 최초작성일: 2017.12.14
 * 최종수정일: 2017.12.14
 * ---
 * Date              Auth        Desc
*/
function setUserData(data) {
	var d = data.basicInfo;

	// 회원정보
	jq("#email").text(d.UserEmail);
	jq("#user_name").val(d.Name);

	// 진료기관 선택
	var isChecked = d.IsHospital > 0 ? true : false;
	jq("#is_hospital").prop('checked', isChecked);
	if(isChecked) {
		//  진료기관 정보 set
		setMedicalDeptData(data.medicalDept);

		// 업체선택
		jq("#sel_scanning_company").data("kendoDropDownList").value(d.ScanningCompanyIdx);
		jq("#sel_modeling_company").data("kendoDropDownList").value(d.ModelingCompanyIdx);
		jq("#sel_printing_company").data("kendoDropDownList").value(d.PrintingCompanyIdx);
	} else {
		jq(".is_hospital_info_area").hide();
	}
	// 서비스 제공자 선택
	isChecked = d.IsSp > 0 ? true : false;
	jq("#is_sp").prop('checked', isChecked);
	if(isChecked) {
		//  서비스 제공자 정보 set
		setServiceProcData(data.serviceProc);
	} else {
		jq(".is_sp_info_area").hide();
	}

	// 기관(업체) 정보
	jq("#company_idx").val(d.CompanyIdx);
	jq("#com_num").text(d.ComNumber);
	jq("#com_name").text(d.ComName);
	jq("#ceo_name").text(d.CEOName);
	jq("#com_tel").text(d.Tel);
	jq("#region_code").text(d.RegionName);
	jq("#service_hospital").val(d.ServiceHospital);
	jq("#characteristic").val(d.Characteristic);
	jq("#sel_status_code").data("kendoDropDownList").value(d.StatusCode);
	jq("#sel_status_code").data("kendoDropDownList").readonly();

	var isManager = jq("#is_manager").val();
	if(isManager != 'Y'){
		// 체크박스 비활성화
		jq(".user_type_class, .dept_checkbox, .dept_service_checkbox, .scanning_service_checkbox, .modeling_service_checkbox, .printing_service_checkbox").click(function(){
			return false;
		});

		// 체크박스 cursor style 변경
		jq(".join_check_cursor").css('cursor', 'not-allowed');

		// 제공 서비스 rdropdown 비활성화
		jq("#sel_step1_proc").data("kendoDropDownList").readonly(true);
		jq("#sel_step2_proc").data("kendoDropDownList").readonly(true);
		jq("#sel_step3_proc").data("kendoDropDownList").readonly(true);

		jq("#service_hospital").attr('disabled', 'disabled');
		jq("#characteristic").attr('disabled', 'disabled');
	}
} // end of function setUserData

/**
 * 메소드명: setMedicalDeptData
 * 작성자: 최영은
 * 설 명:  진료기관 > 서비스 항목 설정 정보 set Process
 *
 * @param - d object 진료기관 > 서비스 항목 설정 정보
 *
 * 최초작성일: 2017.12.15
 * 최종수정일: 2017.12.15
 * ---
 * Date              Auth        Desc
*/
function setMedicalDeptData(d) {
	var data = d['G0050001']; // 진료기관이 재활의학과 인 것만 표시 (임시)
	if(data.length > 0 ){
		// 서비스 항목 설정
		jq.each(data, function(k, v){
			jq("#dept_service_" + v.SubProcCode).prop("checked", true);
		});
	} else {
		setMedicalDeptService('G0050001');
	}
	jq(".is_hospital_info_area").show();
} // end of function setMedicalDeptData

/**
 * 메소드명: setServiceProcData
 * 작성자: 최영은
 * 설 명:  제공 서비스 > 세부 서비스 설정 정보 set Process
 *
 * @param - d object 제공 서비스 > 세부 서비스 설정 정보
 *
 * 최초작성일: 2017.12.15
 * 최종수정일: 2017.12.15
 * ---
 * Date              Auth        Desc
*/
function setServiceProcData(d) {
	jq(".is_sp_info_area").hide();
	jq("#scanning_service_area").hide();
	jq("#modeling_service_area").hide();
	jq("#printing_service_area").hide();

	var step = 1;
	jq.each(d, function(procName, data){
		// 제공 서비스 선택
		jq("#sel_step" + step + "_proc").data("kendoDropDownList").value(data[0].ProcCode);

		// 다음 단계 제공 서비스 dropdownList 생성
		var arr =  getServiceProcCode(data[0].ProcCode);
		if(step < 3){
			if(arr.length > 0) {
				jq("#sel_step" + (step + 1) + "_proc").data("kendoDropDownList").setDataSource(arr);
			} else {
				jq("#sel_step" + (step + 1) + "_proc").data("kendoDropDownList").setDataSource([]);
			}
		}

		// 세부 서비스 항목 list 생성
		setSubProcList(data[0].ProcCode, procName);
		// 세부 서비스 설정
		jq.each(data, function(k, v){
			jq("#" + procName + "_service_" + v.SubProcCode).prop("checked", true);
		});
		jq("#" + procName + "_service_area").show();

		step++;
	});

	jq(".is_sp_info_area").show();
} // end of function setServiceProcData

/**
 * 메소드명: changePassword
 * 작성자: 최영은
 * 설 명:  비밀번호 변경 Process
 *
 * 최초작성일: 2017.07.27
 * 최종수정일: 2017.07.27
 * ---
 * Date              Auth        Desc
*/
function changePassword() {
	var userIdx = jq("#user_idx").val(); // 회원 일련번호
    var passwd = jq("#mdl_passwd").val(); // 기존 비밀번호
    var newPasswd = jq("#mdl_new_passwd").val(); // 신규 비밀번호
    var newPasswdConfirm = jq("#mdl_new_passwd_confirm").val(); // 신규 비밀번호 확인

    // 유효성 검사
    // 비밀번호
    if (!passwd) {
        alert('비밀번호를 입력해 주십시오');
        jq("#mdl_passwd").focus();
		return false;
    }

    // 비밀번호 8~15자 체크
    if (passwd.length < 8 || passwd.length > 15) {
        alert('비밀번호는 8~15자로 입력해 주십시오');
        jq("#mdl_passwd").focus();
		return false;
    }

    // 신규 비밀번호
    if (!newPasswd) {
        alert('신규 비밀번호를 입력해 주십시오');
        jq("#mdl_new_passwd").focus();
		return false;
    }

    // 신규 비밀번호 8~15자 체크
    if (newPasswd.length < 8 || newPasswd.length > 15) {
        alert('신규 비밀번호는 8~15자로 입력해 주십시오');
        jq("#mdl_new_passwd").focus();
		return false;
    }

    // 신규 비밀번호 확인
    if (!newPasswdConfirm) {
        alert('신규 비밀번호 확인을 입력해 주십시오');
        jq("#mdl_new_passwd_confirm").focus();
		return false;
    }

    // 신규 비밀번호, 신규 비밀번호 확인 일치여부
    if (newPasswd != newPasswdConfirm) {
        alert('신규 비밀번호가 일치하지 않습니다. \n확인해주시기 바랍니다');
        jq("#mdl_new_passwd").focus();
		return false;
    }

    // Loading Indicator
    JLAMP.common.loading('#frm_myinfo_pass_change', 'pulse');

    jq.ajax({
		url: '/user/changePassword_prc',
		data: {
			userIdx: userIdx,
            passwd: passwd,
            newPasswd: newPasswd,
            newPasswdConfirm: newPasswdConfirm,
		},
		type: 'post',
		dataType: 'json',
		success: function(res, status, xhr) {
			if (res) {
				if (res.returnCode == 0) {
                    alert("비밀번호가 변경되었습니다. \n다시 로그인해주시기 바랍니다.");
                    jq("#mdl_passwd_change").hide();
                    location.href="/user/logout_prc";
				}  else {
					alert(res.returnMsg);
				}
			}
        },
        error: function (xhr, status, error) {
			alert(error);
		},
		complete: function (xhr, status) {
			JLAMP.common.loadingClose('#frm_myinfo_pass_change');
		}
	});
	return false;
} // end of function changePassword

/**
 * 메소드명: saveData
 * 작성자: 최영은
 * 설 명:  회원 정보 수정 Process
 *
 * 최초작성일: 2017.12.15
 * 최종수정일: 2017.12.15
 * ---
 * Date              Auth        Desc
*/
function saveData() {
	// 개인 정보
    var isHospital = jq("#is_hospital").prop("checked"); // 진료기관 여부
    var isSP = jq("#is_sp").prop("checked"); // 서비스 제공자 여부
    var userName = jq("#user_name").val(); // 이름
	// 제공 서비스
	var step1Proc = jq("#sel_step1_proc").data("kendoDropDownList").value();
	var step2Proc = jq("#sel_step2_proc").data("kendoDropDownList").value();
	var step3Proc = jq("#sel_step3_proc").data("kendoDropDownList").value();

    // 유효성 검사
    // 성명
    if (!userName) {
        alert('성명을 입력해 주십시오');
        jq("#user_name").focus();
		return false;
    }

	// 회원구분 선택 여부
	if(!isHospital && !isSP) {
		alert("업체구분을 선택해 주십시오.");
        jq("#is_hospital").focus();
        return false;
	}

	// 제공 서비스 항목 체크
	if(step1Proc) {
		var selText = jq("#sel_step1_proc").data("kendoDropDownList").text();
		var checked = jq("."+ selText.toLowerCase() +"_service_checkbox").is(":checked");
		if(!checked) {
			alert(selText + '서비스 항목을 선택해 주십시오');
			return false;
		}
	}

	if(step2Proc) {
		var selText = jq("#sel_step2_proc").data("kendoDropDownList").text();
		var checked = jq("."+ selText.toLowerCase() +"_service_checkbox").is(":checked");
		if(!checked) {
			alert(selText + '서비스 항목을 선택해 주십시오');
			return false;
		}
	}

	if(step3Proc) {
		var selText = jq("#sel_step3_proc").data("kendoDropDownList").text();
		var checked = jq("."+ selText.toLowerCase() +"_service_checkbox").is(":checked");
		if(!checked) {
			alert(selText + '서비스 항목을 선택해 주십시오');
			return false;
		}
	}

	var formData = jq('#frm_mypage').serialize();

    // Loading Indicator
    JLAMP.common.loading('#frm_mypage', 'pulse');

    jq.ajax({
		url: '/user/saveData_prc',
		data: formData,
		type: 'post',
		dataType: 'json',
		success: function(res, status, xhr) {
			if (res) {
				if (res.returnCode == 0) {
                    alert("회원 정보가 수정되었습니다.");
					getUserData();
				}  else {
					alert(res.returnMsg);
				}
			}
        },
        error: function (xhr, status, error) {
			alert(error);
		},
		complete: function (xhr, status) {
			JLAMP.common.loadingClose('#frm_mypage');
		}
	});
	return false;
} // end of function saveData

/**
 * 메소드명: withdrawal
 * 작성자: 최영은
 * 설 명:  회원 탈퇴 Process
 *
 * 최초작성일: 2017.12.15
 * 최종수정일: 2017.12.15
 * ---
 * Date              Auth        Desc
*/
function withdrawal() {
	if(confirm("탈퇴하시겠습니까?")) {
		// 개인 정보
		var userIdx = jq("#user_idx").val(); // 회원 일련번호

		// Loading Indicator
		JLAMP.common.loading('#frm_mypage', 'pulse');

		jq.ajax({
			url: '/user/withdrawal_prc',
			data: {
				userIdx: userIdx
			},
			type: 'post',
			dataType: 'json',
			success: function(res, status, xhr) {
				if (res) {
					if (res.returnCode == 0) {
						alert("회원 탈퇴 처리되었습니다.");
						location.href="/user/logout_prc";
					}  else {
						alert(res.returnMsg);
					}
				}
			},
			error: function (xhr, status, error) {
				alert(error);
			},
			complete: function (xhr, status) {
				JLAMP.common.loadingClose('#frm_mypage');
			}
		});
	}
	return false;
} // end of function withdrawal


/**
 * 메소드명: getCompanyStatusList
 * 작성자: 김영탁
 * 설 명:  진료기관 > 설정할 서비스 업체 리스트 가져오기 Process
 *
 * 최초작성일: 2018.01.24
 * 최종수정일: 2018.01.24
 * ---
 * Date              Auth        Desc
*/
function getCompanyStatusList(){
	var data;
	jq.ajax({
		url: '/user/getCompanyStatusList_prc',
		type: 'get',
		async: false,
		dataType: 'json',
		success: function(res, status, xhr) {
			if (res) {
				if (res.returnCode == 0) {
					data = res.data.companyStatus[0];
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
} // end of function getCompanyStatusList

/**
 * 메소드명: getCompanyPopup
 * 작성자: 김영탁
 * 설 명:  업체 팝업 리스트 가져오기 Process
 *
 * 최초작성일: 2018.01.24
 * 최종수정일: 2018.01.24
 * ---
 * Date              Auth        Desc
*/
function getCompanyPopup(companyIdx){
    // 유효성 검사
    if (companyIdx == '' || companyIdx ==null) {
        alert('회사를 선택해 주세요');
		return;
    }
	jq.ajax({
		url: '/user/getCompanyPopupDetail_prc',
		type: 'get',
		async: false,
		data: {
			companyIdx: companyIdx
		},
		dataType: 'json',
		success: function(res, status, xhr) {
			if (res) {
				if (res.returnCode == 0) {
					var scanning = '';
					var modeling = '';
					var printing = '';
					jq("#mdl_com_name").html(res.data.company[0].ComName);
					jq("#mdl_ceo_name").html(res.data.company[0].CEOName);
					jq("#mdl_tel").html(res.data.company[0].Tel);
					jq("#mdl_region").html(res.data.company[0].Region);
					jq("#mdl_service_hospital").html(res.data.company[0].ServiceHospital);
					jq("#mdl_characteristic").html(res.data.company[0].Characteristic);
					jq("#mdl_status").html(res.data.company[0].Status);
					for (var i = 0; i < res.data.companyDetail.length; i++) {
						if (res.data.companyDetail[i].ProcCode == 'G0070001') {
							if (scanning != '') {
								scanning += ' / ';
							}
							scanning += res.data.companyDetail[i].SubProc;
						} else if (res.data.companyDetail[i].ProcCode == 'G0070002') {
							if (modeling != '') {
								modeling += ' / ';
							}
							modeling += res.data.companyDetail[i].SubProc;
						} else if (res.data.companyDetail[i].ProcCode == 'G0070003') {
							if (printing != '') {
								printing += ' / ';
							}
							printing += res.data.companyDetail[i].SubProc;
						}
					}
					jq("#mdl_scanning").html(scanning);
					jq("#mdl_modeling").html(modeling);
					jq("#mdl_printing").html(printing);

					console.log(res.data.companyDetail);
				}
			}
		},
		error: function (xhr, status, error) {
			alert(error);
		},
		complete: function (xhr, status) {
			jq("#mdl_company").modal("show");
		}
	});
} // end of function getCompanyPopup

//# sourceURL=mypage.js