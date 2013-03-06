package org.gaara.bean;

import java.util.Date;

/**
 * Detail entity. @author MyEclipse Persistence Tools
 */

public class Detail implements java.io.Serializable {

	// Fields

	private DetailId id;
	private String status;
	private String auditor;
	private String realAuditor;
	private String verifyDesc;
	private Date verifyDate;
	private String verifyDepart;
	private String verifyLevel;
	private String field1;
	private String field2;

	// Constructors

	/** default constructor */
	public Detail() {
	}

	/** minimal constructor */
	public Detail(DetailId id) {
		this.id = id;
	}

	/** full constructor */
	public Detail(DetailId id, String status, String auditor,
			String realAuditor, String verifyDesc, Date verifyDate,
			String verifyDepart, String verifyLevel, String field1,
			String field2) {
		this.id = id;
		this.status = status;
		this.auditor = auditor;
		this.realAuditor = realAuditor;
		this.verifyDesc = verifyDesc;
		this.verifyDate = verifyDate;
		this.verifyDepart = verifyDepart;
		this.verifyLevel = verifyLevel;
		this.field1 = field1;
		this.field2 = field2;
	}

	// Property accessors

	public DetailId getId() {
		return this.id;
	}

	public void setId(DetailId id) {
		this.id = id;
	}

	public String getStatus() {
		return this.status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getAuditor() {
		return this.auditor;
	}

	public void setAuditor(String auditor) {
		this.auditor = auditor;
	}

	public String getRealAuditor() {
		return this.realAuditor;
	}

	public void setRealAuditor(String realAuditor) {
		this.realAuditor = realAuditor;
	}

	public String getVerifyDesc() {
		return this.verifyDesc;
	}

	public void setVerifyDesc(String verifyDesc) {
		this.verifyDesc = verifyDesc;
	}

	public Date getVerifyDate() {
		return this.verifyDate;
	}

	public void setVerifyDate(Date verifyDate) {
		this.verifyDate = verifyDate;
	}

	public String getVerifyDepart() {
		return this.verifyDepart;
	}

	public void setVerifyDepart(String verifyDepart) {
		this.verifyDepart = verifyDepart;
	}

	public String getVerifyLevel() {
		return this.verifyLevel;
	}

	public void setVerifyLevel(String verifyLevel) {
		this.verifyLevel = verifyLevel;
	}

	public String getField1() {
		return this.field1;
	}

	public void setField1(String field1) {
		this.field1 = field1;
	}

	public String getField2() {
		return this.field2;
	}

	public void setField2(String field2) {
		this.field2 = field2;
	}

}