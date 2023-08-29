package com.foodOrdering.foodOrdering.controller;

import com.foodOrdering.foodOrdering.models.Food;
import org.springframework.data.repository.CrudRepository;

public interface FoodRepository extends CrudRepository<Food, Long> {
	Food findOneByFoodId(int foodId);
}
