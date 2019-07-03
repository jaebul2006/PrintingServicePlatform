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
public class HospitalDAOImpl implements HospitalDAO{

	private static final String namespace = "com.realdimension.Med3d.HospitalMapper";
	
	@Inject
	private SqlSession sqlSession;
	
	@Override
	public List<patientVO> getPatients(String id) throws Exception
	{
		return sqlSession.selectList(namespace + ".getPatients", id);
	}

	@Override
	public void insPatient(patientVO vo) throws Exception
	{
		sqlSession.insert(namespace + ".insPatient", vo);
	}
	
}
