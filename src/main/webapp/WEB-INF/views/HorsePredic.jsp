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
	
	<title>예측 모델</title>
</head>
<body>

	<form method="post" action="HorsePredicRes" id="HorsePredicForm">
		<div class="container show-grid">
			<div class="row">
		      <div class="col-md-4">
		      	<h5>예측모델</h5>
		      </div>
		    </div>
		    <div class="row">
		    	<div class="col-md-4">
		      		<input type="text" class="form-control" id="hr1" name="hrName" aria-describedby="horseNameHelp" placeholder="1. 말 이름을 입력하세요">
		      	</div>
		    </div>
		    <div class="row">
		    	<div class="col-md-4">
		    		<input type="text" class="form-control" id="hr2" name="hrName" aria-describedby="horseNameHelp" placeholder="2. 말 이름을 입력하세요">
		    	</div>
		    </div>
		    <div class="row">
		    	<div class="col-md-4">
		    		<input type="text" class="form-control" id="hr3" name="hrName" aria-describedby="horseNameHelp" placeholder="3. 말 이름을 입력하세요">
		    	</div>
		    </div>
		    <div class="row">
		    	<div class="col-md-4">
		    		<input type="text" class="form-control" id="hr4" name="hrName" aria-describedby="horseNameHelp" placeholder="4. 말 이름을 입력하세요">
		    	</div>
		    </div>
		    <div class="row">
		    	<div class="col-md-4">
		    		<input type="text" class="form-control" id="hr5" name="hrName" aria-describedby="horseNameHelp" placeholder="5. 말 이름을 입력하세요">
		    	</div>
		    </div>
		    <div class="row">
		    	<div class="col-md-4">
		    		<input type="text" class="form-control" id="hr6" name="hrName" aria-describedby="horseNameHelp" placeholder="6. 말 이름을 입력하세요">
		    	</div>
		    </div>
		    <div class="row">
		    	<div class="col-md-4">
		    		<input type="text" class="form-control" id="hr7" name="hrName" aria-describedby="horseNameHelp" placeholder="7. 말 이름을 입력하세요">
		    	</div>
		    </div>
		    <div class="row">
		    	<div class="col-md-4">
		    		<input type="text" class="form-control" id="hr8" name="hrName" aria-describedby="horseNameHelp" placeholder="8. 말 이름을 입력하세요">
		    	</div>
		    </div>
		    <div class="row">
		    	<div class="col-md-4">
		    		<input type="text" class="form-control" id="hr9" name="hrName" aria-describedby="horseNameHelp" placeholder="9. 말 이름을 입력하세요">
		    	</div>
		    </div>
		    <div class="row">
		    	<div class="col-md-4">
		    		<input type="text" class="form-control" id="hr10" name="hrName" aria-describedby="horseNameHelp" placeholder="10. 말 이름을 입력하세요">
		    	</div>
		    </div>
		    <div class="row">
		    	<div class="col-md-4">
		    		<input type="text" class="form-control" id="hr11" name="hrName" aria-describedby="horseNameHelp" placeholder="11. 말 이름을 입력하세요">
		    	</div>
		    </div>
		    <div class="row">
		    	<div class="col-md-4">
		    		<input type="text" class="form-control" id="hr12" name="hrName" aria-describedby="horseNameHelp" placeholder="12. 말 이름을 입력하세요">
		    	</div>
		    </div>
		    <div class="row">
		    	<div class="col-md-4">
		    		<input type="text" class="form-control" id="hr13" name="hrName" aria-describedby="horseNameHelp" placeholder="13. 말 이름을 입력하세요">
		    	</div>
		    </div>
		    <div class="row">
		    	<div class="col-md-4">
		    		<input type="text" class="form-control" id="hr14" name="hrName" aria-describedby="horseNameHelp" placeholder="14. 말 이름을 입력하세요">
		    	</div>
		    </div>
		    <div class="row">
		    	<div class="col-md-4">
		    		<input type="text" class="form-control" id="hr15" name="hrName" aria-describedby="horseNameHelp" placeholder="15. 말 이름을 입력하세요">
		    	</div>
		    </div>
		    <div class="row">
		    	<div class="col-md-12">
		    	============================================================================================
		    	</div>
		    </div>
		    <div class="row">
		    	<div class="col-md-8">
		    		<button type="submit" class="btn btn-primary">예측하기</button>
		    	</div>
		    </div>
		    <div class="row">
		    	<div class="col-md-12">
		    	============================================================================================
		    	</div>
		    </div>
		    <c:forEach var="row" items="${hrvo_list}">
		    	<div class="row">
		    		<div class="col-md-8">			                
						<h5>${row.lane}. ${row.hrName} : ${row.res_score}</h5>
					</div>
				</div>                    
			</c:forEach> 	
		</div>
	</form>

</body>
</html>