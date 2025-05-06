// src/api.js
export const fetchRestaurants = async () => {
  const response = await fetch(
    "https://681857845a4b07b9d1cea148.mockapi.io/restaurants"
  );
  const data = await response.json();
  return data;
};
