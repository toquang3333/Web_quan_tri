// const {} = require("../app");
var myTL = require('../models/sanpham.models');
// var objDSSP = [
//     {ten_sp: 'Iphone 14',the_loai: 'Điện thoại',anh: '123',nd:'Thuộc loại pin tốt',gia_tien:'34000$'},
//     {ten_sp: 'Samsung',the_loai: 'Điện thoại',anh: '123',nd:'Màn to',gia_tien:'15000$'},
//     {ten_sp: 'Oppo',the_loai: 'Điện thoại',anh: '123',nd:'Ram cao',gia_tien:'20000$'}
// ]

exports.getListSPDT = async (req,res,next)=>{
  var list = await myTL.theLoaiMD.find();
    res.render('sanphamDT/list',{spT: list});
}
exports.getAddFromSPDT = async (req,res,next)=>{
  let msg ='';
    // let id = req.body.id;
    if(req.method == 'POST'){
      let objTL = new myTL.theLoaiMD();
     objTL.name = req.body.name;
    
     try{
      let new_sp = await objTL.save();
      console.log(new_sp);
      msg = "Đã thêm thành công";
   }catch(error){
     msg = 'Lỗi' + error.message();
     console.log(error);
   }
  }
   
    res.render('sanphamDT/add',{msg: msg});
  
}
exports.getEditTL = async (req,res,next)=>{
  let msg ='';
  
  let idsp  = req.params.idsp;
  let objTL = await myTL.theLoaiMD.findById(idsp);
  if(req.method == 'POST'){
    let objTL = new myTL.theLoaiMD();
   objTL.name = req.body.name;
  
   objTL._id  = idsp;
   try{
    await myTL.theLoaiMD.findByIdAndUpdate({_id: idsp},objTL);
    msg = "Đã sửa thành công";
 }catch(error){
   msg = 'Lỗi' + error.message();
   console.log(error);
 }
}
res.render('sanphamDT/edit',{msg: msg,objTL: objTL});
}

exports.delete = async(req,res,next)=>{
  let idsp = req.params.idsp;
  try {
    await myTL.theLoaiMD.findByIdAndDelete({_id: idsp});
} catch(error) {
    console.log('Lỗi server!');
  
}
  res.redirect('/spT');
}