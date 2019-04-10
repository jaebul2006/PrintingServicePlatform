package com.realdimension.Med3d;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class LoginInterceptor extends HandlerInterceptorAdapter{
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception
	{
		System.out.println("로그인 프리 핸들러");
		
		if(request.getSession().getAttribute("id") == null){
			response.sendRedirect("/Med3d/UserLogin");
			return false;
		}
		
		return true;
	}
	
}
