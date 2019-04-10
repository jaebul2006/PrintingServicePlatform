package com.realdimension.Med3d.dao;

import java.util.List;

import com.realdimension.Med3d.VO.PrintProductCompaniesVO;

public interface PrintProductCompaniesDAO {

	public List<PrintProductCompaniesVO> CastSplintCompaniesList() throws Exception;
	public void CastSplintCompanyRegist(PrintProductCompaniesVO vo) throws Exception;
	public List<PrintProductCompaniesVO> BraceCompaniesList() throws Exception;
	public void BraceCompanyRegist(PrintProductCompaniesVO vo) throws Exception;
	public List<PrintProductCompaniesVO> InsoleCompaniesList() throws Exception;
	public void InsoleCompanyRegist(PrintProductCompaniesVO vo) throws Exception;
	
}
