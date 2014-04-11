package com.codekuttu.apihandler;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import com.codekuttu.available.CheckAvailability;
import com.codekuttu.enums.APIMethodEnum;

/**
 * Servlet implementation class apihandler
 */
@WebServlet(description = "handling api", urlPatterns = { "/catchme" })
public class apihandler extends HttpServlet {

	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		String method = request.getParameter("method");
		String domain = request.getParameter("domain");
		String serviceResponse = "";
		
		JSONObject retdat = new JSONObject();
		retdat.put("serviced", "true");

		switch (APIMethodEnum.valueOf(method)){
		
			//domain availability alone
			case Availability: 
				CheckAvailability service = new CheckAvailability();
				serviceResponse = service.init(domain, retdat).genAvailability();
				break;
			
			
				
			default: 
				retdat.put("message", "Api you expected is not available now. Please contact administrator.");
				break;	
		}
		
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();
		out.print(serviceResponse);
		out.flush();
	}

}
