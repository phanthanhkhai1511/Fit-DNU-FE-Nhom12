// ==========================
// FIXIT API CONFIG
// ==========================
var API_BASE_URL = "https://69fc37acfce564e259177acf.mockapi.io/api/v1/fixlt";
var BOOKINGS_BASE_URL = "https://6a05781faa826ca75c09e1f3.mockapi.io/api/v1/booking";


var ENDPOINTS = {
  services: API_BASE_URL + "/services", // Dịch vụ sửa chữa
  technicians: API_BASE_URL + "/technicians", // Thợ kỹ thuật
  bookings: BOOKINGS_BASE_URL + "/bookings", // Đơn đặt lịch
  
};

// ==========================
// HANDLE RESPONSE
// ==========================

function handleResponse(response, errorMessage) {
  if (!response.ok) {
    throw new Error(errorMessage || "Yeu cau that bai");
  }

  return response.json();
}

// ==========================
// SERVICES API
// ==========================

// Lấy danh sách dịch vụ
function getServices() {
  return fetch(ENDPOINTS.services)
    .then(function (response) {
      return handleResponse(response, "Khong the lay danh sach dich vu");
    })
    .catch(function (error) {
      throw error;
    });
}

// Lấy dịch vụ theo ID
function getServiceById(id) {
  return fetch(ENDPOINTS.services + "/" + id)
    .then(function (response) {
      return handleResponse(response, "Khong the lay dich vu");
    })
    .catch(function (error) {
      throw error;
    });
}

// Thêm dịch vụ
function createService(data) {
  return fetch(ENDPOINTS.services, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(function (response) {
      return handleResponse(response, "Khong the them dich vu");
    })
    .catch(function (error) {
      throw error;
    });
}

// Cập nhật dịch vụ
function updateService(id, data) {
  return fetch(ENDPOINTS.services + "/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(function (response) {
      return handleResponse(response, "Khong the cap nhat dich vu");
    })
    .catch(function (error) {
      throw error;
    });
}

// Xóa dịch vụ
function deleteService(id) {
  return fetch(ENDPOINTS.services + "/" + id, {
    method: "DELETE",
  })
    .then(function (response) {
      return handleResponse(response, "Khong the xoa dich vu");
    })
    .catch(function (error) {
      throw error;
    });
}

// ==========================
// TECHNICIANS API
// ==========================

// Lấy danh sách thợ sửa
function getTechnicians() {
  return fetch(ENDPOINTS.technicians)
    .then(function (response) {
      return handleResponse(response, "Khong the lay danh sach tho");
    })
    .catch(function (error) {
      throw error;
    });
}

// Lấy thợ theo ID
function getTechnicianById(id) {
  return fetch(ENDPOINTS.technicians + "/" + id)
    .then(function (response) {
      return handleResponse(response, "Khong the lay thong tin tho");
    })
    .catch(function (error) {
      throw error;
    });
}

// Thêm thợ
function createTechnician(data) {
  return fetch(ENDPOINTS.technicians, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(function (response) {
      return handleResponse(response, "Khong the them tho");
    })
    .catch(function (error) {
      throw error;
    });
}

// Cập nhật thợ
function updateTechnician(id, data) {
  return fetch(ENDPOINTS.technicians + "/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(function (response) {
      return handleResponse(response, "Khong the cap nhat tho");
    })
    .catch(function (error) {
      throw error;
    });
}

// Xóa thợ
function deleteTechnician(id) {
  return fetch(ENDPOINTS.technicians + "/" + id, {
    method: "DELETE",
  })
    .then(function (response) {
      return handleResponse(response, "Khong the xoa tho");
    })
    .catch(function (error) {
      throw error;
    });
}

// ==========================
// BOOKINGS API
// ==========================

// Lấy danh sách lịch đặt
function getBookings() {
  return fetch(ENDPOINTS.bookings)
    .then(function (response) {
      return handleResponse(response, "Khong the lay danh sach dat lich");
    })
    .catch(function (error) {
      throw error;
    });
}

// Lấy đơn đặt lịch theo ID
function getBookingById(id) {
  return fetch(ENDPOINTS.bookings + "/" + id)
    .then(function (response) {
      return handleResponse(response, "Khong the lay thong tin dat lich");
    })
    .catch(function (error) {
      throw error;
    });
}

// Tạo đơn đặt lịch
function createBooking(data) {
  return fetch(ENDPOINTS.bookings, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(function (response) {
      return handleResponse(response, "Khong the tao lich hen");
    })
    .catch(function (error) {
      throw error;
    });
}

// Cập nhật đơn đặt lịch
function updateBooking(id, data) {
  return fetch(ENDPOINTS.bookings + "/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(function (response) {
      return handleResponse(response, "Khong the cap nhat lich hen");
    })
    .catch(function (error) {
      throw error;
    });
}

// Xóa đơn đặt lịch
function deleteBooking(id) {
  return fetch(ENDPOINTS.bookings + "/" + id, {
    method: "DELETE",
  })
    .then(function (response) {
      return handleResponse(response, "Khong the xoa lich hen");
    })
    .catch(function (error) {
      throw error;
    });
}