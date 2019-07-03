package com.realdimension.Med3d.service;

import java.util.List;
import com.realdimension.Med3d.VO.accountVO;
import com.realdimension.Med3d.VO.hospitalVO;
import com.realdimension.Med3d.VO.patientVO;
import com.realdimension.Med3d.VO.personalVO;

public interface HospitalService {

	public List<patientVO> getPatients(String id) throws Exception;
	public void insPatient(patientVO vo) throws Exception;
	
}
