package org.manfred.action;

import org.json.JSONObject;
import org.manfred.bean.SamMenu;
import com.opensymphony.xwork2.ActionSupport;
import org.manfred.dao.BasicCURD;
import org.manfred.dao.HibernateConfigurationHelper;
import org.manfred.dao.MenuDaoImp;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

public class MenuGeneratorAction extends ActionSupport {
	public String execute(){
		System.out.println("MenuGenerator In-----------------!");
		basicDao = new MenuDaoImp();
		try{
			String tempSQL = "select";
			for(int i = 0; i < basicDao.getFields().size(); i++){
				if(i == 0)
					tempSQL = tempSQL + " " + basicDao.getFields().get(i);
				else
					tempSQL = tempSQL + "," + basicDao.getFields().get(i);
			}
			tempSQL = tempSQL + " from sam_menu where 1=1 order by menu_index";
			System.out.println(tempSQL);
			basicDao.executeQuery(tempSQL);
		
			Map rs1 = new HashMap();
			rs1.put("menuLevel",getMaxMenuLevel());

			Map rs2 = new HashMap();
			rs2.put("records",getMenuItem());

			JSONObject jobj1 = new JSONObject(rs1);
			JSONObject jobj2 = new JSONObject(rs2);
			
			menuLevel = jobj1.toString();
			records = jobj2.toString();
			System.out.println(records);
			
			return "success";
		}catch(Exception e){
			e.printStackTrace();
			return "false";
		}
	}
	
	public int getMaxMenuLevel(){
		String tempSql = "select max(t.menuLevel) from SamMenu t where 1=1";
		try{
			return basicDao.queryNum(tempSql);
		}catch(Exception e){
			e.printStackTrace();
			return 0;
		}
	}
	
	public List getMenuItem(){
		try{
			List records = basicDao.getRecords();
			List result = new ArrayList();
			
			for(int i = 0; i < records.size(); i++){
				Map map = new HashMap();
		    	Object[] objs = (Object[])records.get(i);
		    	
		    	for(int j = 0; j < basicDao.getFields().size(); j++){
			    	map.put(basicDao.getFields().get(j),objs[j]);
		    	}
		    	JSONObject jsonRecord = new JSONObject(map);
		    	//System.out.println(jsonRecord);
		    	result.add(jsonRecord);
			}
			return result;
		}catch(Exception e){
			e.printStackTrace();
			return null;
		}
	}
	private String nullTool(Object temp){
		if(temp == null)
			return "";
		else
			return (String)temp;
	}
	
	public String getRecords(){
		return records;
	}
	
	public String getMenuLevel(){
		return menuLevel;
	}
	
	private BasicCURD basicDao;
	private String records;
	private String menuLevel;
}
