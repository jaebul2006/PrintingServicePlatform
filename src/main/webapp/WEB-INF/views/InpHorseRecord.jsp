<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib uri = "http://www.springframework.org/tags/form" prefix = "form"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

	<link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">
  		
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
  	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/chartist/0.11.0/chartist.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/chartist/0.11.0/chartist.min.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
	
	<title>기록 입력</title>
</head>
<body>

	<form method="post" action="InpHorseRecordRes" id="InpHorseRecordForm">
		<div class="container show-grid">
			<div class="row">
		      <div class="col-md-4">
		      	<h5>기록 입력</h5>
		      </div>
		    </div>
		    
		    <div class="row">
		    	<div class="col-md-4">
		      		<input type="text" class="form-control" id="race_date" name="race_date" placeholder="1. 경주날짜">
		      	</div>
		    </div>
		    <div class="row">
		    	<div class="col-md-4">
		      		<input type="text" class="form-control" id="distance" name="distance" placeholder="2. 경주거리 m">
		      	</div>
		    </div>
		    
		    <div class="row">
		    	<div class="col-md-4">
		      		<input type="text" class="form-control" id="hr1" name="hrName" placeholder="말 이름">
		      	</div>
		      	<div class="col-md-4">
		      		<input type="text" class="form-control" id="rr1" name="race_record" placeholder="경주 기록">
		      	</div>
		    </div>
		    <div class="row">
		    	<div class="col-md-4">
		      		<input type="text" class="form-control" id="hr2" name="hrName" placeholder="말 이름">
		      	</div>
		      	<div class="col-md-4">
		      		<input type="text" class="form-control" id="rr2" name="race_record" placeholder="경주 기록">
		      	</div>
		    </div>
		    <div class="row">
		    	<div class="col-md-4">
		      		<input type="text" class="form-control" id="hr3" name="hrName" placeholder="말 이름">
		      	</div>
		      	<div class="col-md-4">
		      		<input type="text" class="form-control" id="rr3" name="race_record" placeholder="경주 기록">
		      	</div>
		    </div>
		    <div class="row">
		    	<div class="col-md-4">
		      		<input type="text" class="form-control" id="hr4" name="hrName" placeholder="말 이름">
		      	</div>
		      	<div class="col-md-4">
		      		<input type="text" class="form-control" id="rr4" name="race_record" placeholder="경주 기록">
		      	</div>
		    </div>
		    <div class="row">
		    	<div class="col-md-4">
		      		<input type="text" class="form-control" id="hr5" name="hrName" placeholder="말 이름">
		      	</div>
		      	<div class="col-md-4">
		      		<input type="text" class="form-control" id="rr5" name="race_record" placeholder="경주 기록">
		      	</div>
		    </div>
		    <div class="row">
		    	<div class="col-md-4">
		      		<input type="text" class="form-control" id="hr6" name="hrName" placeholder="말 이름">
		      	</div>
		      	<div class="col-md-4">
		      		<input type="text" class="form-control" id="rr6" name="race_record" placeholder="경주 기록">
		      	</div>
		    </div>
		    <div class="row">
		    	<div class="col-md-4">
		      		<input type="text" class="form-control" id="hr7" name="hrName" placeholder="말 이름">
		      	</div>
		      	<div class="col-md-4">
		      		<input type="text" class="form-control" id="rr7" name="race_record" placeholder="경주 기록">
		      	</div>
		    </div>
		    <div class="row">
		    	<div class="col-md-4">
		      		<input type="text" class="form-control" id="hr8" name="hrName" placeholder="말 이름">
		      	</div>
		      	<div class="col-md-4">
		      		<input type="text" class="form-control" id="rr8" name="race_record" placeholder="경주 기록">
		      	</div>
		    </div>
		    <div class="row">
		    	<div class="col-md-4">
		      		<input type="text" class="form-control" id="hr9" name="hrName" placeholder="말 이름">
		      	</div>
		      	<div class="col-md-4">
		      		<input type="text" class="form-control" id="rr9" name="race_record" placeholder="경주 기록">
		      	</div>
		    </div>
		    <div class="row">
		    	<div class="col-md-4">
		      		<input type="text" class="form-control" id="hr10" name="hrName" placeholder="말 이름">
		      	</div>
		      	<div class="col-md-4">
		      		<input type="text" class="form-control" id="rr10" name="race_record" placeholder="경주 기록">
		      	</div>
		    </div>
		    <div class="row">
		    	<div class="col-md-4">
		      		<input type="text" class="form-control" id="hr11" name="hrName" placeholder="말 이름">
		      	</div>
		      	<div class="col-md-4">
		      		<input type="text" class="form-control" id="rr11" name="race_record" placeholder="경주 기록">
		      	</div>
		    </div>
		    <div class="row">
		    	<div class="col-md-4">
		      		<input type="text" class="form-control" id="hr12" name="hrName" placeholder="말 이름">
		      	</div>
		      	<div class="col-md-4">
		      		<input type="text" class="form-control" id="rr12" name="race_record" placeholder="경주 기록">
		      	</div>
		    </div>
		    <div class="row">
		    	<div class="col-md-4">
		      		<input type="text" class="form-control" id="hr13" name="hrName" placeholder="말 이름">
		      	</div>
		      	<div class="col-md-4">
		      		<input type="text" class="form-control" id="rr13" name="race_record" placeholder="경주 기록">
		      	</div>
		    </div>
		    <div class="row">
		    	<div class="col-md-4">
		      		<input type="text" class="form-control" id="hr14" name="hrName" placeholder="말 이름">
		      	</div>
		      	<div class="col-md-4">
		      		<input type="text" class="form-control" id="rr14" name="race_record" placeholder="경주 기록">
		      	</div>
		    </div>
		    <div class="row">
		    	<div class="col-md-4">
		      		<input type="text" class="form-control" id="hr15" name="hrName" placeholder="말 이름">
		      	</div>
		      	<div class="col-md-4">
		      		<input type="text" class="form-control" id="rr15" name="race_record" placeholder="경주 기록">
		      	</div>
		    </div>
		    
		    <div class="row">
		    	<div class="col-md-12">
		    	============================================================================================
		    	</div>
		    </div>
		    <div class="row">
		    	<div class="col-md-8">
		    		<button type="submit" class="btn btn-primary">입력하기</button>
		    	</div>
		    </div>
		    <div class="row">
		    	<div class="col-md-12">
		    	============================================================================================
		    	</div>
		    </div> 	
		</div>
	</form>

</body>
</html>