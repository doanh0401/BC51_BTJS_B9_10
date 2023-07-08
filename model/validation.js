function Validation() {
    this.kiemTraRong = function (value, errorId, mess) {
      if (value === "") {
        //show error
        getEle(errorId).innerHTML = mess;
        getEle(errorId).style.display = "block";
  
        return false;
      }
  
      //Hide error
      getEle(errorId).innerHTML = "";
      getEle(errorId).style.display = "none";
  
      return true;
    };
  
    this.kiemTraNghiepVu = function (idSelect, errorId, mess) {
      var slcNghiepVu = document.getElementById(idSelect);
      if (slcNghiepVu.selectedIndex !== 0) {
        //true
        getEle(errorId).innerHTML = "";
        getEle(errorId).style.display = "none";
  
        return true;
      }
  
      //false
      getEle(errorId).innerHTML = mess;
      getEle(errorId).style.display = "block";
  
      return false;
    };
  
    this.kiemTraDoDaiKiTu = function (value, errorId, mess, min, max) {
      if (min <= value.trim().length && value.trim().length <= max) {
        //true
        getEle(errorId).innerHTML = "";
        getEle(errorId).style.display = "none";
  
        return true;
      }
  
      //false
      getEle(errorId).innerHTML = mess;
      getEle(errorId).style.display = "block";
  
      return false;
    };
  
    this.kiemTraChuoiKiTu = function (value, errorId, mess) {
      var letter =
        "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
        "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
        "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
  
      if (value.match(letter)) {
        //true
        getEle(errorId).innerHTML = "";
        getEle(errorId).style.display = "none";
  
        return true;
      }
  
      //false
      getEle(errorId).innerHTML = mess;
      getEle(errorId).style.display = "block";
  
      return false;
    };
  
    this.checkPattern = function (value, errorId, mess, letter) {
      if (value.match(letter)) {
        //true
        getEle(errorId).innerHTML = "";
        getEle(errorId).style.display = "none";
  
        return true;
      }
  
      //false
      getEle(errorId).innerHTML = mess;
      getEle(errorId).style.display = "block";
  
      return false;
    };
  
    this.kiemTraTaiKhoanTonTai = function (value, errorId, mess, listNV) {
      var isExist = false;
  
      for (var i = 0; i < listNV.length; i++) {
        var nv = listNV[i];
        if (nv.taiKhoan === value) {
          isExist = true;
          break;
        }
      }
  
      if (isExist) {
        getEle(errorId).innerHTML = mess;
        getEle(errorId).style.display = "block";
  
        return false;
      }
  
      getEle(errorId).innerHTML = "";
      getEle(errorId).style.display = "none";
  
      return true;
    };
    
    this.kiemTraGiaTri = function (value, errorId, mess,min,max) {
      var temp = parseFloat(value);
      if(min <= temp && temp <= max){
        //true
        getEle(errorId).innerHTML = "";
        getEle(errorId).style.display = "none";
  
        return true;
      }
      getEle(errorId).innerHTML = mess;
      getEle(errorId).style.display = "block";

      return false;
    }
    
  this.kiemTraChucVu = function (idSelect, errorId, mess) {
    var slcChucVu = document.getElementById(idSelect);
    if (slcChucVu.selectedIndex !== 0) {
      //true
      getEle(errorId).innerHTML = "";
      getEle(errorId).style.display = "none";

      return true;
    }

    //false
    getEle(errorId).innerHTML = mess;
    getEle(errorId).style.display = "block";

    return false;
  };
  }
  