jq(document).ready(function () {
	var deptCode = jq("#dept_code").val();

	// 선택한 메뉴 style
	jq(".gnb-service").addClass("active");
	jq(".sub_service_menu_2").addClass("active").addClass("ov");
	jq("#service_menuBox").css('display', 'block');
	jq("#service_menu_" + deptCode).css('text-decoration', 'underline');

	goServiceStyle();

    // 성명 입력 체크
    jq("#patient_name").keyup(function() {
        jq(this).val(JLAMP.common.repName(jq(this).val()));
    });

    // 성별 설정
    jq("#gender").kendoDropDownList({
        dataSource: {
            data: [
                {code: "m", name: "남"},
                {code: "f", name: "여"}
            ]
        },
        dataTextField: "name",
        dataValueField: "code",
		optionLabel: '선택',
        animation: false
    });


    // 전화번호(국번) 설정
    jq("#tel1").kendoDropDownList({
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

	// 휴대폰 입력 체크
    jq("#tel2, #tel3").keyup(function() {
    	JLAMP.common.repNumberKey(this);
    });

    // 지역 설정
	var data = getRegionCode();
    jq("#region_code").kendoDropDownList({
        dataSource: data,
        dataTextField: "CodeName",
        dataValueField: "Code",
		optionLabel: '선택',
        animation: false
    });

    // 두께
	var thicknessData = getThicknessCode();
    jq("#thickness_code").kendoDropDownList({
        dataSource: thicknessData,
        dataTextField: "CodeName",
        dataValueField: "Code",
		optionLabel: '선택',
        animation: false
    });
		
    // 재료
	var materialData = getMaterialCode();
    jq("#material_code").kendoDropDownList({
        dataSource: materialData,
        dataTextField: "CodeName",
        dataValueField: "Code",
		optionLabel: '선택',
        animation: false,
		change: function(e){
			var colorData = getColorCode(this.value());
			jq("#color_code").kendoDropDownList({
				dataSource: colorData,
				dataTextField: "CodeName",
				dataValueField: "Code",
				optionLabel: '선택',
				animation: false
			});

		}
    });

	//색상
	jq("#color_code").kendoDropDownList({
		dataSource: [],
		dataTextField: "CodeName",
		dataValueField: "Code",
		optionLabel: '선택',
		animation: false
	});

    // 결재 상태
	var payStatusData = getPayStatusCode();
    jq("#pay_status_code").kendoDropDownList({
        dataSource: payStatusData,
        dataTextField: "CodeName",
        dataValueField: "Code",
		optionLabel: '선택',
        animation: false
    });

	// 생년월일
	jq("#birthday").kendoDateInput({
        format: "yyyy-MM-dd",
        messages:{
            "year": "____",
            "month": "__",
            "day": "__"
        }
    });
	jq("#birthday").kendoDatePicker({
        culture: 'ko-KR',
        depth: "month",
        start: "month",
        format: "yyyy-MM-dd",
        footer: "<span></span>"
    });
	jq("#birthday").closest(".k-datepicker").add(jq("#birthday")).removeClass("k-textbox");

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
        }
    });

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

	// 우편번호 검색
	jq("#btn_get_post").click(function(){
		getPost();
	});

	// 처방일
	jq("#prescription_date").kendoDateInput({
        format: "yyyy-MM-dd",
        messages:{
            "year": "____",
            "month": "__",
            "day": "__"
        }
    });
	jq("#prescription_date").kendoDatePicker({
        culture: 'ko-KR',
        depth: "month",
        start: "month",
        format: "yyyy-MM-dd",
        footer: "<span></span>"
    });
	jq("#prescription_date").closest(".k-datepicker").add(jq("#prescription_date")).removeClass("k-textbox");

	// 키
    jq("#height").focus(function() {
        if (this.value == 0)   this.value = '';
    });
    jq("#height").kendoNumericTextBox({
        format: "###.0",
        max: 999.99,
        min: -999.99,
        value: 0,
        decimals: 1,
        spinners: false,
        change: function(e) {
            // 값 없는 경우 0원으로 설정
            if (!this.value()) {
                this.value(0);
            }
        }
    });

	// 체중
    jq("#weight").focus(function() {
        if (this.value == 0)   this.value = '';
    });
    jq("#weight").kendoNumericTextBox({
        format: "###.0",
        max: 999.99,
        min: -999.99,
        value: 0,
        decimals: 1,
        spinners: false,
        change: function(e) {
            // 값 없는 경우 0원으로 설정
            if (!this.value()) {
                this.value(0);
            }
        }
    });

	// 가격
    jq("#assi_price").focus(function() {
        if (this.value == 0)   this.value = '';
    });
    jq("#assi_price").kendoNumericTextBox({
        format: "###,###",
        max: 99999999999,
        min: 0,
        value: 0,
        decimals: 0,
        spinners: false,
        change: function(e) {
            // 값 없는 경우 0원으로 설정
            if (!this.value()) {
                this.value(0);
            }
        }
    });

    // 환자유형 설정
	//var data = getPatientTypeCode('none');
    jq("#patient_type").kendoDropDownList({
        dataSource: [],
        dataTextField: "CodeName",
        dataValueField: "Code",
		optionLabel: '선택',
        animation: false
    });

    // 보조기 설정
	var data = getAssiTypeCode();
    jq("#assi_type").kendoDropDownList({
        dataSource: data,
        dataTextField: "CodeName",
        dataValueField: "Code",
		optionLabel: '선택',
        animation: false,
        change: function(e) {
			/*
			console.log(this.value());
			if(this.value() == 'G0130002'){
				jq("#assi_sub_type_area").show();
			} else {
				jq("input[name='assi_sub_type']").prop('checked', false);
				jq("#assi_sub_type_area").hide();
			}

			*/
			// 디자인 유형 코드 가져오기
			setAssiTypeHtml(this.value());

			if(jq("#lr_type").data("kendoDropDownList").value() == 'l' && this.value() == 'G0130002'){
				jq("#lr_type_right_area").hide();
				jq("#lr_type_left_area").show();
			} else if(jq("#lr_type").data("kendoDropDownList").value() == 'r' && this.value() == 'G0130002'){
				jq("#lr_type_left_area").hide();
				jq("#lr_type_right_area").show();
			} else {
				jq("#lr_type_left_area").hide();
				jq("#lr_type_right_area").hide();
			}
        }
    });

    // 좌우선택
    jq("#lr_type").kendoDropDownList({
        dataSource: {
            data: [
                {code: "l", name: "좌"},
                {code: "r", name: "우"}
            ]
        },
        dataTextField: "name",
        dataValueField: "code",
		optionLabel: '선택',
        animation: false,
        change: function(e) {

			if(jq("#assi_type").data("kendoDropDownList").value() == 'G0130002' && this.value() == 'l'){
				jq("#lr_type_right_area").hide();
				jq("#lr_type_left_area").show();
			} else if(jq("#assi_type").data("kendoDropDownList").value() == 'G0130002' && this.value() == 'r'){
				jq("#lr_type_left_area").hide();
				jq("#lr_type_right_area").show();
			} else {
				jq("#lr_type_left_area").hide();
				jq("#lr_type_right_area").hide();
			}

        }
    });


	// 업체 & 서비스 세팅
	setServiceCompanyList();

	// 환자정보 set
	if(jq("#work_type").val() == 'rollback' || jq("#work_type").val() == 'exist') {
		setPatientData();
	}

	jq("#btn_go_apply_step2").click(function(){
		// 기본정보 유효성 체크
		if(!jq("#patient_name").val()){
			alert('성명을 입력해 주십시오');
			jq("#patient_name").focus();
			return false;
		}
		if(!jq("#gender").val()){
			alert('성별을 선택해 주십시오');
			jq("#gender").focus();
			return false;
		}
		if (!JLAMP.common.isDate(jq("#birthday").val())) {
			alert("생년월일이 유효하지 않습니다.");
			jq("#birthday").focus();
			return false;
		}
		if(!jq("#region_code").val()){
			alert('거주지역을 선택해 주십시오');
			jq("#region_code").focus();
			return false;
		}
		if(!jq("#tel1").val() || !jq("#tel2").val() || !jq("#tel3").val()){
			alert('전화번호를 입력해 주십시오');
			jq("#birthday").focus();
			return false;
		}
		if (jq("#email").val().length < 2 || jq("#email").val().length > 30) {
			alert('이메일 주소 앞자리는 2~30자로 입력해 주십시오');
			jq("#email").focus();
			return false;
		}
		if (!jq("#email_address").val()) {
			alert("이메일 주소 뒷자리를 입력해 주십시오");
			jq("#email_address").focus();
			return false;
		}
		if (!jq("#post").val() || !jq("#addr").val()) {
			alert("우편번호와 주소를 입력해 주십시오");
			jq("#btn_get_post").focus();
			return false;
		}
		if (!JLAMP.common.isDate(jq("#prescription_date").val())) {
			alert("처방일이 유효하지 않습니다.");
			jq("#prescription_date").focus();
			return false;
		}
		if(!jq("#height").val() || jq("#height").val() == 0){
			alert("키를 입력해 주십시오");
			jq("#height").focus();
			return false;
		}
		if(!jq("#weight").val() || jq("#weight").val() == 0){
			alert("체중을 입력해 주십시오");
			jq("#weight").focus();
			return false;
		}
		if(!jq("#assi_type").val()){
			alert("보조기를 선택해 주십시오");
			jq("#assi_type").focus();
			return false;
		}
		/*
		if(jq("#assi_type").val() == 'G0130002' && !jq("input[name=assi_sub_type]:checked").val()){
			alert("하지교정각을 선택해 주십시오");
			jq("#assi_sub_type_a").focus();
			return false;
		}
		*/

		if(!jq("#lr_type").val()){
			alert("좌우를 선택해 주십시오");
			jq("#lr_type").focus();
			return false;
		}
		if(!jq("#patient_type").val()){
			alert("환자유형을 선택해 주십시오");
			jq("#patient_type").focus();
			return false;
		}
		if(jq("#assi_type").data("kendoDropDownList").value() == 'G0130002' && jq("#lr_type").data("kendoDropDownList").value() == 'l' ){
			if (!jq("#ftjr_left").val()) {
				alert("하지교정각을 입력해 주십시오");
				jq("#ftjr_left").focus();
				return false;
			} else if (!jq("#fsjr_left").val()) {
				alert("하지교정각을 입력해 주십시오");
				jq("#fsjr_left").focus();
				return false;
			}
		}
		if(jq("#assi_type").data("kendoDropDownList").value() == 'G0130002' && jq("#lr_type").data("kendoDropDownList").value() == 'r' ){
			if (!jq("#ftjr_right").val()) {
				alert("하지교정각을 입력해 주십시오");
				jq("#ftjr_right").focus();
				return false;
			} else if (!jq("#fsjr_right").val()) {
				alert("하지교정각을 입력해 주십시오");
				jq("#fsjr_right").focus();
				return false;
			}
		}
		if(jq("#thickness_code").data("kendoDropDownList").value() == ''){
			alert("두께을 선택해 주십시오");
			jq("#thickness_code").focus();
			return false;
		}
		if(jq("#material_code").data("kendoDropDownList").value() == ''){
			alert("재료을 선택해 주십시오");
			jq("#material_code").focus();
			return false;
		}
		if(jq("#color_code").data("kendoDropDownList").value() == ''){
			alert("색상을 선택해 주십시오");
			jq("#color_code").focus();
			return false;
		}
		if(jq("#pay_status_code").data("kendoDropDownList").value() == ''){
			alert("결제상태를 선택해 주십시오");
			jq("#pay_status_code").focus();
			return false;
		}
//		if(!jq("#design_type").val()){
//			alert("디자인을 선택해 주십시오");
//			jq("#design_type").focus();
//			return false;
//		}

		// Scanning > Printing : 설정 불가능
		var selScanning = jq("input[name^=sp_scanning_service]:checked").length;
		var selModeling = jq("input[name^=sp_modeling_service]:checked").length;
		var selPrinting = jq("input[name^=sp_printing_service]:checked").length;
		if(selScanning > 0 && selModeling == 0 & selPrinting > 0) {
			alert('Scanning > Printing 서비스는 설정 불가능합니다. \nModeling 세부 서비스 항목을 선택해 주시기 바랍니다.');
			jq(this).prop('checked', false);
			return false;
		}

		if( (selScanning == 0 || jq("input[name^=sp_scanning_service]:checked").val() == '') &&
		    (selModeling == 0 || jq("input[name^=sp_modeling_service]:checked").val() == '') &&
			(selPrinting == 0 || jq("input[name^=sp_printing_service]:checked").val() == '') ) {
			alert('세부 서비스 항목을 선택해 주시기 바랍니다.');
			jq(this).prop('checked', false);
			return false;
		}

		jq("#frm_step1").submit();
	});
});

