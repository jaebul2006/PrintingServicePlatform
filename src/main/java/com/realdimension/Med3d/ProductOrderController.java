package com.realdimension.Med3d;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.ModelAndView;
import org.tensorflow.SavedModelBundle;
import org.tensorflow.Session;
import org.tensorflow.TensorFlow;

import java.io.IOException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import com.realdimension.Med3d.VO.OrderVO;
import com.realdimension.Med3d.service.AccountService;
import com.realdimension.Med3d.service.ProductOrderService;
import com.realdimension.Med3d.VO.accountVO;
import com.realdimension.Med3d.VO.patientVO;

@Controller
public class ProductOrderController {

	@Autowired
	ProductOrderService order_service;
	
	@Autowired
	AccountService account_service;
	
	@Resource(name="uploadPath")
	String uploadPath;
	
	private int PercentFromOrderDone(String start_time_ms, int work_time)
	{
		long t1 = Long.parseLong(start_time_ms);
		long t2 = System.currentTimeMillis();
		float res1 = (float)(t2 - t1);
		float res2 = (res1 / 1000) / 60;
		float res3 = (res2 / (float) work_time) * 100;
		int fres = (int)res3;
		return fres;
	}
	
	private List<OrderVO> ChangeWorkState(List<OrderVO> orders) throws Exception
	{
		for(int i=0; i<orders.size(); i++) {
			if(orders.get(i).getWork_state().equals("making")) {
				int perc = PercentFromOrderDone(orders.get(i).getStart_time_ms(), orders.get(i).getWork_time());
				if(perc >= 100) {
					orders.get(i).setWork_state("delivery_ready");
					order_service.MakingDone(orders.get(i).getId());
				}
				orders.get(i).setDone_perc(perc);
			}
		}
		return orders;
	}
	
	@GetMapping(value = "/ProductOrderHome")
	public ModelAndView ProductOrderHome(HttpServletRequest request) throws Exception
	{
		// 요청자 계정이 producer 이면 모든 주문목록 페이지로 가야한다
		String id = request.getSession().getAttribute("id").toString();
		System.out.println(id);
		String account_type = account_service.AccountType(id);
		if(account_type.equals("hospital")) {
			List<OrderVO> orders = order_service.OrderList(request.getSession().getAttribute("id").toString());
			// 제작 제품당 남은시간 퍼센트를 여기서 계산해서 정보를 추가해준다
			orders = ChangeWorkState(orders);
			
			ModelAndView mav = new ModelAndView("/ProductOrderHome");
			mav.addObject("orders", orders);
			return mav;
		}
		else {
			List<OrderVO> orders = order_service.AllOrderList();
			orders = ChangeWorkState(orders);
			ModelAndView mav = new ModelAndView("/OrderStateHome");
			mav.addObject("orders", orders);
			return mav;
		}
	}
	
	@PostMapping(value = "/Order")
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
	
	@PostMapping(value = "/OrderMakeStart")
	public ModelAndView OrderMakeStart(@RequestParam("id")String id, @RequestParam("work_time")int work_time) throws Exception
	{
		// 해당 id의 주문 상황업을 작업중으로 업데이트 한다
		SimpleDateFormat date = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
		Calendar cal = Calendar.getInstance();
		String today = null;
		today = date.format(cal.getTime());
		Timestamp ts = Timestamp.valueOf(today);
		long ms = System.currentTimeMillis();
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("id", id);
		map.put("work_time", work_time);
		map.put("start_time", ts);
		map.put("start_time_ms", ms);
		map.put("work_state", "making");
		order_service.OrderMakeStart(map);
		
		ModelAndView mav = new ModelAndView("/OrderStateHome");
		return mav;
	}
	
	@PostMapping(value = "/OrderMakingCancel")
	public ModelAndView OrderMakingCancel(@RequestParam("order_id")String order_id) throws Exception
	{
		order_service.OrderMakingCancel(order_id);
		
		ModelAndView mav = new ModelAndView("/OrderStateHome");
		return mav;
	}
	
	// 제작중인 요청을 완전히 삭제, 물론 해당 요청 id를 비활성화하는것이지 db에서 완전히 삭제하는 것은 아니다
	@PostMapping(value = "/OrderMakingDelete")
	public ModelAndView OrderMakingDelete(@RequestParam("order_id")String order_id) throws Exception
	{
		order_service.OrderMakingDelete(order_id);
		
		ModelAndView mav = new ModelAndView("/OrderStateHome");
		return mav;
	}
	
	@PostMapping(value = "/DeliveryStart")
	public ModelAndView DeliveryStart(@RequestParam("order_id")String order_id) throws Exception
	{
		order_service.DeliveryStart(order_id);
		
		ModelAndView mav = new ModelAndView("/OrderStateHome");
		return mav;
	}
	
	@ResponseBody
	@RequestMapping(value="/ScanDataUpd", method=RequestMethod.POST, produces="text/plain;charset=utf-8")
	public ResponseEntity<String> ScanDataUpd(MultipartFile file, HttpServletRequest request) throws Exception
	{
		System.out.println("originalName : " + file.getOriginalFilename());
		System.out.println("size : " + file.getSize());
		System.out.println("contentType : " + file.getContentType());
		
		return new ResponseEntity<String>(UploadFileUtils.uploadFileStream(uploadPath, file.getOriginalFilename(), file.getBytes(), file), HttpStatus.OK);
	}
	
	@GetMapping(value = "/OrderCheck")
	public ModelAndView OrderCheck() throws Exception
	{
		ModelAndView mav = new ModelAndView("/OrderCheck");
		return mav;
	}
	
	@GetMapping(value = "/OrderWrite")
	public ModelAndView OrderWrite() throws Exception
	{
		ModelAndView mav = new ModelAndView("/OrderWrite");
		return mav;
	}
	
	@GetMapping(value = "/OrderPrintingHand")
	public ModelAndView OrderPrintingHand(HttpServletRequest request) throws Exception
	{
		ModelAndView mav = new ModelAndView("/OrderPrintingHand");	
		return mav;
	}
	
	@GetMapping(value = "/OrderPrintingFoot")
	public ModelAndView OrderPrintingFoot(HttpServletRequest request) throws Exception
	{
		ModelAndView mav = new ModelAndView("/OrderPrintingFoot");	
		return mav;
	}
	
	/*
	@GetMapping(value = "/MachineLearningTest")
	public ModelAndView MachineLearningTest(HttpServletRequest req) throws Exception
	{
		SavedModelBundle b = SavedModelBundle.load("/", "");
		
		ModelAndView mav = new ModelAndView("/MachineLearningTest");
		return mav;
	}
	*/
	
	
}
