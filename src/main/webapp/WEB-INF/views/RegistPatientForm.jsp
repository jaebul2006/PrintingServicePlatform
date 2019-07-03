<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib uri = "http://www.springframework.org/tags/form" prefix = "form"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
	<head>
	    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
	    <title>환자등록</title>
	    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.2.1/css/bootstrap.min.css">
    	<link rel="stylesheet" href="./resources/RegistFormAssets/css/styles.min.css?h=c06525fb59a9ff4733fe4b36fc025c29">
    	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.2.1/js/bootstrap.bundle.min.js"></script>
	</head>

	<body>
	    <div class="register-photo">
	        <div class="form-container">
	        
	            <form name="FormRegistAccount" method="post" action="RegistPatient">
	                <h2 class="text-center"><strong>환자등록</strong></h2>
	                <div class="form-group"><input class="form-control" type="hidden" name="id" placeholder="id" id="id" value="${id}"></div>
	                <div class="form-group"><input class="form-control" type="text" name="name" placeholder="name" id="name"></div>
	                <div class="form-group"><input class="form-control" type="text" name="birth" placeholder="birth" id="birth"></div>
	                
	                <filedset>
		                <div class="form-group">
		                	<p><strong>성별</strong></p>
		                    <div class="form-check">
		                    	<label class="form-check-label" for="male">
		                    	<input id="male" class="form-check-input" type="radio" name="sex" value="male">남</label>
		                    </div>
		                    <div class="form-check">
		                    	<label class="form-check-label" for="female">
		                    	<input id="female" class="form-check-input" type="radio" name="sex" value="female">여</label>
		                    </div>
		                </div>
	                </filedset>
	                
	                <div class="form-group"><input class="form-control" type="text" name="age" placeholder="나이" id="age"></div>
	              	
	                <div class="form-group"><button class="btn btn-primary btn-block" type="submit">환자등록</button></div>
	        	</form>
	        	
	        </div>
	    </div> 
	</body>
</html>