/**
 * 메소드명: setAssiTypeHtml
 * 작성자: 최영은
 * 설 명:  보조기 설정에 따른 data set
 *
 * @param - string pCode 부모코드
 *
 * 최초작성일: 2018.01.08
 * 최종수정일: 2018.01.08
 * ---
 * Date              Auth        Desc
*/
function setAssiTypeHtml(pCode){
	var arr = getPatientTypeCode(pCode);
	jq("#patient_type").data("kendoDropDownList").setDataSource(arr);

	var designHtml = '';
	if(pCode) {
		// 디자인 유형 코드 가져오기
		arr = getDesignTypeCode(pCode);

		// 디자인 유형 set
		jq.each(arr, function(i, d){
			var checked = i > 0 ? '' : ' checked';
			var extention = '.jpg';
			if (d.Code == 'G0180006' ||d.Code == 'G0180007') {
				extention = '.png';
			}
			designHtml += '<div class="icon design_type_list" >';
			designHtml += '<img src="/data/service/design/'+ d.Code + extention +'" alt="" onerror="this.src=\'/image/no_picture.jpg\'" onClick="showImgViewer(\'/data/service/design/'+ d.Code +extention +'\', \''+ d.Desc +'\');"><br>';
			designHtml += '<div class="check-wrap inline">';
			designHtml += '<input type="radio" id="design_type_'+ d.Code +'" name="design_type" value="'+ d.Code +'"' +checked + '>';
			designHtml += '<label for="design_type_'+ d.Code +'"><span class="radiobtn"></span> </label>';
			designHtml += '</div>';
			designHtml += '</div>';
		});
	}
	jq("#design_type_area").html(designHtml);
} // end of function setAssiTypeHtml

