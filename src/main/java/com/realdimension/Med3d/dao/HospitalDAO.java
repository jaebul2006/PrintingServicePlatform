package com.realdimension.Med3d.dao;

import java.util.List;
import java.util.HashMap;
import com.realdimension.Med3d.VO.accountVO;
import com.realdimension.Med3d.VO.hospitalVO;
import com.realdimension.Med3d.VO.patientVO;
import com.realdimension.Med3d.VO.personalVO;

public interface HospitalDAO {

	public List<patientVO> getPatients(String id) throws Exception;
	public void insPatient(patientVO vo) throws Exception;
	
}
