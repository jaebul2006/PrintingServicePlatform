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
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>ME3D</title>

	<link href="../resources/vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
	<link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">
  		
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
  	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
	
	<link rel="stylesheet" type="text/css" href="../resources/rd_css/ProductOrderHome.css">
	<script type="text/javascript" src="../resources/rd_js/ProductOrderHome.js"></script>

	<style>
		.wrapper{
			display: flex;
			align-items: stretch;
		}
		
		#sidebar{
			min-width: 250px;
			max-width: 250px;
			min-height: 100vh;
		}
		
		#sidebar.active{
			margin-left: -250px;
		}
		
		a[data-toggle="collapse"]{
			position: relative;
		}
		
		.dropdown-toggle::after{
			display: block;
			position: absolute;
			top: 50%;
			right: 20px;
			transform: translateY(-50);
		}
		
		@media(max-width: 768px){
			#sidebar{
				margin-left: -250px;
			}
			#sidebar.active{
				margin-left: 0;
			}
		}
		
		@import "https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700";


		body {
		    font-family: 'Poppins', sans-serif;
		    background: #fafafa;
		}

		p {
		    font-family: 'Poppins', sans-serif;
		    font-size: 1.1em;
		    font-weight: 300;
		    line-height: 1.7em;
		    color: #999;
		}

		a, a:hover, a:focus {
		    color: inherit;
		    text-decoration: none;
		    transition: all 0.3s;
		}

		#sidebar {
		    background: #37685D;
		    color: #fff;
		    transition: all 0.3s;
		}

		#sidebar .sidebar-header {
		    padding: 20px;
		    background: #37685D;
		}

		#sidebar ul.components {
		    padding: 20px 0;
		    border-bottom: 1px solid #37685D;
		}

		#sidebar ul p {
		    color: #fff;
		    padding: 10px;
		}
		
		#sidebar ul li a {
		    padding: 10px;
		    font-size: 1.1em;
		    display: block;
		}
		#sidebar ul li a:hover {
		    color: #37685D;
		    background: #fff;
		}
		
		#sidebar ul li.active > a, a[aria-expanded="true"] {
		    color: #fff;
		    background: #37685D;
		}
		ul ul a {
		    font-size: 0.9em !important;
		    padding-left: 30px !important;
		    background: #37685D;
		}
	</style>

	<title>제작사에서 주문을 받은 전체 목록</title>
