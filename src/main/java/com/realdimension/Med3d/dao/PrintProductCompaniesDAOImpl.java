package com.realdimension.Med3d.dao;

import java.util.List;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.realdimension.Med3d.VO.PrintProductCompaniesVO;
import com.realdimension.Med3d.dao.PrintProductCompaniesDAO;

@Repository
public class PrintProductCompaniesDAOImpl implements PrintProductCompaniesDAO{

	private static final String namespace = "com.realdimension.Med3d.PrintProductMapper";
	
	@Inject
	private SqlSession sqlSession;
	
	@Override
	public List<PrintProductCompaniesVO> CastSplintCompaniesList() throws Exception
	{
		return sqlSession.selectList(namespace + ".CastSplintCompaniesList");
	}
	
	@Override
	public void CastSplintCompanyRegist(PrintProductCompaniesVO vo) throws Exception
	{
		sqlSession.insert(namespace + ".CastSplintCompanyRegist", vo);
	}

	@Override
	public List<PrintProductCompaniesVO> BraceCompaniesList() throws Exception
	{
		return sqlSession.selectList(namespace + ".BraceCompaniesList");
	}
	
	@Override
	public void BraceCompanyRegist(PrintProductCompaniesVO vo) throws Exception
	{
		sqlSession.insert(namespace + ".BraceCompanyRegist", vo);
	}
	
	@Override
	public List<PrintProductCompaniesVO> InsoleCompaniesList() throws Exception
	{
		return sqlSession.selectList(namespace + ".InsoleCompaniesList");
	}

	@Override
	public void InsoleCompanyRegist(PrintProductCompaniesVO vo) throws Exception
	{
		sqlSession.insert(namespace + ".InsoleCompanyRegist", vo);
	}
	
}
