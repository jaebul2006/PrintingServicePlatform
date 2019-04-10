package com.realdimension.Med3d;

import javax.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.ModelAndView;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import com.realdimension.Med3d.VO.OrderVO;
import com.realdimension.Med3d.service.AccountService;
import com.realdimension.Med3d.service.ProductOrderService;

@Controller
public class ProductOrderController {

	@Autowired
	ProductOrderService order_service;
	
	@Autowired
	AccountService account_service;
	
	@GetMapping(value = "/auth/ProductOrderHome")
	public ModelAndView ProductOrderHome(HttpServletRequest request) throws Exception
	{
		// 요청자 계정이 producer 이면 모든 주문목록 페이지로 가야한다
		String id = request.getSession().getAttribute("id").toString();
		System.out.println(id);
		String account_type = account_service.AccountType(id);
		if(account_type.equals("hospital")) {
			List<OrderVO> orders = order_service.OrderList(request.getSession().getAttribute("id").toString());
			ModelAndView mav = new ModelAndView("/ProductOrderHome");
			mav.addObject("orders", orders);
			return mav;
		}
		else {
			List<OrderVO> orders = order_service.AllOrderList();
			ModelAndView mav = new ModelAndView("/OrderStateHome");
			mav.addObject("orders", orders);
			return mav;
		}
	}
	
	@PostMapping(value = "/auth/Order")
	public ModelAndView Order(HttpServletRequest request, @RequestParam("comment")String comment,
			@RequestParam("service_type")String service_type, @RequestParam("business_trip")String business_trip,
			@RequestParam("body_type")String body_type, @RequestParam("result_type")String result_type) throws Exception
	{
		UUID uuid = UUID.randomUUID();
		
		SimpleDateFormat date = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
		Calendar cal = Calendar.getInstance();
		String today = null;
		today = date.format(cal.getTime());
		Timestamp ts = Timestamp.valueOf(today);
		
		String requester_id = request.getSession().getAttribute("id").toString();
		String hcomment = new String(comment.getBytes("8859_1"), "UTF-8");
		
		OrderVO vo = new OrderVO();
		String id = uuid.toString();
		vo.setId(id);
		vo.setOrder_date(ts.toString());
		vo.setRequester_id(requester_id);
		vo.setComment(hcomment);
		vo.setService_type(service_type);
		vo.setBusiness_trip(business_trip);
		vo.setBody_type(body_type);
		vo.setResult_type(result_type);
		vo.setWork_state("ready");
		
		order_service.Order(vo);
		
		ModelAndView mav = new ModelAndView("/ProductOrderHome");
		return mav;
	}
	
	@PostMapping(value = "/OrderFind")
	public ModelAndView OrderFind(@RequestParam("order_id")String order_id) throws Exception
	{
		OrderVO order = order_service.FindOrder(order_id);
		
		ModelAndView mav = new ModelAndView("/OrderFind");
		mav.addObject("order", order);
		return mav;
	}
	
	@PostMapping(value = "/auth/OrderMakeStart")
	public ModelAndView OrderMakeStart(@RequestParam("id")String id, @RequestParam("work_time")int work_time) throws Exception
	{
		// 해당 id의 주문 상황업을 작업중으로 업데이트 한다
		SimpleDateFormat date = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
		Calendar cal = Calendar.getInstance();
		String today = null;
		today = date.format(cal.getTime());
		Timestamp ts = Timestamp.valueOf(today);
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("id", id);
		map.put("work_time", work_time);
		map.put("start_time", ts);
		map.put("work_state", "making");
		order_service.OrderMakeStart(map);
		
		ModelAndView mav = new ModelAndView("/OrderStateHome");
		return mav;
	}
	
}
