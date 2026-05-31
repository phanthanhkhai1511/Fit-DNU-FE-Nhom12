import { showToast } from "./toast.js";

export const checkAdmin = () => {

  const user =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    );

  if (!user) {

    showToast(
      "⚠ Vui lòng đăng nhập!",
      "warning"
    );

    setTimeout(() => {

      window.location.href =
        "/pages/login.html";

    }, 1200);

    return;
  }

  if (user.role !== "admin") {

    showToast(
      "✖ Bạn không có quyền truy cập!",
      "error"
    );

    setTimeout(() => {

      window.location.href =
        "/pages/login.html";

    }, 1200);
  }
};

export const logout = () => {

  localStorage.removeItem(
    "user"
  );

  showToast(
    "✓ Đăng xuất thành công!",
    "success"
  );

  setTimeout(() => {

    window.location.href =
      "/pages/login.html";

  }, 1200);
};

export const getCurrentUser = () => {

  return JSON.parse(
    localStorage.getItem(
      "user"
    )
  );
};