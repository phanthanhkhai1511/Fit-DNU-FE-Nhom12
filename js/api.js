// ==========================================
// 🌟 ĐIỀN 3 LINK MOCKAPI CỦA BẠN VÀO ĐÂY
const API_URL_SERVICES = 'https://69fc37acfce564e259177acf.mockapi.io/api/v1';    // Link chứa bảng services
const API_URL_TECHNICIANS = 'https://69fc37acfce564e259177acf.mockapi.io/api/v1'; // Link chứa bảng technicians
const API_URL_BOOKINGS = 'https://6a05781faa826ca75c09e1f3.mockapi.io/api/v1';    // Link chứa bảng bookings
// ==========================================

// Chạy các hàm này ngay khi trang Admin vừa load xong
document.addEventListener('DOMContentLoaded', () => {
    fetchServicesAdmin();
    fetchTechnicians();
    fetchBookings();
});

// ==========================================
// 1. QUẢN LÝ DỊCH VỤ (SERVICES)
// ==========================================
function fetchServicesAdmin() {
    // 🌟 Sử dụng biến API_URL_SERVICES
    fetch(`${API_URL_SERVICES}/services`)
        .then(res => {
            if (!res.ok) throw new Error('Lỗi tải API Services');
            return res.json();
        })
        .then(data => {
            const tbody = document.getElementById('service-list-admin');
            if (!tbody) return; 
            
            tbody.innerHTML = '';
            data.forEach(srv => {
                tbody.innerHTML += `
                    <tr>
                        <td class="fw-bold text-center">${srv.id}</td>
                        <td>${srv.name}</td>
                        <td class="text-danger fw-bold">${Number(srv.price).toLocaleString()}đ</td>
                    </tr>
                `;
            });
        })
        .catch(err => console.error("Lỗi Services:", err));
}

// ==========================================
// 2. QUẢN LÝ KỸ THUẬT VIÊN (TECHNICIANS)
// ==========================================
function fetchTechnicians() {
    const loadingEl = document.getElementById('loading-technicians');
    const tbody = document.getElementById('tech-list');
    
    if(loadingEl) loadingEl.style.display = 'block';

    // 🌟 Sử dụng biến API_URL_TECHNICIANS
    fetch(`${API_URL_TECHNICIANS}/technicians`)
        .then(res => {
            if (!res.ok) throw new Error('Không tìm thấy API Technicians');
            return res.json();
        })
        .then(data => {
            if(loadingEl) loadingEl.style.display = 'none';
            renderTechnicians(data);
        })
        .catch(err => {
            if(loadingEl) loadingEl.style.display = 'none';
            if(tbody) tbody.innerHTML = `<tr><td colspan="4" class="text-danger text-center py-4"><i class="fa-solid fa-triangle-exclamation fa-2x mb-2"></i><br>Lỗi: ${err.message}</td></tr>`;
        });
}

