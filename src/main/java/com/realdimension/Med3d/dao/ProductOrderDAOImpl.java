package com.realdimension.Med3d.dao;

import java.util.HashMap;
import java.util.List;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.realdimension.Med3d.VO.OrderVO;

@Repository
public class ProductOrderDAOImpl implements ProductOrderDAO {

	private static final String namespace = "com.realdimension.Med3d.ProductOrderMapper";
	
	@Inject
	private SqlSession sqlSession;
	
	@Override
	public void Order(OrderVO vo) throws Exception
	{
		sqlSession.insert(namespace + ".Order", vo);
	}
	
	@Override
	public List<OrderVO> OrderList(String requester_id) throws Exception
	{
		return sqlSession.selectList(namespace + ".OrderList", requester_id);
	}
	
	@Override
	public OrderVO FindOrder(String order_id) throws Exception
	{
		return sqlSession.selectOne(namespace + ".FindOrder", order_id);
	}
	
	@Override
	public List<OrderVO> AllOrderList() throws Exception
	{
		return sqlSession.selectList(namespace + ".AllOrderList");
	}
	
	@Override
	public void OrderMakeStart(HashMap map) throws Exception
	{
		sqlSession.update(namespace + ".OrderMakeStart", map);
	}
	
	@Override
	public void OrderMakingCancel(String order_id) throws Exception
	{
		sqlSession.update(namespace + ".OrderMakingCancel", order_id);
	}
	
	@Override
	public void OrderMakingDelete(String order_id) throws Exception
	{
		sqlSession.update(namespace + ".OrderMakingDelete", order_id);
	}
	
	@Override
	public void MakingDone(String order_id) throws Exception
	{
		sqlSession.update(namespace + ".MakingDone", order_id);
	}
	
	@Override
	public void DeliveryStart(String order_id) throws Exception
	{
		sqlSession.update(namespace + ".DeliveryStart", order_id);
	}
	
}
