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
    <!--  <link rel="stylesheet" href="./resources/css/user/join.css"> -->

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

  
    <script type="text/javascript" src="./resources/js/JLAMP.polyfill.min.js"></script>
    <script type="text/javascript" src="./resources/js/JLAMP.min.js"></script>
    <script type="text/javascript" src="./resources/js/JLAMP.common.min.js"></script>
    <script type="text/javascript" src="./resources/js/gnb.js"></script>
    <script type="text/javascript" src="./resources/js/common.js"></script>
    <!--  <script src="./resources/js/user/join.js"></script> --> 

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
                        <a onclick="goService();" style="cursor:pointer;" class="gnb-service">의료 3DP 서비스</a> <span
                            class="bar">|</span>
                        <a onclick="goSoftware();" style="cursor:pointer;" class="gnb-software">3DP 소프트웨어</a>
                    </li>
                </ul>
                <div class="head-content">
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
                    <a href="/Med3d">
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
                            <a onclick="location.href='/service/service';" style="cursor:pointer;"
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

<div class="visual-sub vs-bg-08">
	<h3>회원 가입</h3>
	회원으로 가입하시고 다양한 혜택을 누리세요
</div>

<!-- contents -->
<div id="contents">
	<form id="frm_join" method="post" action="RegistAccount">
		<!--  
		<input type="hidden" id="is_id_check" value='N'>
		<input type="hidden" id="is_company_num_check" value='N'>
		<input type="hidden" id="id" name="id">
		<input type="hidden" id="company_idx" name="company_idx">
		<input type="hidden" id="work_type" name="work_type" value="join">
		-->

		<h4 class="mT50">개인정보 수집/이용/보유에 대한 동의</h4>
		<div class="grayOutBox mT20">
			<pre class="grayBox">
제 1장 : 총칙

[제1조 : 목적]
이 약관은 ME3D이 운영하는 인터넷 홈페이지(가 제공하는 인터넷 관련 서비스(이하 '서비스')의 이용조건 및 절차, 기타 필요한 사항을 규정함을 목적으로 합니다.

[제2조 : 약관의 효력 및 변경]
(1)본 약관은 본 서비스의 화면에 게시함으로써 효력이 발생합니다.
(2)서비스는 중요한 사유가 있을 때 이 약관을 변경할 수 있으며, 변경된 약관은 제1항의 방법으로 공지함으로써 효력이 발생합니다.

[제2조 : 약관의 효력 및 변경]
(1)본 약관은 본 서비스의 화면에 게시함으로써 효력이 발생합니다.
(2)서비스는 중요한 사유가 있을 때 이 약관을 변경할 수 있으며, 변경된 약관은 제1항의 방법으로 공지함으로써 효력이 발생합니다.
			</pre>
		</div>

		<ul class="f0 mT20">
			<li class="fr">
				<div class="check-wrap">
					<input type="checkbox" id="agree_personal" name="agree_personal" value=1 >
					<label for="agree_personal"><span class="checkbox"></span> 개인정보 수집· 이용· 보유 동의</label>
				</div>

				<div class="check-wrap mT10">
					<input type="checkbox" id="agree_unique" name="agree_unique" value=1 >
					<label for="agree_unique"><span class="checkbox"></span> 고유식별정보 수집· 이용·보유 동의</label>
				</div>
			</li>
		</ul>

		<!-- table start -->
		<table cellspacing="0" border="1" summary="리스트" class="tbl-write mT50">
			<caption>목록</caption>
			<colgroup>
				<col width="200px"><col width="">
			</colgroup>
			<tbody>
				<tr>
					<th><span class="font-p1">*</span> 아이디</th>
					<td>
						<input type="text" id="id" name="id" maxlength="30" style="width:165px">
						<input type="button" id="check_id" class="button button-line button-form" value="중복체크 ">
					</td>
				</tr>
				<tr>
					<th><span class="font-p1">*</span> 이름</th>
					<td><input type="text" id="account_name" name="account_name" class="inline" maxlength="20" style="width:165px"> </td>
				</tr>
				<tr>
					<th><span class="font-p1">*</span> 비밀번호</th>
					<td>
						<input type="password" id="pass" name="pass"  class="inline" minlength="8"  maxlength="15"  style="width:165px">
						<span class="font-help pL10 pR10">비밀번호는 8~15자로 입력해 주십시오.</span>
					</td>
				</tr>
				<tr>
					<th><span class="font-p1">*</span> 비밀번호 확인</th>
					<td>
						<input  type="password" id="pass_confirm" name="pass_confirm" class="inline" minlength="8"  maxlength="15" style="width:165px">
					</td>
				</tr>
			</tbody>
		</table>
		<!-- //table end-->

		<h4 class="mT50">회원 정보를 추가로 입력해 주십시오</h4>

		<!-- table start -->
		<table cellspacing="0" border="1" summary="리스트" class="tbl-write mT20">
			<caption>목록</caption>
			<colgroup>
				<col width="200px"><col width="">
			</colgroup>
			<tbody>
				<tr>
					<th><span class="font-p1">*</span> 회원구분</th>
					<td id="sel_company_type_area">
						<select class="sel_account_type">
							<option name="hospital">병원</option>
							<option name="producer">제작사</option>
						</select>
					</td>
				</tr>
			</tbody>
		</table>
		<!-- //table end-->
						
		<!-- button -->
		<div class="btn-cen mT20">
			<a href="javascript:void(0);" class="button button-primary" onclick="RegistAccount();">가입하기</a>
		</div>
		<!-- //button -->

	</form>
</div>
<!-- //contents -->

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
                            <span class="m-none">Copyright </span> © 2019 RealDimension all right reserved.
                            <span class="m-none"> RealDimension is registered trademarks.</span>
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

        $(document).ready(function() {
            m_is_login = $("#is_login").val();
        });
        
        
        function RegistAccount()
        { 	
        	var id, pass, account_name, type;
        	id = document.getElementById("id").value;
        	pass = document.getElementById("pass").value;
        	account_name = document.getElementById("account_name").value;
        	
        	var temp = document.getElementsByClassName("sel_account_type");
        	var sel_idx = temp[0].selectedIndex;
        	if(sel_idx == 0){
        		type = 'hospital';
        	}
        	else if{
        		type = 'producer';
        	}
        	else{
        		type = 'personal';
        	}
        	
        	var param = {'id':id, 'pass':pass, 'account_name':account_name, 'type':type};
			$.ajax({
				type: "POST",
				url: "/Med3d/RegistAccount",
				data: param,
				success:function(args){
					alert("계정이 등록되었습니다");
				},
				error:function(e){
					alert(e.responseText);
				}
			});
        }
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