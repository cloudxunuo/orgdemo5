package org.manfred.dao;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.hibernate.cfg.Configuration;
import org.hibernate.mapping.Column;
import org.hibernate.mapping.PersistentClass;
import org.hibernate.mapping.Property;
import org.hibernate.mapping.Table;

public class HibernateConfigurationHelper
{
	private static Configuration hibernateConf = new Configuration();

	private static PersistentClass getPersistentClass(Class clazz){
		synchronized (HibernateConfigurationHelper.class){
			PersistentClass pc = hibernateConf.getClassMapping(clazz.getName());
			if (pc == null){
				hibernateConf = hibernateConf.addClass(clazz);
				pc = hibernateConf.getClassMapping(clazz.getName());
			}
			return pc;
		}
	}
	//获取表名
	public static String getTableName(Class clazz)
	{
	return getPersistentClass(clazz).getTable().getName();
	}

	//获取列名
	public static String getColumnName(Class clazz,int icol)
	{
		return getPersistentClass(clazz).getTable().getColumn(icol).getName();
	}
	
	public static List getAllColName(Class clazz){
		List records = new ArrayList();
		Iterator <Column>itr = getPersistentClass(clazz).getTable().getColumnIterator();
		while(itr.hasNext())
		{
			Column tmp = itr.next();
			records.add(tmp.getName());
		}
		return records;
	}
}