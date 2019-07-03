package com.realdimension.Med3d.dao;

import java.util.HashMap;
import java.util.List;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.realdimension.Med3d.VO.horseNameNoVO;
import com.realdimension.Med3d.VO.horseRecordVO;
import com.realdimension.Med3d.VO.riderRecordVO;
import com.realdimension.Med3d.VO.sectionSpeedVO;

@Repository
public class HorseDAOImpl implements HorseDAO
{
	private static final String namespace = "com.realdimension.Med3d.HorseMapper";
	
	@Inject
	private SqlSession sqlSession;
	
	
	@Override
	public void insertHorseRecord(horseRecordVO vo) throws Exception
	{
		sqlSession.insert(namespace + ".insertHorseRecord", vo);
	}
	
	@Override
	public List<horseRecordVO> HorseInfo(HashMap map) throws Exception
	{
		return sqlSession.selectList(namespace + ".HorseInfo", map);
	}
	
	@Override
	public void insertRiderRecord(riderRecordVO vo) throws Exception
	{
		sqlSession.insert(namespace + ".insertRiderRecord", vo);
	}
	
	@Override
	public riderRecordVO RiderInfo(String jkName) throws Exception
	{
		return sqlSession.selectOne(namespace + ".RiderInfo", jkName);
	}
	
	@Override
	public void insertSectionSpeed(sectionSpeedVO vo) throws Exception
	{
		sqlSession.insert(namespace + ".insertSectionSpeed", vo);
	}
	
	@Override
	public sectionSpeedVO SectionSpeedInfo(String hrName) throws Exception
	{
		return sqlSession.selectOne(namespace + ".SectionSpeedInfo", hrName);
	}
	
	@Override
	public void insertHorseNameNo(horseNameNoVO vo) throws Exception
	{
		sqlSession.insert(namespace + ".insertHorseNameNo", vo);
	}
	
	@Override
	public String HorseNo(String hrName) throws Exception
	{
		return sqlSession.selectOne(namespace + ".HorseNo", hrName);
	}
	
}
