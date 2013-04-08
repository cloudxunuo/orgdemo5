package org.gaara.action;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.validator.Var;
import org.gaara.bean.Detail;
import org.gaara.hibernate.HibernateSessionFactory;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.json.*;

public class GridHandlerAction{
	
	private String param;
	private String result;
	
	public String execute() throws Exception {
		System.out.println("GridHandlerAction in------------------!");
		System.out.println(param);
		
		JSONObject jsonObject = null;
		try{
			jsonObject = new JSONObject(param);
			String opParam = jsonObject.getString("opParam");
			System.out.println("opParam==" + opParam);
			if(opParam.equals("view")){
				this.result = loadTableData(jsonObject).toString();
			}
			else if(opParam.equals("delete")){
				this.result = deleteData(jsonObject).toString();
			}
			else if(opParam.equals("insert")){
				this.result = insertData(jsonObject).toString();
			}
			else if (opParam.equals("detail")){
				this.result = getDetail(jsonObject).toString();
			}
			else if(opParam.equals("update")){
				this.result = updateData(jsonObject).toString();
			}
			else if(opParam.equals("saveTable")){
				this.result = saveTableData(jsonObject).toString();
			}
			else if (opParam.equals("getInsertModel")){
				this.result = getModel(jsonObject,"insert").toString();
			}
			else if (opParam.equals("getDetailModel")){
				this.result = getModel(jsonObject,"detail").toString();
			}
		}catch(Exception pe){
			pe.printStackTrace();
		}
		return "success";
	}
	
	private String saveTableData(JSONObject jsonObject) throws JSONException{
		System.out.println("saveTableData in------------------!");
		String retString = "success";
		Session session = HibernateSessionFactory.getSession();
		Transaction trans = session.beginTransaction();
		
		String dataTable = jsonObject.getString("dataTable");
		
		JSONArray queryParams = jsonObject.getJSONArray("queryParams");
		JSONArray changeParams = jsonObject.getJSONArray("changeParams");
		
		for (int j = 0; j < queryParams.length(); j++){
			String sql = "update " + dataTable + " set ";
			
			JSONArray rowQueryParams = ((JSONObject)queryParams.get(j)).getJSONArray("data");
			JSONArray rowChangeParams = ((JSONObject)changeParams.get(j)).getJSONArray("data");
			for (int i = 0; i < rowChangeParams.length(); i ++)
			{
				String name = rowChangeParams.getJSONObject(i).getString("name");
				String value = rowChangeParams.getJSONObject(i).getString("value");
				if (value.equals("nullval")){
					value = "";//将null转化成无值
				}
				if (i == rowChangeParams.length() - 1){
					sql = sql + name + "='" + value + "' ";
				}else{
					sql = sql + name + "='" + value + "', ";
					
				}
			}
			sql += "where 1=1 ";
			for (int i = 0; i < rowQueryParams.length(); i ++)
			{
				String name = rowQueryParams.getJSONObject(i).getString("name");
				String value = rowQueryParams.getJSONObject(i).getString("value");
				sql = sql + "and " + name + "='" + value + "' ";
			}
			
			System.out.println(sql);
			
			if (session.createSQLQuery(sql).executeUpdate() == 0){
				retString = "failed";
				break;
			}
		}
		
		trans.commit();
		HibernateSessionFactory.closeSession();
		return retString;
	}
	
	private String deleteData(JSONObject jsonObject) throws JSONException{
		System.out.println("Delete in------------------!");
		String retString = "success";
		Session session = HibernateSessionFactory.getSession();
		Transaction trans = session.beginTransaction();
		
		String dataTable = jsonObject.getString("dataTable");
		
		JSONArray queryParams = jsonObject.getJSONArray("queryParams");
		
		String sql = "delete from " + dataTable + " where 1=1 ";
		
		for (int i = 0; i < queryParams.length(); i ++)
		{
			String name = queryParams.getJSONObject(i).getString("name");
			String value = queryParams.getJSONObject(i).getString("value");
			sql = sql + "and " + name + "='" + value + "' ";
		}
		
		System.out.println(sql);
		
		if (session.createSQLQuery(sql).executeUpdate() == 0){
			retString = "failed";
		}
		
		trans.commit();
		HibernateSessionFactory.closeSession();
		
		return retString;
	}
	
