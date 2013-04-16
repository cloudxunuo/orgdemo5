package org.manfred.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

public abstract class BasicCURD {
	public BasicCURD(){
		//获取hibernate的配置信息 
		cfg = new Configuration().configure();		
		//根据config建立sessionFactory
		sf = cfg.buildSessionFactory();
		//factory用于建立session，开启Session，相当于开启JDBC的Connection
		ses = sf.openSession();
		//record = new SfcMaterialOrder();
		ts = ses.beginTransaction();
		System.out.println("Super Class Constructed Successfully---------!");
	}
	//public abstract void addObj(Object obj)throws Exception;
	
	public void addObj(String sql)throws Exception{
		
	}
	
    //public abstract void updateObj(Object obj)throws Exception;
	
    public void updateObj(String sql)throws Exception{
    	
    }
    
    //public abstract void delObj(Object obj)throws Exception;
    
    public void delObj(String sql)throws Exception{
    	
    }
    
    //public abstract List getObj(Object obj)throws Exception;
    
    public List getObj(String sql) throws Exception
    {
		//根据表名称查询表字段名
		String tempSql = "SHOW FIELDS FROM " + table;
		System.out.println(tempSql);
		query = ses.createQuery(tempSql);
		fields = query.list();
    	
    	query = ses.createQuery(sql);
		List records = query.list(); //序列化
		
		return records;
    }
    
    private List fields; 
    private String table;
	private Configuration cfg;
	private SessionFactory sf;
	private Session ses;
	private Transaction ts;
	private Query query;
}