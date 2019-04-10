package com.realdimension.Med3d.VO;

public class OrderVO {

	private String id;
	private String order_date;
	private String requester_id;
	private String comment;
	private String service_type;
	private String business_trip;
	private String body_type;
	private String result_type;
	
	private int work_time;
	private String start_time;
	private String work_state;
	
	public String getId() {
		return id;
	}
	
	public void setId(String id) {
		this.id = id;
	}
	
	public String getOrder_date() {
		return order_date;
	}
	
	public void setOrder_date(String order_date) {
		this.order_date = order_date;
	}
	
	public String getRequester_id() {
		return requester_id;
	}
	
	public void setRequester_id(String requester_id) {
		this.requester_id = requester_id;
	}
	
	public String getComment() {
		return comment;
	}
	
	public void setComment(String comment) {
		this.comment = comment;
	}
	
	public String getService_type() {
		return service_type;
	}
	
	public void setService_type(String service_type) {
		this.service_type = service_type;
	}
	
	public String getBusiness_trip() {
		return business_trip;
	}
	
	public void setBusiness_trip(String business_trip) {
		this.business_trip = business_trip;
	}
	
	public String getBody_type() {
		return body_type;
	}
	
	public void setBody_type(String body_type) {
		this.body_type = body_type;
	}
	
	public String getResult_type() {
		return result_type;
	}
	
	public void setResult_type(String result_type){
		this.result_type = result_type;
	}
	
	public int getWork_time() {
		return work_time;
	}
	
	public void setWork_time(int work_time) {
		this.work_time = work_time;
	}
	
	public String getStart_time() {
		return start_time;
	}
	
	public void setStart_time(String start_time) {
		this.start_time = start_time;
	}
	
	public String getWork_state() {
		return work_state;
	}
	
	public void setWork_state(String work_state) {
		this.work_state = work_state;
	}
	
}
