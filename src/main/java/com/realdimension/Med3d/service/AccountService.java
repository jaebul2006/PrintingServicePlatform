package com.realdimension.Med3d.service;

import java.util.HashMap;
import java.util.List;
import com.realdimension.Med3d.VO.accountVO;

public interface AccountService {

	public int AccountCnt(String id) throws Exception;
	public void RegistAccount(accountVO vo) throws Exception;
	public int LoginCheck(accountVO vo) throws Exception;
	public List<accountVO> Producers() throws Exception;
	public String AccountType(String id) throws Exception;
	
}
