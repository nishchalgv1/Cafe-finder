// scripts/populateRestaurants.js
const endpoint = "https://681857845a4b07b9d1cea148.mockapi.io/restaurants";

const restaurantData = [
  { name: "The Bombay Canteen", rating: 92, cuisine: "Indian Fusion", location: "Mumbai", address: "Kamala Mills, Lower Parel, Mumbai", hours: "12:00 PM - 11:30 PM" },
  { name: "Biryani Blues", rating: 88, cuisine: "Hyderabadi", location: "Delhi", address: "Connaught Place, Delhi", hours: "11:00 AM - 11:00 PM" },
  { name: "Kuremal Kulfi", rating: 90, cuisine: "Desserts", location: "Delhi", address: "Chawri Bazar, Old Delhi", hours: "12:00 PM - 10:00 PM" },
  { name: "Paradise Biryani", rating: 85, cuisine: "Hyderabadi", location: "Hyderabad", address: "Paradise Circle, Secunderabad", hours: "11:30 AM - 10:30 PM" },
  { name: "Truffles", rating: 87, cuisine: "American", location: "Bangalore", address: "St. Marks Road, Bangalore", hours: "11:00 AM - 11:00 PM" },
  { name: "Murugan Idli Shop", rating: 89, cuisine: "South Indian", location: "Chennai", address: "T Nagar, Chennai", hours: "7:00 AM - 10:00 PM" },
  { name: "Flurys", rating: 86, cuisine: "Bakery", location: "Kolkata", address: "Park Street, Kolkata", hours: "8:00 AM - 10:00 PM" },
  { name: "O Pedro", rating: 91, cuisine: "Goan", location: "Mumbai", address: "Bandra Kurla Complex, Mumbai", hours: "12:00 PM - 12:00 AM" },
  { name: "Mainland China", rating: 90, cuisine: "Chinese", location: "Pune", address: "FC Road, Pune", hours: "12:00 PM - 11:00 PM" },
  { name: "Barbeque Nation", rating: 89, cuisine: "Buffet", location: "Noida", address: "Sector 18, Noida", hours: "12:00 PM - 3:00 PM, 6:30 PM - 10:30 PM" }
];

restaurantData.forEach((data) => {
  const body = {
    ...data,
    createdAt: new Date().toISOString(),
    // no id here
  };

  fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
    .then(res => res.json())
    .then(() => console.log("✅ Added:", data.name))
    .catch(err => console.error("❌ Error:", err));
});
