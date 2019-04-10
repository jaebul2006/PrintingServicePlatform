jq(document).ready(function () {
	jq(".gnb-software").addClass("active");
	jq(".sub_software_menu_2").addClass("active").addClass("ov");
	goSoftwareStyle();
	//jq("#btn_download").html('<a href="" class="button button-primary"><span class="icon-down"></span>다운로드</a><a href="/software/software" class="button">리스트</a>');
	if (jq("#division").val() == 'afo') {
		jq("#h4_afo").html('MediACE3D - AFO');
		jq("#div_afo").html('<ul><li class=""><div class="sw-box"><ul><li>3D 프린팅을 위한 하지 보조기 모델 생성 CAD인 MediACE3D-AFO모듈은 3D 스캔 이후 외부 기준점을 사용하여 환자의 발에 맞춤형 표준 템플릿을 신속히 적용 할 수 있으며 또한 자세 보정 기능을 사용하여 환자 보행 만족도를 높일 수 있습니다.</li><li class="dot"><strong>S/W 버전 릴리즈</strong><p>&nbsp;&nbsp;V1 R201802</p></li><li class="dot"><strong>서비스</strong><p>&nbsp;&nbsp;Modeling</p></li><li class="dot"><strong>세부 서비스</strong><p>&nbsp;&nbsp;하지</p></li><li class="dot"><strong>시스템요구사항</strong><p>&nbsp;&nbsp;Windows 7 이상</p><p>&nbsp;&nbsp;16GB 메모리 이상</p><p>&nbsp;&nbsp;설치공간 200MB 이상</p></li><li class="dot"><strong>다운로드 링크</strong><a style="cursor:pointer" onclick="downloadFile(\'Setup\');"><p>&nbsp;&nbsp;<u>MediACE3D 설치 프로그램</u></p></a><a style="cursor:pointer;" onclick="downloadFile(\'Tutorial\');"><p>&nbsp;&nbsp;<u>튜터리얼 매뉴얼</u></p></a><a style="cursor:pointer;" onclick="downloadFile(\'FootSample\');"><p>&nbsp;&nbsp;<u>샘플파일</u></p></a></li></ul></div></li><li class=""><div class="visual-wrap visual-gallery"><div class="visual"><div class="item"><div class="clearfix" style="width:100%;"><ul id="image-gallery_1" class="gallery list-unstyled cS-hidden"><li data-thumb="/image/img-software-01-s-03.png"><img src="/image/img-software-01-s-03.png" class="imgBig" alt=""/></li><li data-thumb="/image/img-software-01-s-04.png"><img src="/image/img-software-01-s-04.png" class="imgBig" alt=""/></li><li data-thumb="/image/img-software-01-s-05.png"><img src="/image/img-software-01-s-05.png" class="imgBig" alt=""/></li><li data-thumb="/image/img-software-01-s-06.png"><img src="/image/img-software-01-s-06.png" class="imgBig" alt=""/></li><li data-thumb="/image/img-software-01-s-07.png"><img src="/image/img-software-01-s-07.png" class="imgBig" alt=""/></li></ul></div></div></div></div></li></ul><div  style="text-align:center;padding-top:10px;"><iframe src="https://player.vimeo.com/video/250048962" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe><p><a href="https://vimeo.com/250048962">2AFO_Demo2</a> from <a href="https://vimeo.com/user69227620">SOLIDENG</a> on <a href="https://vimeo.com">Vimeo</a>.</p></div>');
		jq("#content-slider").lightSlider({
			loop:true,
			keyPress:true
		});
		jq('#image-gallery_1').lightSlider({
			gallery:true,
			item:1,
			thumbItem:5,
			slideMargin: 0,
			gallery:true,
			speed:500,
			auto:true,
			loop:true,
			onSliderLoad: function() {
				jq('#image-gallery_1').removeClass('cS-hidden');
			}
		});
	} else if (jq("#division").val() == 'who') {
		jq("#h4_who").html('MediACE3D - WHO');
		jq("#div_who").html('<ul><li class=""><div class="sw-box"><ul><li>3D 프린팅을 위한 상지 보조기 모델 생성 CAD인 MediACE3D-WHO 모듈은 3D 스캔 이후 외부 3 기준점만으로 환자 맞춤형 표준 템플릿을 신속히 적용하고 편집할 수 있어 초보자도 쉽게 고품질의 상지보조기를 생성할 수 있습니다.</li><li class="dot"><strong>S/W 버전 릴리즈</strong><p>&nbsp;&nbsp;V1 R201802</p></li><li class="dot"><strong>서비스</strong><p>&nbsp;&nbsp;Modeling</p></li><li class="dot"><strong>세부 서비스</strong><p>&nbsp;&nbsp;하지</p></li><li class="dot"><strong>시스템요구사항</strong><p>&nbsp;&nbsp; Windows 7 이상</p><p>&nbsp;&nbsp;16GB 메모리 이상</p><p>&nbsp;&nbsp;설치공간 200MB 이상</p></li><li class="dot"><strong>다운로드 링크</strong><a style="cursor:pointer;" onclick="downloadFile(\'Setup\');"><p>&nbsp;&nbsp;<u>MediACE3D 설치 프로그램</u></p></a><a style="cursor:pointer;" onclick="downloadFile(\'Tutorial\');"><p>&nbsp;&nbsp;<u>튜터리얼 매뉴얼</u></p></a><a style="cursor:pointer;" onclick="downloadFile(\'HandSample\');"><p>&nbsp;&nbsp;<u>샘플파일</u></p></a></li></ul></div></li><li class=""><div class="visual-wrap visual-gallery"><div class="visual"><div class="item"><div class="clearfix" style="width:100%;"><ul id="image-gallery_2" class="gallery list-unstyled cS-hidden"><li data-thumb="/image/img-software-02-s-04.png"><img src="/image/img-software-02-s-04.png" class="imgBig" alt=""/></li><li data-thumb="/image/img-software-02-s-05.png"><img src="/image/img-software-02-s-05.png" class="imgBig" alt=""/></li><li data-thumb="/image/img-software-02-s-06.png"><img src="/image/img-software-02-s-06.png" class="imgBig" alt=""/></li><li data-thumb="/image/img-software-02-s-07.png"><img src="/image/img-software-02-s-07.png" class="imgBig" alt=""/></li></ul></div></div></div></div></li></ul><div style="text-align:center;padding-top:10px;"><iframe src="https://player.vimeo.com/video/250049009" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe><p><a href="https://vimeo.com/250049009">2AFO_Demo2</a> from <a href="https://vimeo.com/user69227620">SOLIDENG</a> on <a href="https://vimeo.com">Vimeo</a>.</p></div>');
		jq("#content-slider").lightSlider({
			loop:true,
			keyPress:true
		});
		jq('#image-gallery_2').lightSlider({
			gallery:true,
			item:1,
			thumbItem:5,
			slideMargin: 0,
			gallery:true,
			speed:500,
			auto:true,
			loop:true,
			onSliderLoad: function() {
				jq('#image-gallery_2').removeClass('cS-hidden');
			}
		});
	} else if (jq("#division").val() == 'etc') {
		jq("#h4_etc").html('MediACE3D-INSOLE');
		jq("#div_etc").html('<ul><li class=""><div class="sw-box"><ul><li>MediACE3D-INSOLE 모듈은 평편족 환자 및 일반인에게 맞춤형 Insole 제품을 디자인 할 수 있는 모듈로써 3D Printer에 특화된 솔루션입니다.</li><li class="dot"><strong>S/W 버전 릴리즈</strong><p>&nbsp;&nbsp;V1 R201802</p></li><li class="dot"><strong>서비스</strong><p>&nbsp;&nbsp;Modeling</p></li><li class="dot"><strong>세부 서비스</strong><p>&nbsp;&nbsp;Insole</p></li><li class="dot"><strong>시스템요구사항</strong><p>&nbsp;&nbsp;Windows 7 이상</p><p>&nbsp;&nbsp;16GB 메모리 이상</p><p>&nbsp;&nbsp;설치공간 200MB 이상</p></li><li class="dot"><strong>다운로드 링크</strong><p>&nbsp;&nbsp;준비중</p></li></ul></div></li><li class=""><div class="visual-wrap visual-gallery"><div class="visual"><div class="item"><div class="clearfix" style="width:100%;"><ul id="image-gallery_3" class="gallery list-unstyled cS-hidden"><li data-thumb="/image/img-software-03-s-04.png"><img src="/image/img-software-03-s-04.png" class="imgBig" alt=""/></li></ul></div></div></div></div></li></ul>');
		jq("#content-slider").lightSlider({
			loop:true,
			keyPress:true
		});
		jq('#image-gallery_3').lightSlider({
			gallery:true,
			item:1,
			thumbItem:5,
			slideMargin: 0,
			gallery:true,
			speed:500,
			auto:true,
			loop:true,
			onSliderLoad: function() {
				jq('#image-gallery_3').removeClass('cS-hidden');
			}
		});
		jq(".button-primary").remove();
	}
});

/**
 * 메소드명: downloadFile
 * 작성자: 김엳탁
 * 설 명:  파일 링크
 *
 * 최초작성일: 2017.12.20
 * 최종수정일: 2017.12.20
 * ---
 * Date              Auth        Desc
*/
function downloadFile(fileName){
	location.href = '/software/software/fileDownload_prc?fileName='+fileName+'&division='+jq("#division").val();
	/*
	if (fileName == 'Setup') {
		location.href = '/image/MediACE3D_Seutp.zip';
	} else if (fileName == 'Tutorial') {
		location.href = '/image/MediACE3D_Tutorial.pdf';
	} else if (fileName == 'FootSample') {
		location.href = '/image/Foot_Sample01.stl';
	} else if (fileName == 'HandSample') {
		location.href = '/image/Hand_Sample01.stl';
	}
	*/
}

/**
 * 메소드명: goSoftwareRegister
 * 작성자: 김엳탁
 * 설 명: 소프트웨어 서비스 등록페이지로 이동 
 *
 * 최초작성일: 2017.12.20
 * 최종수정일: 2017.12.20
 * ---
 * Date              Auth        Desc
*/
function goSoftwareRegister(){
	location.href = '/software/apply/applyIntro';
}

//# sourceURL=intro.js