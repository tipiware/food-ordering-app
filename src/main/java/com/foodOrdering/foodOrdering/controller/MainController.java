package com.foodOrdering.foodOrdering.controller;

import com.foodOrdering.foodOrdering.models.Customer;
import com.foodOrdering.foodOrdering.models.Food;
import com.foodOrdering.foodOrdering.models.FrontEndData;
import com.foodOrdering.foodOrdering.models.OrderItems;
import com.foodOrdering.foodOrdering.models.Orders;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")

public class MainController {
	@Autowired
	private OrderRepository orderRepository;
	@Autowired
	private CustomerRepository cusRepository;
	@Autowired
	private ItemRepository itemRepository;
	@Autowired
	private FoodRepository foodRepository;
//
	@PostMapping("/getOrders")
    public List getAllOrders() {
    	List<Orders> orders = (List<Orders>) orderRepository.findAll();
    	return orders;
    }
	
	@PostMapping("/getCustomers")
	public List getCustomers() {
		return (List) cusRepository.findAll();
	}
	
	@PostMapping("/getOrderItems")
	public List getOrderItems() {
		return (List) itemRepository.findAll();
	}
	
	@GetMapping("/getFoods")
	public List getFoods() {
		return (List) foodRepository.findAll();
	}
	
    @PostMapping("/removeOrder")
	public void removeOrder(@RequestBody Orders order) {
    	itemRepository.delete(itemRepository.findOneByOrderItemsId(order.getOrderItemsId()));
		orderRepository.delete(order);
	}
    
    @PostMapping("/finishOrder")
	public void finishOrder(@RequestBody Orders order) {
		order.setStatus("FINISHED");
		orderRepository.save(order);
	}

	@PostMapping("/editOrder")
	public void editOrder(@RequestBody OrderItems ord) {
		if (ord.getOrderDesc() != null) {
			OrderItems oi = itemRepository.findOneByOrderItemsId(ord.getOrderId());
			oi.setOrderDesc(ord.getOrderDesc());
			itemRepository.delete(ord);
			itemRepository.save(oi);
		}
	}
    
	@PostMapping("/updatePrice")
	public void editOrder(@RequestBody Orders order) {
		int id = order.getOrderId();
		Orders ord = orderRepository.findOneByOrderId(id);
		ord.setPrice(Double.valueOf(order.getPrice()));
		orderRepository.save(ord);
	}

    @PostMapping("/submitOrder")
	public void submitOrder(@RequestBody FrontEndData fed) {
		Orders order = new Orders();
		Customer cus = new Customer();
		OrderItems oi = new OrderItems();

		cus.setAddress(fed.getAddress());
		cus.setEmailAddress("email");
		cus.setFirstName(fed.getFirstName());
		cus.setLastName(fed.getLastName());
		cus.setPhoneNumber(fed.getPhoneNumber());
		cusRepository.save(cus);

		order.setStatus("ACTIVE");
		order.setCustomerId(cus.getCustomerId());
		order.setPickupDeliveryFlag(fed.getPickupDeliveryFlag());
		order.setPrice(fed.getPrice());
		orderRepository.save(order);
		order.setOrderItemsId(order.getOrderId());
		orderRepository.save(order);

		oi.setOrderId(order.getOrderId());
		oi.setOrderItemId(order.getOrderId());
		oi.setOrderDesc(fed.getOrderDesc());
		itemRepository.save(oi);
	}
	
    //The methods below this haven't really been tested so change them as much as you need. 
    // They're just an assumption.
    
    @PostMapping("/createItem")
    public void createItem(@RequestBody Food food) {
    	foodRepository.save(food);
    }
    
    @PostMapping("/editItem")
    public void editItem(@RequestBody Food food) {
    	Food old = foodRepository.findOneByFoodId(food.getFoodId());
    	foodRepository.delete(old);
    	foodRepository.save(food);
    }
    
    @PostMapping("/received")
    public void Receive (@RequestBody Orders order) {
    	//received
    	//I was thinking this could be a status change
    	order.setStatus("DELIVERED");
    	orderRepository.save(order);
    }
    
    @PostMapping("/grabItems")
    public List grabItems(@RequestBody Food food) {
    	//Grab? I'm assuming this is to get all menu items
    	return (List) foodRepository.findAll();
    }
	
}
