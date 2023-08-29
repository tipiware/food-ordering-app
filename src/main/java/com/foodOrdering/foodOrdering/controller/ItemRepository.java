package com.foodOrdering.foodOrdering.controller;
import com.foodOrdering.foodOrdering.models.OrderItems;

import org.springframework.data.repository.CrudRepository;

public interface ItemRepository extends CrudRepository<OrderItems, Long> {
	OrderItems findOneByOrderItemsId(int orderItemsId);
}
