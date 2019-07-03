<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib uri = "http://www.springframework.org/tags/form" prefix = "form"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
	<head>
	    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
	    <title>RegistAccount</title>
	    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.2.1/css/bootstrap.min.css">
    	<link rel="stylesheet" href="./resources/RegistFormAssets/css/styles.min.css?h=c06525fb59a9ff4733fe4b36fc025c29">
    	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.2.1/js/bootstrap.bundle.min.js"></script>
	</head>

	<body>
	    <div class="register-photo">
	        <div class="form-container">
	        
	            <form name="FormRegistAccount" method="post" action="RegistAccount">
	                <h2 class="text-center"><strong>회원가입</strong></h2>
	                <div class="form-group"><input class="form-control" type="text" name="id" placeholder="id" id="id"></div>
	                <div class="form-group"><input class="form-control" type="password" name="password" placeholder="Password" id="pass"></div>
	                <div class="form-group"><input class="form-control" type="password" name="password_repeat" placeholder="Password (repeat)" id="pass_repeat"></div>
	                <div class="form-group"><input class="form-control" type="text" name="account_name" placeholder="이름" id="account_name"></div>
	                
	                <filedset>
		                <div class="form-group">
		                	<p><strong>사용자 그룹 유형</strong></p>
		                    <div class="form-check">
		                    	<label class="form-check-label" for="radioInline1">
		                    	<input id="radioInline1" class="form-check-input" type="radio" name="typeAccount" value="hospital">병원</label>
		                    </div>
		                    <div class="form-check">
		                    	<label class="form-check-label" for="radioInline2">
		                    	<input id="radioInline2" class="form-check-input" type="radio" name="typeAccount" value="personal">개인</label>
		                    </div>
		                </div>
	                </filedset>
	                
	                <filedset>  
		                <div id="hospital_form" style="display:none;">
		                	<div class="form-group"><input class="form-control" type="text" name="hospital_name" placeholder="병원명" id="hospital_name"></div>
		                	<div class="form-group"><input class="form-control" type="text" name="hospital_address" placeholder="주소" id="hospital_address"></div>
		                </div>
		                <div id="personal_form" style="display:none;">
		                	<div class="form-group"><input class="form-control" type="text" name="personal_name" placeholder="이름" id="personal_name"></div>
		                	<div class="form-group"><input class="form-control" type="text" name="personal_age" placeholder="나이" id="personal_age"></div>
		                	<filedset>
		                		<div class="form-group">
				                	<p>성별</p>
				                    <div class="form-check">
				                    	<label class="form-check-label" for="sexRadio1">
				                    	<input id="personal_male" class="form-check-input" type="radio" name="sexRadio" value="남">남자</label>
				                    </div>
				                    <div class="form-check">
				                    	<label class="form-check-label" for="sexRadio2">
				                    	<input id="personal_female" class="form-check-input" type="radio" name="sexRadio" value="여">여자</label>
				                    </div>
				                </div>
		                	</filedset>
		                </div>
	                </filedset>
	                <div class="form-group"><button class="btn btn-primary btn-block" type="submit">회원가입</button></div>
	                <a href="/Med3d/login" class="already">계정이 있으신가요? 여기서 로그인하세요.</a>
	        	</form>
	        	
	        </div>
	    </div>
	   
	   <script>
	   		$('#radioInline1').on("click", function(){
	   			document.getElementById("hospital_form").style.display="block";
	   			document.getElementById("personal_form").style.display="none";
	   		});
	   		
	   		$('#radioInline2').on("click", function(){
	   			document.getElementById("hospital_form").style.display="none";
	   			document.getElementById("personal_form").style.display="block";
	   		});
	   </script> 
	</body>
</html>