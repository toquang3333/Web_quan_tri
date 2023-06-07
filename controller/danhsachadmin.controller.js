const {} = require("../app");
exports.getListAdmin = (req,res,next)=>{
    let objDSAdmin = {id: 1, Full_name: 'Tô Văn Quang',Username: 'Quang',Email: 'quangtvph25912@',Passs:'1',groud: 'true'}
    
    res.render('danhsachadmin/list',{admin: objDSAdmin});
}