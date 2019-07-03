package com.realdimension.Med3d.service;

import java.util.List;
import com.realdimension.Med3d.VO.accountVO;
import com.realdimension.Med3d.VO.hospitalVO;
import com.realdimension.Med3d.VO.patientVO;
import com.realdimension.Med3d.VO.personalVO;

public interface AccountService {

	public int AccountCnt(String id) throws Exception;
	public void RegistAccount(accountVO vo) throws Exception;
	public int LoginCheck(accountVO vo) throws Exception;
	public List<accountVO> Producers() throws Exception;
	public String AccountType(String id) throws Exception;
	public void RegistPatient(patientVO vo) throws Exception;

	public void InsHospital(hospitalVO vo) throws Exception;
	public void InsPersonal(personalVO vo) throws Exception;
	public hospitalVO getHospital(String id) throws Exception;
	
}
