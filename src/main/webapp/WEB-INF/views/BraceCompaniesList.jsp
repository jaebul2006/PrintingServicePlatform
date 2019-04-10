<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib uri = "http://www.springframework.org/tags/form" prefix = "form"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Brace 제작 회사 목록</title>
</head>
<body>

	<c:forEach var="row" items="${companies}">			                
		<h5>사업자 등록 번호: ${row.com_num}</h5>
		<h5>회사 이름: ${row.com_name}</h5>
		<h5>대표 이름: ${row.represen_name}</h5>
		<h5>대표 번호: ${row.represen_num}</h5>
		<h5>지역: ${row.region}</h5>
		<p class="card-text"></p>      
		<a href="">확인</a>
		<h5>--------------------------------</h5>                    
	</c:forEach>

</body>
</html>