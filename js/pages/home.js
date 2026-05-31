const SERVICE_API =
  "https://69fc37acfce564e259177acf.mockapi.io/api/v1/services";

const TECHNICIAN_API =
  "https://69fc37acfce564e259177acf.mockapi.io/api/v1/technicians";


const serviceList =
  document.querySelector(".service-list");

const technicianList =
  document.querySelector(".technician-list");


/* =========================
   LOAD SERVICES
========================= */

async function loadServices(){

  try{

    const response =
      await fetch(SERVICE_API);

    const services =
      await response.json();

    serviceList.innerHTML = "";

    services.forEach(service => {

      serviceList.innerHTML += `

        <div class="service-card">

          <img
            src="${service.image}"
            alt="${service.name}"
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

          <button
            onclick="goBooking('${service.id}')"
            class="book-btn"
          >
            Đặt Lịch
          </button>

        </div>

      `;
    });

  }catch(error){

    console.log(error);

    serviceList.innerHTML = `
      <p>
        Không tải được dịch vụ
      </p>
    `;
  }
}


/* =========================
   LOAD TECHNICIANS
========================= */

async function loadTechnicians(){

  try{

    const response =
      await fetch(TECHNICIAN_API);

    const technicians =
      await response.json();

    technicianList.innerHTML = "";

    technicians.forEach(tech => {

      technicianList.innerHTML += `

        <div class="technician-card">

          <img
            src="${tech.avatar}"
            alt="${tech.name}"
          />

          <h3>
            ${tech.name}
          </h3>

          <p>
            Kinh nghiệm:
            ${tech.experience}
          </p>

          <p>
            Chuyên môn:
            ${tech.specialty}
          </p>

        </div>

      `;
    });

  }catch(error){

    console.log(error);

    technicianList.innerHTML = `
      <p>
        Không tải được kỹ thuật viên
      </p>
    `;
  }
}


/* =========================
   GO BOOKING
========================= */

window.goBooking = function(id){

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  if(!user){

    alert(
      "Vui lòng đăng nhập!"
    );

    window.location.href =
      "./pages/login.html";

    return;
  }

  window.location.href =
    `./pages/booking.html?id=${id}`;
};


/* =========================
   INIT
========================= */

loadServices();
loadTechnicians();

