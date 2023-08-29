package com.foodOrdering.foodOrdering.models;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class OrderItems implements Serializable {
	
    private static final long serialVersionUID = 1L;
    @Id
    private int orderItemsId;
    private int orderId;
    private String orderDesc;
    
    public OrderItems() {
	}
    
	public OrderItems(String orderDesc, int orderId, int orderItemsId) {
		this.orderId = orderId;
		this.orderDesc = orderDesc;
		this.orderItemsId = orderItemsId;
	}
	public int getOrderItemId() {
		return orderItemsId;
	}
	public void setOrderItemId(int orderItemsId) {
		this.orderItemsId = orderItemsId;
	}
	public int getOrderId() {
		return orderId;
	}
	public void setOrderId(int orderId) {
		this.orderId = orderId;
	}
	public String getOrderDesc() {
		return orderDesc;
	}
	public void setOrderDesc(String orderDesc) {
		this.orderDesc = orderDesc;
	}  
}
