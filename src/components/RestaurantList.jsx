import React, { useState, useEffect } from 'react';
import { fetchRestaurants } from '../../api'; // adjust path if needed
import ReviewForm from '../components/ReviewForm';

export const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [cuisineSearch, setCuisineSearch] = useState('');
  const [locationSearch, setLocationSearch] = useState('');
  const [ratingSearch, setRatingSearch] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

// Component lifecycle 
// 1. Initialization--: Component creation 
// 2. Mounting: Visible part on the UI through 
// 3. Updation: state, fetch,
// 4. Unmounting: Page refresh, next page 

  useEffect(() => {
    fetchRestaurants()
      .then((data) => {
        // Ensure reviews is an array, even if missing
        const updatedRestaurants = data.map(restaurant => ({
          ...restaurant,
          reviews: Array.isArray(restaurant.reviews) ? restaurant.reviews : [],
        }));
        setRestaurants(updatedRestaurants);
        setFilteredRestaurants(updatedRestaurants);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    const filtered = restaurants.filter((restaurant) => {
      const cuisineMatch = cuisineSearch
        ? restaurant.cuisine.toLowerCase().includes(cuisineSearch.toLowerCase())
        : true;

      const locationMatch = locationSearch
        ? restaurant.location.toLowerCase().includes(locationSearch.toLowerCase())
        : true;

      const ratingMatch = ratingSearch
        ? restaurant.rating >= parseFloat(ratingSearch.trim())
        : true;

      return cuisineMatch && locationMatch && ratingMatch;
    });

    setFilteredRestaurants(filtered);
  }, [cuisineSearch, locationSearch, ratingSearch, restaurants]);

  const handleRestaurantSelect = (restaurantId) => {
    const selected = restaurants.find((restaurant) => restaurant.id === restaurantId);
    setSelectedRestaurant(selected);
  };

  const handleAddReview = (newReview) => {
    // Add the new review to the selected restaurant
    const updatedRestaurant = {
      ...selectedRestaurant,
      reviews: [...selectedRestaurant.reviews, newReview],
    };
    setSelectedRestaurant(updatedRestaurant);
    // Optionally, send this updated data to a backend to persist the review
  };

  return (
    <div>
      <h2>Restaurants</h2>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <input
          type="text"
          value={cuisineSearch}
          onChange={(e) => setCuisineSearch(e.target.value)}
          placeholder="Search by cuisine"
        />
        <input
          type="text"
          value={locationSearch}
          onChange={(e) => setLocationSearch(e.target.value)}
          placeholder="Search by location"
        />
        <input
          type="text"
          value={ratingSearch}
          onChange={(e) => setRatingSearch(e.target.value)}
          placeholder="Search by rating"
        />
      </div>

      {filteredRestaurants.length > 0 ? (
        <ul>
          {filteredRestaurants.map((restaurant, index) => (
            <li key={`${restaurant.id}-${index}`} onClick={() => handleRestaurantSelect(restaurant.id)}>
              <h3>{restaurant.name}</h3>
              <p>Cuisine: {restaurant.cuisine}</p>
              <p>Location: {restaurant.location}</p>
              <p>Rating: {restaurant.rating}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found</p>
      )}

      {selectedRestaurant && (
        <div>
          <h3>{selectedRestaurant.name}</h3>
          <p><strong>Address:</strong> {selectedRestaurant.address}</p>
          <p><strong>Hours:</strong> {selectedRestaurant.hours}</p>
          <p><strong>Menu:</strong></p>
          <ul>
            {selectedRestaurant.menu?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h4>Reviews:</h4>
          {/* Check if reviews is an array before calling .map */}
          <ul>
            {Array.isArray(selectedRestaurant.reviews) && selectedRestaurant.reviews.length > 0 ? (
              selectedRestaurant.reviews?.map((review, index) => (
                <li key={index}>
                  <strong>{review.user}</strong>: {review.comment} <em>({review.rating} stars)</em>
                </li>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </ul>

          <ReviewForm restaurantId={selectedRestaurant.id} onSubmit={handleAddReview} />
        </div>
      )}
    </div>
  );
};
