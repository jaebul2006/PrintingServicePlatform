package com.realdimension.Med3d.service;

import javax.inject.Inject;
import java.util.List;
import org.springframework.stereotype.Service;
import com.realdimension.Med3d.VO.PrintProductCompaniesVO;
import com.realdimension.Med3d.dao.PrintProductCompaniesDAO;

@Service
public class PrintProductCompaniesServiceImpl implements PrintProductCompaniesService{

	@Inject
	PrintProductCompaniesDAO dao;
	
	@Override
	public List<PrintProductCompaniesVO> CastSplintCompaniesList() throws Exception
	{
		return dao.CastSplintCompaniesList();
	}
	
	@Override
	public void CastSplintCompanyRegist(PrintProductCompaniesVO vo) throws Exception
	{
		dao.CastSplintCompanyRegist(vo);
	}

	@Override
	public List<PrintProductCompaniesVO> BraceCompaniesList() throws Exception
	{
		return dao.BraceCompaniesList();
	}
	
	@Override
	public void BraceCompanyRegist(PrintProductCompaniesVO vo) throws Exception
	{
		dao.BraceCompanyRegist(vo);
	}

	@Override
	public List<PrintProductCompaniesVO> InsoleCompaniesList() throws Exception
	{
		return dao.InsoleCompaniesList();
	}
	
	@Override
	public void InsoleCompanyRegist(PrintProductCompaniesVO vo) throws Exception
	{
		dao.InsoleCompanyRegist(vo);
	}
	
}
