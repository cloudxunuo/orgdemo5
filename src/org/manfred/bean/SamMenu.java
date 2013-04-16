package org.manfred.bean;

/**
 * SamMenu entity. @author MyEclipse Persistence Tools
 */

public class SamMenu implements java.io.Serializable {

	// Fields

	private String menuCode;
	private String sysCode;
	private String menuName;
	private Integer menuLevel;
	private Integer menuIndex;
	private String menuFather;
	private String progUrl;
	private String progParam;
	private String leafFlag;
	private String taskFlag;
	private String countTaskSql;

	// Constructors

	/** default constructor */
	public SamMenu() {
	}

	/** minimal constructor */
	public SamMenu(String menuCode) {
		this.menuCode = menuCode;
	}

	/** full constructor */
	public SamMenu(String menuCode, String sysCode, String menuName,
			Integer menuLevel, Integer menuIndex, String menuFather,
			String progUrl, String progParam, String leafFlag, String taskFlag,
			String countTaskSql) {
		this.menuCode = menuCode;
		this.sysCode = sysCode;
		this.menuName = menuName;
		this.menuLevel = menuLevel;
		this.menuIndex = menuIndex;
		this.menuFather = menuFather;
		this.progUrl = progUrl;
		this.progParam = progParam;
		this.leafFlag = leafFlag;
		this.taskFlag = taskFlag;
		this.countTaskSql = countTaskSql;
	}

	// Property accessors

	public String getMenuCode() {
		return this.menuCode;
	}

	public void setMenuCode(String menuCode) {
		this.menuCode = menuCode;
	}

	public String getSysCode() {
		return this.sysCode;
	}

	public void setSysCode(String sysCode) {
		this.sysCode = sysCode;
	}

	public String getMenuName() {
		return this.menuName;
	}

	public void setMenuName(String menuName) {
		this.menuName = menuName;
	}

	public Integer getMenuLevel() {
		return this.menuLevel;
	}

	public void setMenuLevel(Integer menuLevel) {
		this.menuLevel = menuLevel;
	}

	public Integer getMenuIndex() {
		return this.menuIndex;
	}

	public void setMenuIndex(Integer menuIndex) {
		this.menuIndex = menuIndex;
	}

	public String getMenuFather() {
		return this.menuFather;
	}

	public void setMenuFather(String menuFather) {
		this.menuFather = menuFather;
	}

	public String getProgUrl() {
		return this.progUrl;
	}

	public void setProgUrl(String progUrl) {
		this.progUrl = progUrl;
	}

	public String getProgParam() {
		return this.progParam;
	}

	public void setProgParam(String progParam) {
		this.progParam = progParam;
	}

	public String getLeafFlag() {
		return this.leafFlag;
	}

	public void setLeafFlag(String leafFlag) {
		this.leafFlag = leafFlag;
	}

	public String getTaskFlag() {
		return this.taskFlag;
	}

	public void setTaskFlag(String taskFlag) {
		this.taskFlag = taskFlag;
	}

	public String getCountTaskSql() {
		return this.countTaskSql;
	}

	public void setCountTaskSql(String countTaskSql) {
		this.countTaskSql = countTaskSql;
	}

}