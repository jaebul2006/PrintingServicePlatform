<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri = "http://www.springframework.org/tags/form" prefix = "form"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="ko">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="imagetoolbar" content="no">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <title>ME3D</title>

    <!-- Favicon
    <link rel="shortcut icon" href="/favicon.ico">
     -->
    <!-- Kendo UI custom //-->
    <link href="./resources/third_party/KendoUI/styles/kendo.common.min.css" rel="stylesheet">
    <link href="./resources/third_party/KendoUI/styles/kendo.common-bootstrap.min.css" rel="stylesheet">
    <link href="./resources/third_party/KendoUI/styles/kendo.bootstrap.min.css" rel="stylesheet">

    <!-- Kendo UI custom //-->
    <link rel="stylesheet" href="./resources/css/kendo_komed3d.css">
    <link rel="stylesheet" href="./resources/css/kendo_modify.css">

    <!-- bootstrap 3.3.5 //-->
    <link rel="stylesheet" href="./resources/third_party/bootstrap-3.3.5/css/bootstrap.min.css">
    <!-- loading overlay //-->
    <link rel="stylesheet" href="./resources/third_party/loading-overlay/waitMe.css">
    <!-- bootstrap custom //-->
    <link rel="stylesheet" href="./resources/css/boostrap_modify.css">
    <!-- owl banner slider -->
    <link href="./resources/third_party/owl-carousel/css/owl.carousel.css" rel="stylesheet">
    <!-- common -->
    <link rel="stylesheet" href="./resources/css/common.css">

    <link rel="stylesheet" href="./resources/css/service/intro.css">

    <!-- jquery 2.1.4 //-->
    <script type="text/javascript" src="./resources/third_party/jquery-2.1.4/jquery.js"></script>
    <script type="text/javascript" src="./resources/third_party/jquery-ui-1.11.4/jquery-ui.js"></script>
    <!-- bootstrap 3.3.5 //-->
    <script type="text/javascript" src="./resources/third_party/bootstrap-3.3.5/js/bootstrap.min.js"></script>
    <!-- loading overlay //-->
    <script type="text/javascript" src="./resources/third_party/loading-overlay/waitMe.js"></script>
    <!-- analytics //-->
    <script async src="./resources/js/analytics.js"></script>
    <!-- jquery.easing //-->
    <script src="./resources/js/jquery.easing.1.3.js"></script>
    <!-- owl banner slider -->
    <script src="./resources/third_party/owl-carousel/js/owl.carousel.js"></script>

    <!-- Kendo UI //-->
    <script src="./resources/third_party/KendoUI/js/kendo.all.min.js"></script>
    <script src="./resources/third_party/KendoUI/js/cultures/kendo.culture.ko-KR.min.js"></script>

    

    <script>
        var jq = $.noConflict();
    </script>

    <script type="text/javascript" src="./resources/js/JLAMP.polyfill.min.js"></script>
    <script type="text/javascript" src="./resources/js/JLAMP.min.js"></script>
    <script type="text/javascript" src="./resources/js/JLAMP.common.min.js"></script>
    <script type="text/javascript" src="./resources/js/gnb.js"></script>
    <script type="text/javascript" src="./resources/js/common.js"></script>
    <script src="./resources/js/service/intro.js"></script>

<body>

    <input type="hidden" id="is_login" name="is_login" value="" />
    <input type="hidden" id="common_login_type" name="common_login_type" value="" />

<div id="skip-navigation">
    <ol>
        <li><a href="#lnb">상단 메뉴 바로가기</a></li>
        <li><a href="#contents">본문 바로가기</a></li>
    </ol>
</div>

