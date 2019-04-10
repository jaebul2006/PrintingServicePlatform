jq(document).ready(function () {
	goServiceStyle();
	// 회원 구분 선택
	setCompanyType();

    // 이메일 입력 체크
    jq("#email").keyup(function() {
        var inputVal = jq(this).val();
        jq(this).val(inputVal.replace(/[^a-z0-9/_/-]/gi, ''));
    });

    // 이메일 주소 뒷자리 입력 체크
    jq("#email_address").keyup(function() {
        var inputVal = jq(this).val();
        jq(this).val(inputVal.replace(/[^a-z0-9/./_/-]/gi, ''));
    });

	// 이메일 중복체크 초기화
    jq("#email, #email_address").change(function() {
		jq("#is_email_check").val("N");
	});

    // 성명 입력 체크
    jq("#user_name, #ceo_name").keyup(function() {
        jq(this).val(JLAMP.common.repName(jq(this).val()));
    });

    // 이메일 주소 자동입력 설정
    jq("#sel_email_address").kendoDropDownList({
        dataSource: {
            data: [
                {code: "", name: "직접입력"},
                {code: "naver.com", name: "naver.com"},
                {code: "daum.net", name: "daum.net"},
                {code: "hanmail.net", name: "hanmail.net"},
                {code: "nate.com", name: "nate.com"},
                {code: "gmail.com", name: "gmail.com"},
                {code: "paran.com", name: "paran.com"},
                {code: "chol.com", name: "chol.com"},
                {code: "dreamwiz.com", name: "dreamwiz.com"},
                {code: "empal.com", name: "empal.com"},
                {code: "freechal.com", name: "freechal.com"},
                {code: "hanafos.com", name: "hanafos.com"},
                {code: "hanmir.com", name: "hanmir.com"},
                {code: "hitel.net", name: "hitel.net"},
                {code: "hotmail.com", name: "hotmail.com"},
                {code: "korea.com", name: "korea.com"},
                {code: "lycos.co.kr", name: "lycos.co.kr"},
                {code: "netian.com", name: "netian.com"},
                {code: "yahoo.co.kr", name: "yahoo.co.kr"},
                {code: "yahoo.com", name: "yahoo.com"}
            ]
        },
        dataTextField: "name",
        dataValueField: "code",
        animation: false,
        change: function(e) {
            var beforeVal = e.sender.element[0].getAttribute('oldvalue');
            var inputVal = this.value();

            if (inputVal) {
                jq("#email_address").val(inputVal);
                jq("#email_address").attr("readonly", true);
                jq("#email_address").css("background-color", '#ebebe4');
            } else if (beforeVal != inputVal){
                jq("#email_address").val('');
                jq("#email_address").attr("readonly", false);
                jq("#email_address").css("background-color", '#ffffff');
                jq("#email_address").focus();
            }

            e.sender.element[0].setAttribute('oldvalue', inputVal);

			// 이메일 중복체크 여부 초기화
            jq("#is_email_check").val("N");
        }
    });

	// 엔터키 처리
    jq("#email, #email_address").keydown(function (key) {
        if(key.keyCode == 13){
            checkEmail();
        }
    });
	// 이메일 중복체크
	jq("#check_email").click(function(){
		checkEmail();
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
	
	// 사업자 등록 번호, 전화번호 입력 체크
    jq("#com_num1, #com_num2, #com_num3, #com_tel2, #com_tel3").keyup(function() {
    	JLAMP.common.repNumberKey(this);
    });

	// 사업자 등록 번호 체크 여부 초기화
	jq("#com_num1, #com_num2, #com_num3").change(function(){
		jq("#is_com_num_check").val("N");

		setCompanyDataInit();
	});

	// 엔터키 처리
    jq("#com_num1, #com_num2, #com_num3").keydown(function (key) {
        if(key.keyCode == 13){
            checkComNum();
        }
    });
	// 사업자 등록 번호 중복체크
	jq("#check_com_num").click(function(){
		checkComNum();
	});

    // 전화번호(국번) 설정
    jq("#com_tel1").kendoDropDownList({
        dataSource: {
            data: [
                {code: "02", name: "02"},
                {code: "051", name: "051"},
                {code: "053", name: "053"},
                {code: "032", name: "032"},
                {code: "062", name: "062"},
                {code: "042", name: "042"},
                {code: "052", name: "052"},
                {code: "044", name: "044"},
                {code: "031", name: "031"},
                {code: "033", name: "033"},
                {code: "043", name: "043"},
                {code: "041", name: "041"},
                {code: "063", name: "063"},
                {code: "061", name: "061"},
                {code: "054", name: "054"},
                {code: "055", name: "055"},
                {code: "064", name: "064"},
                {code: "070", name: "070"},
                {code: "080", name: "080"},
                {code: "010", name: "010"},
                {code: "011", name: "011"},
                {code: "016", name: "016"},
                {code: "017", name: "017"},
                {code: "018", name: "018"},
                {code: "019", name: "019"}
            ]
        },
        dataTextField: "name",
        dataValueField: "code",
		optionLabel: '선택',
        animation: false
    });

    // 지역 설정
	/*var data = getRegionCode();
    jq("#region_code").kendoDropDownList({
        dataSource: data,
        dataTextField: "CodeName",
        dataValueField: "Code",
		optionLabel: '선택',
        animation: false
    });*/


	// 기업 정보 비활성화 -> 중복체크 후에 활성화
	// 기관(업체) 정보
	/*jq("#is_hospital, #is_sp").click(function(e){
		return false;
	});*/
	
	jq("#com_name").attr('readonly', true);
	jq("#ceo_name").attr('readonly', true);
	jq("#com_tel1").data("kendoDropDownList").value('');
	jq("#com_tel1").data("kendoDropDownList").readonly();
	jq("#com_tel2").attr('readonly', true);
	jq("#com_tel3").attr('readonly', true);
	//jq("#region_code").data("kendoDropDownList").value('');
	//jq("#region_code").data("kendoDropDownList").readonly();

	// 체크박스 cursor style 변경
	jq(".join_check_cursor").css('cursor', 'not-allowed');

	// 진료과목 리스트 생성
	//setMedicalDeptCode();

    // 스캐닝 업체 설정용 리스트
	//var serviceComData = getServiceCompanyList();
    /*jq("#sel_scanning_company").kendoDropDownList({
        dataSource: serviceComData['G0070001'],
        dataTextField: "ComName",
        dataValueField: "CompanyIdx",
		optionLabel: '선택',
        animation: false
    });*/
    // 모델링 업체 설정용 리스트
    /*jq("#sel_modeling_company").kendoDropDownList({
        dataSource: serviceComData['G0070002'],
        dataTextField: "ComName",
        dataValueField: "CompanyIdx",
		optionLabel: '선택',
        animation: false
    });*/
    // 프린팅 업체 설정용 리스트
    /*jq("#sel_printing_company").kendoDropDownList({
        dataSource: serviceComData['G0070003'],
        dataTextField: "ComName",
        dataValueField: "CompanyIdx",
		optionLabel: '선택',
        animation: false
    });*/

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

    // 업체 상태 리스트
	var companyStatusData = getCompanyStatusList();
    jq("#sel_status_code").kendoDropDownList({
        dataSource: companyStatusData,
        dataTextField: "CodeName",
        dataValueField: "Code",
        animation: false
    });
	jq("#sel_status_code").data("kendoDropDownList").value('G0030002');
});

/**
 * 메소드명: setCompanyType
 * 작성자: 최영은
 * 설 명:  업체 구분 set
 *
 * 최초작성일: 2017.12.12
 * 최종수정일: 2017.12.12
 * ---
 * Date              Auth        Desc
*/
function setCompanyType(){
	jq(".is_hospital_info_area").hide();
	jq(".is_sp_info_area").hide();

	var html = '<div class="check-wrap inline mR20">';
	html += '<input type="checkbox" id="is_hospital" name="is_hospital" class="user_type_class" value=1>';
	html += '<label for="is_hospital"><span  class="checkbox join_check_cursor"></span> 진료기관</label>';
	html += '</div>';
	html += '<div class="check-wrap inline ">';
	html += '<input type="checkbox" id="is_sp" name="is_sp" class="user_type_class" value=1>';
	html += '<label for="is_sp"><span class="checkbox join_check_cursor"></span> 서비스 제공자(SP)</label>';
	html += '</div>';
	jq("#sel_company_type_area").html(html);

	jq(".user_type_class").change(function(){
		var id = this.id;
		var isChecked = jq(this).prop('checked');
		if(isChecked) {
			jq("." + id + "_info_area").show();
		} else {
			jq("." + id + "_info_area").hide();
		}
	});
} // end of function setCompanyType

/**
 * 메소드명: getRegionCode
 * 작성자: 최영은
 * 설 명:  지역코드 가져오기 Process
 *
 * @return - data object 지역코드 data
 *
 * 최초작성일: 2017.12.12
 * 최종수정일: 2017.12.12
 * ---
 * Date              Auth        Desc
*/
function getRegionCode(){
	/*
	var data = [];
	jq.ajax({
		url: '/common/getCode_prc',
		data: {
			groupCode: 'G011'
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
	return data; */
} 

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
	/*
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
							listHtml += '<label for="dept_' + val.Code + '"><span class="checkbox" style="cursor:not-allowed;"></span> ' + val.CodeName + '</label>';
							listHtml += '</div>';
						}
					});
					jq("#medical_dept_list").html(listHtml);

					// 진료과목 선택에 따른 서비스항목 변경
					setMedicalDeptService('G0050001'); // init
				}
			}
		},
		error: function (xhr, status, error) {
			alert(error);
		},
		complete: function (xhr, status) {
		}
	}); */
} 

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
	/*
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
	*/
} 

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
	/*
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
	*/
} 

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
 * 메소드명: checkEmail
 * 작성자: 최영은
 * 설 명:  이메일 중복체크 Process
 *
 * 최초작성일: 2017.12.12
 * 최종수정일: 2017.12.12
 * ---
 * Date              Auth        Desc
