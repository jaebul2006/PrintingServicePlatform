package com.realdimension.Med3d.service;

import java.util.HashMap;
import java.util.List;

import javax.inject.Inject;
import org.springframework.stereotype.Service;

import com.realdimension.Med3d.VO.horseNameNoVO;
import com.realdimension.Med3d.VO.horseRecordVO;
import com.realdimension.Med3d.VO.riderRecordVO;
import com.realdimension.Med3d.VO.sectionSpeedVO;
import com.realdimension.Med3d.dao.HorseDAO;

@Service
public class HorseServiceImpl implements HorseService{

	@Inject
	HorseDAO dao;
	
	@Override
	public void insertHorseRecord(horseRecordVO vo) throws Exception
	{
		dao.insertHorseRecord(vo);
	}
	
	@Override
	public List<horseRecordVO> HorseInfo(HashMap map) throws Exception
	{
		return dao.HorseInfo(map);
	}
	
	@Override
	public void insertRiderRecord(riderRecordVO vo) throws Exception
	{
		dao.insertRiderRecord(vo);
	}
	
	@Override
	public riderRecordVO RiderInfo(String jkName) throws Exception
	{
		return dao.RiderInfo(jkName);
	}
	
	@Override
	public void insertSectionSpeed(sectionSpeedVO vo) throws Exception
	{
		dao.insertSectionSpeed(vo);
	}
	
	@Override
	public sectionSpeedVO SectionSpeedInfo(String hrName) throws Exception
	{
		return dao.SectionSpeedInfo(hrName);
	}
	
	@Override
	public void insertHorseNameNo(horseNameNoVO vo) throws Exception
	{
		dao.insertHorseNameNo(vo);
	}
	
	@Override
	public String HorseNo(String hrName) throws Exception
	{
		return dao.HorseNo(hrName);
	}
	
}
