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

	<link href="../resources/vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
	<link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">
  		
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
  	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
	
	<link rel="stylesheet" type="text/css" href="../resources/rd_css/ProductOrderHome.css">
	<script type="text/javascript" src="../resources/rd_js/ProductOrderHome.js"></script>
	
	<title>Horse Info</title>
</head>
<body>

	
	<form method="post" action="HorseInfo">
	  <div class="form-group">
	    <label for="HorseName">말 이름</label>
	    <input type="text" class="form-control" id="hrName" name="hrName" aria-describedby="horseNameHelp" placeholder="말 이름을 입력하세요">
	    <small id="horseNameHelp" class="form-text text-muted">2019년 5월 5일까지의 정보입니다.</small>
	  </div>
	  <button type="submit" class="btn btn-primary">검색하기</button>
	</form>
	
	<div class="horse_info">
		<h5>--------------------------------------------</h5>
		<h5>나이: ${hrvo.age} 살</h5>
		<h5>총 착순 상금: ${hrvo.chaksunT} 원</h5>
		<h5>최근1년 착순 상금: ${hrvo.chaksunY} 원</h5>
		<h5>최근6개월 착순 상금: ${hrvo.chaksun_6} 원</h5>
		<h5>데뷔날짜: ${hrvo.debut}</h5>
		<h5>이름: ${hrvo.hrName}</h5>
		<h5>마번: ${hrvo.hrNo}</h5>
		<h5>출전지역: ${hrvo.meet}</h5>
		<h5>출생지: ${hrvo.ctry}</h5>
		<h5>통산 1등 횟수: ${hrvo.ord1CntT} 회</h5>
		<h5>최근 1년 1등 횟수: ${hrvo.ord1CntY} 회</h5>
		<h5>통산 2등 횟수: ${hrvo.ord2CntT} 회</h5>
		<h5>최근 1년 2등 횟수: ${hrvo.ord2CntY} 회</h5>
		<h5>통산 복승률: ${hrvo.qnlRateT} %</h5>
		<h5>최근 1년 복승률: ${hrvo.qnlRateY} %</h5>
		<h5>통산 출전 횟수: ${hrvo.rcCntT} 회</h5>
		<h5>최근 1년 출전 횟수: ${hrvo.rcCntY} 회</h5>
		<h5>핸디캡 여부: ${hrvo.recentBudam}</h5>
		<h5>최근 경주 순위: ${hrvo.recentOrd} 위</h5>
		<h5>최근 랭크: ${hrvo.recentRank}</h5>
		<h5>최근 레이팅: ${hrvo.recentRating}</h5>
		<h5>최근 출전 날짜: ${hrvo.recentRcDate}</h5>
		<h5>최근 출전 거리: ${hrvo.recentRcDist} m</h5>
		<h5>최근 출전 대회명: ${hrvo.recentRcName}</h5>
		<h5>최근 출전 주로: ${hrvo.recentRcNo}</h5>
		<h5>최근 경기 기록: ${hrvo.recentRcTime} 초</h5>
		<h5>최근 부담 중량(기수무게): ${hrvo.recentWgBudam} kg</h5>
		<h5>최근 몸무게: ${hrvo.recentWgHr} kg</h5>
		<h5>성별: ${hrvo.sex}</h5>
		<h5>통산 승률: ${hrvo.winRateT} %</h5>
		<h5>최근 1년 승률: ${hrvo.winRateY} %</h5>
		<p class="card-text"></p>      
		<h5>--------------------------------</h5>
	</div>
	

</body>
</html>