*/
function checkEmail() {
    var isEmailCheck = jq("#is_email_check").val() == "Y" ? true : false;       // 이메일 중복체크 여부
    var email = jq("#email").val();                                 // 이메일 주소 앞자리
    var emailAddress = jq("#email_address").val();      // 이메일 주소

    // 유효성 검사
    if (isEmailCheck) {
        alert('이미 중복체크하였습니다.');
        jq("#lastname").focus();
        return false;
    }

    // 이메일 주소 앞자리 2~30자 체크
    if (email.length < 2 || email.length > 30) {
        alert('이메일 주소 앞자리는 2~30자로 입력해 주십시오');
        jq("#email").focus();
		return false;
    }

    // 이메일 주소 뒷자리 입력 체크
    if (!emailAddress) {
        alert('이메일 주소 뒷자리를 입력해 주십시오');
        jq("#email_address").focus();
		return false;
    }

    // Loading Indicator
    JLAMP.common.loading('#frm_join', 'pulse');

    jq.ajax({
		url: '/user/checkEmail_prc',
		data: {
			email: email,
			emailAddress: emailAddress
		},
		type: 'post',
		dataType: 'json',
		success: function(res, status, xhr) {
			if (res) {
				if (res.returnCode == 0) {
                    if (res.data.isEmail == 'Y') {
						jq("#is_email_check").val('Y');
                        alert("사용가능한 이메일입니다.");
                        jq("#user_name").focus();
                    } else {
                        alert("이미 사용중인 이메일입니다.");
						jq("#is_email_check").val('N');
						jq("#is_email_check").val()
                        jq("#email").val('');
                        jq("#email_address").val('');
                        jq("#email_address").attr('readonly', false);
                        jq("#email_address").css('background-color', '#fff');
                        jq("#sel_email_address").data("kendoDropDownList").value('');
                        jq("#email").focus();
                    }
				}  else {
					alert(res.returnMsg);
				}
			}
        },
        error: function (xhr, status, error) {
			alert(error);
		},
		complete: function (xhr, status) {
			JLAMP.common.loadingClose('#frm_join');
		}
	});
	return false;
} // end of function checkEmail

