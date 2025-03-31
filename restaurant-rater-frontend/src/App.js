import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Modal } from "react-bootstrap";
import { Button } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; // Custom CSS for styling

function App() {
  const [dishes, setDishes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    restaurantName: "",
    restaurantAddress: "",
    dishName: "",
    dishRating: 3,
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch all dishes on component mount
  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/restaurant-dishes"
      );
      setDishes(response.data);
    } catch (error) {
      console.error("Error fetching dishes:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update existing dish
        await axios.put(
          `http://localhost:8080/api/restaurant-dishes/${editingId}`,
          formData
        );
      } else {
        // Add new dish
        await axios.post(
          "http://localhost:8080/api/restaurant-dishes",
          formData
        );
      }
      fetchDishes();
      handleClose();
    } catch (error) {
      console.error("Error saving dish:", error);
    }
  };

  const handleEdit = (dish) => {
    setFormData({
      restaurantName: dish.restaurantName,
      restaurantAddress: dish.restaurantAddress,
      dishName: dish.dishName,
      dishRating: dish.dishRating,
    });
    setEditingId(dish.id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/restaurant-dishes/${id}`);
      fetchDishes();
    } catch (error) {
      console.error("Error deleting dish:", error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setFormData({
      restaurantName: "",
      restaurantAddress: "",
      dishName: "",
      dishRating: 3,
    });
    setEditingId(null);
  };

  return (
    <div className="full-background">
      <div className="mx-5 p-5">
        <h1 className="mb-4 text-white text-2xl ">Restaurant Dish Rater</h1>

        <Button
          color="primary"
          variant="contained"
          onClick={() => setShowModal(true)}
          className="mb-4"
        >
          Add New Dish
        </Button>
        <div className="overflow-x-auto">
          <table
            className="w-full text-white font-inter"
            style={{ width: "100%" }}
          >
            <thead>
              <tr className="bg-black text-left w-full">
                <th className="p-3">Restaurant</th>
                <th className="p-3">Address</th>
                <th className="p-3">Dish</th>
                <th className="p-3">Rating</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dishes.map((dish, index) => (
                <tr
                  key={dish.id}
                  className={
                    index % 2 === 0
                      ? "bg-white text-black"
                      : "bg-black text-white"
                  }
                >
                  <td className="p-3">{dish.restaurantName}</td>
                  <td className="p-3">{dish.restaurantAddress}</td>
                  <td className="p-3">{dish.dishName}</td>
                  <td className="p-3">
                    {"★".repeat(dish.dishRating)}
                    {"☆".repeat(5 - dish.dishRating)}
                  </td>
                  <td className="p-3 flex space-x-2">
                    <Button
                      variant="outline"
                      size="small"
                      className="text-gray-300 bg-gray-800 hover:bg-gray-600"
                      onClick={() => handleEdit(dish)}
                    >
                      Edit
                    </Button>
                    <Button
                      color="error"
                      variant="contained"
                      size="small"
                      onClick={() => handleDelete(dish.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? "Edit Dish" : "Add New Dish"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Restaurant Name</Form.Label>
              <Form.Control
                type="text"
                name="restaurantName"
                value={formData.restaurantName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Restaurant Address</Form.Label>
              <Form.Control
                type="text"
                name="restaurantAddress"
                value={formData.restaurantAddress}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Dish Name</Form.Label>
              <Form.Control
                type="text"
                name="dishName"
                value={formData.dishName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Rating (1-5)</Form.Label>
              <Form.Select
                name="dishRating"
                value={formData.dishRating}
                onChange={handleInputChange}
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? "star" : "stars"}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit" className="border">
              {editingId ? "Update" : "Save"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
export default App;
