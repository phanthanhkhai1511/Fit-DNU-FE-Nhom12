const BOOKING_API =
  "https://6a05781faa826ca75c09e1f3.mockapi.io/api/v1/bookings";

const SERVICE_API =
  "https://69fc37acfce564e259177acf.mockapi.io/api/v1/services";

const TECHNICIAN_API =
  "https://69fc37acfce564e259177acf.mockapi.io/api/v1/technicians";


/* =========================
   GET URL PARAM
========================= */

const params =
  new URLSearchParams(
    window.location.search
  );

const serviceId =
  params.get("id");


/* =========================
   ELEMENTS
========================= */

const bookingForm =
  document.querySelector("#booking-form");

const serviceSelect =
  document.querySelector("#service");

const technicianSelect =
  document.querySelector("#technician");


/* =========================
   LOAD SERVICES
========================= */

async function loadServices(){

  try{

    const response =
      await fetch(SERVICE_API);

    const services =
      await response.json();

    serviceSelect.innerHTML =
      `<option value="">
        Chọn dịch vụ
      </option>`;

    services.forEach(service => {

      serviceSelect.innerHTML += `

        <option
          value="${service.id}"

          ${
            service.id === serviceId
            ? "selected"
            : ""
          }

        >

          ${service.name}

        </option>

      `;
    });

  }catch(error){

    console.log(error);
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

    technicianSelect.innerHTML =
      `<option value="">
        Chọn kỹ thuật viên
      </option>`;

    technicians.forEach(tech => {

      technicianSelect.innerHTML += `

        <option value="${tech.id}">

          ${tech.name}

        </option>

      `;
    });

  }catch(error){

    console.log(error);
  }
}


/* =========================
   SUBMIT BOOKING
========================= */

bookingForm.addEventListener(
  "submit",

  async function(e){

    e.preventDefault();

    const user =
      JSON.parse(
        localStorage.getItem("user")
      );

    if(!user){

      alert(
        "Vui lòng đăng nhập!"
      );

      window.location.href =
        "/pages/login.html";

      return;
    }

    const bookingData = {

      customerName:
        document.querySelector("#customer-name").value,

      phone:
        document.querySelector("#phone").value,

      address:
        document.querySelector("#address").value,

      serviceId:
        serviceSelect.value,

      technicianId:
        technicianSelect.value,

      bookingDate:
        document.querySelector("#booking-date").value,

      note:
        document.querySelector("#note").value,

      userId:user.id,

      status:"pending"
    };

    try{

      await fetch(BOOKING_API,{

        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify(
          bookingData
        )
      });

      alert(
        "Đặt lịch thành công!"
      );

      bookingForm.reset();

      window.location.href =
        "/index.html";

    }catch(error){

      console.log(error);

      alert(
        "Có lỗi xảy ra!"
      );
    }
  }
);


/* =========================
   INIT
========================= */

loadServices();

loadTechnicians();