// ==========================================
// 🌟 ĐIỀN 3 LINK MOCKAPI CỦA BẠN VÀO ĐÂY (Giống hệt trang Admin)
const API_URL_SERVICES = 'https://69fc37acfce564e259177acf.mockapi.io/api/v1';    // Link chứa bảng services
const API_URL_TECHNICIANS = 'https://69fc37acfce564e259177acf.mockapi.io/api/v1'; // Link chứa bảng technicians (Dự phòng nếu sau này muốn hiện danh sách thợ ở trang chủ)
const API_URL_BOOKINGS = 'https://6a05781faa826ca75c09e1f3.mockapi.io/api/v1';    // Link chứa bảng bookings
// ==========================================

// --- JAVASCRIPT THUẦN & FETCH API (Hiển thị dữ liệu) ---
document.addEventListener('DOMContentLoaded', () => {
    fetchServices();
});

// Fetch API lấy danh sách dịch vụ 
function fetchServices() {
    const loadingEl = document.getElementById('loading');
    loadingEl.style.display = 'block';

    // 🌟 Sử dụng biến API_URL_SERVICES
    fetch(`${API_URL_SERVICES}/services`)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            loadingEl.style.display = 'none';
            renderServices(data);
        })
        .catch(error => {
            loadingEl.style.display = 'none';
            document.getElementById('service-list').innerHTML = `
                <div class="col-12 text-center text-danger py-5">
                    <i class="fa-solid fa-triangle-exclamation fa-3x mb-3"></i>
                    <h5 class="fw-bold">Lỗi kết nối dữ liệu: ${error.message}</h5>
                    <p>Vui lòng kiểm tra lại đường dẫn API_URL_SERVICES.</p>
                </div>`;
        });
}

// Thao tác DOM bằng JS thuần để render HTML
function renderServices(services) {
    const listContainer = document.getElementById('service-list');
    listContainer.innerHTML = ''; 

    // Vòng lặp for
    for (let i = 0; i < services.length; i++) {
        const service = services[i];
        
        const col = document.createElement('div');
        col.className = 'col-lg-4 col-md-6';
        
        // Cấu trúc Card hiện đại và thực tế
        col.innerHTML = `
            <div class="card h-100 shadow-sm service-card">
                <img src="${service.image}" class="card-img-top" alt="${service.name}" onerror="this.src='https://placehold.co/600x400?text=FixIt+Service'">
                <div class="card-body d-flex flex-column p-4">
                    <h5 class="card-title mb-3">${service.name}</h5>
                    <p class="card-text text-secondary mb-4 flex-grow-1">${service.description}</p>
                    <div class="mt-auto d-flex justify-content-between align-items-center">
                        <span class="price-tag fw-bold">
                            ${Number(service.price).toLocaleString()}đ
                        </span>
                        <button class="btn btn-primary rounded-pill px-4 fw-semibold" onclick="openBookingModal('${service.id}', '${service.name}')">
                            Đặt Lịch Ngay
                        </button>
                    </div>
                </div>
            </div>
        `;
        listContainer.appendChild(col);
    }
}

// Hàm mở Modal (Sử dụng Bootstrap 5 JS API)
function openBookingModal(id, name) {
    document.getElementById('serviceId').value = id;
    document.getElementById('modal-service-name').innerText = name;
    
    // Ẩn tất cả lỗi cũ nếu có bằng jQuery slideUp
    $('.error-msg').slideUp(0);
    
    const bookingModal = new bootstrap.Modal(document.getElementById('bookingModal'));
    bookingModal.show();
}

