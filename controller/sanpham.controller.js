var fs = require('fs');
const { model } = require('mongoose');
var mySPMD = require('../models/sanpham.models');


exports.getListSP = async (req,res,next)=>{
  var listTL = await mySPMD.theLoaiMD.find();
  let dkloc = null;
  let timkiem = req.body.timkiem; 
  console.log("Loai sp: " + timkiem);
  if(typeof timkiem != 'undefined'){
    dkloc = {loai: timkiem};
  }  
  var list = await mySPMD.spModel.find(dkloc).populate('loai');
 
    res.render('sanpham/list',{sp: list,ListTL: listTL});

}
exports.getListSP1 = async (req,res,next)=>{
  let idsp  = req.params.idsp;
  let objSP = await mySPMD.spModel.findById(idsp).populate('loai');
  console.log(objSP);
  res.render('sanpham/hienthi',{objSP: objSP});
}



exports.getAddFromSP = async (req,res,next)=>{
    // let id = req.body.id;
   let msg = '';
   let listTL = await mySPMD.theLoaiMD.find();
   if(req.method=='POST'){
    let objSP = new mySPMD.spModel();
    objSP.name = req.body.name;
    objSP.loai = req.body.loai;
    fs.renameSync(req.file.path,'./public/images/' + req.file.originalname);
    objSP.anh = 'http://localhost:3000/images/' + req.file.originalname;
    objSP.noidung = req.body.noidung;
    objSP.price = req.body.price;
    try{
      let new_sp = await objSP.save();
      console.log(new_sp);
      msg = "Đã thêm thành công";
   }catch(error){
     msg = 'Lỗi' + error.message();
     console.log(error);
   }
   }
    res.render('sanpham/add',{msg: msg, listTL: listTL});
  }

  
  exports.getEditSP = async (req,res,next)=>{
    let msg ='';//dùng truuyeenf ra view
  
  
     //load du lieu danh sach the loai ua len du lieu
  
     let listTL = await mySPMD.theLoaiMD.find();
     
     //load thong tin san pham
  
     let idsp  = req.params.idsp;
     let objSP = await mySPMD.spModel.findById(idsp);
     if(req.method=='POST'){
      let objSP = new mySPMD.spModel();
      objSP.name = req.body.name;
      objSP.loai = req.body.loai;
      fs.renameSync(req.file.path,'./public/images/' + req.file.originalname);
      objSP.anh = 'http://localhost:3000/images/' + req.file.originalname;
      objSP.noidung = req.body.noidung;
      objSP.price = req.body.price;
  
      objSP._id  = idsp;
  
      //ghi CSDL
      try{
        //  let new_sp = await objSP.save();
        //  console.log(new_sp);
        //  msg = "Đã thêm thành công";
        await mySPMD.spModel.findByIdAndUpdate({_id: idsp}, objSP);
        msg='Da sua thanh cong';
        
      }catch(error){
        msg = 'Lỗi' + error.message();
        console.log(error);
      }
  
     } 
  
    res.render('sanpham/edit',{msg: msg, listTL: listTL, objSP: objSP});
  } 

  exports.delete = async(req,res,next)=>{
    let idsp = req.params.idsp;
    try {
      await mySPMD.spModel.findByIdAndDelete({_id: idsp});
    } catch(error) {
      console.log('Lỗi server!');
    
    }
    res.redirect('/sp');
  }