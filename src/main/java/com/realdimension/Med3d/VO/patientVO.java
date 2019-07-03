package com.realdimension.Med3d.VO;

public class patientVO {

	private int no;
	private String account_id;
	private String id;
	private String name;
	private String birth;
	private String sex;
	private int age;
	
	public int getNo() {
		return no;
	}
	
	public void setNo(int no) {
		this.no = no;
	}

	public String getAccount_id(){
		return account_id;
	}
	
	public void setAccount_id(String account_id) {
		this.account_id = account_id;
	}
	
	public String getId(){
		return id;
	}
	
	public void setId(String id) {
		this.id = id;
	}
	
	public String getName(){
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String getBirth(){
		return birth;
	}
	
	public void setBirth(String birth) {
		this.birth = birth;
	}
	
	public String getSex(){
		return sex;
	}
	
	public void setSex(String sex) {
		this.sex = sex;
	}
	
	public int getAge(){
		return age;
	}
	
	public void setAge(int age) {
		this.age = age;
	}
	
}
