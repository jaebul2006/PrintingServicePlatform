package com.realdimension.Med3d.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.realdimension.Med3d.VO.accountVO;
import com.realdimension.Med3d.VO.hospitalVO;
import com.realdimension.Med3d.VO.patientVO;
//import com.realdimension.Med3d.service.Exceptino;
import com.realdimension.Med3d.VO.personalVO;

import java.util.HashMap;
import java.util.List;

import javax.inject.Inject;

@Repository
public class AccountDAOImpl implements AccountDAO{

	private static final String namespace = "com.realdimension.Med3d.AccountMapper";
	
	@Inject
	private SqlSession sqlSession;
	
	@Override
	public int AccountCnt(String id) throws Exception
	{
		return sqlSession.selectOne(namespace + ".AccountCnt", id);
	}
	
	@Override
	public void RegistAccount(accountVO vo) throws Exception
	{
		sqlSession.insert(namespace + ".RegistAccount", vo);
	}
	
	@Override
	public int LoginCheck(accountVO vo) throws Exception
	{
		return sqlSession.selectOne(namespace + ".LoginCheck", vo); 
	}
	
	@Override
	public List<accountVO> Producers() throws Exception
	{
		return sqlSession.selectList(namespace + ".Producers");
	}
	
	@Override
	public String AccountType(String id) throws Exception
	{
		return sqlSession.selectOne(namespace + ".AccountType", id);
	}
	
	@Override
	public void RegistPatient(patientVO vo) throws Exception
	{
		sqlSession.insert(namespace + ".RegistPatient", vo);
	}
	
	@Override
	public void InsHospital(hospitalVO vo) throws Exception
	{
		sqlSession.insert(namespace + ".InsHospital", vo);
	}
	
	@Override
	public void InsPersonal(personalVO vo) throws Exception
	{
		sqlSession.insert(namespace + ".InsPersonal", vo);
	}
	
	@Override
	public hospitalVO getHospital(String id) throws Exception
	{
		return sqlSession.selectOne(namespace + ".getHospital", id);
	}
	
}
