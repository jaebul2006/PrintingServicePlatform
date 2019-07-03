package com.realdimension.Med3d.service;
import javax.inject.Inject;
import org.springframework.stereotype.Service;

import com.realdimension.Med3d.VO.accountVO;
import com.realdimension.Med3d.VO.hospitalVO;
import com.realdimension.Med3d.dao.AccountDAO;
import com.realdimension.Med3d.VO.patientVO;
import com.realdimension.Med3d.VO.personalVO;

import java.util.HashMap;
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
	
	@Override
	public void RegistPatient(patientVO vo) throws Exception
	{
		dao.RegistPatient(vo);
	}
	
	@Override
	public void InsHospital(hospitalVO vo) throws Exception
	{
		dao.InsHospital(vo);
	}
	
	@Override
	public void InsPersonal(personalVO vo) throws Exception
	{
		dao.InsPersonal(vo);
	}
	
	@Override
	public hospitalVO getHospital(String id) throws Exception
	{
		return dao.getHospital(id);
	}
	
}
