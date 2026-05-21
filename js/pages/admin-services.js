import {

  getServices,

  createService,

  deleteService,

  updateService,

} from "../api/service.api.js";

import {

  checkAdmin,

  logout

}
from "../utils/auth.js";


// =========================
// KIỂM TRA ADMIN
// =========================

checkAdmin();


// =========================
// DOM
// =========================

const serviceForm =
  document.querySelector(
    "#serviceForm"
  );

const serviceTableBody =
  document.querySelector(
    "#serviceTableBody"
  );

const submitBtn =
  document.querySelector(
    "#submitBtn"
  );

const logoutBtn =
  document.querySelector(
    "#logoutBtn"
  );


// =========================
// LOGOUT EVENT
// =========================

logoutBtn.addEventListener(
  "click",
  logout
);


// =========================
// BIẾN EDIT
// =========================

let editingServiceId = null;


// =========================
// HIỂN THỊ SERVICES
// =========================

const renderServices =
  async () => {

    const services =
      await getServices();

    serviceTableBody.innerHTML =
      services
        .map(
          (service) => `
      
      <tr>

        <td>
          ${service.name}
        </td>

        <td>
          ${service.description}
        </td>

        <td>
          ${Number(service.price)
            .toLocaleString("vi-VN")}đ
        </td>

        <td>

          <img
            src="${service.image}"
            width="80"
          />

        </td>

        <td>

          <button
            class="edit-btn"

            onclick="handleEdit(
              '${service.id}',
              '${service.name}',
              '${service.description}',
              '${service.price}',
              '${service.image}'
            )"
          >
            Sửa
          </button>

          <button
            class="delete-btn"

            onclick="handleDelete(
              '${service.id}'
            )"
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
// SUBMIT FORM
// =========================

serviceForm.addEventListener(
  "submit",

  async (e) => {

    e.preventDefault();

    const serviceData = {

      name:
        document.querySelector(
          "#name"
        ).value,

      description:
        document.querySelector(
          "#description"
        ).value,

      price:
        document.querySelector(
          "#price"
        ).value,

      image:
        document.querySelector(
          "#image"
        ).value,
    };


    // =========================
    // UPDATE
    // =========================

    if (editingServiceId) {

      await updateService(
        editingServiceId,
        serviceData
      );

      alert(
        "Cập nhật thành công!"
      );

      editingServiceId = null;

      submitBtn.textContent =
        "Thêm Dịch Vụ";
    }


    // =========================
    // CREATE
    // =========================

    else {

      await createService(
        serviceData
      );

      alert(
        "Thêm dịch vụ thành công!"
      );
    }


    // RESET FORM

    serviceForm.reset();


    // RENDER LẠI

    renderServices();
  }
);


// =========================
// HANDLE EDIT
// =========================

window.handleEdit =
  (
    id,
    name,
    description,
    price,
    image
  ) => {

    editingServiceId = id;

    document.querySelector(
      "#name"
    ).value = name;

    document.querySelector(
      "#description"
    ).value = description;

    document.querySelector(
      "#price"
    ).value = price;

    document.querySelector(
      "#image"
    ).value = image;

    submitBtn.textContent =
      "Cập Nhật";
};


// =========================
// HANDLE DELETE
// =========================

window.handleDelete =
  async (id) => {

    const confirmDelete =
      confirm(
        "Bạn có chắc muốn xóa?"
      );

    if (!confirmDelete) return;

    await deleteService(id);

    renderServices();
};


// =========================
// CHẠY LẦN ĐẦU
// =========================

renderServices();