/**
 * 메소드명: checkComNum
 * 작성자: 최영은
 * 설 명:  사업자 등록 번호 중복체크 Process
 *
 * 최초작성일: 2017.12.13
 * 최종수정일: 2017.12.13
 * ---
 * Date              Auth        Desc
*/
function checkComNum() {
	// 사업자 등록 번호 중복체크 여부
    var isComNumCheck = jq("#is_com_num_check").val() == "Y" ? true : false;
    var comNum1 = jq("#com_num1").val();
    var comNum2 = jq("#com_num2").val();
    var comNum3 = jq("#com_num3").val();

    // 유효성 검사
    if (!comNum1) {
        alert('사업자 등록 번호를 입력해 주십시오');
        jq("#com_num1").focus();
		return false;
    }
    if (comNum1.length != 3) {
        alert('사업자 등록 번호 첫번째 자리는 3자로 입력해 주십시오');
        jq("#com_num1").focus();
		return false;
    }
    if (!comNum2) {
        alert('사업자 등록 번호를 입력해 주십시오');
        jq("#com_num2").focus();
		return false;
    }
    if (comNum2.length != 2) {
        alert('사업자 등록 번호 두번째 자리는 2자로 입력해 주십시오');
        jq("#com_num2").focus();
		return false;
    }
    if (!comNum3) {
        alert('사업자 등록 번호를 입력해 주십시오');
        jq("#com_num3").focus();
		return false;
    }
	if (comNum3.length != 5) {
        alert('사업자 등록 번호 세번째 자리는 5자로 입력해 주십시오');
        jq("#com_num3").focus();
		return false;
	}

    // Loading Indicator
    JLAMP.common.loading('#frm_join', 'pulse');

    jq.ajax({
		url: '/user/checkComNum_prc',
		data: {
			comNum1: comNum1,
			comNum2: comNum2,
			comNum3: comNum3
		},
		type: 'post',
		dataType: 'json',
		success: function(res, status, xhr) {
			if (res) {
				if (res.returnCode == 0) {
					jq("#is_com_num_check").val('Y');
                    if (res.data.isComNum == 'Y') {
                        alert("사용가능한 사업자 등록 번호입니다.");
                        jq("#is_hospital").focus();
                        setCompanyDataInit();
                    } else {
                        alert("이미 사용중인 사업자 등록 번호입니다.\n등록되어 있는 기관/업체 정보로 기업정보 내용이 입력되며 \n입력된 정보는 수정할 수 없습니다.");
                        jq("#is_hospital").focus();
						// set company data
						console.log(res.data);
						setCompanyData(res.data);
                    }
				}  else {
					alert(res.returnMsg);
				}
			}
        },
        error: function (xhr, status, error) {
			alert(error);
		},
		complete: function (xhr, status) {
			JLAMP.common.loadingClose('#frm_join');
		}
	});
} // end of function checkComNum


