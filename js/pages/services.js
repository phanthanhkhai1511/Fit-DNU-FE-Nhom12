import { getServices } from "../api/service.api.js";

const servicesContainer =
  document.querySelector(
    "#servicesContainer"
  );

const renderServices = async () => {
  const services =
    await getServices();

  if (!services?.length) {
    servicesContainer.innerHTML =
      "<h2>No services found</h2>";

    return;
  }

  servicesContainer.innerHTML =
    services
      .map(
        (service) => `
    
    <div class="service-card">

      <img 
        src="${service.image}" 
        alt="${service.name}"
      />

      <div class="service-content">

        <h3>${service.name}</h3>

        <p>
          ${service.description}
        </p>

        <h4>
           ${Number(service.price).toLocaleString("vi-VN")} VNĐ
        </h4>

        <button
          class="booking-btn"
          data-id="${service.id}"
        >
          Book Now
        </button>

      </div>

    </div>
    
    `
      )
      .join("");
};

renderServices();