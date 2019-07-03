package com.realdimension.Med3d;

import java.text.DateFormat;
import java.util.Date;
import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {
	
	/*
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {
	
		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
		
		String formattedDate = dateFormat.format(date);
		
		model.addAttribute("serverTime", formattedDate );
		
		return "main";
	}
	
	@RequestMapping(value = "/ServiceIntroduce", method = RequestMethod.GET)
	public String ServiceIntroduce() {
		
		return "ServiceIntroduce";
	}
	
	@RequestMapping(value = "/UserLogin", method = RequestMethod.GET)
	public String UserLogin() {
		
		return "UserLogin";
	}
	
	@RequestMapping(value = "/UserJoin", method = RequestMethod.GET)
	public String UserJoin() {
		
		return "UserJoin";
	}
	
	@RequestMapping(value = "/SoftwareIntroduce", method = RequestMethod.GET)
	public String SoftwareIntroduce() {
		
		return "SoftwareIntroduce";
	}
	
	@RequestMapping(value = "/ClinicInto", method=RequestMethod.GET)
	public String ClinicInto() {
		return "ClinicInto";
	}
	
	@RequestMapping(value = "/ProductState", method=RequestMethod.GET)
	public String ProductState() {
		return "ProductState";
	}
	
	@RequestMapping(value = "/Login", method=RequestMethod.GET)
	public String Login() {
		return "Login";
	}
	*/
	
}
