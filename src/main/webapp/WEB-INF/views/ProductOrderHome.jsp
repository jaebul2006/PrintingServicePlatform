<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib uri = "http://www.springframework.org/tags/form" prefix = "form"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="imagetoolbar" content="no">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <title>ME3D</title>

    <!-- Favicon
    <link rel="shortcut icon" href="/favicon.ico">
     -->
    <!-- Kendo UI custom //-->
    <link href="../resources/third_party/KendoUI/styles/kendo.common.min.css" rel="stylesheet">
    <link href="../resources/third_party/KendoUI/styles/kendo.common-bootstrap.min.css" rel="stylesheet">
    <link href="../resources/third_party/KendoUI/styles/kendo.bootstrap.min.css" rel="stylesheet">

    <!-- Kendo UI custom //-->
    <link rel="stylesheet" href="../resources/css/kendo_komed3d.css">
    <link rel="stylesheet" href="../resources/css/kendo_modify.css">

    <!-- bootstrap 3.3.5 //-->
    <link rel="stylesheet" href="../resources/third_party/bootstrap-3.3.5/css/bootstrap.min.css">
    <!-- loading overlay //-->
    <link rel="stylesheet" href="../resources/third_party/loading-overlay/waitMe.css">
    <!-- bootstrap custom //-->
    <link rel="stylesheet" href="../resources/css/boostrap_modify.css">
    <!-- owl banner slider -->
    <link href="../resources/third_party/owl-carousel/css/owl.carousel.css" rel="stylesheet">
    <!-- common -->
    <link rel="stylesheet" href="../resources/css/common.css">

   
    <!-- jquery 2.1.4 //-->
    <script type="text/javascript" src="../resources/third_party/jquery-2.1.4/jquery.js"></script>
    <script type="text/javascript" src="../resources/third_party/jquery-ui-1.11.4/jquery-ui.js"></script>
    <!-- bootstrap 3.3.5 //-->
    <script type="text/javascript" src="../resources/third_party/bootstrap-3.3.5/js/bootstrap.min.js"></script>
    <!-- loading overlay //-->
    <script type="text/javascript" src="../resources/third_party/loading-overlay/waitMe.js"></script>
    <!-- analytics //-->
    <script async src="../resources/js/analytics.js"></script>
    <!-- jquery.easing //-->
    <script src="../resources/js/jquery.easing.1.3.js"></script>
    <!-- owl banner slider -->
    <script src="../resources/third_party/owl-carousel/js/owl.carousel.js"></script>

    <!-- Kendo UI //-->
    <script src="../resources/third_party/KendoUI/js/kendo.all.min.js"></script>
    <script src="../resources/third_party/KendoUI/js/cultures/kendo.culture.ko-KR.min.js"></script>

   
    <script>
        var jq = $.noConflict();
    </script>

    <script type="text/javascript" src="../resources/js/JLAMP.polyfill.min.js"></script>
    <script type="text/javascript" src="../resources/js/JLAMP.min.js"></script>
    <script type="text/javascript" src="../resources/js/JLAMP.common.min.js"></script>
    <script type="text/javascript" src="../resources/js/gnb.js"></script>
    <script type="text/javascript" src="../resources/js/common.js"></script>
    <script src="../resources/js/main.js"></script>
	
	<link rel="stylesheet" type="text/css" href="../resources/rd_css/ProductOrderHome.css">
	<script type="text/javascript" src="../resources/rd_js/ProductOrderHome.js"></script>

	<title>제품 주문 홈</title>
	
