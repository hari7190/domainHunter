package com.codekuttu.available;

import org.json.JSONObject;


public class CheckAvailability {

	private String ping_Info;
	private String domain;
	private boolean domain_not_available;
	private JSONObject retVal;
	
	public CheckAvailability init(String domain, JSONObject retVal){
		this.domain	=	domain;
		this.retVal =	retVal;
		getData();
		isAvailable();
		return this;
	}
	
	private void getData()
	{
		this.ping_Info =  Whois.ping(new String[] {this.domain});	
	}
	
	private void isAvailable()
	{
		this.domain_not_available = this.ping_Info.contains("Registrant Name");
	}
	
	public String genAvailability(){		
		retVal.put("query", this.ping_Info);
		retVal.put("not_available", this.domain_not_available);
		return retVal.toString();
	}
}
