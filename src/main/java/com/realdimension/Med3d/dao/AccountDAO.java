package com.realdimension.Med3d.dao;

import java.util.List;

import com.realdimension.Med3d.VO.accountVO;

public interface AccountDAO {

	public int AccountCnt(String aminid) throws Exception;
	public void RegistAccount(accountVO vo) throws Exception;
	public int LoginCheck(accountVO vo) throws Exception;
	public List<accountVO> Producers() throws Exception;
	public String AccountType(String id) throws Exception;
	
}
