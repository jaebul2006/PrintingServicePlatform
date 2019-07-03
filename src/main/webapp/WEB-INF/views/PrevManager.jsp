<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri = "http://www.springframework.org/tags/form" prefix = "form"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"> 
<html lang="ko">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>Home - Brand</title>
    <link rel="stylesheet" href="./resources/PrevManagerAssets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat:400,400i,700,700i,600,600i">
    <link rel="stylesheet" href="./resources/PrevManagerAssets/fonts/simple-line-icons.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/baguettebox.js/1.10.0/baguetteBox.min.css">
    <link rel="stylesheet" href="./resources/PrevManagerAssets/css/smoothproducts.css">
</head>

<body>
    <main class="page landing-page">
        <section class="clean-block clean-hero" style="background-image:url(&quot;./resources/PrevManagerAssets/img/tech/image4.jpg&quot;);color:rgba(9, 162, 255, 0.85);">
            <div class="text">
                <h2>3D 프린팅 서비스 플랫폼 방문을 환영합니다!</h2>
                <p>계정 등록 카테고리에 맞는 서비스 신청 및 관리 페이지를 제공합니다&nbsp;</p><button class="btn btn-outline-light btn-lg" type="button" onclick="BtnToManage('${pageContext.request.remoteUser}');">관리페이지로 이동</button></div>
        </section>
        <section class="clean-block clean-info dark">
            <div class="container">
                <div class="block-heading"></div>
            </div>
        </section>
    </main>
    <footer class="page-footer dark">
        <div class="container">
            <div class="row">
                <div class="col-sm-3">
                    <h5>Get started</h5>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Sign up</a></li>
                        <li><a href="#">Downloads</a></li>
                    </ul>
                </div>
                <div class="col-sm-3">
                    <h5>About us</h5>
                    <ul>
                        <li><a href="#">Company Information</a></li>
                        <li><a href="#">Contact us</a></li>
                        <li><a href="#">Reviews</a></li>
                    </ul>
                </div>
                <div class="col-sm-3">
                    <h5>Support</h5>
                    <ul>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">Help desk</a></li>
                        <li><a href="#">Forums</a></li>
                    </ul>
                </div>
                <div class="col-sm-3">
                    <h5>Legal</h5>
                    <ul>
                        <li><a href="#">Terms of Service</a></li>
                        <li><a href="#">Terms of Use</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="footer-copyright">
            <p>© 2018 Copyright Text</p>
        </div>
    </footer>
    <script src="./resources/PrevManagerAssets/js/jquery.min.js"></script>
    <script src="./resources/PrevManagerAssets/bootstrap/js/bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/baguettebox.js/1.10.0/baguetteBox.min.js"></script>
    <script src="./resources/PrevManagerAssets/js/smoothproducts.min.js"></script>
    <script src="./resources/PrevManagerAssets/js/theme.js"></script>
    
    <script>
    	function BtnToManage(id)
    	{
    		window.location.href = "/Med3d/CategoryMain?id=" + id;
    	}
    </script>
</body>

</html>