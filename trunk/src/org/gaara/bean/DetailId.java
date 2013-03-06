package org.gaara.bean;

/**
 * DetailId entity. @author MyEclipse Persistence Tools
 */

public class DetailId implements java.io.Serializable {

	// Fields

	private String mainId;
	private String id;

	// Constructors

	/** default constructor */
	public DetailId() {
	}

	/** full constructor */
	public DetailId(String mainId, String id) {
		this.mainId = mainId;
		this.id = id;
	}

	// Property accessors

	public String getMainId() {
		return this.mainId;
	}

	public void setMainId(String mainId) {
		this.mainId = mainId;
	}

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public boolean equals(Object other) {
		if ((this == other))
			return true;
		if ((other == null))
			return false;
		if (!(other instanceof DetailId))
			return false;
		DetailId castOther = (DetailId) other;

		return ((this.getMainId() == castOther.getMainId()) || (this
				.getMainId() != null && castOther.getMainId() != null && this
				.getMainId().equals(castOther.getMainId())))
				&& ((this.getId() == castOther.getId()) || (this.getId() != null
						&& castOther.getId() != null && this.getId().equals(
						castOther.getId())));
	}

	public int hashCode() {
		int result = 17;

		result = 37 * result
				+ (getMainId() == null ? 0 : this.getMainId().hashCode());
		result = 37 * result + (getId() == null ? 0 : this.getId().hashCode());
		return result;
	}

}