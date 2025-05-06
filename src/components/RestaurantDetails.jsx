import React, { useState } from 'react';
import ReviewForm from '../components/ReviewForm';

const RestaurantDetails = ({ restaurant, onAddReview }) => {
  const { name, address, hours, cuisine, reviews = [] } = restaurant;

  const handleReviewSubmit = (newReview) => {
    onAddReview(newReview); // Prop function to add a new review
  };

  return (
    <div>
      <h2>{name}</h2>
      <p><strong>Cuisine:</strong> {cuisine}</p>
      <p><strong>Address:</strong> {address}</p>
      <p><strong>Hours:</strong> {hours}</p>

      <h3>Reviews</h3>
      <ul>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <li key={index}>
              <p>{review.comment}</p>
              <p><strong>Rating:</strong> {review.rating} Stars</p>
            </li>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </ul>

      <ReviewForm restaurantId={restaurant.id} onSubmit={handleReviewSubmit} />
    </div>
  );
};

export default RestaurantDetails;
