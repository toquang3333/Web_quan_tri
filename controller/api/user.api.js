var model = require("../../models/danhsachuser.models");
var model1 = require("../../models/sanpham.models");
var objReturn ={
    status: 1,
    msg: "ok"
}

exports.list = async (req, res, next) => {
    listUser = [];
    try {
        listUser = await model.userModal.find();
        if(listUser){
            objReturn.data = listUser;
            objReturn.status = 1;
            objReturn.msg = "Lay danh sach thanh cong";
        }else{
            objReturn.status = 0;
            objReturn.msg = 'Khong co du lieu';
        }
    } catch (error) {
        objReturn.status = 0;
        objReturn.msg = err.message;
    }
    res.json(objReturn);
}
exports.add = async (req, res, next) => {
    if(req.method == "POST"){
        var objUser =  new model.userModal();
        objUser.username = req.body.username;
        objUser.email = req.body.email;
        objUser.passwd = req.body.passwd;
        
        try {
            await objUser.save();
            objReturn.status = 1;
            objReturn.msg = "Them thanh cong";
        } catch (error) {
            objReturn.status = 0;
            objReturn.message = err.message;
        }
    }
    res.json(objReturn);
}

exports.update = (req, res, next) => {
    res.json(objReturn);
}

exports.listSP = async(req,res,next)=>{
    try{
       var list = await model1.spModel.find();
       if(list){
        return res.status(201).json({data: list,msg:"Lấy thành công"});
       }else{
        return res.status(400).json({data: list,msg:"Lỗi"});
       }
    }catch(error){
        return res.status(500).json({msg: error.message});
    }
}