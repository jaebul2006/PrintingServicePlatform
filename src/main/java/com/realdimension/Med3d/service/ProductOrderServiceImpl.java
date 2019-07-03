package com.realdimension.Med3d.service;
import java.util.HashMap;
import java.util.List;

import javax.inject.Inject;
import org.springframework.stereotype.Service;

import com.realdimension.Med3d.VO.OrderVO;
import com.realdimension.Med3d.dao.ProductOrderDAO;

@Service
public class ProductOrderServiceImpl implements ProductOrderService{

	@Inject
	ProductOrderDAO dao;
	
	@Override
	public void Order(OrderVO vo) throws Exception
	{
		dao.Order(vo);
	}
	
	@Override
	public List<OrderVO> OrderList(String requester_id) throws Exception
	{
		return dao.OrderList(requester_id);
	}
	
	@Override
	public OrderVO FindOrder(String order_id) throws Exception
	{
		return dao.FindOrder(order_id);
	}
	
	@Override
	public List<OrderVO> AllOrderList() throws Exception
	{
		return dao.AllOrderList();
	}
	
	@Override
	public void OrderMakeStart(HashMap map) throws Exception
	{
		dao.OrderMakeStart(map);
	}
	
	@Override
	public void OrderMakingCancel(String order_id) throws Exception
	{
		dao.OrderMakingCancel(order_id);
	}
	
	@Override
	public void OrderMakingDelete(String order_id) throws Exception
	{
		dao.OrderMakingDelete(order_id);
	}
	
	@Override
	public void MakingDone(String order_id) throws Exception
	{
		dao.MakingDone(order_id);
	}
	
	@Override
	public void DeliveryStart(String order_id) throws Exception
	{
		dao.DeliveryStart(order_id);
	}
	
}
