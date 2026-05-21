// 🌟 KHAI BÁO 3 LINK API RIÊNG BIỆT 
const API_URL_SERVICES = 'https://69fc37acfce564e259177acf.mockapi.io/api/v1';
const API_URL_TECHNICIANS = 'https://69fc37acfce564e259177acf.mockapi.io/api/v1'; // <-- Điền link chứa technicians vào đây
const API_URL_BOOKINGS = 'https://6a05781faa826ca75c09e1f3.mockapi.io/api/v1';

let servicesData = [];
let techniciansData = [];
let bookingsData = [];

document.addEventListener('DOMContentLoaded', () => {
    fetchAllData();
});

function fetchAllData() {
    // 🌟 Sửa cách gán link: Gọi 3 biến API riêng cho từng fetch
    Promise.all([
        fetch(`${API_URL_SERVICES}/services`).then(r => r.json()),
        fetch(`${API_URL_TECHNICIANS}/technicians`).then(r => r.json()),
        fetch(`${API_URL_BOOKINGS}/bookings`).then(r => r.json())
    ])
    .then(([services, technicians, bookings]) => {
        servicesData = services;
        techniciansData = technicians;
        bookingsData = bookings;
        
        renderServices();
        renderTechnicians();
        renderBookings();
        updateStats();
    })
    .catch(error => {
        console.error('Lỗi khi tải dữ liệu:', error);
        showError('Không thể tải dữ liệu từ server');
    });
}

function renderServices() {
    const container = document.getElementById('services-container');
    
    if (!servicesData || servicesData.length === 0) {
        container.innerHTML = '<div class="empty-state"><i class="fas fa-inbox"></i><p>Không có dịch vụ nào</p></div>';
        return;
    }
    
    let html = '<table class="table table-hover mb-0"><thead><tr><th>ID</th><th>Tên Dịch Vụ</th><th>Mô Tả</th><th>Giá (VNĐ)</th></tr></thead><tbody>';
    
    servicesData.forEach(service => {
        html += `<tr>
            <td><span class="badge bg-primary">${service.id}</span></td>
            <td><strong>${service.name || 'N/A'}</strong></td>
            <td>${service.description || 'N/A'}</td>
            <td class="fw-bold text-danger">${Number(service.price || 0).toLocaleString()}</td>
        </tr>`;
    });
    
    html += '</tbody></table>';
    container.innerHTML = html;
}

function renderTechnicians() {
    const container = document.getElementById('technicians-container');
    
    if (!techniciansData || techniciansData.length === 0) {
        container.innerHTML = '<div class="empty-state"><i class="fas fa-inbox"></i><p>Không có kỹ thuật viên nào</p></div>';
        return;
    }
    
    let html = '<table class="table table-hover mb-0"><thead><tr><th>ID</th><th>Họ Tên</th><th>Email</th><th>Điện Thoại</th><th>Chuyên Môn</th></tr></thead><tbody>';
    
    techniciansData.forEach(tech => {
        const specialty = tech.specialty || tech.specialization || 'Đa năng';
        html += `<tr>
            <td><span class="badge bg-success">${tech.id}</span></td>
            <td><strong>${tech.full_name || tech.name || 'N/A'}</strong></td>
            <td>${tech.email || 'N/A'}</td>
            <td>${tech.phone || 'N/A'}</td>
            <td><span class="badge bg-info text-dark">${specialty}</span></td>
        </tr>`;
    });
    
    html += '</tbody></table>';
    container.innerHTML = html;
}

function renderBookings() {
    const container = document.getElementById('bookings-container');
    
    if (!bookingsData || bookingsData.length === 0) {
        container.innerHTML = '<div class="empty-state"><i class="fas fa-inbox"></i><p>Không có đơn đặt lịch nào</p></div>';
        return;
    }
    
    let html = '<table class="table table-hover mb-0"><thead><tr><th>ID</th><th>Khách Hàng</th><th>Điện Thoại</th><th>Dịch Vụ</th><th>Ngày Đặt</th><th>Trạng Thái</th></tr></thead><tbody>';
    
    bookingsData.forEach(booking => {
        const statusBadge = getStatusBadge(booking.status || 'pending');
        html += `<tr>
            <td><span class="badge bg-warning text-dark">${booking.id}</span></td>
            <td><strong>${booking.customerName || booking.customer_name || 'N/A'}</strong></td>
            <td>${booking.phone || booking.customerPhone || 'N/A'}</td>
            <td>${booking.serviceId || 'N/A'}</td>
            <td>${booking.date || 'N/A'}</td>
            <td>${statusBadge}</td>
        </tr>`;
    });
    
    html += '</tbody></table>';
    container.innerHTML = html;
}

function getStatusBadge(status) {
    const statusMap = {
        'pending': '<span class="badge bg-warning text-dark">Chờ Xử Lý</span>',
        'confirmed': '<span class="badge bg-info text-white">Đã Xác Nhận</span>',
        'completed': '<span class="badge bg-success">Hoàn Tất</span>',
        'cancelled': '<span class="badge bg-danger">Đã Hủy</span>'
    };
    return statusMap[status] || '<span class="badge bg-secondary">Không Xác Định</span>';
}

function updateStats() {
    document.getElementById('service-count').textContent = servicesData.length;
    document.getElementById('technician-count').textContent = techniciansData.length;
    document.getElementById('booking-count').textContent = bookingsData.length;
}

function showError(message) {
    const errorHtml = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Lỗi!</strong> ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>`;
    document.querySelector('.admin-container').insertAdjacentHTML('beforebegin', errorHtml);
}