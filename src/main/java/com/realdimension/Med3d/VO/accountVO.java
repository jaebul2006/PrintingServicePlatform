
package com.realdimension.Med3d.VO;

public class accountVO {

	private int no;
	private String id;
	private int enabled;
	private String auth;
	private String pass;
	private String account_name;
	private String group_type;
	
	public int getNo() {
		return no;
	}
	
	public void setNo(int no) {
		this.no = no;
	}

	public String getId(){
		return id;
	}
	
	public void setId(String id) {
		this.id = id;
	}
	
	public void setEnabled(int enabled) {
		this.enabled = enabled;
	}

	public int getEnabled(){
		return enabled;
	}
	
	public void setAuth(String auth) {
		this.auth = auth;
	}

	public String getAuth(){
		return auth;
	}
	
	public String getPass() {
		return pass;
	}
	
	public void setPass(String pass) {
		this.pass = pass;
	}
	
	public String getAccount_name() {
		return account_name;
	}
	
	public void setAccount_name(String account_name) {
		this.account_name = account_name;
	}
	
	public String getGroup_type() {
		return group_type;
	}
	
	public void setGroup_type(String group_type) {
		this.group_type = group_type;
	}
	
}


