<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib uri = "http://www.springframework.org/tags/form" prefix = "form"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Brace 제작 회사 등록</title>
</head>
<body>

	<form name="form1" class="form-signin" method="post" action="BraceCompanyRegist"> 
        <div class="form-container">
          <label for="com_num" class="sr-only">사업자 등록 번호</label>
          <input type="text" id="com_num" class="form-control" name="com_num" placeholder=" - 없이 입력해주세요" required autofocus>
          <label for="com_name" class="sr-only">회사 이름</label>
          <input type="text" id="com_name" class="form-control" name="com_name" placeholder="회사 이름" required>
          <label for="represen_name" class="sr-only">대표 이름</label>
          <input type="text" id="represen_name" class="form-control" name="represen_name" placeholder="대표 이름" required>            
          <label for="represen_num" class="sr-only">대표 번호</label>
          <input type="text" id="represen_num" class="form-control" name="represen_num" placeholder="대표 번호" required>
          <label for="region" class="sr-only">지역</label>
          <input type="text" id="region" class="form-control" name="region" placeholder="지역" required>	  
          <button class="btn btn-lg btn-primary p-btn btn-block" type="submit" id="BtnBraceCompanyRegist">등록하기</button>
        </div>  
    </form>

</body>
</html>