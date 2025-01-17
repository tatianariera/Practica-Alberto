let hotelsData = [];

fetch("hotels.xml")
  .then((response) => response.text())
  .then((xmlText) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "application/xml");
    const hotels = xmlDoc.getElementsByTagName("hotel");

    hotelsData = Array.from(hotels).map((hotel) => ({
      name: hotel.getElementsByTagName("hotelName")[0].textContent,
      location: hotel.getElementsByTagName("hotelLocation")[0].textContent,
      amenities: hotel.getElementsByTagName("hotelAmenities")[0].textContent,
      rating: hotel.getElementsByTagName("hotelRating")[0].textContent,
      price: hotel.getElementsByTagName("hotelPrice")[0].textContent,
      img: hotel.getElementsByTagName("hotelImg")[0].textContent,
      url: hotel.getElementsByTagName("hotelUrl")[0].textContent,
    }));
  })
  .catch((error) => console.error("Error loading XML:", error));

const locationInput = document.getElementById("location");
const container = document.getElementById("hotels-container");

locationInput.addEventListener("input", () => {
  const searchQuery = locationInput.value.trim().toLowerCase();
  container.innerHTML = "";

  if (searchQuery === "") {
    container.hidden = true;
    return;
  }

  const filteredHotels = hotelsData.filter((hotel) =>
    hotel.location.toLowerCase().includes(searchQuery)
  );

  if (filteredHotels.length === 0) {
    container.hidden = true;
    return;
  }

  filteredHotels.forEach((hotel) => {
    const hotelDiv = document.createElement("div");
    hotelDiv.classList.add("hotel");
    hotelDiv.innerHTML = `
      <h2 class="hotelName">${hotel.name}</h2>
      <p class="hotelLocation">${hotel.location}</p>
      <p class="hotelAmenities">Extras: ${hotel.amenities}</p>
      <p class="hotelRating">Rating: ${hotel.rating} ⭐</p>
      <p class="hotelPrice">${hotel.price} USD/night</p>
      <img class="hotelImg" src="${hotel.img}" alt="Image of ${hotel.name}">
    `;

    hotelDiv.addEventListener("click", () => {
      window.open(hotel.url, "_blank");
    });
    container.appendChild(hotelDiv);
  });

  container.hidden = false;
});
