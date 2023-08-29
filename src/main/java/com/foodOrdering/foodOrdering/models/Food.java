package com.foodOrdering.foodOrdering.models;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Food {
	private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int foodId;
    private String name;
    private double price;
    
    public Food() {}
    
	public Food(String name, double price) {
		super();
		this.name = name;
		this.price = price;
	}
	
	public int getFoodId() {
		return foodId;
	}
	
	public void setFoodId(int id) {
		this.foodId = id;
	}
	
	public double getPrice() {
		return price;
	}
	
	public void setPrice(double price) {
		this.price = price;
	}
	
	public String getName() {
		return this.name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
}
