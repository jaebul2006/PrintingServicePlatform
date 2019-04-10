package com.realdimension.Med3d.service;
import javax.inject.Inject;
import org.springframework.stereotype.Service;

import com.realdimension.Med3d.VO.accountVO;
import com.realdimension.Med3d.dao.AccountDAO;
import java.util.List;

@Service
public class AccountServiceImpl implements AccountService{

	@Inject
	AccountDAO dao;
	
	@Override
	public int AccountCnt(String id) throws Exception
	{
		return dao.AccountCnt(id);
	}
	
	@Override
	public void RegistAccount(accountVO vo) throws Exception
	{
		dao.RegistAccount(vo);
	}
	
	@Override
	public int LoginCheck(accountVO vo) throws Exception
	{
		return dao.LoginCheck(vo);
	}
	
	@Override
	public List<accountVO> Producers() throws Exception
	{
		return dao.Producers();
	}
	
	@Override
	public String AccountType(String id) throws Exception
	{
		return dao.AccountType(id);
	}
	
}