// --- JQUERY: XỬ LÝ SỰ KIỆN, VALIDATE VÀ AJAX ---
$(document).ready(function() {
    
    // 1. Khởi tạo Datepicker jQuery UI
    $("#bookingDate").datepicker({
        dateFormat: "dd/mm/yy",
        minDate: 0 // Không được chọn ngày trong quá khứ
    });

    // Tích hợp cuộn mượt khi bấm nút Banner
    $('#btn-hero-booking, a[href="#services"]').click(function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $('#services').offset().top - 80 
        }, 500);
    });

    // 2. Xử lý Form Submit (Validation & AJAX POST)
    $('#bookingForm').on('submit', function(e) {
        e.preventDefault(); 

        // Lấy giá trị input
        let name = $('#customerName').val().trim();
        let phone = $('#customerPhone').val().trim();
        let date = $('#bookingDate').val().trim();
        let serviceId = $('#serviceId').val();

        let isValid = true;

        // Xử lý Inline Error bằng hiệu ứng jQuery slideDown/slideUp
        if (name === '') {
            $('#error-name').slideDown(250);
            isValid = false;
        } else {
            $('#error-name').slideUp(250);
        }

        if (phone === '' || isNaN(phone) || phone.length < 9) {
            $('#error-phone').slideDown(250);
            isValid = false;
        } else {
            $('#error-phone').slideUp(250);
        }

        if (date === '') {
            $('#error-date').slideDown(250);
            isValid = false;
        } else {
            $('#error-date').slideUp(250);
        }

        // Nếu form lỗi thì dừng lại
        if (!isValid) return;

        // Đổi trạng thái nút bấm (loading state)
        const $btn = $('#btn-submit');
        const originalBtnText = $btn.html();
        $btn.html('<span class="spinner-border spinner-border-sm me-2"></span>Đang gửi yêu cầu...').prop('disabled', true);

        // Chuẩn bị Data
        const bookingData = {
            customerName: name,
            phone: phone,
            serviceId: serviceId, 
            date: date,
            status: "pending"
        };

        // GỌI API BẰNG JQUERY AJAX 
        // 🌟 Sử dụng biến API_URL_BOOKINGS để đăng ký lịch
        $.ajax({
            url: `${API_URL_BOOKINGS}/bookings`,
            type: 'POST',
            data: JSON.stringify(bookingData),
            contentType: 'application/json',
            success: function(response) {
                // Khôi phục nút
                $btn.html(originalBtnText).prop('disabled', false);

                // Reset form và đóng Modal
                $('#bookingForm')[0].reset();
                $('#bookingModal').modal('hide');

                // Hiển thị Toast thông báo thành công
                const toastEl = document.getElementById('successToast');
                const toast = new bootstrap.Toast(toastEl);
                toast.show();

                // === CHỨC NĂNG NGĂN XẾP LỊCH ĐÃ ĐẶT ===
                // Hiện khu vực ngăn xếp nếu nó đang bị ẩn
                $('#queue-section').removeClass('d-none');
                
                // Lấy tên dịch vụ mà khách vừa chọn trên Modal
                const serviceName = document.getElementById('modal-service-name').innerText;

                // Tạo giao diện thẻ (card) cho đơn vừa đặt
                const stackItemHTML = `
                    <div class="col-md-6 col-lg-4 stack-item" style="display: none;">
                        <div class="card border-success border-2 shadow-sm h-100 bg-light">
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center mb-3">
                                    <span class="badge bg-success"><i class="fa-solid fa-check me-1"></i>Đã tiếp nhận</span>
                                    <span class="text-muted small fw-bold">Mã Đơn: #${response.id}</span>
                                </div>
                                <h5 class="card-title fw-bold text-primary mb-3">${serviceName}</h5>
                                <div class="text-secondary small">
                                    <p class="mb-1"><i class="fa-regular fa-user me-2 text-dark"></i>${response.customerName}</p>
                                    <p class="mb-1"><i class="fa-solid fa-phone me-2 text-dark"></i>${response.phone}</p>
                                    <p class="mb-0"><i class="fa-regular fa-calendar-check me-2 text-danger"></i><strong>Ngày sửa: ${response.date}</strong></p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                // Đẩy vào đầu ngăn xếp (Prepend - LIFO) và tạo hiệu ứng trượt xuống
                $('#booking-stack').prepend(stackItemHTML);
                $('.stack-item').first().slideDown(400); 
            },
            error: function(err) {
                // Khôi phục nút khi lỗi
                $btn.html(originalBtnText).prop('disabled', false);
                alert("Xin lỗi, đã có lỗi xảy ra khi gửi đơn đặt lịch!");
            }
        });
    });
});