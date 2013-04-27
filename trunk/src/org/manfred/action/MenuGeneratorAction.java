package org.manfred.action;

import org.hibernate.exception.SQLGrammarException;
import org.json.JSONArray;
import org.json.JSONException;
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
			mapItems = new JSONArray(mapModel);
			if(opParam.equals("initial")){
				Map rs1 = new HashMap();
				rs1.put("menuLevel",getMaxMenuLevel());
				JSONObject jobj1 = new JSONObject(rs1);
				menuLevel = jobj1.toString();				
				queryMenuItems(startLevel);
			}
			if(opParam.equals("load")){
				
			}
			
			if(basicDao.getQuery() != null){
				Map rs2 = new HashMap();
				rs2.put("records",createMenuItems());

				JSONObject jobj2 = new JSONObject(rs2);			
				records = jobj2.toString();
				System.out.println(records);
				return SUCCESS;
			}else{
				return "FALSE";
			}

		}catch(Exception e){
			e.printStackTrace();
			return "FALSE";
		}
	}
	
	//根据父节点获得数据项
	public void queryMenuItems(String menuFather) throws JSONException, SQLGrammarException{
		sql = "select ";
		String where = " where ";
		String order = " order by ";

		for(int i = 0; i < mapItems.length(); i++){			
			String tableField = ((JSONObject)mapItems.get(i)).getString("tableField");
			String defineAs = ((JSONObject)mapItems.get(i)).getString("definedAs");
			if(defineAs.equals("MENU_INDEX"))
				order += tableField;
			if(defineAs.equals("MENU_CODE"))
				where = where + tableField + "='" + menuFather + "'";
			if(i == (mapItems.length() - 1))
				sql = sql + tableField + " from " + tableName;
			else
				sql = sql + tableField + ",";
		}
		sql = sql + where + order;

		System.out.println(sql);
		basicDao.executeQuery(sql);
	}
	//根据层数获得数据项
	public void queryMenuItems(int menuLevel) throws JSONException, SQLGrammarException{
		String sql = "select ";
		String where = " where ";
		String order = " order by ";

		for(int i = 0; i < mapItems.length(); i++){			
			String tableField = ((JSONObject)mapItems.get(i)).getString("tableField");
			String defineAs = ((JSONObject)mapItems.get(i)).getString("definedAs");
			if(defineAs.equals("MENU_INDEX"))
				order += tableField;
			if(defineAs.equals("MENU_LEVEL"))
				where = where + tableField + "=" + menuLevel;
			if(i == (mapItems.length() - 1))
				sql = sql + tableField + " from " + tableName;
			else
				sql = sql + tableField + ",";
		}
		sql = sql + where + order;

		System.out.println(sql);
		basicDao.executeQuery(sql);
	}
       
    public int getMaxMenuLevel(){
    	String tempSql = "select max(t.menu_level) from sam_menu t where 1=1";
        try{
        	return basicDao.queryNum(tempSql);
        }catch(Exception e){
            e.printStackTrace();
            return 0;
        }
    }
	//组织返回数据格式
	public List createMenuItems() throws JSONException{
		List items = basicDao.getRecords();
		List result = new ArrayList();

		for(int i = 0; i < items.size(); i++){
			Map map = new HashMap();
			Object[] objs = (Object[])items.get(i);
			
			for(int j = 0; j < mapItems.length(); j++){
				map.put(((JSONObject)mapItems.get(j)).getString("definedAs"),objs[j]);
			}
			JSONObject jsonRecord = new JSONObject(map);
			result.add(jsonRecord);
		}
		System.out.println(result);
		return result;
	}
	private String nullTool(Object temp){
		if(temp == null)
			return "";
		else
			return (String)temp;
	}

	//Getters and setters
	public String getRecords(){
		return records;
	}

	public void setRecords(String records){
		this.records = records;
	}
	
	public String getMenuLevel(){
		return menuLevel;
	}

	public void setMenuLevel(String menuLevel) {
		this.menuLevel = menuLevel;
	}

	public String getMapModel() {
		return mapModel;
	}

	public void setMapModel(String mapModel) {
		this.mapModel = mapModel;
	}

	public int getStartLevel() {
		return startLevel;
	}

	public void setStartLevel(int startLevel) {
		this.startLevel = startLevel;
	}

	public String getFatherCode() {
		return fatherCode;
	}

	public void setFatherCode(String fatherCode) {
		this.fatherCode = fatherCode;
	}

	public String getOpParam() {
		return opParam;
	}

	public void setOpParam(String opParam) {
		this.opParam = opParam;
	}
	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}

	private String mapModel;
	private int startLevel;
	private String fatherCode;
	private String opParam;
	private String sql;
	private BasicCURD basicDao;
	private String records;
	private String menuLevel;
	private JSONArray mapItems;
	private String tableName;
}