<div id="wrap" class="">
    <!-- header -->
    <div id="header-wrap" style="left: 0px;" class="">
        <!-- pc menu -->
        <div id="header" style="top: 0px;">
            <div class="header-inner inner-fixed">
                <ul class="gnb-top">
                    <li class="fr">
                        <a href="/Med3d/UserLogin">로그인</a> <span class="bar">|</span>
                        <a href="/Med3d/UserJoin">회원가입</a> <span class="bar">|</span>
                        <a onclick="location.href='/Med3d/ServiceIntroduce';" style="cursor:pointer;" class="gnb-service">의료 3DP 서비스</a> <span
                            class="bar">|</span>
                        <a onclick="location.href='/Med3d/SoftwareIntroduce';" style="cursor:pointer;" class="gnb-software">3DP 소프트웨어</a>
                    </li>
                </ul>
                <div class="head-content">
                    <!--  <h1><a href="/Med3d"><img src="./resources/image/logo.svg" alt="ME3D"></a></h1> -->
                    <h1><a href="/Med3d"><img src="./resources/image/rd_ci.png" alt="ME3D"></a></h1>
                </div>
            </div>
        </div>
        <!--//pc menu -->

        <div id="toputil">
            <div class="al_box inner-fixed">
                <a href="" class="mob_btn"><span>모바일 메뉴 열기</span></a>
            </div>
        </div>

        <!-- gnb -->
        <div id="gnb" class="mob" style="height: auto; display: none; left: -220px;">
            <div id="blind" style="opacity: 0.9; height: 0px; display: none; overflow: hidden;"><span></span></div>

            <div class="mob-box">
                <h1>
                    <a href="/main">
                        <img src="./resources/image/logo.svg" alt="ME3D">
                        <!--img src="/image/logo.jpg" alt="ME3D"-->
                    </a>
                </h1>
                <div class="log-wrap f0">
                    <span onClick="location.href='/user/login'" style="cursor:pointer;">
					<span class="icon-avator mR5"></span><span>로그인하세요 </span>
				</span>
                    <li id="logout_user_ui" class="fr">
                    </li>
                </div>
                <ul class="goBox">
                    <li>
                        <a onclick="jq('#service_div').css('display','block');jq('#software_div').css('display','none');jq('.gnb-service').addClass('active');jq('.gnb-software').removeClass('active');"
                           style="cursor:pointer;" class="gnb-service">의료 3DP 서비스</a></li>
                    <li>
                        <a onclick="jq('#software_div').css('display','block');jq('#service_div').css('display','none');jq('.gnb-software').addClass('active');jq('.gnb-service').removeClass('active');"
                           style="cursor:pointer;" class="gnb-software">3DP 소프트웨어</a></li>
                </ul>
            </div>

            <div class="al_box" id="service_div" style="display:none">
                <nav id="nav">
                    <ul class="group">
                        <li class="menu1">
                            <a onclick="location.href='/Med3d/ServiceIntroduce';" style="cursor:pointer;"
                               class="num1 bu-none sub_service_menu_1">서비스 소개</a>
                        </li>
                        <li class="menu2">
                            <a style="cursor:pointer;" class="num1 sub_service_menu_2">서비스 신청</a>
                            <ul id="service_menuBox" class="menuBox group" style="height: auto; display: none;">
                                <li><a onclick="location.href='/service/apply?cd=G0050001'" style="cursor:pointer;"
                                       class="depth" target="_self"><strong
                                        id="service_menu_G0050001">재활의학과</strong></a></li>
                                <li><a onclick="location.href='/service/apply?cd=G0050002'" style="cursor:pointer;"
                                       class="depth" target="_self"><strong id="service_menu_G0050002">치과</strong></a>
                                </li>
                                <li><a onclick="location.href='/service/apply?cd=G0050003'" style="cursor:pointer;"
                                       class="depth" target="_self"><strong id="service_menu_G0050003">정형외과</strong></a>
                                </li>
                                <li><a onclick="location.href='/service/apply?cd=G0050004'" style="cursor:pointer;"
                                       class="depth" target="_self"><strong id="service_menu_G0050004">성형외과</strong></a>
                                </li>
                                <li><a onclick="location.href='/service/apply?cde=G0050005'" style="cursor:pointer;"
                                       class="depth" target="_self"><strong
                                        id="service_menu_G0050005">이비인후과</strong></a></li>
                            </ul>
                        </li>
                        <li class="menu3">
                            <a onclick="location.href='/user/serviceStatus';" style="cursor:pointer;"
                               class="num1 bu-none sub_service_menu_3">서비스 진행 현황</a><!--href="service_step"-->
                        </li>
                        <li class="menu4">
                            <a onclick="location.href='/service/faq/serviceFaq';" style="cursor:pointer;"
                               class="num1 bu-none sub_service_menu_4">자주 묻는 질문</a>
                        </li>
                        <li class="menu5">
                            <a onclick="location.href='/service/qna/qnaList';" style="cursor:pointer;"
                               class="num1 bu-none sub_service_menu_5">Q&A</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="al_box" id="software_div" style="display:none">
                <nav id="nav">
                    <ul class="group">
                        <li class="menu1">
                            <a onclick="location.href='/software/introduction';" style="cursor:pointer;"
                               class="num1 bu-none sub_software_menu_1">서비스 소개</a>
                        </li>
                        <li class="menu2">
                            <a onclick="location.href='/software/software';" style="cursor:pointer;"
                               class="num1 bu-none sub_software_menu_2">소프트웨어</a>
                        </li>
                        <li class="menu3">
                            <a onclick="location.href='/software/apply';" style="cursor:pointer;"
                               class="num1 bu-none sub_software_menu_3">서비스등록</a>
                        </li>
                        <li class="menu4">
                            <a onclick="location.href='/software/faq/softwareFaq';" style="cursor:pointer;"
                               class="num1 bu-none sub_software_menu_4">자주 묻는 질문</a>
                        </li>
                        <li class="menu5">
                            <a onclick="location.href='/software/qna/qnaList';" style="cursor:pointer;"
                               class="num1 bu-none sub_software_menu_5">Q&A</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
        <!-- //gnb -->
        <div id="blind_mob" style="opacity: 0; left: 0px; display: none;"></div>

    </div>
    <!-- //header -->
    <!-- container -->
    <div id="container">

	<div class="visual-sub vs-bg-01">
		<h3>의료 서비스</h3>
		의료 서비스에서는 의료분야에서 3D프린터 및 3D프린팅 기술을 용이하게 활용할 수 있도록 지원하기 위한 응용 S/W솔루션 및 서비스를 제공합니다.
	</div>

    <!-- contents -->
    <div id="contents">

		<h4 class="title mT50">의료 서비스</h4>
		<div class="box-bg content-header">
			  의료 서비스에서는 의료분야에서 3D프린터 및 3D프린팅 기술을 용이하게 활용할 수 있도록 지원하기 위한 응용 S/W솔루션 및 서비스를 제공합니다. Scanning, Modeling, 3D Printing의 제작에 필요한 모든 신청을 한 곳에서 할 수 있으며 제작 중인 제품의 진행 현황을 한눈에 쉽게 파악 할 수 있습니다.
		</div>

		<div class="tbl-cell info">
			<ul>
				<li><img src="./resources/image/info-icon-01.png" alt=""></li>
				<li>
					<h4 class="mB20">3D 스케닝 서비스</h4>
					인체 맞춤형 3D 프린팅 의료기기를 제작하기 위하여 인체의 3D 정보가 필요합니다.<br>
					3D 스케닝 서비스는 재활 의학에서 인체 맞춤형 3D 프린팅 보조기를 제작하기 위하여 <br>
					보조기 적용 부위의 바디 3D 스케닝 서비스를 제공합니다.
				</li>
			</ul>
			<ul>
				<li><img src="./resources/image/3DModeling.png" width="285px" height="225px" alt=""></li>
				<li>
					<h4>3D 모델링 서비스</h4>
					인체의 바디 3D 스케닝 정보나 의료영상정보 등을 기반으로 <br>
					인체 맞춤형 의료기기를 디자인하고 설계하는 모델링 서비스를 제공합니다.

				</li>
			</ul>
			<ul>
				<li><img src="./resources/image/info-icon-03.png" alt=""></li>
				<li>
					<h4>3D 프린팅 서비스</h4>
					인체 맞춤형 의료기기의 3D 모델링 데이터를 이용하여<br> 최적의 3D 프린팅 출력물을 제작하여 배송하는 서비스입니다.



				</li>
			</ul>
		</div>

		<p class="info mT20">
		<span class="font-p1">현재 의료보조기 제작 무료 시범서비스 중</span>입니다.<br>
		진료기관/기업 회원으로 신규 가입하시어 무상으로 재활 의학 보조기 제작의 새로운 서비스를 경험해 보시기 바랍니다.

		</p>

		<div style="text-align:center;padding-top:10px;" class="mT20">
			<iframe src="https://player.vimeo.com/video/250206203" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
			<p><a href="https://vimeo.com/250206203">1MediACE3D_Process</a> from <a href="https://vimeo.com/user69227620">SOLIDENG</a> on <a href="https://vimeo.com">Vimeo</a>.</p>
		</div>
        <!-- image
        <div class="box-line mT30 pT30 pB30" style="float: left; width: 100%;">
            <img src="/image/svc-step-01.png" alt="" style="width:100%; max-width:1437px">
        </div> -->

		<h4 class="title mT50">주요 참여 업체</h4>
        <!-- table start -->
        <table cellspacing="0" border="1" summary="리스트" class="tbl-list mT20">
			<caption>목록</caption>
			<colgroup>
				<col width="20%">
				<col width="20%">
				<col width="25%">
				<col width="35%">
			</colgroup>
			<thead>
				<tr>
					<th></th>
					<th>업체</th>
					<th>출력물</th>
					<th>소프트웨어</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td class="bg-point">재활분야</td>
					<td class="left">(주)리얼디멘션</td>
					<td class="left">의료용하지보조기</td>
					<td class="left">하지보조기모델생성3D CAD 엔진</td>
				</tr>
				<tr>
					<td class="bg-point">치과분야</td>
					<td class="left">(주)대성산업</td>
					<td class="left">서치클가이드(보철물)</td>
					<td class="left">치과기공소 3DP 디자인CAD 응용</td>
				</tr>
				<tr>
					<td class="bg-point">정형분야 </td>
					<td class="left">(주)코렌텍 </td>
					<td class="left">환자맞춤형고관절, 견관절3D 디자인</td>
					<td class="left">병원용환자맞춤형관절3D 디자인뷰어</td>
				</tr>
				<tr>
					<td class="bg-point">성형분야 </td>
					<td class="left">(주)진명아이엔씨</td>
					<td class="left">의과대학학습용인체모형디자인</td>
					<td class="left"> 3DP 인체모형개발모듈</td>
				</tr>
			</tbody>
		</table>
        <!-- //table end -->
        <!-- //content -->
    </div>
    <!-- //contents -->
    <!-- container -->


