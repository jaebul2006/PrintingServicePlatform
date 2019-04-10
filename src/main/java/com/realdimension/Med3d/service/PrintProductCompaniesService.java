package com.realdimension.Med3d.service;

import com.realdimension.Med3d.VO.PrintProductCompaniesVO;
import java.util.List;

public interface PrintProductCompaniesService {

	public List<PrintProductCompaniesVO> CastSplintCompaniesList() throws Exception;
	public void CastSplintCompanyRegist(PrintProductCompaniesVO vo) throws Exception;
	public List<PrintProductCompaniesVO> BraceCompaniesList() throws Exception;
	public void BraceCompanyRegist(PrintProductCompaniesVO vo) throws Exception;
	public List<PrintProductCompaniesVO> InsoleCompaniesList() throws Exception;
	public void InsoleCompanyRegist(PrintProductCompaniesVO vo) throws Exception; 
}