function renderTechnicians(techs) {
    const tbody = document.getElementById('tech-list');
    if (!tbody) return;
    tbody.innerHTML = ''; 
    
    if(techs.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" class="text-center text-muted py-4">Chưa có dữ liệu kỹ thuật viên. Hãy thêm trên MockAPI.</td></tr>`;
        return;
    }

    techs.forEach(tech => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="text-center fw-bold">${tech.id}</td>
            <td class="fw-medium">${tech.name}</td>
            <td><span class="badge bg-info text-dark px-3 py-2">${tech.specialty || 'Đa năng'}</span></td>
            <td class="text-center">
                <button class="btn btn-sm btn-outline-danger" onclick="deleteTechnician('${tech.id}')" title="Xóa Kỹ Thuật Viên">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Xóa kỹ thuật viên (Dùng jQuery AJAX)
function deleteTechnician(id) {
    if(!confirm("Bạn có chắc chắn muốn xóa kỹ thuật viên này không? Hành động này không thể hoàn tác.")) return;

    // 🌟 Sử dụng biến API_URL_TECHNICIANS
    $.ajax({
        url: `${API_URL_TECHNICIANS}/technicians/${id}`,
        type: 'DELETE',
        success: function() {
            alert("Đã xóa kỹ thuật viên thành công!");
            fetchTechnicians(); // Tải lại bảng ngay lập tức
        },
        error: function() {
            alert("Lỗi! Không thể xóa kỹ thuật viên lúc này.");
        }
    });
}

// ==========================================
// 3. QUẢN LÝ ĐẶT LỊCH (BOOKINGS)
// ==========================================
function fetchBookings() {
    const loadingEl = document.getElementById('loading-bookings');
    const tbody = document.getElementById('booking-list');

    if(loadingEl) loadingEl.style.display = 'block';

    // 🌟 Sử dụng biến API_URL_BOOKINGS
    fetch(`${API_URL_BOOKINGS}/bookings`)
        .then(res => {
            if (!res.ok) throw new Error('Không tìm thấy API Bookings');
            return res.json();
        })
        .then(data => {
            if(loadingEl) loadingEl.style.display = 'none';
            renderBookings(data);
        })
        .catch(err => {
            if(loadingEl) loadingEl.style.display = 'none';
            if(tbody) tbody.innerHTML = `<tr><td colspan="7" class="text-danger text-center py-4"><i class="fa-solid fa-triangle-exclamation fa-2x mb-2"></i><br>Lỗi: ${err.message}</td></tr>`;
        });
}

function renderBookings(bookings) {
    const tbody = document.getElementById('booking-list');
    if (!tbody) return;
    tbody.innerHTML = '';

    if(bookings.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="text-center text-muted py-4">Chưa có đơn đặt lịch nào trong hệ thống.</td></tr>`;
        return;
    }

    // Đảo ngược mảng để đơn mới nhất (ID lớn nhất) hiện lên đầu
    bookings.reverse();

    bookings.forEach(bk => {
        // Cấu hình giao diện trạng thái
        let statusBadge = bk.status === 'confirmed' 
            ? '<span class="badge bg-success px-3 py-2"><i class="fa-solid fa-check me-1"></i>Đã xác nhận</span>' 
            : '<span class="badge bg-warning text-dark px-3 py-2"><i class="fa-solid fa-clock me-1"></i>Chờ xử lý</span>';

        // Cấu hình nút thao tác
        let actionButton = bk.status === 'pending' 
            ? `<button class="btn btn-sm btn-success shadow-sm fw-bold" onclick="confirmBooking('${bk.id}')">Xác nhận đơn</button>` 
            : `<button class="btn btn-sm btn-secondary disabled opacity-50">Đã duyệt</button>`;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="text-center fw-bold text-primary">#${bk.id}</td>
            <td class="fw-medium">${bk.customerName}</td>
            <td><a href="tel:${bk.phone}" class="text-decoration-none text-dark"><i class="fa-solid fa-phone fa-sm text-secondary me-1"></i>${bk.phone}</a></td>
            <td class="text-muted fw-semibold">ID Dịch vụ: ${bk.serviceId}</td>
            <td class="text-danger fw-bold">${bk.date}</td>
            <td class="text-center">${statusBadge}</td>
            <td class="text-center">${actionButton}</td>
        `;
        tbody.appendChild(tr);
    });
}

// Cập nhật trạng thái xác nhận đơn (Dùng jQuery AJAX)
function confirmBooking(id) {
    if(!confirm(`Xác nhận lịch đặt cho Mã Đơn #${id}? Khách hàng sẽ được thông báo.`)) return;

    // Hiển thị loading tạm thời trên con trỏ chuột
    document.body.style.cursor = 'wait';

    // 🌟 Sử dụng biến API_URL_BOOKINGS
    $.ajax({
        url: `${API_URL_BOOKINGS}/bookings/${id}`,
        type: 'PUT',
        data: JSON.stringify({ status: "confirmed" }),
        contentType: 'application/json',
        success: function() {
            document.body.style.cursor = 'default';
            alert(`Thành công! Đã chuyển trạng thái Đơn #${id} sang "Đã xác nhận".`);
            fetchBookings(); // Tải lại bảng
        },
        error: function() {
            document.body.style.cursor = 'default';
            alert("Đã xảy ra lỗi khi cố gắng cập nhật dữ liệu lên MockAPI.");
        }
    });
}