	private String insertData(JSONObject jsonObject) throws JSONException{
		System.out.println("insert in------------------!");
		String retString = "success";
		Session session = HibernateSessionFactory.getSession();
		Transaction trans = session.beginTransaction();
		String dataTable = jsonObject.getString("dataTable");
		
		JSONArray queryParams = jsonObject.getJSONArray("dataParams");
		
		String sql = "insert into " + dataTable + "(";
		
		for (int i = 0; i < queryParams.length(); i ++)
		{
			String name = queryParams.getJSONObject(i).getString("name");
			if (i == queryParams.length() - 1){
				sql += name;
			}else{
				sql += name + ",";
			}
		}
		sql += ") values(";
		for (int i = 0; i < queryParams.length(); i ++)
		{
			String value = queryParams.getJSONObject(i).getString("value");
			if (i == queryParams.length() - 1){
				sql += "'" + value + "')";
			}else{
				sql += "'" + value + "',";
			}
		}
		
		System.out.println(sql);
		
		if (session.createSQLQuery(sql).executeUpdate() == 0){
			retString = "failed";
		}
		trans.commit();
		HibernateSessionFactory.closeSession();
		return retString;
	}
	
	private String updateData(JSONObject jsonObject) throws JSONException{
		System.out.println("Update in----------------!");
		String retString = "success";
		Session session = HibernateSessionFactory.getSession();
		Transaction trans = session.beginTransaction();
		String dataTable = jsonObject.getString("dataTable");
		
		JSONArray queryParams = jsonObject.getJSONArray("queryParams");
		JSONArray changeParams = jsonObject.getJSONArray("changeParams");
		
		String sql = "update " + dataTable + " set ";
		
		for (int i = 0; i < changeParams.length(); i ++)
		{
			String name = changeParams.getJSONObject(i).getString("name");
			String value = changeParams.getJSONObject(i).getString("value");
			if (i == changeParams.length() - 1){
				sql = sql + name + "='" + value + "' ";
			}else{
				sql = sql + name + "='" + value + "', ";
				
			}
		}
		sql += "where 1=1 ";
		for (int i = 0; i < queryParams.length(); i ++)
		{
			String name = queryParams.getJSONObject(i).getString("name");
			String value = queryParams.getJSONObject(i).getString("value");
			sql = sql + "and " + name + "='" + value + "' ";
		}
		
		System.out.println(sql);
		
		if (session.createSQLQuery(sql).executeUpdate() == 0){
			retString = "failed";
		}
		trans.commit();
		HibernateSessionFactory.closeSession();
		return retString;
	}
	
	private JSONObject loadTableData(JSONObject jsonObject)
	throws JSONException, SQLException{
		System.out.println("View in------------------!");
		
		String dataTable = jsonObject.getString("dataTable");
		Session session = HibernateSessionFactory.getSession();
		
		JSONArray queryParams = jsonObject.getJSONArray("queryParams");
		
		JSONArray queryCols = jsonObject.getJSONArray("queryCols");
		
		JSONObject sortParams = jsonObject.getJSONObject("sortParams");
		String sortCol = sortParams.getString("sortCol");
		String order = sortParams.getString("order");
		
		JSONObject pageParams = jsonObject.getJSONObject("pageParams");				
		int currentPage = pageParams.getInt("currentPage");
		int pageSize = pageParams.getInt("pageSize");
		int totalPage = pageParams.getInt("totalPage");//必须在计算startPos之前重新查询totalPage，因为currentPage可能因为delete操作比totalPage大
		String pageSql = "select count(*) ";
		String sql = "select ";
		pageSql = pageSql + "from " +dataTable + " where 1=1 ";
		for(int i = 0; i < queryCols.length(); i++){
			if(i == (queryCols.length() - 1))
				sql = sql + queryCols.getJSONObject(i).getString("name") + " ";
			else
				sql = sql + queryCols.getJSONObject(i).getString("name") + ",";
		}
		
		sql = sql + "from " + dataTable + " where 1=1 ";
		
		
		for(int i = 0; i < queryParams.length(); i++){
			String name = queryParams.getJSONObject(i).getString("name");
			String value = queryParams.getJSONObject(i).getString("value");
			sql = sql + "and " + name + "='" + value + "' ";
			pageSql = pageSql + "and " + name + "='" + value + "' ";
		}
		
		ResultSet temp = session.connection().prepareStatement(pageSql).executeQuery();
		temp.next();
		int recordsNum = temp.getInt(1);
		
		if (recordsNum % pageSize == 0){
			totalPage = recordsNum / pageSize;
		}else{
			totalPage = recordsNum / pageSize + 1;
		}
		if(totalPage == 0){
			totalPage = 1;
		}
		if (currentPage > totalPage){
			//如果是删除操作请求的数据，那么传过来的currentPage可能比totalPage大1
			currentPage = totalPage;
		}
		
		int startPos = (currentPage - 1) * pageSize;
		
		sql = sql + "order by " + sortCol + " " + order + " limit " + startPos + "," + pageSize;
		System.out.println(sql);
		System.out.println(pageSql);
		
		
		ResultSet resultSet = session.connection().prepareStatement(sql).executeQuery();
		

		JSONArray records = new JSONArray();
		int i = 0;
		
		while(resultSet.next()){					
			Map map = new HashMap();
			for(int j = 0; j < queryCols.length(); j++){
				String colName = queryCols.getJSONObject(j).getString("name");
				map.put(colName, resultSet.getString(colName));
			}
			JSONObject record = new JSONObject(map);
			records.put(i, record);
			i++;
		}
		
		resultSet.close();
		
		String tmpPageParams = "{currentPage:" + currentPage + ",totalPage:" + totalPage + "}";
		JSONObject returnPageParams = new JSONObject(tmpPageParams);
		
		JSONObject returnParams = new JSONObject();
		returnParams.put("dataSet", records);
		returnParams.put("pageParam", returnPageParams);
		System.out.println(returnParams);
		
		HibernateSessionFactory.closeSession();
		
		return returnParams;
	}
	
