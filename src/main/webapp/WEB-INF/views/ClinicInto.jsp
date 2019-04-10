<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri = "http://www.springframework.org/tags/form" prefix = "form"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>클리닉 소개</title>
	<style>
		#ku_hospital_map{
			height: 300px;
			width: 33%;
			align: center;
		}
		
		#dongsan_hospital_map{
			height: 300px;
			width: 33%;
			align: center;
		}
	</style>
	
	<link rel="stylesheet" href="./resources/third_party/bootstrap-3.3.5/css/bootstrap.min.css">
</head>
<body>
	<div class="container show-grid">
		<div class="row">
			<div class="col-md-4"><h3>경북대병원</h3></div>
		</div>
		<div class="row">
			<div class="col-md-4 col-md-offset-4" id="ku_hospital_map"></div>
			<div class="col-md-4" id="ku_hospital_map"></div>
		</div>
		
		<div class="row">
			<div class="col-md-4"><h3>동산병원</h3></div>
		</div>
		
		<div class="row">
			<div class="col-md-4 col-md-offset-4" id="dongsan_hospital_map"></div>
			<div class="col-md-4" id="dongsan_hospital_map"></div>
		</div>
	</div>
	
	<script>
		function initMap()
		{
			var ku_hospital_loc = {lat: 35.865942, lng: 128.6051356}; // 경북대병원 위,경도
			// 맵옵션
			var map_option1 = {
				center: ku_hospital_loc,	
				zoom: 16,
				maxZoom: 18,
				minZoom: 1,
				zoomControll: true,
				mapTypeControll: true,
				streetViewControll: true,
				mapTypeId: google.maps.MapTypeId.HYBRID
			};
			var ku_hospital_map = new google.maps.Map(document.getElementById('ku_hospital_map'), map_option1);
			//var ku_hospital_map = new google.maps.Map(document.getElementById('ku_hospital_map'), {zoom:16, center:ku_hospital_loc});
			var ku_hospital_marker = new google.maps.Marker({position: ku_hospital_loc, map: ku_hospital_map});
			
			var dongsan_hospital_loc = {lat: 35.8693268, lng: 128.5807105}; // 동산병원 위,경도
			var map_option2 = {
					center: dongsan_hospital_loc,	
					zoom: 16,
					maxZoom: 18,
					minZoom: 1,
					zoomControll: true,
					mapTypeControll: true,
					streetViewControll: true,
					mapTypeId: google.maps.MapTypeId.HYBRID
				};
			var dongsan_hospital_map = new google.maps.Map(document.getElementById('dongsan_hospital_map'), map_option2);
			//var dongsan_hospital_map = new google.maps.Map(document.getElementById('dongsan_hospital_map'), {zoom:16, center:dongsan_hospital_loc});
			var dongsan_hospital_marker = new google.maps.Marker({position: dongsan_hospital_loc, map: dongsan_hospital_map});
		}
	</script>

	<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBg1WkUCH1wTnh9irafFkh1vXA4H6Zyu0o&callback=initMap"></script>
</body>
</html>