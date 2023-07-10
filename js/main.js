//global
var dsnv = new DSNV();
var validation = new Validation();
// mỗi lần reload web => gọi lại hàm getLocalStorage
getLocalStorage();

function getEle(id) {
  return document.getElementById(id);
}

function layThongTinNV(isAdd) {
  /**
   * Dom lay thong tin tu cac the input
   */
  var taiKhoan = getEle("tknv").value;
  var hoTen = getEle("name").value;
  var email = getEle("email").value;
  var matKhau = getEle("password").value;
  var ngayLam = getEle("datepicker").value;
  var nghiepVu = getEle("chucvu").value;
  var luongCoBan = getEle("luongCB").value;
  var gioLam = getEle("gioLam").value;

  var isValid = true;
  //Kiem tra tai khoan
  if(isAdd){
    isValid &=
    validation.kiemTraRong(taiKhoan, "tbTKNV", "(*) Vui lòng nhập tài khoản") &&
    validation.kiemTraDoDaiKiTu(
      taiKhoan,
      "tbTKNV",
      "(*) Vui long nhap ki tu 4 - 6",
      4,
      6
    ) &&
    validation.kiemTraTaiKhoanTonTai(
      taiKhoan,
      "tbTKNV",
      "(*) Vui lòng nhập tài khoản khác",
      dsnv.arr
    );
  }
  //Validation tên nhân viên
  isValid &=
    validation.kiemTraRong(hoTen, "tbTen", "(*) Vui lòng nhập tên") &&
    validation.checkPattern(
      hoTen,
      "tbTen",
      "(*) Vui long chỉ nhập chữ cái",
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
        "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
        "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"
    );
  //Validation email
  isValid &=
    validation.kiemTraRong(email, "tbEmail", "(*) Vui lòng nhập email") &&
    validation.checkPattern(
      email,
      "tbEmail",
      "Email không hợp lệ",
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    );
  //Validation password
  isValid &=
    validation.kiemTraRong(
      matKhau,
      "tbMatKhau",
      "(*) Vui lòng nhập mật khẩu"
    ) &&
    validation.checkPattern(
      matKhau,
      "tbMatKhau",
      "Mật khẩu yếu",
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/
    ) &&
    validation.kiemTraDoDaiKiTu(
      matKhau,
      "tbMatKhau",
      "(*) Vui lòng nhập mật khẩu 6 - 10 ký tự",
      6,
      10
    );
  //Validation ngayLam
  isValid &= validation.kiemTraRong(
    ngayLam,
    "tbNgay",
    "(*) Vui long nhap ngay lam"
  );
  //Validation luong Co ban
  isValid &=
    validation.kiemTraRong(
      luongCoBan,
      "tbLuongCB",
      "(*) Vui lòng nhập lương"
    ) &&
    validation.kiemTraGiaTri(
      luongCoBan,
      "tbLuongCB",
      "Nhập lương trong vùng từ n 1.000.000 - 20.000.000",
      1000000,
      20000000
    );
  //Validation Chức vụ
  isValid &= validation.kiemTraChucVu(
    "chucvu",
    "tbChucVu",
    "(*) Vui lòng chọn chức vụ"
  );
  //Validation gio lam
  isValid &=
    validation.kiemTraRong(
      gioLam,
      "tbGiolam",
      "(*) Vui lòng nhập số giờ làm"
    ) &&
    validation.kiemTraGiaTri(
      gioLam,
      "tbGiolam",
      "(*) Vui lòng nhập thời gian làm từ 80-200 giờ",
      80,
      200
    );
  //Tạo đối tượng sv từ lớp đối tượng SinhVien
  if (isValid) {
    var nv = new NhanVien(
      taiKhoan,
      hoTen,
      email,
      matKhau,
      ngayLam,
      luongCoBan,
      nghiepVu,
      gioLam
    );

    nv.tinhTongLuong();
    nv.xepLoaiNhanVien();
    return nv;
  }
  return null;
}
function renderTable(data) {
  var content = "";

  for (var i = 0; i < data.length; i++) {
    var nv = data[i];

    content += `
        <tr>
            <td>${nv.taiKhoan}</td>
            <td>${nv.hoTen}</td>
            <td>${nv.email}</td>
            <td>${nv.ngayLam}</td>
            <td>${nv.nghiepVu}</td>
            <td>${nv.total}</td>
            <td>${nv.rank}</td>
            <td>
                <button class="btn btn-info" data-toggle='modal' data-target='#myModal' onclick="suaNV('${nv.taiKhoan}')">Sửa</button>
                <button class="btn btn-danger" onclick="xoaNV('${nv.taiKhoan}')">Xoá</button>
            </td>
        </tr>
    `;
  }
  getEle("tableDanhSach").innerHTML = content;
}
//Sửa nhân viên
function suaNV(taiKhoan) {
  var nv = dsnv.layThongTinChiTietNV(taiKhoan);
  if (nv) {
    //DOM tới các thẻ input => show info nv
    getEle("tknv").value = nv.taiKhoan;
    getEle("tknv").disabled = true;

    getEle("name").value = nv.hoTen;
    getEle("email").value = nv.email;
    getEle("password").value = nv.matKhau;
    getEle("datepicker").value = nv.ngayLam;
    getEle("chucvu").value = nv.nghiepVu;
    getEle("luongCB").value = nv.luongCoBan;
    getEle("gioLam").value = nv.gioLam;
    //Xóa span lỗi khi qua cập nhật
    var TB = document.getElementsByClassName("sp-thongbao");
    for (var i = 0; i < TB.length; i++) {
      TB[i].innerHTML = "";
    }
  }
  getEle("btnThemNV").disabled = true;
}
//Xoa Nhan Vien
function xoaNV(taiKhoan) {
  dsnv.xoaNV(taiKhoan);
  //render lai table
  renderTable(dsnv.arr);
  //Luu lai localStorage;
  setLocalStorage();
}
//Thêm Nhân viên
function themNhanVien() {
  //Lấy thông tin từ user
  var nv = layThongTinNV(true);
  if (nv) {
    //Thêm nv vào DSNV
    dsnv.themNV(nv);
    //render dsnv ra ngoài table
    renderTable(dsnv.arr);
    //Lưu dsnv.arr xuống localStorage của browser
    setLocalStorage();
    getEle("inputForm").reset();
    getEle("btnCapNhat").disabled = false;
  }
}
//Tìm nhân viên theo loại xuất sắc giỏi
getEle("searchName").addEventListener("keyup", searchNV);
function searchNV() {
  var txtSearch = getEle("searchName").value;
  var mangTimKiem = dsnv.timKiemSV(txtSearch);
  renderTable(mangTimKiem);
  if (txtSearch == 0) renderTable(dsnv.arr);
}
//Cập nhật NV
function updateNV() {
  var nv = layThongTinNV(false);
  if (nv) {
    dsnv.capNhatNV(nv);
    // getEle("inputForm").reset();
    renderTable(dsnv.arr);
    setLocalStorage();
  }
  getEle("tknv").disabled = false;
}
//Lấy dữ liệu từ bộ nhớ browser
function getLocalStorage() {
  if (localStorage.getItem("DSNV")) {
    var dataString = localStorage.getItem("DSNV");
    //convert string => JSON
    var dataJson = JSON.parse(dataString);
    //nạp dữ liệu lại cho dssv.arr
    dsnv.arr = dataJson;
    //render lại table
    renderTable(dsnv.arr);
  }
}
//Lưu dữ liệu vào bộ nhớ browser
function setLocalStorage() {
  //convert JSON => string
  var dataString = JSON.stringify(dsnv.arr);
  localStorage.setItem("DSNV", dataString);
}
//Reset disable các nút
getEle("btnDong").onclick = function () {
  getEle("tknv").disabled = false;
  getEle("btnCapNhat").disabled = false;
  getEle("btnThemNV").disabled = false;
  var TB = document.getElementsByClassName("sp-thongbao");
  for (var i = 0; i < TB.length; i++) {
    TB[i].innerHTML = "";
  }
};
//Không cho phép người dùng cập nhật khi thêm nhân viên
getEle("btnThem").onclick = function () {
  getEle("btnCapNhat").disabled = true;
};
