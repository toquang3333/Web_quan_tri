// const { } = require("../app");
var myMD = require('../models/danhsachuser.models');


exports.getList = async (req, res, next) => {
  //lọc dữ liệu
  let dkloc = null;
  let timkiemUser = req.body.timkiemUser;
  console.log("Ten: " + timkiemUser);
  if (typeof timkiemUser != 'undefined') {
    dkloc = { name: timkiemUser };
  }

  console.log(dkloc);

  var list = await myMD.userModal.find(dkloc).populate('name');
  res.render('danhsach/list', { dulieu: list });
}
// exports.getListDK = (req, res, next) => {
//   res.render('dangnhap/dangnhap', { dulieu: objDSUser });
// }

// exports.getAddFromDK = async (req, res, next) => {
//   // let id = req.body.id;
//   let msg = '';
//   if (req.method == 'POST') {
//     let objSP = new myMD.userModal();
//     objSP.name = req.body.name;
//     objSP.email = req.body.email;
//     objSP.role = req.body.role;

//     try {
//       let new_sp = await objSP.save();
//       console.log(new_sp);
//       msg = "Đã thêm thành công";
//     } catch (error) {
//       msg = 'Lỗi' + error.message();
//       console.log(error);
//     }

//   }
//   res.render('dangnhap/dangki', { msg: msg });
// }

exports.getAddFrom = async (req, res, next) => {
  // let id = req.body.id;
  let msg = '';
  if (req.method == 'POST') {
    let objSP = new myMD.userModal();
    objSP.name = req.body.name;
    objSP.email = req.body.email;
    objSP.role = req.body.role;

    try {
      let new_sp = await objSP.save();
      console.log(new_sp);
      msg = "Đã thêm thành công";
    } catch (error) {
      msg = 'Lỗi' + error.message();
      console.log(error);
    }

  }
  res.render('danhsach/add', { msg: msg });
}

exports.getEditsp = async (req, res, next) => {
  let msg = '';

  let idsp = req.params.idsp;
  let objSP = await myMD.userModal.findById(idsp);
  if (req.method == 'POST') {
    // kiểm tra hợp lệ dữ liệu

    //tạo đối model gán dự liệu
    let objSP = new myMD.userModal();
    objSP.name = req.body.name;
    objSP.email = req.body.email;
    objSP.role = req.body.role;


    objSP._id = idsp;

    //ghi CSDL
    try {
      await myMD.userModal.findByIdAndUpdate({ _id: idsp }, objSP);
      msg = 'Da sua thanh cong';

    } catch (error) {
      msg = 'Lỗi' + error.message();
      console.log(error);
    }

  }
  res.render('danhsach/edit', { msg: msg, objSP: objSP })
}


exports.Reg = async (req, res, next) => {
  let msg = '';
  if (req.method == 'POST') {
    console.log(req.body);
    if (req.body.Passs != req.body.Passs1) {
      msg = 'Nhập lại pass sai';
      return res.render('dk/reg', { msg: msg });
    }
    let objU = myMD.userModal();
    objU.name = req.body.name;
    objU.email = req.body.email;
    objU.Passs = req.body.Passs;

    try {
      await objU.save();
      msg = 'Đăng kí thành công';
    } catch (error) {
      msg = error.message;
    }
  }
  res.render('dangnhap1/dangki', { msg: msg })
}

exports.Login = async (req, res, next) => {
  let msg = '';
  if (req.method == 'POST') {
    try {
      let objU = await myMD.userModal.findOne({ name: req.body.name });
      console.log(objU);
      if (objU != null) {
        if (objU.Passs == req.body.Passs) {
          req.session.userLogin = objU;
          return res.redirect('/sp')
        } else {
          msg = 'Sai Password';
        }
      } else {
        msg = 'Khong ton tai user' + req.body.name;
      }
    } catch (error) {
      msg = error.message;
    }
  }
  res.render('dangnhap1/dangnhap', { msg: msg })
}

exports.Logout = async (req, res, next) => {

}


exports.delete = async (req, res, next) => {
  let idsp = req.params.idsp;
  try {
    await myMD.userModal.findByIdAndDelete({ _id: idsp });
  } catch (error) {
    console.log('Lỗi server!');

  }
  res.redirect('/ds');
}

 
