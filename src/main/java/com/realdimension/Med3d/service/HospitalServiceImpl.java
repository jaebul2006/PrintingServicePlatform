package com.realdimension.Med3d.service;
import javax.inject.Inject;
import org.springframework.stereotype.Service;

import com.realdimension.Med3d.VO.accountVO;
import com.realdimension.Med3d.VO.hospitalVO;
import com.realdimension.Med3d.dao.AccountDAO;
import com.realdimension.Med3d.dao.HospitalDAO;
import com.realdimension.Med3d.VO.patientVO;
import com.realdimension.Med3d.VO.personalVO;

import java.util.HashMap;
import java.util.List;

@Service
public class HospitalServiceImpl implements HospitalService{

	@Inject
	HospitalDAO dao;
	
	@Override
	public List<patientVO> getPatients(String id) throws Exception
	{
		return dao.getPatients(id);
	}
	
	@Override
	public void insPatient(patientVO vo) throws Exception
	{
		dao.insPatient(vo);
	}
	
}
