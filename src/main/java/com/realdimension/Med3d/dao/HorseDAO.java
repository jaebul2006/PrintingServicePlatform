package com.realdimension.Med3d.dao;

import java.util.HashMap;
import java.util.List;

import com.realdimension.Med3d.VO.horseNameNoVO;
import com.realdimension.Med3d.VO.horseRecordVO;
import com.realdimension.Med3d.VO.riderRecordVO;
import com.realdimension.Med3d.VO.sectionSpeedVO;

public interface HorseDAO {

	public void insertHorseRecord(horseRecordVO vo) throws Exception;
	public List<horseRecordVO> HorseInfo(HashMap map) throws Exception;
	
	public void insertRiderRecord(riderRecordVO vo) throws Exception;
	public riderRecordVO RiderInfo(String jkName) throws Exception;
	
	public void insertSectionSpeed(sectionSpeedVO vo) throws Exception;
	public sectionSpeedVO SectionSpeedInfo(String hrName) throws Exception;
	
	public void insertHorseNameNo(horseNameNoVO vo) throws Exception;
	public String HorseNo(String hrName) throws Exception;
}
