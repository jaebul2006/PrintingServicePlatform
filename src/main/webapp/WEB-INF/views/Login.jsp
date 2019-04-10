<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib uri = "http://www.springframework.org/tags/form" prefix = "form"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
	
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script> 

    <title>로그인</title>

    <link rel="stylesheet" href="./resources/third_party/bootstrap-3.3.5/css/bootstrap.min.css">
    <link rel="stylesheet" href="./resources/css/boostrap_modify.css">
  </head>

  <body class="text-center">
  
  	<form name="form_login" class="" method="post" action="LoginCheck">
  		<div class="form-container">
          <label for="inputEmail" class="sr-only">Username</label>
          <input type="text" id="id" class="form-control" name="id" placeholder="ID" required autofocus>
          <label for="inputPassword" class="sr-only">Password</label>
          <input type="password" id="pass" class="form-control" name="pass" placeholder="Password" required>
          <button class="btn btn-lg btn-primary p-btn btn-block" type="submit">Login</button>
  		</div>
  	</form>
  
    <form name="form1" class="form-signin" method="post" action="RegistAccount"> 
        <div class="form-container">
          <label for="inputEmail" class="sr-only">Username</label>
          <input type="text" id="id" class="form-control" name="id" placeholder="ID" required autofocus>
          <label for="inputPassword" class="sr-only">Password</label>
          <input type="password" id="pass" class="form-control" name="pass" placeholder="Password" required>            
          <div class="d-block my-3">
            <h5 class="mb-3">계정 타입</h5>	
            <div class="custom-control custom-radio d-inline mr-4">
              <input id="common_user" name="account_type" type="radio" class="custom-control-input" required="" value="common_user">
              <label class="custom-control-label" for="type_student">일반사용자 계정</label>
            </div>
            <div class="custom-control custom-radio d-inline">
              <input id="producer" name="account_type" type="radio" class="custom-control-input" required="" value="producer">
              <label class="custom-control-label" for="type_producer">제작자 계정</label>
              <hr class="mb-4">
              
              <label for="inputEmail" class="sr-only">Account Nick</label>
          	  <input type="text" id="account_nick" class="form-control" name="account_nick" placeholder="닉네임" required autofocus>
          	  
          	<button class="btn btn-lg btn-primary p-btn btn-block" type="submit" id="BtnRegistAccount">등록하기</button>
            </div>
          </div>
        </div>
    </form> 
      
  </body>