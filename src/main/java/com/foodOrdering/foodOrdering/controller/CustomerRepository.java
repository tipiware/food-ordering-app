package com.foodOrdering.foodOrdering.controller;

import com.foodOrdering.foodOrdering.models.Customer;

import org.springframework.data.repository.CrudRepository;

public interface CustomerRepository extends CrudRepository<Customer, Long> {
	Customer findOneByCustomerId(int custId);
}