</head>
<body>

	<div class="wrapper">
		<nav id="sidebar">
			<div class="sidebar-header">
				<!--  <h3>Real Dimension</h3> -->
				<a href="/Med3d">
				<img src="../resources/image/rd_ci.png" alt="ME3D" style="width:240px; position:absolute; top:4px; left:4px;">
				</a>
			</div>
			
			<ul class="list-unstyled components">
				<li>
					<a href="#">전체 고객 주문 현황</a>
				</li>
				<li>
					<a href="#pageSubmenu" data-toggle="collapse" aria-expnaded="false" class="dropdown-toggle">모델링 & 프린팅 토탈서비스</a>
					<ul class="collapse list-unstyled" id="pageSubmenu">
						<li>
							<a href="#">상지</a>
						</li>
						<li>
							<a href="#">하지</a>
						</li>
						<li>
							<a href="#">두상 교정기</a>
						</li>
					</ul>
				</li>
				<li>
					<a href="#">Reservation</a>
				</li>
				<li>
					<a href="#">Contact</a>
				</li>
			</ul>
		</nav>
		
		<div id="content">
			<nav class="navbar navbar-expand-lg navbar-light bg-light">
				<div class="container-fluid">
					<div class="order_list">
						<h5>--------------------------------------------</h5>
						<h5>요청 서비스 목록</h5>
							<c:forEach var="row" items="${orders}">			                
								<h5>id: ${row.id}</h5>
								<h5>주문자 id: ${row.requester_id}</h5>
								<h5>주문 날짜: ${row.order_date}</h5>
								<h5>코멘트: ${row.comment}</h5>
								<h5>서비스 종류: ${row.service_type}</h5>
								<h5>작업 형식: ${row.business_trip}</h5>
								<h5>작업 부위: ${row.body_type}</h5>
								<h5>결과물 타입: ${row.result_type}</h5>
								<h5>작업 진행 현황: ${row.work_state}</h5>
								<c:if test="${row.work_state == 'ready'}">
									<input type="button" onclick="OpenConfirmWndOrderMakeStart('${row.id}')" value="제작시작">
								</c:if>
								<c:if test="${row.work_state == 'making'}">
									<input type="button" onclick="WndMakingCancel('${row.id}')" value="제작 중단">
									<input type="button" onclick="WndMakingDelete('${row.id}')" value="제작 삭제">
								</c:if>
								<c:if test="${row.work_state == 'making_done'}">
									<input type="button" onclick="WndDeliveryStart('${row.id}')" value="배송 시작">
								</c:if>
								<p class="card-text"></p>      
								<h5>--------------------------------</h5>                    
							</c:forEach>
					</div>
				</div>
			</nav>
		</div>
	</div>

	<nav class="navbar navbar-inverse visible-xs">
  		<div class="container-fluid">
    		<div class="navbar-header">
      			<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        			<span class="icon-bar"></span>
        			<span class="icon-bar"></span>
        			<span class="icon-bar"></span>                        
      			</button>
      			<a class="navbar-brand" href="#">???</a>
    		</div>
    		<div class="collapse navbar-collapse" id="myNavbar">
      			<ul class="nav navbar-nav">
        			<li class="active"><a href="#">Dashboard</a></li>
        			<li><a href="#">Age</a></li>
        			<li><a href="#">Gender</a></li>
        			<li><a href="#">Geo</a></li>
      			</ul>
    		</div>
  		</div>
	</nav>
    
    <script>
    	$(document).ready(function(){
    		$('#sidebarCollapse').on('click', function(){
    			$('#sidebar').toggleClass('active');
    		});
    	});
    
    	function WndDeliveryStart(id)
    	{
    		if(confirm("배송을 하시겠습니까?")){
    			var param = {'order_id':id};
        		
    			$.ajax({
    				type: "POST",
    				url: "/Med3d/auth/DeliveryStart",
    				data: param,
    				success:function(args){
    					alert("배송을 시작합니다");
    				},
    				error:function(e){
    					alert(e.responseText);
    				}
    			});
    		}
    	}
    
    	function WndMakingCancel(id)
    	{
    		if(confirm("작업을 취소 하시겠습니까?")){
    			var param = {'order_id':id};
        		
    			$.ajax({
    				type: "POST",
    				url: "/Med3d/auth/OrderMakingCancel",
    				data: param,
    				success:function(args){
    					alert("작업 진행이 취소되었습니다");
    				},
    				error:function(e){
    					alert(e.responseText);
    				}
    			});
    		}
    	}
    
    	// 제작을 완전히 삭제하는지에대한 질의와 처리 함수, 구매자에게 처리불가에 대한 설명을 하여야한다
    	function WndMakingDelete(id)
    	{
    		if(confirm("작업목록을 완전히 삭제 하시겠습니까?")){
    			var param = {'order_id':id};
        		
    			$.ajax({
    				type: "POST",
    				url: "/Med3d/auth/OrderMakingDelete",
    				data: param,
    				success:function(args){
    					alert("작업 목록이 삭제되었습니다");
    				},
    				error:function(e){
    					alert(e.responseText);
    				}
    			});
    		}
    	}
    	
    	function OpenConfirmWndOrderMakeStart(id)
    	{
    		var msg;
    		var work_time = prompt("총 작업 소요 시간을 입력하세요", "분(minute) 으로 입력하세요)");
    		if(work_time == null || work_time == ""){
    			msg = "작업 소요 시간을 입력해주세요";
    		}
    		else{
    			msg = work_time;
    			OrderMakeStart(id, msg);
    		}
    	}
    
    	function OrderMakeStart(id, work_time)
    	{
    		// 현재 제작준비에서 제작중으로 작업현황을 작업중으로 업데이트하고 작업시작시간을 지금 이 시각으로 업데이트한다
			var param = {'id':id, 'work_time':work_time};
    		
			$.ajax({
				type: "POST",
				url: "/Med3d/auth/OrderMakeStart",
				data: param,
				success:function(args){
					alert("작업 상황이 업데이트 되었습니다");
				},
				error:function(e){
					alert(e.responseText);
				}
			});
    	}
    </script>
    
</body>
</html>