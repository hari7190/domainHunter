package com.codekuttu.enums;

public enum APIMethodEnum {
	Availability("A");	
 
	private APIMethodEnum(String method) {
		this.method = method;
	}
	
	private String method;
	
	public String getMethod() {
		return method;
	}
}
