// ==========================================
// 🌟 KHAI BÁO 2 LINK API RIÊNG BIỆT VÀO ĐÂY
// Link 1: Chứa data của Dịch vụ (services) và Thợ (technicians)
const API_URL_DATA = 'https://69fc383bfce564e259178147.mockapi.io/api/v1'; 

// Link 2: Chứa data của Đơn đặt lịch (bookings)
const API_URL_BOOKING = 'https://6a05781faa826ca75c09e1f3.mockapi.io/api/v1'; 
// ==========================================

// --- JAVASCRIPT THUẦN & FETCH API (Hiển thị dữ liệu) ---
document.addEventListener('DOMContentLoaded', () => {
    fetchServices();
});

// Fetch API lấy danh sách dịch vụ (Dùng API_URL_DATA)
function fetchServices() {
    const loadingEl = document.getElementById('loading');
    loadingEl.style.display = 'block';

    fetch(`${API_URL_DATA}/services`)
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
                <div class="col-12 text-center text-danger">
                    <h5><i class="fa-solid fa-triangle-exclamation"></i> Lỗi kết nối dữ liệu: ${error.message}</h5>
                    <p>Vui lòng kiểm tra lại đường dẫn API Data.</p>
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
        
        // Cấu trúc Card hiện đại
        col.innerHTML = `
            <div class="card h-100 shadow-sm service-card">
                <img src="${service.image}" class="card-img-top" alt="${service.name}" onerror="this.src='https://placehold.co/600x400?text=FixIt'">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title mb-3">${service.name}</h5>
                    <p class="card-text text-secondary mb-4">${service.description}</p>
                    <div class="mt-auto d-flex justify-content-between align-items-center">
                        <span class="price-tag fw-bold">
                            ${Number(service.price).toLocaleString()}đ
                        </span>
                        <button class="btn btn-primary rounded-pill px-3" onclick="openBookingModal('${service.id}', '${service.name}')">
                            Đặt Lịch
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
    
    // Ẩn tất cả lỗi cũ nếu có bằng jQuery
    $('.error-msg').hide();
    
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

    // 2. Hiệu ứng cuộn mượt (Smooth scroll) khi bấm nút Banner
    $('#btn-scroll-down').click(function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $('#services').offset().top - 80 
        }, 500);
    });

    // 3. Xử lý Form Submit (Validation & AJAX POST)
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
        $btn.html('<span class="spinner-border spinner-border-sm me-2"></span>Đang gửi...').prop('disabled', true);

        // Chuẩn bị Data
        const bookingData = {
            customerName: name,
            phone: phone,
            serviceId: serviceId, // Cột này sẽ lưu lại ID của dịch vụ mà khách chọn
            date: date,
            status: "pending"
        };

        // GỌI API BẰNG JQUERY AJAX (Dùng API_URL_BOOKING)
        $.ajax({
            url: `${API_URL_BOOKING}/bookings`,
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
            },
            error: function(err) {
                $btn.html(originalBtnText).prop('disabled', false);
                alert("Xin lỗi, đã có lỗi xảy ra khi gửi đơn đặt lịch!");
            }
        });
    });
});