<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib uri = "http://www.springframework.org/tags/form" prefix = "form"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
	
	<link rel="stylesheet" type="text/css" media="screen" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css">
	<script type="text/javascript" src="//code.jquery.com/jquery-2.1.1.min.js"></script>
	<script type="text/javascript" src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>
	<link href="//cdn.rawgit.com/Eonasdan/bootstrap-datetimepicker/e8bddc60e73c1ec2475f827be36e1957af72e2ea/build/css/bootstrap-datetimepicker.css" rel="stylesheet">
	<script src="//cdnjs.cloudflare.com/ajax/libs/moment.js/2.9.0/moment-with-locales.js"></script>
	<script src="//cdn.rawgit.com/Eonasdan/bootstrap-datetimepicker/e8bddc60e73c1ec2475f827be36e1957af72e2ea/src/js/bootstrap-datetimepicker.js"></script>

	<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
	
	<title>주문 입력</title>
	<style>
		* {
		    border-radius: 0!important
		}
		.left {
		  float: left;
		  margin-left: 13px
		}
		.glyphicon-search {
			color: #fff
		}
		.mobile_search {
			margin: 6px 0 5px 0;
		}
	</style>
</head>
<body>

	<nav class="navbar navbar-inverse">
	    <div class="navbar-header">
	      <button type="button" class="navbar-toggle collapsed left" data-toggle="collapse" data-target="#menu">
	        <span class="sr-only">MOP platform</span>
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span>
	      </button>
	      <a class="navbar-brand" href="#">MOP platform</a>
	            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#search">
	     <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
	      </button>
	    </div>
	    <div class="collapse navbar-collapse" id="menu">
	      <ul class="nav navbar-nav">
	        <li><a href="/Med3d/OrderCheck">주문 진행 상황</a></li>
	        <li class="active"><a href="#">주문 입력<span class="sr-only">(current)</span></a></li>
	        <li><a href="/Med3d/MatchingReg">매칭조건등록</a></li>
	        <li><a href="#">Reservation</a></li>
	      </ul>   
	    </div>
	</nav>

	  <div class="container"> 
			<div class="row">
				<aside class="col-sm-4">
					<p>보조기 모델링 주문의뢰</p>
					<div class="card">
						<article class="card-group-item">
							<header class="card-header">
								<h6 class="title">선택 타입 </h6>
							</header>
							<div class="filter-content">
								<div class="card-body">
									<label class="form-check">
									  <input class="form-check-input" type="radio" name="exampleRadio" value="who">
									  <span class="form-check-label">
									    상지보조기(WHO)
									  </span> 
									  <img src="./resources/image/2-Home-WHO.png" />
									  </span>
									</label>
									<label class="form-check">
									  <input class="form-check-input" type="radio" name="exampleRadio" value="afo">
									  <span class="form-check-label">
									    하지보조기(AFO)
									  </span>
									</label>
									<label class="form-check">
									  <input class="form-check-input" type="radio" name="exampleRadio" value="cro">
									  <span class="form-check-label">
									    소아두상교정기(CRO)
									  </span>
									</label>
								</div> <!-- card-body.// -->
							</div>
						</article> <!-- card-group-item.// -->	
					</div> <!-- card.// -->
				</aside> <!-- col.// -->
			</div> <!-- row.// -->
		</div> 
	
		<div class="container">
			<div class="row">
				<aside class="col-sm-4">
					<div class="card">
						<article class="card-group-item">
							<header class="card-header">
								<h6 class="title">선택 타입 </h6>
							</header>
							<div class="filter-content">
								<div class="card-body">
									<label class="form-check">
									  <input class="form-check-input" type="radio" name="exampleRadio" value="who">
									  <span class="form-check-label">
									    Cast
									  </span>
									</label>
									<label class="form-check">
									  <input class="form-check-input" type="radio" name="exampleRadio" value="afo">
									  <span class="form-check-label">
									    Splint
									  </span>
									</label>
									<label class="form-check">
									  <input class="form-check-input" type="radio" name="exampleRadio" value="cro">
									  <span class="form-check-label">
									    Brace
									  </span>
									</label>
								</div> <!-- card-body.// -->
							</div>
						</article> <!-- card-group-item.// -->	
					</div> <!-- card.// -->
				</aside> <!-- col.// -->
			</div> <!-- row.// -->
		</div>
	

</body>
</html>