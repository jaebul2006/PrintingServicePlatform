package com.realdimension.Med3d;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.realdimension.Med3d.VO.accountVO;
import com.realdimension.Med3d.service.AccountService;

@Controller
public class CompanyProduct {

	@Autowired
	AccountService account_service;
	
	@RequestMapping(value = "/auth/ProductOrder", method=RequestMethod.GET) 
	public ModelAndView ProductOrder() throws Exception
	{
		// 제작자로 등록한 계정의 목록을 보내줘야한다
		List<accountVO> producers = account_service.Producers();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("producers", producers);
		/*
		for(int i=0; i<producers.size(); i++) {
			System.out.println(producers.get(i).getAccount_id());
		}
		*/
		ModelAndView mav = new ModelAndView();
		mav.addObject("map", map);
		mav.setViewName("ProductOrder");
		return mav;
	}
	
}
