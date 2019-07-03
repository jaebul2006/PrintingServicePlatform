package com.realdimension.Med3d.service;
import java.util.HashMap;
import java.util.List;

import com.realdimension.Med3d.VO.OrderVO;

public interface ProductOrderService {

	public void Order(OrderVO vo) throws Exception;
	public List<OrderVO> OrderList(String requester_id) throws Exception;
	public OrderVO FindOrder(String order_id) throws Exception;
	public List<OrderVO> AllOrderList() throws Exception;
	public void OrderMakeStart(HashMap map) throws Exception;
	public void OrderMakingCancel(String order_id) throws Exception;
	public void OrderMakingDelete(String order_id) throws Exception; 
	public void MakingDone(String order_id) throws Exception;
	public void DeliveryStart(String order_id) throws Exception;
	
}
