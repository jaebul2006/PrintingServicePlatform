package com.realdimension.Med3d.dao;

import java.util.List;
import java.util.HashMap;
import com.realdimension.Med3d.VO.accountVO;
import com.realdimension.Med3d.VO.hospitalVO;
import com.realdimension.Med3d.VO.patientVO;
import com.realdimension.Med3d.VO.personalVO;

public interface AccountDAO {

	public int AccountCnt(String aminid) throws Exception;
	public void RegistAccount(accountVO vo) throws Exception;
	public int LoginCheck(accountVO vo) throws Exception;
	public List<accountVO> Producers() throws Exception;
	public String AccountType(String id) throws Exception;
	public void RegistPatient(patientVO vo) throws Exception;
	
	public void InsHospital(hospitalVO vo) throws Exception;
	public void InsPersonal(personalVO vo) throws Exception;
	public hospitalVO getHospital(String id) throws Exception;
	
}
