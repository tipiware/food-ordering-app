package com.foodOrdering.foodOrdering.models;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Orders implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int orderId;
    private int customerId;
    private int orderItemsId;
    private double price;
    private String currentStatus;
    private String pickupDeliveryFlag;
    

    public Orders() {
    }

    public Orders(int orderId, int customerId, int orderItemsId, double price, String currentStatus, String pickupDeliveryFlag) {
    	this.orderId = orderId;
        this.customerId = customerId;
        this.orderItemsId = orderItemsId;
        this.price = price;
        this.currentStatus = currentStatus;
        this.pickupDeliveryFlag = pickupDeliveryFlag;
    }

    public int getCustomerId() {
        return customerId;
    }
    public void setCustomerId(int id) {
        this.customerId = id;
    }
    public int getOrderId() {
        return orderId;
    }
    public void setOrderId(int id) {
        this.orderId = id;
    }
    public int getOrderItemsId() {
        return orderItemsId;
    }
    public void setOrderItemsId(int id) {
        this.orderItemsId = id;
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
}
