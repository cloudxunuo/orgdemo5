package org.manfred.dao;

import org.gaara.hibernate.HibernateSessionFactory;

import java.io.Serializable;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.manfred.bean.SamMenu;

public class MenuDaoImp extends BasicCURD{
	public MenuDaoImp(){
		super();
		//fields = HibernateConfigurationHelper.getAllColName(SamMenu.class);
		//System.out.println(fields);
	}
}
