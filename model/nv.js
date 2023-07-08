function NhanVien(
    _taiKhoan,
    _hoTen,
    _email,
    _matKhau,
    _ngayLam,
    _luongCoBan,
    _nghiepVu,
    _gioLam
  ) {
    this.taiKhoan = _taiKhoan;
    this.hoTen = _hoTen;
    this.email = _email;
    this.matKhau = _matKhau;
    this.ngayLam = _ngayLam;
    this.luongCoBan = _luongCoBan;
    this.nghiepVu = _nghiepVu;
    this.gioLam = _gioLam;
    this.total = 0;
    this.rank = "";
    this.tinhTongLuong = function() {
        switch(this.nghiepVu){
            case "Sếp":
                this.total = parseFloat(this.luongCoBan)*3;
                break;
            case "Trưởng phòng":
                this.total = parseFloat(this.luongCoBan)*2;
                break;
            case "Nhân viên":
                this.total = parseFloat(this.luongCoBan);
                break;
        }
    };
    this.xepLoaiNhanVien = function() {
        if(this.gioLam>=192) this.rank="Xuất sắc";
        else if(this.gioLam<192 && this.gioLam >=176) this.rank="Giỏi";
        else if(this.gioLam<176 && this.gioLam >=160) this.rank="Khá";
        else this.rank="Trung bình";
    };
  }