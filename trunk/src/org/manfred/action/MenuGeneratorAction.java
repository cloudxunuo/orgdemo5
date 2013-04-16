package org.manfred.action;

import org.manfred.bean.SamMenu;
import com.opensymphony.xwork2.ActionSupport;

public class MenuGeneratorAction extends ActionSupport {
	public String execute() throws Exception{
		System.out.println("MenuGenerator In-----------------!");
		
		return "success";
	}
	
}
