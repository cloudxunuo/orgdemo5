package org.gaara.action;

import org.gaara.bean.User;
import org.gaara.hibernate.HibernateSessionFactory;
import org.hibernate.Query;
import org.hibernate.Session;

public class LoginAction {
	private User user;
	
	public User getUser(){
		return user;
	}
	public void setUser(User user){
		this.user = user;
	}

	public String execute() throws Exception {

		Session session = HibernateSessionFactory.getSession();
		session.beginTransaction();
		String hql = "from User user";
		if (user != null) {
			if (user.getUsername() != null && user.getPassword() != null) {
				hql += " where user.username='" + user.getUsername() + "'";
				hql += " and user.password='" + user.getPassword() + "'";
			}
		}

		Query query = session.createQuery(hql);

		if (query.list().size() > 0) {
			System.out.println("this is ok");
			return "success";
		} else {
			System.out.println("this is not success");
			return "failure";
		}
	}
}
