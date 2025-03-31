package com.karthik.restaurant_rater.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "restaurant_dishes")
public class RestaurantDish {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "restaurant_name", nullable = false)
    private String restaurantName;

    @Column(name = "restaurant_address")
    private String restaurantAddress;

    @Column(name = "dish_name", nullable = false)
    private String dishName;

    @Column(name = "dish_rating")
    private Integer dishRating;

    // Constructors
    public RestaurantDish() {}

    public RestaurantDish(String restaurantName, String restaurantAddress,
                          String dishName, Integer dishRating) {
        this.restaurantName = restaurantName;
        this.restaurantAddress = restaurantAddress;
        this.dishName = dishName;
        this.dishRating = dishRating;
    }

    // Getters and Setters
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getRestaurantName() { return restaurantName; }
    public void setRestaurantName(String name) { this.restaurantName = name; }
    public String getRestaurantAddress() { return restaurantAddress; }
    public void setRestaurantAddress(String address) { this.restaurantAddress = address; }
    public String getDishName() { return dishName; }
    public void setDishName(String name) { this.dishName = name; }
    public Integer getDishRating() { return dishRating; }
    public void setDishRating(Integer rating) { this.dishRating = rating; }

}
