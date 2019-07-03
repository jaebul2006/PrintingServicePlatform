<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib uri = "http://www.springframework.org/tags/form" prefix = "form"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
	<head>
	    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
	    <title>Login</title>
	    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.2.1/css/bootstrap.min.css">
	    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css">
	    <link rel="stylesheet" href="./resources/css/Login_styles.min.css">
	
	    <title>3D 프린팅 서비스 플랫폼 로그인</title>
	</head>

  	<body>
	    <div class="login-dark">
	        <form name="form1" method="post" action="login_process" style="left:40%;">
	            <h2 class="sr-only">Login Form</h2>
	            <div class="illustration"><i class="icon ion-ios-locked"></i></div>
	            <div class="form-group"><input class="form-control" type="text" id="id" name="id" placeholder="id"></div>
	            <div class="form-group"><input class="form-control" type="password" id="pass" name="pass" placeholder="Password"></div>
	            
	            <div class="form-group"><button class="btn btn-primary btn-block" type="submit">로그인</button></div>
	            <a class="regist" href="/Med3d/RegistForm">회원가입은 여기를 클릭하세요</a>
	            <input type='hidden' name="${_csrf.parameterName}" value="${_csrf.token}" ></input>
	        </form>
	        
	        <form name="form2" method="post" action="" style="left:60%;">
	            <h2 class="sr-only">Login Form</h2>
	            <div class="illustration"><i class="icon ion-ios-heart"></i></div>
	            <div class="form-group"><input class="form-control" type="text" id="hospital_name" name="hospital_name" placeholder="병원 이름"></div>
	            <div class="form-group"><input class="form-control" type="text" id="patient_name" name="patient_name" placeholder="환자 이름"></div>
	            
	            <div class="form-group"><button class="btn btn-primary btn-block" type="submit">로그인</button></div>
	            <a class="regist" href="#" style="color:#fff900">환자등록은 병원에서 등록합니다</a>
	            <input type='hidden' name="${_csrf.parameterName}" value="${_csrf.token}" ></input>
	        </form>
	    </div>
	   
	    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.2.1/js/bootstrap.bundle.min.js"></script>
  	</body>
</html>