/**
 * 메소드명: setPatientData
 * 작성자: 최영은
 * 설 명:  환자정보 set
 *
 * 최초작성일: 2018.01.08
 * 최종수정일: 2018.01.08
 * ---
 * Date              Auth        Desc
*/
function setPatientData(){
    JLAMP.common.loading('#basic_info_area', 'pulse');
    JLAMP.common.loading('#prescription_info_area', 'pulse');

	jq.ajax({
		url: '/service/apply/getPatientData_prc',
		data: {
			workType: jq("#work_type").val(),
			idx: jq("#service_apply_idx").val()
		},
		type: 'get',
		dataType: 'json',
		success: function(res, status, xhr) {
			if (res) {
				if (res.returnCode == 0) {
					d = res.data.patientData;

					// 기본 정보
					jq("#patient_name").val(d.patient_name);
					jq("#gender").data("kendoDropDownList").value(d.gender);
					jq("#birthday").data("kendoDatePicker").value(new Date(d.birthday));
					jq("#region_code").data("kendoDropDownList").value(d.region_code);
					jq("#tel1").data("kendoDropDownList").value(d.tel1);
					jq("#tel2").val(d.tel2);
					jq("#tel3").val(d.tel3);
					jq("#email").val(d.email);
					jq("#email_address").val(d.email_address);
					jq("#post").val(d.post);
					jq("#addr").val(d.addr);
					jq("#addr_detail").val(d.addr_detail);

					// 처방 정보
					if(jq("#work_type").val() == 'rollback') {
						jq("#prescription_date").data("kendoDatePicker").value(new Date(d.prescription_date));
						jq("#height").data("kendoNumericTextBox").value(d.height);
						jq("#weight").data("kendoNumericTextBox").value(d.weight);
						jq("#assi_type").data("kendoDropDownList").value(d.assi_type);
						//jq("#assi_sub_type_" + d.assi_sub_type).prop('checked', true);
						jq("#lr_type").data("kendoDropDownList").value(d.lr_type);
						setAssiTypeHtml(d.assi_type);
						jq("#patient_type").data("kendoDropDownList").value(d.patient_type);
						//jq("#design_type").val(d.design_type);
						jq("#design_type_" + d.design_type).prop('checked', true);
					}
				}
			}
		},
		error: function (xhr, status, error) {
			alert(error);
		},
		complete: function (xhr, status) {
			JLAMP.common.loadingClose('#basic_info_area');
			JLAMP.common.loadingClose('#prescription_info_area');
		}
	});
} // end of function setPatientData