/**
 * 메소드명: setCompanyDataInit
 * 작성자: 최영은
 * 설 명:  기관(업체) 정보 초기화 Process
 *
 * 최초작성일: 2017.12.14
 * 최종수정일: 2017.12.14
 * ---
 * Date              Auth        Desc
*/
function setCompanyDataInit() {
	// 회원구분 선택
	setCompanyType();
	// 진료기관 선택
	jq("#is_hospital").prop('checked', false);
	jq(".is_hospital_info_area").hide();
	// 서비스 제공자 선택
	jq("#is_sp").prop('checked', false);
	jq(".is_sp_info_area").hide();
	// 기관(업체) 정보
	jq("#company_idx").val('');
	jq("#company_idx").attr('readonly', false);
	jq("#com_name").val('');
	jq("#com_name").attr('readonly', false);
	jq("#ceo_name").val('');
	jq("#ceo_name").attr('readonly', false);
	jq("#com_tel1").data("kendoDropDownList").value('');
	jq("#com_tel1").data("kendoDropDownList").readonly(false);
	jq("#com_tel2").val('');
	jq("#com_tel2").attr('readonly', false);
	jq("#com_tel3").val('');
	jq("#com_tel3").attr('readonly', false);
	jq("#region_code").data("kendoDropDownList").value('');
	jq("#region_code").data("kendoDropDownList").readonly(false);

	// 진료과목 > 서비스 항목
	setMedicalDeptService('G0050001');

	//  업체 선택 초기화
	jq("#sel_scanning_company").data("kendoDropDownList").value('');
	jq("#sel_modeling_company").data("kendoDropDownList").value('');
	jq("#sel_printing_company").data("kendoDropDownList").value('');

	// 제공 서비스 > 세부 서비스 항목
	var serviceProcData = getServiceProcCode('');
	jq("#sel_step1_proc").data("kendoDropDownList").setDataSource(serviceProcData);
	jq("#sel_step2_proc").data("kendoDropDownList").setDataSource([]);
	jq("#sel_step3_proc").data("kendoDropDownList").setDataSource([]);
	jq("#sel_step1_proc").data("kendoDropDownList").value('');
	jq("#sel_step2_proc").data("kendoDropDownList").value('');
	jq("#sel_step3_proc").data("kendoDropDownList").value('');
	jq("#sel_step1_proc").data("kendoDropDownList").readonly(false);
	jq("#sel_step2_proc").data("kendoDropDownList").readonly(false);
	jq("#sel_step3_proc").data("kendoDropDownList").readonly(false);

	jq("#scanning_service_list").html('');
	jq("#modeling_service_list").html('');
	jq("#printring_service_list").html('');
	jq("#scanning_service_area").hide();
	jq("#modeling_service_area").hide();
	jq("#printing_service_area").hide();
	jq("#service_hospital").val('');
	jq("#characteristic").val('');
	jq("#sel_status_code").data("kendoDropDownList").value('G0030002');
	jq("#sel_status_code").data("kendoDropDownList").readonly(false);

	// 체크박스 cursor style 변경
	jq(".join_check_cursor").css('cursor', 'pointer');
} // end of function setCompanyDataInit

