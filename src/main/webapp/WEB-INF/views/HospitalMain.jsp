<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib uri = "http://www.springframework.org/tags/form" prefix = "form"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>병원 메인</title>
    <link rel="stylesheet" href="./resources/bootstrap/css/bootstrap.min.css?h=93918eecc45b9fc567267a1f839e79a3">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:300,400,700,300italic,400italic,700italic">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/simple-line-icons/2.4.1/css/simple-line-icons.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css">
    <link rel="stylesheet" href="./resources/css/styles.min.css?h=205b33cd160921ccfa0f1958b0ad5005">
    
    <link rel="stylesheet" href="./resources/css/NavBar_styles.min.css?h=3dc513e325c97df75d3662af55d8ca28">
</head>

<body>
    <nav class="navbar navbar-light navbar-expand-md navigation-clean" style="padding:0px;">
        <div class="container"><a class="navbar-brand" href="#">3D Printing Service Platform</a><button class="navbar-toggler" data-toggle="collapse" data-target="#navcol-1"><span class="sr-only">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>
            <div
                class="collapse navbar-collapse" id="navcol-1">
                <ul class="nav navbar-nav ml-auto">
                    <li class="nav-item" role="presentation"><a class="nav-link active" href="#">서비스관리</a></li>
                    <li class="nav-item" role="presentation"><a class="nav-link" href="#">Training </a></li>
                    <li class="nav-item" role="presentation"><a class="nav-link" href="#">Projects </a></li>
                    <li class="nav-item" role="presentation"><a class="nav-link" href="#">About Us </a></li>
                    <li class="nav-item" role="presentation"><a class="nav-link" href="#">FAQ </a></li>
                    <li class="nav-item" role="presentation"><a class="nav-link" href="#">Contact </a></li>
                    <li class="nav-item dropdown show"><a class="dropdown-toggle nav-link" data-toggle="dropdown" aria-expanded="true" href="#" style="padding:10px;">계정 이름<img src="./resources/image/who.png?h=a2e4a5943c0523e0685c24075dda64fc" style="width:30px;height:30px;padding:0;margin-left:5px;"></a>
                        <div class="dropdown-menu show"
                            role="menu"><a class="dropdown-item" role="presentation" href="#">Logout <i class="fa fa-user-times" id="logouticon"></i></a></div>
                    </li>
                </ul>
        </div>
        </div>
    </nav>
    
    <header class="masthead text-white text-center" style="background:url('./resources/image/bg-masthead.jpg?h=3d56ee9570bd6ab1d22f0827b18a0a99')no-repeat center center;background-size:cover;">
        <div class="overlay" style="background-image: url(&quot;./resources/image/bg-masthead.jpg?h=3d56ee9570bd6ab1d22f0827b18a0a99&quot;);"></div>
        <div class="container">
            <div class="row">
                <div class="col-xl-9 mx-auto">
                    <h1 class="mb-5">${hospital_name} 님, 환영합니다!</h1>
                </div>
                <div class="col-md-10 col-lg-8 col-xl-7 mx-auto">
                    <form>
                        <div class="form-row">
                            <div class="col-12 col-md-9 mb-2 mb-md-0"><input class="form-control form-control-lg" type="email" placeholder="환자이름을 입력하세요"></div>
                            <div class="col-12 col-md-3"><button class="btn btn-primary btn-block btn-lg" type="submit">검색</button></div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </header>
    <section class="features-icons bg-light text-center">
        <div class="container">
            <div class="row">
                <div class="col-lg-4">
                    <div class="mx-auto features-icons-item mb-5 mb-lg-0 mb-lg-3">
                        <div class="d-flex features-icons-icon"><i class="icon-people m-auto text-primary" data-bs-hover-animate="pulse"></i></div>
                        <h3>전체 환자 목록</h3>
                    </div>
                </div>
                <div class="col-lg-4">
                	
                    <div class="mx-auto features-icons-item mb-5 mb-lg-0 mb-lg-3">
                        <div class="d-flex features-icons-icon"><i class="icon-user-follow m-auto text-primary" data-bs-hover-animate="pulse"></i></div>
                        <a href="/Med3d/RegistPatientForm?id=${account_id}"><h3>환자등록</h3></a>
                    </div>
    
                </div>
                <div class="col-lg-4">
                    <div class="mx-auto features-icons-item mb-5 mb-lg-0 mb-lg-3">
                        <div class="d-flex features-icons-icon"><i class="icon-magic-wand m-auto text-primary" data-bs-hover-animate="pulse"></i></div>
                        <h3>서비스 신청</h3>
                    </div>
                </div>
            </div>
        </div>
        <!-- Start: Grid and List view V1.0 --><div class="container">
    <div class="well well-sm">
        <strong>환자목록</strong>
        <div class="btn-group">
            <a href="#" id="list" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-th-list">
            </span>List</a> <a href="#" id="grid" class="btn btn-default btn-sm"><span
                class="glyphicon glyphicon-th"></span>Grid</a>
        </div>
    </div>
    <div id="products" class="row list-group">
        <div class="row">
        
            <c:forEach var="row" items="${patients}">
	            <div class="item  col-xs-4 col-lg-4">
	                <div class="thumbnail">
	                    <img class="group list-group-image" src="http://placehold.it/150x150/000/fff" alt="" />
	                    <div class="caption">
	                        <h4 class="group inner list-group-item-heading">
	                            	${row.name}</h4>
	                        <p class="group inner list-group-item-text">
	                            	${row.birth}</p>
	                        <div class="row">
	                            <div class="col-xs-12 col-md-6">
	                                <p class="lead">
	                                    ${row.sex} / ${row.age} 세</p>
	                            </div>
	                            <div class="col-xs-12 col-md-6">
	                                <a class="btn btn-success" href="#">정보열람</a>
	                            </div>
	                        </div>
	                    </div>
	                </div>
	            </div>
            </c:forEach>
            
        </div>
    </div>
</div>

        <!-- End: Grid and List view V1.0 -->
    </section>
    <footer class="footer bg-light">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 my-auto h-100 text-center text-lg-left">
                    <ul class="list-inline mb-2">
                        <li class="list-inline-item"><a href="#">About</a></li>
                        <li class="list-inline-item"><span>⋅</span></li>
                        <li class="list-inline-item"><a href="#">Contact</a></li>
                        <li class="list-inline-item"><span>⋅</span></li>
                        <li class="list-inline-item"><a href="#">Terms of &nbsp;Use</a></li>
                        <li class="list-inline-item"><span>⋅</span></li>
                        <li class="list-inline-item"><a href="#">Privacy Policy</a></li>
                    </ul>
                    <p class="text-muted small mb-4 mb-lg-0">© Brand 2018. All Rights Reserved.</p>
                </div>
                <div class="col-lg-6 my-auto h-100 text-center text-lg-right">
                    <ul class="list-inline mb-0">
                        <li class="list-inline-item"><a href="#"><i class="fa fa-facebook fa-2x fa-fw"></i></a></li>
                        <li class="list-inline-item"><a href="#"><i class="fa fa-twitter fa-2x fa-fw"></i></a></li>
                        <li class="list-inline-item"><a href="#"><i class="fa fa-instagram fa-2x fa-fw"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.2.1/js/bootstrap.bundle.min.js"></script>
    <script src="./resources/js/script.min.js?h=e95123274fe5ae2f6dd58c9cef1f55e9"></script>
</body>

</html>