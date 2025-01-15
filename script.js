// Carga y procesa el archivo XML
fetch('hotels.xml')
  .then((response) => response.text())
  .then((xmlText) => {
    // Parsear el texto XML
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'application/xml');

    // Obtener todos los hoteles del XML
    const hotels = xmlDoc.getElementsByTagName('hotel');
    const container = document.getElementById('hotels-container');

    // Iterar sobre los hoteles y agregar al HTML
    Array.from(hotels).forEach((hotel) => {
      const hotelName = hotel.getElementsByTagName('hotelName')[0].textContent;
      const hotelLocation = hotel.getElementsByTagName('hotelLocation')[0].textContent;

      const hotelAmenities = hotel.getElementsByTagName('hotelAmenities')[0].textContent;
      const hotelRating = hotel.getElementsByTagName('hotelRating')[0].textContent;
      const hotelPrice = hotel.getElementsByTagName('hotelPrice')[0].textContent;
      const hotelImg = hotel.getElementsByTagName('hotelImg')[0].textContent;

      // Crear el elemento HTML para el hotel
      const hotelDiv = document.createElement('div');
      hotelDiv.classList.add('hotel');
      hotelDiv.innerHTML = `
        <h2 class="hotelName">${hotelName}</h2>
        <p class="hotelLocation">${hotelLocation}</p>
        <p class="hotelAmenities">Extras: ${hotelAmenities}</p>
        <p class="hotelRating">Rating: ${hotelRating} ⭐</p>
        <div class="hotelPrice">${hotelPrice}</div>
        <img class="hotelImg" src="${hotelImg}" alt="Image of ${hotelName}">
      `;

      // Añadir el hotel al contenedor
      container.appendChild(hotelDiv);
    });
  })
  .catch((error) => console.error('Error loading XML:', error));
