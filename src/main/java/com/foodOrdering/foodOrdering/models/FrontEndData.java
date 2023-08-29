package com.foodOrdering.foodOrdering.models;

public class FrontEndData {
    private String firstName;
    private String lastName;
    private String address;
    private String emailAddress;
    private String phoneNumber;
    private String orderDesc;
    private double price;
    private String currentStatus;
    private String pickupDeliveryFlag;
    
    public FrontEndData() {

    }

	public String getOrderDesc() {
		return orderDesc;
	}
	public void setOrderDesc(String orderDesc) {
		this.orderDesc = orderDesc;
	}  
    public double getPrice() {
        return price;
    }
    public void setPrice(double price) {
        this.price = price;
    }
    public String getStatus() {
        return currentStatus;
    }
    public void setStatus(String status) {
        this.currentStatus = status;
    }

    public String getPickupDeliveryFlag() {
        return pickupDeliveryFlag;
    }
    public void setPickupDeliveryFlag(String flag) {
        this.pickupDeliveryFlag = flag;
    }
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getEmailAddress() {
		return emailAddress;
	}
	public void setEmailAddress(String emailAddress) {
		this.emailAddress = emailAddress;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
}
