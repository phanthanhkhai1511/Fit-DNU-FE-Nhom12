export const checkAdmin =
  () => {

    const user =
      JSON.parse(
        localStorage.getItem(
          "user"
        )
      );

    if(!user){

      alert(
        "Vui lòng đăng nhập!"
      );

      window.location.href =
        "/pages/login.html";

      return;
    }

    if(user.role !== "admin"){

      alert(
        "Bạn không có quyền truy cập!"
      );

      window.location.href =
        "/pages/login.html";
    }
};


export const logout =
  () => {

    localStorage.removeItem(
      "user"
    );

    alert(
      "Đăng xuất thành công!"
    );

    window.location.href =
      "/pages/login.html";
};

export const getCurrentUser =
  () => {

    return JSON.parse(
      localStorage.getItem(
        "user"
      )
    );
};