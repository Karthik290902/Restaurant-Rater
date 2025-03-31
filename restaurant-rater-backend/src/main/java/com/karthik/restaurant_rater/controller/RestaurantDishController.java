package com.karthik.restaurant_rater.controller;

import com.karthik.restaurant_rater.model.RestaurantDish;
import com.karthik.restaurant_rater.repository.RestaurantDishRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurant-dishes")
public class RestaurantDishController {

    @Autowired
    private RestaurantDishRepository repository;

    // Get all entries
    @GetMapping
    public List<RestaurantDish> getAll() {
        return repository.findAll();
    }

    // Create new entry
    @PostMapping
    public RestaurantDish create(@RequestBody RestaurantDish restaurantDish) {
        return repository.save(restaurantDish);
    }

    // Get single entry
    @GetMapping("/{id}")
    public ResponseEntity<RestaurantDish> getById(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update entry
    @PutMapping("/{id}")
    public ResponseEntity<RestaurantDish> update(
            @PathVariable Long id,
            @RequestBody RestaurantDish updatedEntry) {

        return repository.findById(id)
                .map(existing -> {
                    existing.setRestaurantName(updatedEntry.getRestaurantName());
                    existing.setRestaurantAddress(updatedEntry.getRestaurantAddress());
                    existing.setDishName(updatedEntry.getDishName());
                    existing.setDishRating(updatedEntry.getDishRating());
                    return ResponseEntity.ok(repository.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete entry
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        return repository.findById(id)
                .map(entry -> {
                    repository.delete(entry);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}