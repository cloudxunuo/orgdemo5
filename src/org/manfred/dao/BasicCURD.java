package org.manfred.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

public abstract class BasicCURD {
	public BasicCURD(){
		System.out.println("Super Class Constructed Successfully---------!");
	}
	
	public void initSession(){
		//获取hibernate的配置信息 
		cfg = new Configuration().configure();		
		//根据config建立sessionFactory
		sf = cfg.buildSessionFactory();
		//factory用于建立session，开启Session，相当于开启JDBC的Connection
		ses = sf.openSession();
		//record = new SfcMaterialOrder();
		ts = ses.beginTransaction();
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
    
    public void executeQuery(String sql) throws HibernateException
    {
		initSession();
    	query = ses.createSQLQuery(sql);
		records = query.list(); //序列化 
    	doClose();
    }
    
    public int queryNum(String sql) throws Exception{
		initSession();
    	query = ses.createSQLQuery(sql);
		Integer num = (Integer)query.uniqueResult();
		doClose();
		return (int)num;
    }
    
    private void doClose(){
    	ts.commit();
	    ses.close();
		sf.close();
    }
    
    public List getRecords(){
    	return records;
    }
    
    public Query getQuery(){
    	return query;
    }
    
    public List getFields(){
    	return fields;
    }
    
    protected List records;
    protected List fields; 
	private Configuration cfg;
	private SessionFactory sf;
	private Session ses;
	private Transaction ts;
	private Query query;
}