</div>

    <!-- footer -->
    <div id="footer">
               <span class="goLink">
                    <!--<a href="policy.html"><span class="font-p2">개인정보처리방침</span></a>   <span class="bar">|</span>-->
                   <!--<a href="conditions.html">이용약관</a>   <span class="bar">|</span>-->
                   <!--<a href="contactUs.html">오시는길</a>   <span class="bar">|</span>-->
                   <!--<a href="sitemap.html">사이트맵</a>-->
                </span>
        <ul class="inner-fixed">
            <li class="foot-f01"><a href=""><img src="./resources/image/footer_logo.svg" alt=""></a></li>
            <li class="foot-f02">
                        <span class="copy">
                            <span class="address">Unauthorized use/replication is prohibited. we do not hava any representation or distributions.		</span>
                            <span class="m-none">Copyright </span> © 2017 ME3D all right reserved.
                            <span class="m-none"> 'ME3D' and 'MECO' are registered trademarks.</span>
                        </span>
            </li>
        </ul>
    </div>
    <!-- //footer -->
    </div>

    <!-- quick menu -->
    <div id="quickMenu">
        <div id="service_quick_div" class="qm-head">Quick Menu<br>서비스</div>
        <ul id="service_quick_ul" class="qm-body">

			<!-- 무조건 재활의학과 신청 페이지로 이동 되도록  -->
            <li style="cursor:pointer;" onclick="location.href='/service/apply?cd=G0050001'"><span
                    class="icon-quick-01"></span><br>서비스 신청
            </li>
            <li style="cursor:pointer;" onclick="location.href='/user/serviceStatus'"><span
                    class="icon-quick-02"></span><br>서비스<br>진행 현황
            </li>
            <li style="cursor:pointer;" onclick="location.href='/service/faq/serviceFaq'"><span
                    class="icon-quick-03"></span><br>자주 묻는 질문
            </li>
            <li style="cursor:pointer;" onclick="location.href='/service/qna/qnaList'"><span
                    class="icon-quick-04"></span><br>Q&A
            </li>
        </ul>
        <div id="software_quick_div" class="qm-head" style="display:none">Quick Menu<br>소프트웨어</div>
        <ul id="software_quick_ul" class="qm-body" style="display:none">
            <li style="cursor:pointer;" onclick="location.href='/software/software'"><span class="icon-quick-02"></span><br>소프트웨어
            </li>
            <li style="cursor:pointer;" onclick="location.href='/software/faq/softwareFaq'"><span
                    class="icon-quick-03"></span><br>자주묻는 질문
            </li>
            <li style="cursor:pointer;" onclick="location.href='/software/qna/qnaList'"><span
                    class="icon-quick-04"></span><br>Q&A
            </li>
        </ul>
        <div style="cursor:pointer;" onclick="location.href='#top'" class="qm-bot">TOP <span class="icon-quick-top"></span>
        </div>
    </div>
    <!-- //quick menu -->

    <!-- scrollup -->
    <a href="#" class="scrollup" style="display: none;">Scroll</a>
    <!-- //scrollup -->

    <script>
        var m_is_login = false;

        jq(document).ready(function() {
            m_is_login = jq("#is_login").val();
        });
    </script>

	<!-- ImgView Modal -->
	<div class="modal" id="mdlImgView" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">X</span><span class="sr-only">Close</span></button>
					<h2 class="modal-title" id="myModalLabel">확대 이미지 </h2>
				</div>
				<div class="modal-body">
					<img id="common_ing_view" src="" style="width:100%">
				</div>
			</div>
		</div>
	</div>
	<!-- ImgView Modal  End! -->

</body>
</html>