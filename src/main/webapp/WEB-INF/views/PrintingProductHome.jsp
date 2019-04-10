<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib uri = "http://www.springframework.org/tags/form" prefix = "form"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<head>
</head>
	
<body>
	1. CAST & Splint 
	<c:forEach var="row" items="${cast_splint_companies}">			                
		<h5>사업자 등록 번호: ${row.com_num}</h5>
		<h5>회사 이름: ${row.com_name}</h5>
		<h5>대표 이름: ${row.represen_name}</h5>
		<h5>대표 번호: ${row.represen_num}</h5>
		<h5>지역: ${row.region}</h5>
		<p class="card-text"></p>      
		<a href="">확인</a>
		<h5>--------------------------------</h5>                    
	</c:forEach>
	<form name="form_castsplint_company_regist" class="" method="get" action="auth/CastSplintCompanyRegistForm">
  		<div class="form-container">
          <button class="btn btn-lg btn-primary p-btn btn-block" type="submit">업체등록</button>
  		</div>
  	</form>
	///////////////////////////////////////////////////////////////////////<br>
	
	2. Brace
	<c:forEach var="row" items="${brace_companies}">			                
		<h5>사업자 등록 번호: ${row.com_num}</h5>
		<h5>회사 이름: ${row.com_name}</h5>
		<h5>대표 이름: ${row.represen_name}</h5>
		<h5>대표 번호: ${row.represen_num}</h5>
		<h5>지역: ${row.region}</h5>
		<p class="card-text"></p>      
		<a href="">확인</a>
		<h5>--------------------------------</h5>                    
	</c:forEach>
	<form name="form_brace_company_regist" class="" method="get" action="auth/BraceCompanyRegistForm">
  		<div class="form-container">
          <button class="btn btn-lg btn-primary p-btn btn-block" type="submit">업체등록</button>
  		</div>
  	</form>
	///////////////////////////////////////////////////////////////////////<br>
	
	3. Insole
	<c:forEach var="row" items="${insole_companies}">			                
		<h5>사업자 등록 번호: ${row.com_num}</h5>
		<h5>회사 이름: ${row.com_name}</h5>
		<h5>대표 이름: ${row.represen_name}</h5>
		<h5>대표 번호: ${row.represen_num}</h5>
		<h5>지역: ${row.region}</h5>
		<p class="card-text"></p>      
		<a href="">확인</a>
		<h5>--------------------------------</h5>                    
	</c:forEach>
	<form name="form_insole_company_regist" class="" method="get" action="auth/InsoleCompanyRegistForm">
  		<div class="form-container">
          <button class="btn btn-lg btn-primary p-btn btn-block" type="submit">업체등록</button>
  		</div>
  	</form>
  	///////////////////////////////////////////////////////////////////////<br>
  	
</body>