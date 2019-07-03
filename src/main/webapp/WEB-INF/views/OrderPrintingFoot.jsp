<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@taglib uri = "http://www.springframework.org/tags/form" prefix = "form"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
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
		    /* don't forget to add all the previously mentioned styles here too */
		    background: #7386D5;
		    color: #fff;
		    transition: all 0.3s;
		}

		#sidebar .sidebar-header {
		    padding: 20px;
		    background: #6d7fcc;
		}

		#sidebar ul.components {
		    padding: 20px 0;
		    border-bottom: 1px solid #47748b;
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
		    color: #7386D5;
		    background: #fff;
		}
		
		#sidebar ul li.active > a, a[aria-expanded="true"] {
		    color: #fff;
		    background: #6d7fcc;
		}
		ul ul a {
		    font-size: 0.9em !important;
		    padding-left: 30px !important;
		    background: #6d7fcc;
		}
	</style>

	<title>제품 주문 홈</title>
	
</head>
<body> 
	
			
	<!--  			
	<div id="test">
		<input type="file" id="selectFileBox" style="display:none" accept=".stl, .png, .jpg, .jpeg" multiple>
		<button id="BtnfileSelect">파일 첨부</button>
		<div class="preview" id="preview">
		</div>
	</div>
	-->
	
	<div id="uploadProgress">
	</div>
	
	<div class="wrapper">
		<nav id="sidebar">
			<div class="sidebar-header">
				<a href="/Med3d">
				<img src="../resources/image/rd_ci.png" alt="ME3D" style="width:240px; position:absolute; top:4px; left:4px;">
				</a>
			</div>
			
			<ul class="list-unstyled components">
				<li>
					<a href="/Med3d/auth/ProductOrderHome">주문 현황</a>
				</li>
				<li>
					<a href="#service1" data-toggle="collapse" aria-expnaded="false" class="dropdown-toggle">3D 프린팅 서비스</a>
					<ul class="collapse list-unstyled" id="service1">
						<li>
							<a href="/Med3d/auth/OrderPrintingHand">상지</a>
						</li>
						<li>
							<a href="/Med3d/auth/OrderPrintingFoot">하지</a>
						</li>
						<li>
							<a href="#">두상교정기</a>
						</li>
					</ul>
				</li>
				<li>
					<a href="#service2" data-toggle="collapse" aria-expnaded="false" class="dropdown-toggle">출장 방문 서비스</a>
					<ul class="collapse list-unstyled" id="service2">
						<li>
							<a href="#">상지</a>
						</li>
						<li>
							<a href="#">하지</a>
						</li>
						<li>
							<a href="#">두상교정기</a>
						</li>
					</ul>
				</li>
			</ul>
		</nav>
		
		<div id="content">
			<nav class="navbar navbar-expand-lg navbar-light bg-light">
				<div class="container-fluid">
					<div id="Print">
						<div id="PrintInHouse">
							<div id="PrintInHouseLeg">
								<div id="PrintInHouseLegCast">
									<input type="button" value="Print InHouse Leg Cast" onclick="BtnPrintInHouseLegCast();">
								</div>
								<div id="PrintInHouseLegSplint">
									<input type="button" value="Print InHouse Leg Splint" onclick="BtnPrintInHouseLegSplint();">
								</div>
							</div>
						</div>
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
		$("#BtnfileSelect").on("click", function() {
	  	  $("#selectFileBox").trigger("click");
	    });
	
		var input = document.getElementById('selectFileBox');
		var preview = document.getElementById('preview');
		input.addEventListener('change', UpdateFileDisplay);
		//var fileTypes = ['image/jpeg', 'image/png', 'image/pjpeg']
		var fileTypes = ['stl'];
		
		function UpdateFileDisplay()
		{
			while(preview.firstChild){
				preview.removeChild(preview.firstChild);
			}
			
			var curFiles = input.files;
			if(curFiles.length == 0){
				var para = document.createElement('p');
				para.textContent = '선택된 파일이 없습니다';
				preview.appendChild(para);
			}
			else{
				var list = document.createElement('ol');
				preview.appendChild(list);
				for(var i=0; i<curFiles.length; i++){
					var listItem = document.createElement('li');
					var para = document.createElement('p');
					
					if(ValidFileType(curFiles[i])){
						para.textContent = curFiles[i].name;
						//var image = document.createElement('img');
						//image.src = window.URL.createObjectURL(curFiles[i]);					
						//listItem.appendChild(image);
						listItem.appendChild(para);
					}
					else{
						para.textContent = curFiles[i].name + ' : 지원되는 파일이 아닙니다'
					}
				}
				list.appendChild(listItem);
				
				var formData = new FormData();
				formData.append("file", curFiles[0]);
			}
		}
		
		function ValidFileType(file)
		{
			for(var i=0; i<fileTypes.length; i++){
				if(file.type === fileTypes[i]){
					return true;
				}
			}
			return false;
		}
		
		function BtnPrintInHouseLegCast()
		{
			SendOrder("Print", "n", "Leg", "Cast");
		}
		
		function BtnPrintInHouseLegSplint()
		{
			SendOrder("Print", "n", "Leg", "Splint");
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