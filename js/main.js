import {
  getServices
}
from "./api/service.api.js";

import {
  getTechnicians
}
from "./api/technician.api.js";


// =========================
// SERVICES
// =========================

const serviceList =
  document.querySelector(
    "#serviceList"
  );

const renderServices =
  async () => {

    const services =
      await getServices();

    serviceList.innerHTML =
      services
        .slice(0,6)

        .map(
          (service) => `
        
        <div class="service-card">

          <img
            src="${service.image}"
          />

          <h3>
            ${service.name}
          </h3>

          <p>
            ${service.description}
          </p>

          <span>
            ${Number(service.price)
              .toLocaleString("vi-VN")}đ
          </span>

        </div>
        
        `
        )
        .join("");
};


// =========================
// TECHNICIANS
// =========================

const technicianList =
  document.querySelector(
    "#technicianList"
  );

const renderTechnicians =
  async () => {

    const technicians =
      await getTechnicians();

    technicianList.innerHTML =
      technicians
        .slice(0,4)

        .map(
          (tech) => `
        
        <div class="technician-card">

          <img
            src="${tech.avatar}"
          />

          <h3>
            ${tech.name}
          </h3>

          <p>
            ${tech.specialty}
          </p>

        </div>
        
        `
        )
        .join("");
};


renderServices();

renderTechnicians();