/**
 * 메소드명: setCompanyData
 * 작성자: 최영은
 * 설 명:  기관(업체) 정보 set Process
 *
 * 최초작성일: 2017.12.14
 * 최종수정일: 2017.12.14
 * ---
 * Date              Auth        Desc
*/
function setCompanyData(data) {
	var d = data.companyData;
	//  진료기관 정보 set
	var isChecked = d.IsHospital > 0 ? true : false;
	jq("#is_hospital").prop('checked', isChecked);
	if(isChecked) {
		setMedicalDeptData(data.medicalDept);
	} else {
		jq(".is_hospital_info_area").hide();
	}

	//  업체 선택 초기화
	jq("#sel_scanning_company").data("kendoDropDownList").value('');
	jq("#sel_modeling_company").data("kendoDropDownList").value('');
	jq("#sel_printing_company").data("kendoDropDownList").value('');

	//  서비스 제공자 정보 set
	isChecked = d.IsSp > 0 ? true : false;
	jq("#is_sp").prop('checked', isChecked);
	if(isChecked) {
		setServiceProcData(data.serviceProc);
	} else {
		jq(".is_sp_info_area").hide();
	}
	// checkbox 비활성화
	jq("#is_hospital, #is_sp").click(function(e){
		return false;
	});

	// 기관(업체) 정보
	jq("#company_idx").val(d.CompanyIdx);
	jq("#company_idx").attr('readonly', true);
	jq("#com_name").val(d.ComName);
	jq("#com_name").attr('readonly', true);
	jq("#ceo_name").val(d.CEOName);
	jq("#ceo_name").attr('readonly', true);
	var comTel = d.Tel.split('-');
	jq("#com_tel1").data("kendoDropDownList").value(comTel[0]);
	jq("#com_tel1").data("kendoDropDownList").readonly();
	jq("#com_tel2").val(comTel[1]);
	jq("#com_tel2").attr('readonly', true);
	jq("#com_tel3").val(comTel[2]);
	jq("#com_tel3").attr('readonly', true);
	jq("#region_code").data("kendoDropDownList").value(d.RegionCode);
	jq("#region_code").data("kendoDropDownList").readonly();
	jq("#service_hospital").val(d.ServiceHospital);
	jq("#characteristic").val(d.Characteristic);
	jq("#sel_status_code").data("kendoDropDownList").value(d.StatusCode);
	jq("#sel_status_code").data("kendoDropDownList").readonly();

	// 체크박스 cursor style 변경
	jq(".join_check_cursor").css('cursor', 'not-allowed');
} // end of function checkComNum

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

	// checkbox 비활성화
	jq("#dept_G0050001, input[id^=dept_service_]").click(function(e){
		return false;
	});

	//jq(".join_check_cursor").css('cursor', 'not-allowed');
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
		// checkbox 비활성화
		jq("input[id^=" + procName + "_service]").click(function(){
			return false;
		});
		step++;
	});
	//  dropdownList 비활성화
	jq("#sel_step1_proc").data("kendoDropDownList").readonly(true);
	jq("#sel_step2_proc").data("kendoDropDownList").readonly(true);
	jq("#sel_step3_proc").data("kendoDropDownList").readonly(true);

	jq(".is_sp_info_area").show();
} // end of function setServiceProcData