	private JSONObject getDetail(JSONObject jsonObject) 
			throws JSONException, SQLException{
		System.out.println("getDetail in------------------!");
		
		String dataTable = jsonObject.getString("dataTable");
		Session session = HibernateSessionFactory.getSession();
		
		JSONArray queryParams = jsonObject.getJSONArray("queryParams");
		JSONArray queryCols = jsonObject.getJSONArray("queryCols");
		
		String sql = "select ";
		for(int i = 0; i < queryCols.length(); i++){
			if(i == (queryCols.length() - 1))
				sql = sql + queryCols.getJSONObject(i).getString("name") + " ";
			else
				sql = sql + queryCols.getJSONObject(i).getString("name") + ",";
		}
		
		sql = sql + "from " + dataTable + " where 1=1 ";
		
		for(int i = 0; i < queryParams.length(); i++){
			String name = queryParams.getJSONObject(i).getString("name");
			String value = queryParams.getJSONObject(i).getString("value");
			sql = sql + "and " + name + "='" + value + "' ";
		}
		
		System.out.println(sql);
		ResultSet resultSet = session.connection().prepareStatement(sql).executeQuery();
		
		JSONArray records = new JSONArray();
		
		resultSet.next();//只有一条记录	
		for(int i = 0; i < queryCols.length(); i++){
			Map map = new HashMap();
			map.put("name", queryCols.getJSONObject(i).getString("name"));
			map.put("value", resultSet.getString(i+1));
			JSONObject record = new JSONObject(map);
			records.put(i, record);
		}
		resultSet.close();
		
		HibernateSessionFactory.closeSession();
		
		JSONObject result = new JSONObject();
		result.put("detail", records);
		System.out.println(result);
		return result;
	}
	
	private JSONObject getModel(JSONObject jsonObject, String mode)
			throws JSONException, SQLException{
		System.out.println("getModel in------------------!");
		
		String dataTable = jsonObject.getString("dataTable");
		
		Session session = HibernateSessionFactory.getSession();
		
		String sql = "SELECT column_name AS `colName`,data_type   AS `dataType`,character_maximum_length  AS `charLength`,"
				      + "numeric_precision AS `numLength`,is_nullable AS `nullable`,column_default  AS  `defaults`,"
				      + "column_comment  AS  `comment`,column_key AS `key` FROM Information_schema.columns WHERE table_Name='";
		sql = sql + dataTable + "';";
		
		ResultSet resultSet = session.connection().prepareStatement(sql).executeQuery();
		JSONArray records = new JSONArray();
		int i = 0;
		while(resultSet.next()){					
			Map map = new HashMap();
			map.put("type", "text");
			map.put("display", resultSet.getString("comment"));
			map.put("name", resultSet.getString("colName"));
			if (mode.equals("insert")){
				if (resultSet.getString("nullable").equals("NO")){
					map.put("nullable", "no");
				}
			}else if(mode.equals("detail")){
				if (resultSet.getString("key").equals("PRI")){
					map.put("key", "true");
				}
			}
			JSONObject record = new JSONObject(map);
			records.put(i, record);
			i++;
		}
		
		resultSet.close();
		HibernateSessionFactory.closeSession();
		
		JSONObject resultObject = new JSONObject();
		if (mode.equals("insert")){
			resultObject.put("insertModel", records);
		}else if (mode.equals("detail")){
			resultObject.put("detailModel", records);
		}
		System.out.println(resultObject);
		return resultObject;
	}
	
	public String getParam() {
		return param;
	}

	public void setParam(String param) {
		this.param = param;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}
}