</head>
<body>

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
                    <c:choose>
                    	<c:when test="${id eq null}">
                        	<a href="/Med3d/UserLogin">로그인</a> <span class="bar">|</span>
                        	<a href="/Med3d/UserJoin">회원가입</a> <span class="bar">|</span>
                        </c:when>
                        <c:otherwise>
                        	${id} 님 반갑습니다
                        	<a href="/Med3d/LogoutTry">로그아웃</a> 
                        </c:otherwise>
                    </c:choose>>
                        <a onclick="location.href='/Med3d/ServiceIntroduce';" style="cursor:pointer;" class="gnb-service">의료 3DP 서비스</a> <span
                            class="bar">|</span>
                        <a onclick="location.href='/Med3d/SoftwareIntroduce';" style="cursor:pointer;" class="gnb-software">3DP 소프트웨어</a>
                    </li>
                </ul>
                <div class="head-content">
                    <h1><a href="/Med3d"><img src="../resources/image/rd_ci.png" alt="ME3D"></a></h1>
                </div>
            </div>
        </div>
        
        <div id="toputil">
            <div class="al_box inner-fixed">
                <a href="" class="mob_btn"><span>모바일 메뉴 열기</span></a>
            </div>
        </div>

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
                            <a onclick="location.href='/Med3d/PrintingProductHome';" style="cursor:pointer;"
                               class="num1 bu-none sub_service_menu_1">3D 프린팅 보조기 제품 소개</a>
                            <ul id="print_assist" class="menuBox group" style="height:auto; display:none;">
                            	<li><a onclick="location.href='/Med3d/PrintingProductHome';" style="cursor:pointer;" class="depth" target="_self"><strong id="1">CAST & Splint</strong></a></li>
                            	<li><a onclick="location.href='/Med3d/PrintingProductHome';" style="cursor:pointer;" class="depth" target="_self"><strong id="2">Brace</strong></a></li>
                            	<li><a onclick="location.href='/Med3d/PrintingProductHome';" style="cursor:pointer;" class="depth" target="_self"><strong id="3">Insole</strong></a></li>
                            </ul>   
                        </li>
                        <li class="menu2">
                            <a style="cursor:pointer;" class="num1 sub_service_menu_2">의사</a>
                            <ul id="doctor" class="menuBox group" style="height:auto; display:none;">
                            	<li><a onclick="location.href=''" style="cursor:pointer;" class="depth" target="_self"><strong id="4">서비스 특장점</strong></a></li>
                            	<li><a onclick="location.href=''" style="cursor:pointer;" class="depth" target="_self"><strong id="5">서비스 이점</strong></a></li>
                            	<li><a onclick="location.href=''" style="cursor:pointer;" class="depth" target="_self"><strong id="6">서비스 사례</strong></a></li>
                            </ul>
                        </li>
                        <li class="menu3">
                            <a onclick="location.href='/user/serviceStatus';" style="cursor:pointer;"
                               class="num1 bu-none sub_service_menu_3">환자</a>
                            <ul id="patient" class="menuBox group" style="height:auto; display:none;">
                            	<li><a onclick="location.href=''" style="cursor:pointer;" class="depth" target="_self"><strong id="7">제품 특장점</strong></a></li>
                            	<li><a onclick="location.href=''" style="cursor:pointer;" class="depth" target="_self"><strong id="8">의료 분야 사례</strong></a></li>
                            	<li><a onclick="location.href=''" style="cursor:pointer;" class="depth" target="_self"><strong id="9">스포츠 분야 사례</strong></a></li>
                            	<li><a onclick="location.href=''" style="cursor:pointer;" class="depth" target="_self"><strong id="10">클리닉 연결</strong></a></li>
                            </ul>
                        </li>
                        <li class="menu4">
                            <a onclick="location.href='/service/faq/serviceFaq';" style="cursor:pointer;"
                               class="num1 bu-none sub_service_menu_4">클리닉 소개</a>
                            <ul id="clinic_intro" class="menuBox group" style="height:auto; display:none;">
                            	<li><a onclick="location.href=''" style="cursor:pointer;" class="depth" target="_self"><strong id="11">서비스 병원</strong></a></li>
                            	<li><a onclick="location.href=''" style="cursor:pointer;" class="depth" target="_self"><strong id="12">방문 예약</strong></a></li>
                            </ul>  
                        </li>
                        <li class="menu5">
                            <a onclick="location.href='/Med3d/auth/ProductOrderHome';" style="cursor:pointer;"
                               class="num1 bu-none sub_service_menu_5">제작 서비스</a>
                           	<ul id="product_service" class="menuBox group" style="height:auto; display:none;">
                            	<li><a onclick="location.href='/Med3d/auth/ProductOrderHome'" style="cursor:pointer;" class="depth" target="_self"><strong id="13">제품제작 신청</strong></a></li>
                            	<li><a onclick="location.href='/Med3d/auth/ProductState'" style="cursor:pointer;" class="depth" target="_self"><strong id="14">제작 모니터링 및 배송</strong></a></li>
                            </ul>
                        </li>
                        <li class="menu6">
                            <a onclick="location.href='/service/qna/qnaList';" style="cursor:pointer;"
                               class="num1 bu-none sub_service_menu_5">About</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="al_box" id="software_div" style="display:none">
                <nav id="nav">
                    <ul class="group">
                        <li class="menu1">
                            <a onclick="location.href='/Med3d/ServiceIntroduce';" style="cursor:pointer;"
                               class="num1 bu-none sub_software_menu_1">서비스 소개</a>
                        </li>
                        <li class="menu2">
                            <a onclick="location.href='/Med3d/SoftwareIntroduce';" style="cursor:pointer;"
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
        
        <div id="blind_mob" style="opacity: 0; left: 0px; display: none;"></div>
    </div>
	
	<div id="Scan">
	     <div id="ScanInHouse">
			<div id="ScanInHouseArm">
				<div id="ScanInHouseArmCast">
					<input type="button" value="Scan InHouse Arm Cast" onclick="BtnScanInHouseArmCast();">
				</div>
				<div id="ScanInHouseArmSplint">
					<input type="button" value="Scan InHouse Arm Splint" onclick="BtnScanInHouseArmSplint();">
				</div>
				<div id="ScanInHouseArmBrace">
					<input type="button" value="Scan InHouse Arm Brace" onclick="BtnScanInHouseArmBrace();">
				</div>
			</div>
			<div id="ScanInHouseLeg">
				<div id="ScanInHouseLegCast">
					<input type="button" value="Scan InHouse Leg Cast" onclick="BtnScanInHouseLegCast();">
				</div>
				<div id="ScanInHouseLegSplint">
					<input type="button" value="Scan InHouse Leg Splint" onclick="BtnScanInHouseLegSplint();">
				</div>
			</div>   	
	     </div>
	     <div id="ScanBusinessTrip">
	     	<div id="ScanBusinessTripArm">
	     		<div id="ScanBusinessTripArmCast">
	     			<input type="button" value="Scan BusinessTrip Arm Cast" onclick="BtnScanBusinessTripArmCast();">
	     		</div>
	     		<div id="ScanBusinessTripArmSplint">
	     			<input type="button" value="Scan BusinessTrip Arm Splint" onclick="BtnScanBusinessTripArmSplint();">
	     		</div>
	     		<div id="ScanBusinessTripArmBrace">
	     			<input type="button" value="Scan BusinessTrip Arm Brace" onclick="BtnScanBusinessTripArmBrace();">
	     		</div>
	     	</div>
	     	<div id="ScanBusinessTripLeg">
	     		<div id="ScanBusinessTripLegCast">
	     			<input type="button" value="Scan BusinessTrip Leg Cast" onclick="BtnScanBusinessTripLegCast();">
	     		</div>
	     		<div id="ScanBusinessTripLegSplint">
	     			<input type="button" value="Scan BusinessTrp Leg Splint" onclick="BtnScanBusinessTripLegSplint();">
	     		</div>
	     	</div>
	     </div>
	</div>
	 
	<div id="Print">
		<div id="PrintInHouse">
			<div id="PrintInHouseArm">
				<div id="PrintInHouseArmCast">
					<input type="button" value="Print InHouse Arm Cast" onclick="BtnPrintInHouseArmCast();">
				</div>
				<div id="PrintInHouseArmSplint">
					<input type="button" value="Print InHouse Arm Splint" onclick="BtnPrintInHouseArmSplint();">
				</div>
				<div id="PrintInHouseArmBrace">
					<input type="button" value="Print InHouse Arm Brace" onclick="BtnPrintInHouseArmBrace();">
				</div>
			</div>
			<div id="PrintInHouseLeg">
				<div id="PrintInHouseLegCast">
					<input type="button" value="Print InHouse Leg Cast" onclick="BtnPrintInHouseLegCast();">
				</div>
				<div id="PrintInHouseLegSplint">
					<input type="button" value="Print InHouse Leg Splint" onclick="BtnPrintInHouseLegSplint();">
				</div>
			</div>
		</div>
		<div id="PrintBusinessTrip">
			<div id="PrintBusinessTripArm">
				<div id="PrintBusinessTripArmCast">
					<input type="button" value="Print BusinessTrip Arm Cast" onclick="BtnPrintBusinessTripArmCast();">
				</div>
				<div id="PrintBusinessTripArmSplint">
					<input type="button" value="Print BusinessTrip Arm Splint" onclick="BtnPrintBusinessTripArmSplint();">
				</div>
				<div id="PrintBusinessTripArmBrace">
					<input type="button" value="Print BusinessTrip Arm Brace" onclick="BtnPrintBusinessTripArmBrace();">
				</div>
			</div>
			<div id="PrintBusinessTripLeg">
				<div id="PrintBusinessTripLegCast">
					<input type="button" value="Print BusinessTrip Leg Cast" onclick="BtnPrintBusinessTripLegCast();">
				</div>
				<div id="PrintBusinessTripLegSplint">
					<input type="button" value="Print BusinessTrip Leg Splint" onclick="BtnPrintBusinessTripLegSplint();">
				</div>
			</div>
		</div>
	</div>
				
	<div class="container">
		<h5>--------------------------------------------</h5>
		<h5>나의  제작 서비스 목록</h5>
			<c:forEach var="row" items="${orders}">			                
				<h5>id: ${row.id}</h5>
				<h5>주문 날짜: ${row.order_date}</h5>
				<h5>코멘트: ${row.comment}</h5>
				<h5>서비스 종류: ${row.service_type}</h5>
				<h5>작업 형식: ${row.business_trip}</h5>
				<h5>작업 부위: ${row.body_type}</h5>
				<h5>결과물 타입: ${row.result_type}</h5>
				<h5>작업 진형 현황: ${row.work_state}</h5>
				<c:if test="${row.work_state == 'making'}">
					<p>이 제품의 작업 총 시간: ${row.work_time} / 작업시작시간: ${row.start_time}</p>
				</c:if>
				<p class="card-text"></p>      
				<h5>--------------------------------</h5>                    
			</c:forEach>
	</div>
	
	</div>
		
	<script>
		function BtnScanInHouseArmCast()
		{
			SendOrder("Scan", "n", "Arm", "Cast");
		}
	
		function BtnScanInHouseArmSplint()
		{
			SendOrder("Scan", "n", "Arm", "Splint");
		}
		
		function BtnScanInHouseArmBrace()
		{
			SendOrder("Scan", "n", "Arm", "Brace");
		}
		
		function BtnScanInHouseLegCast()
		{
			SendOrder("Scan", "n", "Leg", "Cast");
		}
		
		function BtnScanInHouseLegSplint()
		{
			SendOrder("Scan", "n", "Leg", "Splint");
		}
		
		function BtnScanBusinessTripArmCast()
		{
			SendOrder("Scan", "y", "Arm", "Cast");
		}
		
		function BtnScanBusinessTripArmSplint()
		{
			SendOrder("Scan", "y", "Arm", "Splint");
		}
		
		function BtnScanBusinessTripArmBrace()
		{
			SendOrder("Scan", "y", "Arm", "Brace");
		}
		
		function BtnScanBusinessTripLegCast()
		{
			SendOrder("Scan", "y", "Leg", "Cast");
		}
		
		function BtnScanBusinessTripLegSplint()
		{	
			SendOrder("Scan", "y", "Leg", "Splint");
		}
		
		function BtnPrintInHouseArmCast()
		{
			SendOrder("Print", "n", "Arm", "Cast");	
		}
		
		function BtnPrintInHouseArmSplint()
		{
			SendOrder("Print", "n", "Arm", "Splint");
		}
		
		function BtnPrintInHouseArmBrace()
		{
			SendOrder("Print", "n", "Arm", "Brace");
		}
		
		function BtnPrintInHouseLegCast()
		{
			SendOrder("Print", "n", "Leg", "Cast");
		}
		
		function BtnPrintInHouseLegSplint()
		{
			SendOrder("Print", "n", "Leg", "Splint");
		}
		
		function BtnPrintBusinessTripArmCast()
		{
			SendOrder("Print", "y", "Arm", "Cast");	
		}
		
		function BtnPrintBusinessTripArmSplint()
		{
			SendOrder("Print", "y", "Arm", "Splint");
		}
		
		function BtnPrintBusinessTripArmBrace()
		{
			SendOrder("Print", "y", "Arm", "Brace");
		}
		
		function BtnPrintBusinessTripLegCast()
		{
			SendOrder("Print", "y", "Leg", "Cast");
		}
		
		function BtnPrintBusinessTripLegSplint()
		{
			SendOrder("Print", "y", "Leg", "Splint");
		}
		
		function SendOrder(service_type, business_trip, body_type, result_type)
		{
			var comment = "static text";
			var param = {'comment': comment, 'service_type':service_type, 'business_trip':business_trip, 'body_type':body_type, 'result_type':result_type};
			$.ajax({
				type: "POST",
				url: "/Med3d/auth/Order",
				data: param,
				success:function(args){
					alert("주문이 등록되었습니다");
				},
				error:function(e){
					alert(e.responseText);
				}
			});
		}
	</script>
		
</body>
</html>