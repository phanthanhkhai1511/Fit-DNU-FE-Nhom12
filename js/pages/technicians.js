import {
  getTechnicians
} from "../api/technician.api.js";

const techniciansContainer =
  document.querySelector(
    "#techniciansContainer"
  );

const renderTechnicians =
  async () => {

    const technicians =
      await getTechnicians();

    techniciansContainer.innerHTML =
      technicians
        .map(
          (tech) => `
      
      <div class="technician-card">

        <img
          src="${tech.avatar}"
          alt="${tech.name}"
        />

        <div class="technician-content">

          <h3>
            ${tech.name}
          </h3>

          <p>
            ${tech.specialty}
          </p>

          <p>
            📞 ${tech.phone}
          </p>

          <h4>
            ${tech.experience} năm kinh nghiệm
          </h4>

        </div>

      </div>
      
      `
        )
        .join("");
};

renderTechnicians();