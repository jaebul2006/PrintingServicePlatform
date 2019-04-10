jq(document).ready(function () {
	jq(".gnb-software").addClass("active");
	jq(".sub_software_menu_3").addClass("active").addClass("ov");
	goSoftwareStyle();

	var dataStatusCode = getCode('G023');
    // 상태 코드 설정
    jq("#status_code").kendoDropDownList({
        dataSource: {
            data: dataStatusCode
        },
        dataTextField: "CodeName",
        dataValueField: "Code",
		optionLabel: '선택',
        animation: false
    });
	var dataSWTypeCode = getCode('G024');
    // 종류 코드 설정
    jq("#sw_type_code").kendoDropDownList({
        dataSource: {
            data: dataSWTypeCode
        },
        dataTextField: "CodeName",
        dataValueField: "Code",
		optionLabel: '선택',
        animation: false
    });	
	var dataServiceTypeCode = getCode('G025');
    // 유형 코드 설정
    jq("#service_type_code").kendoDropDownList({
        dataSource: {
            data: dataServiceTypeCode
        },
        dataTextField: "CodeName",
        dataValueField: "Code",
		optionLabel: '선택',
        animation: false
    });
	var dataPriceTypeCode = getCode('G026');
    // 선택(가격) 코드 설정
    jq("#price_code").kendoDropDownList({
        dataSource: {
            data: dataPriceTypeCode
        },
        dataTextField: "CodeName",
        dataValueField: "Code",
		optionLabel: '선택',
        animation: false
    });
	var dataOSTypeCode = getCode('G027');
    // OS 코드 설정
    jq("#os_code").kendoDropDownList({
        dataSource: {
            data: dataOSTypeCode
        },
        dataTextField: "CodeName",
        dataValueField: "Code",
		optionLabel: '선택',
        animation: false
    });
	getRegion();
	
	// 라이센스 시작일자
	jq("#license_start_date").kendoDateInput({
        format: "yyyy-MM-dd",
        messages:{
            "year": "____",
            "month": "__",
            "day": "__"
        }
    });
	jq("#license_start_date").kendoDatePicker({
        culture: 'ko-KR',
        depth: "month",
        start: "month",
        format: "yyyy-MM-dd",
        footer: "<span></span>"
    });
	jq("#license_start_date").closest(".k-datepicker").add(jq("#license_start_date")).removeClass("k-textbox");
	
	// 라이센스 종료일자
	jq("#license_end_date").kendoDateInput({
        format: "yyyy-MM-dd",
        messages:{
            "year": "____",
            "month": "__",
            "day": "__"
        }
    });
	jq("#license_end_date").kendoDatePicker({
        culture: 'ko-KR',
        depth: "month",
        start: "month",
        format: "yyyy-MM-dd",
        footer: "<span></span>"
    });
	jq("#license_end_date").closest(".k-datepicker").add(jq("#license_end_date")).removeClass("k-textbox");
});

/**
 * 메소드명: getCode
 * 작성자: 김영탁
 * 설 명: 코드 가져오기 Process
 *
 * @return - data object 지역코드 data
 *
 * 최초작성일: 2017.12.12
 * 최종수정일: 2017.12.12
 * ---
 * Date              Auth        Desc
*/
function getCode(groupCode){
	var data = [];
	jq.ajax({
		url: '/common/getCode_prc',
		data: {
			groupCode: groupCode
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
} // end of function getCode

/**
 * 메소드명: getRegion
 * 작성자: 김영탁
 * 설 명:  진료기관 > 설정할 서비스 업체 리스트 가져오기 Process
 *
 * 최초작성일: 2017.12.14
 * 최종수정일: 2017.12.14
 * ---
 * Date              Auth        Desc
*/
function getRegion(){
	var companyIdx = jq('#company_idx').val();
	jq.ajax({
		url: '/software/apply/getRegion_prc',
		data: {
			companyIdx: companyIdx
		},
		type: 'get',
		async: false,
		dataType: 'json',
		success: function(res, status, xhr) {
			if (res) {
				if (res.returnCode == 0) {
					console.log(res.data.res);
					jq("#region_name").html(res.data.res.RegionName);
				}
			}
		},
		error: function (xhr, status, error) {
			alert(error);
		},
		complete: function (xhr, status) {
		}
	});
} // end of function getServiceCompanyList

/**
 * 메소드명: saveData
 * 작성자: 김영탁
 * 설 명:  등록 Process
 *
 * 최초작성일: 2018.01.25
 * 최종수정일: 2018.01.25
 * ---
 * Date              Auth        Desc
*/
function saveData() {
	var statusCode = jq("#status_code").data("kendoDropDownList").value();// 상태
	var swTypeCode = jq("#sw_type_code").data("kendoDropDownList").value();// 소프트웨어 종류
	var serviceTypeCode = jq("#service_type_code").data("kendoDropDownList").value();// 서비스 유형
	var priceCode = jq("#price_code").data("kendoDropDownList").value();// 서비스 선택
	var osCode = jq("#os_code").data("kendoDropDownList").value();// 설치OS
    var systemId = jq("#system_id").val(); // 사용시스템ID
    var licenseFile = jq("#license_file").val(); // 라이센스 파일명
	
	if (statusCode == '') {
		alert("상태를 선택해 주십시오");
		jq("#status_code").focus();
		return;
	}
	if (swTypeCode == '') {
		alert("소프트웨어 종류를 선택해 주십시오");
		jq("#sw_type_code").focus();
		return;
	}
	if (serviceTypeCode == '') {
		alert("서비스 유형를 선택해 주십시오");
		jq("#service_type_code").focus();
		return;
	}
	if (priceCode == '') {
		alert("서비스 선택를 선택해 주십시오");
		jq("#price_code").focus();
		return;
	}
	if (osCode == '') {
		alert("설치OS를 선택해 주십시오");
		jq("#os_code").focus();
		return;
	}
	if (systemId == '' ||systemId == null) {
		alert("시스템ID를 입력해 주십시오");
		jq("#system_id").focus();
		return;
	}
	/*
	if (!JLAMP.common.isDate(jq("#license_start_date").val())) {
		alert("라이센스시작일자가 유효하지 않습니다.");
		jq("#license_start_date").focus();
		return;
	}
	if (!JLAMP.common.isDate(jq("#license_end_date").val())) {
		alert("라이센스종료날짜가 유효하지 않습니다.");
		jq("#license_end_date").focus();
		return;
	}
	*/
	var formData = new FormData(jq("#frm_software_apply")[0]);
	var returnCode = '';

	jq.ajax({
		url: '/software/apply/saveData_prc',
		data: formData,
		contentType: false,
		processData: false,
		type: 'post',
		async: false,
		dataType: 'json',
		success: function(res, status, xhr) {
			if (res) {
				returnCode = res.returnCode;
				if (res.returnCode == 0) {
					alert("서비스 신청이 완료되었습니다.");
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
			if (returnCode == 0) {
				location.href = '/software/introduction';
			}
		}
	});
}
//# sourceURL=apply.js