/**
 * 메소드명: setAddress
 * 작성자: 김목영
 * 설 명:  우편번호 및 주소 Binding
 *
 * @param array data 주소 정보
 *
 * 최초작성일: 2017.08.01
 * 최종수정일: 2017.08.01
 * ---
 * Date              Auth        Desc
*/
function setAddress(data) {
    var zipNo = data["zipNo"];      // 우편번호
    var roadFullAddr = data['roadFullAddr'];    // 도로명 주소
    var jibunAddr = data['jibunAddr'];  // 지번 주소

    var addr = roadFullAddr ? roadFullAddr : jibunAddr;

    jq("#post").val(zipNo);
    jq("#addr").val(addr);

    jq("#addr_detail").focus();

} // end of function getAddress

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
	return data;
} // end of function getRegionCode

/**
 * 메소드명: getAssiTypeCode
 * 작성자: 최영은
 * 설 명: 보조기코드 가져오기 Process
 *
 * @return - data object 지역코드 data
 *
 * 최초작성일: 2017.12.12
 * 최종수정일: 2017.12.12
 * ---
 * Date              Auth        Desc
*/
function getAssiTypeCode(){
	var data = [];
	jq.ajax({
		url: '/common/getCode_prc',
		data: {
			groupCode: 'G013'
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
} // end of function getAssiTypeCode

/**
 * 메소드명: getPatientTypeCode
 * 작성자: 최영은
 * 설 명: 환자유형 코드 가져오기 Process
 *
 * @param - pCode object 부모 코드
 * @return - data object 지역코드 data
 *
 * 최초작성일: 2017.12.12
 * 최종수정일: 2017.12.12
 * ---
 * Date              Auth        Desc
*/
function getPatientTypeCode(pCode){
	var data = [];
	jq.ajax({
		url: '/common/getCode_prc',
		data: {
			groupCode: 'G012',
			pCode: pCode,
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
} // end of function getPatientTypeCode

/**
 * 메소드명: getDesignTypeCode
 * 작성자: 최영은
 * 설 명: 디자인 유형 코드 가져오기 Process
 *
 * @param - pCode object 부모 코드
 * @return - data object 지역코드 data
 *
 * 최초작성일: 2017.12.12
 * 최종수정일: 2017.12.12
 * ---
 * Date              Auth        Desc
*/
function getDesignTypeCode(pCode){
	var data = [];
	jq.ajax({
		url: '/common/getCode_prc',
		data: {
			groupCode: 'G018',
			pCode: pCode,
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
} // end of function getDesignTypeCode


/**
 * 메소드명: setServiceCompanyList
 * 작성자: 최영은
 * 설 명:  설정할 서비스 업체 리스트 가져오기 Process
 *
 * 최초작성일: 2017.12.19
 * 최종수정일: 2017.12.19
 * ---
 * Date              Auth        Desc
*/
function setServiceCompanyList(){
    // Loading Indicator
    JLAMP.common.loading('.company_sel', 'pulse');

	jq.ajax({
		url: '/service/apply/getServiceCompanyList_prc',
		type: 'get',
		async: false,
		dataType: 'json',
		success: function(res, status, xhr) {
			if (res) {
				if (res.returnCode == 0) {
					// 스캐닝 업체
					var html = '';
					var checked;
					if(res.data.scanningList.length > 0) {
						html = '';
						jq.each(res.data.scanningList, function(i, d){
							if(res.data.selCompany.ScanningCompanyIdx > 0){
								checked = res.data.selCompany.ScanningCompanyIdx != d.CompanyIdx ? '': ' checked';
							} else {
								checked = i > 0 ? '': ' checked';
							}
							html += '<li>';
							html += '<div class="check-wrap">';
							html += '<input type="radio" id="sp_scanning_company_' + d.CompanyIdx + '" name="sp_scanning_company" ' + checked + ' class="sel_company_cls" procCode="G0070001" procName="scanning" value=' + d.CompanyIdx + '>';
							html += '<label for="sp_scanning_company_' + d.CompanyIdx + '"><span class="radiobtn"></span> ' + d.ComName + ' </label>';
							html += '</div>';
							html += '</li>';
						});
						var selCompanyIdx = res.data.selCompany.ScanningCompanyIdx > 0 ? res.data.selCompany.ScanningCompanyIdx : res.data.scanningList[0].CompanyIdx;
						setServiceList(res.data.scanningList[0].ProcCode, 'scanning', selCompanyIdx);
					}
					jq("#sp_scanning_company_area").html(html);

					// 모델링 업체
					html = '';
					if(res.data.modelingList.length > 0) {
						jq.each(res.data.modelingList, function(i, d){
							if(res.data.selCompany.ModelingCompanyIdx > 0){
								checked = res.data.selCompany.ModelingCompanyIdx != d.CompanyIdx ? '': ' checked';
							} else {
								checked = i > 0 ? '': ' checked';
							}
							html += '<li>';
							html += '<div class="check-wrap">';
							html += '<input type="radio" id="sp_modeling_company_' + d.CompanyIdx + '" name="sp_modeling_company" ' + checked + ' class="sel_company_cls" procCode="G0070002" procName="modeling" value=' + d.CompanyIdx + '>';
							html += '<label for="sp_modeling_company_' + d.CompanyIdx + '"><span class="radiobtn"></span> ' + d.ComName + ' </label>';
							html += '</div>';
							html += '</li>';
						});
						var selCompanyIdx = res.data.selCompany.ModelingCompanyIdx > 0 ? res.data.selCompany.ModelingCompanyIdx : res.data.modelingList[0].CompanyIdx;
						setServiceList(res.data.modelingList[0].ProcCode, 'modeling', selCompanyIdx);
					}
					jq("#sp_modeling_company_area").html(html);

					// 프린팅 업체
					html = '';
					if(res.data.printingList.length > 0) {
						jq.each(res.data.printingList, function(i, d){
							if(res.data.selCompany.PrintingCompanyIdx > 0){
								checked = res.data.selCompany.PrintingCompanyIdx != d.CompanyIdx ? '': ' checked';
							} else {
								checked = i > 0 ? '': ' checked';
							}
							html += '<li>';
							html += '<div class="check-wrap">';
							html += '<input type="radio" id="sp_printing_company_' + d.CompanyIdx + '" name="sp_printing_company" ' + checked + ' class="sel_company_cls" procCode="G0070003" procName="printing" value=' + d.CompanyIdx + '>';
							html += '<label for="sp_printing_company_' + d.CompanyIdx + '"><span class="radiobtn"></span> ' + d.ComName + ' </label>';
							html += '</div>';
							html += '</li>';
						});
						var selCompanyIdx = res.data.selCompany.PrintingCompanyIdx > 0 ? res.data.selCompany.PrintingCompanyIdx : res.data.printingList[0].CompanyIdx;
						setServiceList(res.data.printingList[0].ProcCode, 'printing', selCompanyIdx);
					}
					jq("#sp_printing_company_area").html(html);

					// 업체 변경에 따른 세부 서비스 항목 리스트 변경
					jq(".sel_company_cls").click(function(e){
						setServiceList(jq(this).attr('procCode'), jq(this).attr('procName'), jq(this).val());
					});
				}
			}
		},
		error: function (xhr, status, error) {
			alert(error);
		},
		complete: function (xhr, status) {
			JLAMP.common.loadingClose('.company_sel');
		}
	});
} // end of function setServiceCompanyList

/**
 * 메소드명: setServiceList
 * 작성자: 최영은
 * 설 명:  설정할 서비스 업체 서비스 항목 리스트 가져오기 Process
 *
 * @param - string procCode 제공 서비스 코드
 * @param - string procName 제공 서비스 명
 * @param - int idx 업체 일련번호
 *
 * 최초작성일: 2017.12.19
 * 최종수정일: 2017.12.19
 * ---
 * Date              Auth        Desc
*/
function setServiceList(procCode, procName, idx){

    // Loading Indicator
    JLAMP.common.loading('#service_'+ procName +'_sel', 'pulse');

	var html = '';
	jq.ajax({
		url: '/service/apply/getServiceList_prc',
		data: {
			procCode: procCode,
			companyIdx: idx
		},
		type: 'get',
		async: false,
		dataType: 'json',
		success: function(res, status, xhr) {
			if (res) {
				if (res.returnCode == 0) {
					var html = '';
					var checked;
					if(res.data.serviceList.length > 0) {
						// 선택안함 항목
						html += '<li>';
						html += '<div class="check-wrap">';
						html += '<input type="radio" id="sp_' +  procName + '_service_no" name="sp_' + procName + '_service" value="" checked>';
						html += '<label for="sp_' + procName + '_service_no"><span class="radiobtn"></span> 선택안함 </label>';
						html += '</div>';
						html += '</li>';

						jq.each(res.data.serviceList, function(i, d){
							html += '<li>';
							html += '<div class="check-wrap">';
							html += '<input type="radio" id="sp_' +  procName + '_service_' +  d.SubProcCode + '" name="sp_' + procName + '_service" value="' +  d.SubProcCode + '">';
							html += '<label for="sp_' + procName + '_service_' +  d.SubProcCode + '"><span class="radiobtn"></span> ' +  d.SubProcMame + ' </label>';
							html += '</div>';
							html += '</li>';
						});
					}
					jq("#sp_"+ procName +"_service_area").html(html);

					// Scanning > Printing : 설정 불가능
					// Scanning이 선택되면 반드시 Modeling이 선택되어야 Printing 선택이 가능함
					jq("input[id^=sp_printing_service_]").change(function(e){
						var selScanning = jq("input[name^=sp_scanning_service]:checked").length;
						var selModeling = jq("input[name^=sp_modeling_service]:checked").length;
						if(selScanning > 0 && selModeling == 0) {
							alert('Modeling을 선택해 주시기 바랍니다.');
							jq(this).prop('checked', false);
							return false;
						}
					});

					// 체크박스 1개만 선택 가능하도록 처리
					jq("input[id^=sp_" + procName + "_service_]").change(function(e){
						var checked = jq(this).prop('checked');
						if(checked){
							jq("input[id^=sp_" + procName + "_service_]").prop('checked', false);
						}
						jq(this).prop('checked', checked);
					});
				}
			}
		},
		error: function (xhr, status, error) {
			alert(error);
		},
		complete: function (xhr, status) {
			JLAMP.common.loadingClose('#service_'+ procName +'_sel');
		}
	});
} // end of function setServiceList

/**
 * 메소드명: getThicknessCode
 * 작성자: 김영탁
 * 설 명:  두께코드 가져오기 Process
 *
 * @return - data object 지역코드 data
 *
 * 최초작성일: 2017.12.12
 * 최종수정일: 2017.12.12
 * ---
 * Date              Auth        Desc
*/
function getThicknessCode(){
	var data = [];
	jq.ajax({
		url: '/common/getCode_prc',
		data: {
			groupCode: 'G019'
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
} // end of function getThicknessCode

/**
 * 메소드명: getMaterialCode
 * 작성자: 김영탁
 * 설 명:  재료코드 가져오기 Process
 *
 * @return - data object 지역코드 data
 *
 * 최초작성일: 2017.12.12
 * 최종수정일: 2017.12.12
 * ---
 * Date              Auth        Desc
*/
function getMaterialCode(){
	var data = [];
	jq.ajax({
		url: '/common/getCode_prc',
		data: {
			groupCode: 'G020'
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
} // end of function getMaterialCode

/**
 * 메소드명: getColorCode
 * 작성자: 김영탁
 * 설 명:  색상코드 가져오기 Process
 *
 * @return - data object 지역코드 data
 *
 * 최초작성일: 2017.12.12
 * 최종수정일: 2017.12.12
 * ---
 * Date              Auth        Desc
*/
function getColorCode(pCode){
	var data = [];
	jq.ajax({
		url: '/common/getCode_prc',
		data: {
			groupCode: 'G021',
			pCode: pCode
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
} // end of function getColorCode

/**
 * 메소드명: getPayStatusCode
 * 작성자: 김영탁
 * 설 명:  결제 상태 가져오기 Process
 *
 * @return - data object 지역코드 data
 *
 * 최초작성일: 2017.12.12
 * 최종수정일: 2017.12.12
 * ---
 * Date              Auth        Desc
*/
function getPayStatusCode(){
	var data = [];
	jq.ajax({
		url: '/common/getCode_prc',
		data: {
			groupCode: 'G022'
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
} // end of function getPayStatusCode


//# sourceURL=apply_step1.js