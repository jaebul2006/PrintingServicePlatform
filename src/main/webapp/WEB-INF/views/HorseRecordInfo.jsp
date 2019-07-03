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
	
	<title>경주 기록</title>
</head>
<body>

	<form method="post" action="HorseRecordInfoRes" id="HorseRecordForm">
		<div class="container show-grid">
		    <div class="row">
		    	<div class="col-md-12">
		    	============================================================================================
		    	</div>
		    </div>
		    <div class="row">
		    	<div class="col-md-4">
		      		<input type="text" class="form-control" id="hrName1" name="hrName" placeholder="1. 말 이름">
		      	</div>
		    </div>
		    <div class="row">
		    	<div class="col-md-4">
		      		<input type="text" class="form-control" id="hrName2" name="hrName" placeholder="2. 말 이름">
		      	</div>
		    </div>
		    <div class="row">
		    	<div class="col-md-4">
		      		<input type="text" class="form-control" id="hrName3" name="hrName" placeholder="3. 말 이름">
		      	</div>
		    </div>
		    <div class="row">
		    	<div class="col-md-4">
		      		<input type="text" class="form-control" id="hrName4" name="hrName" placeholder="4. 말 이름">
		      	</div>
		    </div>
		    <div class="row">
		    	<div class="col-md-4">
		      		<input type="text" class="form-control" id="hrNam5" name="hrName" placeholder="5. 말 이름">
		      	</div>
		    </div>
		    <div class="row">
		    	<div class="col-md-4">
		      		<input type="text" class="form-control" id="hrName6" name="hrName" placeholder="6. 말 이름">
		      	</div>
		    </div>
		    <div class="row">
		    	<div class="col-md-4">
		      		<input type="text" class="form-control" id="hrName7" name="hrName" placeholder="7. 말 이름">
		      	</div>
		    </div>
		    <div class="row">
		    	<div class="col-md-4">
		      		<input type="text" class="form-control" id="hrName8" name="hrName" placeholder="8. 말 이름">
		      	</div>
		    </div>
		    <div class="row">
		    	<div class="col-md-4">
		      		<input type="text" class="form-control" id="hrName9" name="hrName" placeholder="9. 말 이름">
		      	</div>
		    </div>
		    <div class="row">
		    	<div class="col-md-4">
		      		<input type="text" class="form-control" id="hrName10" name="hrName" placeholder="10. 말 이름">
		      	</div>
		    </div>
		    <div class="row">
		    	<div class="col-md-4">
		      		<input type="text" class="form-control" id="hrName11" name="hrName" placeholder="11. 말 이름">
		      	</div>
		    </div>
		    <div class="row">
		    	<div class="col-md-4">
		      		<input type="text" class="form-control" id="hrName12" name="hrName" placeholder="12. 말 이름">
		      	</div>
		    </div>
		    <div class="row">
		    	<div class="col-md-4">
		      		<input type="text" class="form-control" id="hrName13" name="hrName" placeholder="13. 말 이름">
		      	</div>
		    </div>
		    <div class="row">
		    	<div class="col-md-4">
		      		<input type="text" class="form-control" id="hrName14" name="hrName" placeholder="14. 말 이름">
		      	</div>
		    </div>
		    <div class="row">
		    	<div class="col-md-4">
		      		<input type="text" class="form-control" id="hrName15" name="hrName" placeholder="15. 말 이름">
		      	</div>
		    </div>
		    
		    
		    <div class="row">
		    	<div class="col-md-12">
		    	============================================================================================
		    	</div>
		    </div>
		    <div class="row">
		    	<div class="col-md-8">
		    		<button type="submit" class="btn btn-primary">기록확인</button>
		    	</div>
		    </div>
		    <div class="row">
		    	<div class="col-md-12">
		    	============================================================================================
		    	</div>
		    </div> 	
		</div>
	</form>

	<c:forEach var="row" items="${records}">
    	<div class="row">
    		<div class="col-md-8">			                
				<h5>${row.hrName} : ${row.race_date} // ${row.distance} // ${row.record}</h5>
			</div>
		</div>                    
	</c:forEach>

</body>
</html>