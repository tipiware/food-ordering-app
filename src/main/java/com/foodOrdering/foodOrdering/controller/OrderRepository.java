package com.foodOrdering.foodOrdering.controller;

import com.foodOrdering.foodOrdering.models.Orders;

import org.springframework.data.repository.CrudRepository;

public interface OrderRepository extends CrudRepository<Orders, Long> {
	Orders findOneByOrderId(int order_id);
}
