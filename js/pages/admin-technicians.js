import {
  checkAdmin
}
from "../utils/auth.js";

checkAdmin();


import {

  getTechnicians,

  createTechnician,

  deleteTechnician,

} from "../api/technician.api.js";

const technicianForm =
  document.querySelector(
    "#technicianForm"
  );

const technicianTableBody =
  document.querySelector(
    "#technicianTableBody"
  );

const renderTechnicians =
  async () => {

    const technicians =
      await getTechnicians();

    technicianTableBody.innerHTML =
      technicians
        .map(
          (tech) => `
      
      <tr>

        <td>
          <img
            src="${tech.avatar}"
          />
        </td>

        <td>
          ${tech.name}
        </td>

        <td>
          ${tech.specialty}
        </td>

        <td>
          ${tech.phone}
        </td>

        <td>
          ${tech.experience}
          năm
        </td>

        <td>

          <button
            class="delete-btn"
            onclick="handleDelete('${tech.id}')"
          >
            Xóa
          </button>

        </td>

      </tr>
      
      `
        )
        .join("");
};

technicianForm.addEventListener(
  "submit",
  async (e) => {

    e.preventDefault();

    const technicianData = {

      name:
        document.querySelector(
          "#name"
        ).value,

      specialty:
        document.querySelector(
          "#specialty"
        ).value,

      phone:
        document.querySelector(
          "#phone"
        ).value,

      experience:
        document.querySelector(
          "#experience"
        ).value,

      avatar:
        document.querySelector(
          "#avatar"
        ).value,
    };

    await createTechnician(
      technicianData
    );

    alert(
      "Thêm kỹ thuật viên thành công!"
    );

    technicianForm.reset();

    renderTechnicians();
  }
);

window.handleDelete =
  async (id) => {

    const confirmDelete =
      confirm(
        "Bạn có chắc muốn xóa?"
      );

    if(!confirmDelete) return;

    await deleteTechnician(id);

    renderTechnicians();
};

renderTechnicians();