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

import {
  showToast
}
from "../utils/toast.js";

const technicianForm =
  document.querySelector(
    "#technicianForm"
  );

const technicianTableBody =
  document.querySelector(
    "#technicianTableBody"
  );



// =========================
// HIỂN THỊ TECHNICIANS
// =========================

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



// =========================
// THÊM KỸ THUẬT VIÊN
// =========================

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

    try {

      await createTechnician(
        technicianData
      );

      showToast(
        "✅ Thêm kỹ thuật viên thành công",
        "success"
      );

      technicianForm.reset();

      renderTechnicians();

    } catch (error) {

      console.log(error);

      showToast(
        "❌ Thêm kỹ thuật viên thất bại",
        "error"
      );
    }

  }
);



// =========================
// XÓA KỸ THUẬT VIÊN
// =========================

window.handleDelete =
  async (id) => {

    const confirmDelete =
      window.confirm(
        "Bạn có chắc muốn xóa kỹ thuật viên này?"
      );

    if(!confirmDelete) return;

    try {

      await deleteTechnician(id);

      showToast(
        "🗑️ Đã xóa kỹ thuật viên",
        "success"
      );

      renderTechnicians();

    } catch (error) {

      console.log(error);

      showToast(
        "❌ Xóa thất bại",
        "error"
      );
    }
};



// =========================
// INIT
// =========================

renderTechnicians();