/**
 * 메소드명: saveData
 * 작성자: 최영은
 * 설 명:  회원가입 등록 Process
 *
 * 최초작성일: 2017.12.12
 * 최종수정일: 2017.12.12
 * ---
 * Date              Auth        Desc
*/
function saveData() {
	// 개인 정보
    var agreePersonal = jq("#agree_personal").prop("checked"); // 개인정보 수집동의
    var agreeUnique = jq("#agree_unique").prop("checked"); // 고유식별정보 수집동의
    var email = jq("#email").val(); // 이메일
    var emailAddress = jq("#email_address").val(); // 이메일 주소
    var isEmailCheck = jq("#is_email_check").val(); // 이메일 중복여부 체크
    var isHospital = jq("#is_hospital").prop("checked"); // 진료기관 여부
    var isSP = jq("#is_sp").prop("checked"); // 서비스 제공자 여부
    var userName = jq("#user_name").val(); // 성명
    var password = jq("#password").val(); // 비밀번호
    var passwordConfirm = jq("#password_confirm").val(); // 비밀번호 확인
	// 업체 정보
    var comNum1 = jq("#com_num1").val(); // 사업자 등록 번호 (처음)
    var comNum2 = jq("#com_num2").val(); // 사업자 등록 번호 (가운데)
    var comNum3 = jq("#com_num3").val(); // 사업자 등록 번호 (마지막)
    var isComNumCheck = jq("#is_com_num_check").val(); // 사업자 등록 번호 중복여부 체크
    var comName = jq("#com_name").val(); // 기관/업체명
    var ceoName = jq("#ceo_name").val(); // 대표자 명
    var comTel1 = jq("#com_tel1").val(); // 전화번호 (국번)
    var comTel2 = jq("#com_tel2").val(); // 전화번호 (가운데)
    var comTel3 = jq("#com_tel3").val(); // 전화번호 (마지막)
	var regionCode = jq("#region_code").data("kendoDropDownList").value();
	// 제공 서비스
	var step1Proc = jq("#sel_step1_proc").data("kendoDropDownList").value();
	var step2Proc = jq("#sel_step2_proc").data("kendoDropDownList").value();
	var step3Proc = jq("#sel_step3_proc").data("kendoDropDownList").value();
	// 업체 상태 
	var selStatusCode = jq("#sel_status_code").data("kendoDropDownList").value();

    // 유효성 검사
    // 개인정보 수직/이용/보유 동의
    if (!agreePersonal) {
        alert(" 개인정보 수집· 이용· 보유에 동의해주세요.");
        jq("#agree_personal").focus();
        return false;
    }
    // 고유식별정보 수직/이용/보유 동의
    if (!agreeUnique) {
        alert("고유식별정보 수집· 이용·보유에 동의해주세요.");
        jq("#agree_unique").focus();
        return false;
    }

    // 이메일 앞자리 2~30자 체크
    if (email.length < 2 || email.length > 30) {
        alert('이메일 주소 앞자리는 2~30자로 입력해 주십시오');
        jq("#email").focus();
		return false;
    }
	// 이메일 주소 뒷자리
    if (!emailAddress) {
        alert("이메일 주소 뒷자리를 입력해 주십시오");
        jq("#email_address").focus();
        return false;
    }
    // 이메일 중복체크 여부
    if (isEmailCheck == 'N') {
        alert("이메일 중복체크를 해 주시기 바랍니다.");
        jq('#check_email').focus();
        return false;
    }
    // 성명
    if (!userName) {
        alert('성명을 입력해 주십시오');
        jq("#user_name").focus();
		return false;
    }

    // 비밀번호
    if (!password) {
        alert('비밀번호를 입력해 주십시오');
        jq("#password").focus();
		return false;
    }
    // 비밀번호 8~15자 체크
    if (password.length < 8 || password.length > 15) {
        alert('비밀번호는 8~15자로 입력해 주십시오');
        jq("#password").focus();
		return false;
    }
    // 비밀번호 확인
    if (!passwordConfirm) {
        alert('비밀번호 확인을 입력해 주십시오');
        jq("#password_confirm").focus();
		return false;
    }
    // 비밀번호 8~15자 체크
    if (passwordConfirm.length < 8 || passwordConfirm.length > 15) {
        alert('비밀번호 확인은 8~15자로 입력해 주십시오');
        jq("#password").focus();
		return false;
    }
    // 비밀번호, 비밀번호 확인 일치여부
    if (password != passwordConfirm) {
        alert('비밀번호가 일치하지 않습니다. \n확인해주시기 바랍니다');
        jq("#password").focus();
		return false;
    }
    // 사업자 등록 번호
    if (!comNum1) {
        alert('사업자 등록 번호를 입력해 주십시오');
        jq("#com_num1").focus();
		return false;
    }
    if (comNum1.length != 3) {
        alert('사업자 등록 번호 첫번째 자리는 3자로 입력해 주십시오');
        jq("#com_num1").focus();
		return false;
    }
    if (!comNum2) {
        alert('사업자 등록 번호를 입력해 주십시오');
        jq("#com_num2").focus();
		return false;
    }
    if (comNum2.length != 2) {
        alert('사업자 등록 번호 두번째 자리는 2자로 입력해 주십시오');
        jq("#com_num2").focus();
		return false;
    }
    if (!comNum3) {
        alert('사업자 등록 번호를 입력해 주십시오');
        jq("#com_num3").focus();
		return false;
    }
	if (comNum3.length != 5) {
        alert('사업자 등록 번호 세번째 자리는 5자로 입력해 주십시오');
        jq("#com_num3").focus();
		return false;
    }
    // 사업자 등록 번호 중복체크 여부
    if (isComNumCheck == 'N') {
        alert("사업자 등록 번호 중복체크를 해 주시기 바랍니다.");
        jq('#check_com_num').focus();
        return false;
    }
	// 업체구분 선택 여부
	if(!isHospital && !isSP) {
		alert("업체구분을 선택해 주십시오.");
        jq("#is_hospital").focus();
        return false;
	}
	// 기관/업체명
    if (!comName) {
        alert('기관/업체명을 입력해 주십시오');
        jq("#com_name").focus();
		return false;
    }
	// 대표자 명
    if (!ceoName) {
        alert('대표자 명을 입력해 주십시오');
        jq("#ceo_name").focus();
		return false;
    }
    // 전화번호
    if (!comTel1) {
        alert('전화번호를 입력해 주십시오');
        jq("#com_tel1").data("kendoDropDownList").focus();
		return false;
    }
    if (!comTel2) {
        alert('전화번호를 입력해 주십시오');
        jq("#com_tel2").focus();
		return false;
    }
    if (!comTel3) {
        alert('전화번호를 입력해 주십시오');
        jq("#com_tel3").focus();
		return false;
    }
	// 지역
    if (!regionCode) {
        alert('지역을 선택해 주십시오');
        jq("#region_code").data("kendoDropDownList").focus();
		return false;
    }
	//업체상태
    if (!selStatusCode) {
        alert('상태을 선택해 주십시오');
        jq("#sel_status_code").data("kendoDropDownList").focus();
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

	var formData = jq('#frm_join').serialize();
	console.log();
    // Loading Indicator
    JLAMP.common.loading('#frm_join', 'pulse');

    jq.ajax({
		url: '/user/saveData_prc',
		data: formData,
		type: 'post',
		dataType: 'json',
		success: function(res, status, xhr) {
			if (res) {
				if (res.returnCode == 0) {
                    alert("회원가입되었습니다. \n로그인 후 이용바랍니다.");
                    location.href="/user/login";
				}  else {
					alert(res.returnMsg);
				}
			}
        },
        error: function (xhr, status, error) {
			alert(error);
		},
		complete: function (xhr, status) {
			JLAMP.common.loadingClose('#frm_join');
		}
	});
	return false;
} // end of function saveData

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
	/*
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
	*/
} 

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

//# sourceURL=join.js