var db = require('./db');
const spChema = new db.mongoose.Schema(
    {
        name: {type: String,require: true},
        loai: {type: db.mongoose.Schema.Types.ObjectId,ref:'theLoaiMD'},
        anh: {type: String,require: true},
        noidung: {type: String,require: true},
        price: {type: Number, require: true}
    },
    {
        collection: 'san_pham'
    }
    
);
const theloaiSchema = new db.mongoose.Schema(
     {
        name: {type: String,require: true}
     },
     {
        collection: 'the_loaisp'
     }
);
let spModel = db.mongoose.model('spModel',spChema);
let theLoaiMD = db.mongoose.model('theLoaiMD',theloaiSchema);
module.exports = {spModel,theLoaiMD};