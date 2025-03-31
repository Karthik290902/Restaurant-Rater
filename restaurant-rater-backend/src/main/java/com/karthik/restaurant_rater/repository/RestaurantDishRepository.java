package com.karthik.restaurant_rater.repository;

import com.karthik.restaurant_rater.model.RestaurantDish;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RestaurantDishRepository extends JpaRepository<RestaurantDish, Long> {

    // Find all dishes by restaurant name
    List<RestaurantDish> findByRestaurantName(String restaurantName);

    // Find all dishes with rating >= given value
    List<RestaurantDish> findByDishRatingGreaterThanEqual(Integer minRating);
}