import React, { useState } from 'react';

const ReviewForm = ({ restaurantId, onSubmit }) => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (review.trim() && rating) {
      onSubmit({ review, rating, restaurantId });
      setReview('');
      setRating(1);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Write a review..."
        required
      />
      <select value={rating} onChange={(e) => setRating(Number(e.target.value))} required>
        {[1, 2, 3, 4, 5].map((rate) => (
          <option key={rate} value={rate}>
            {rate} Star{rate > 1 ? 's' : ''}
          </option>
        ))}
      </select>
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
