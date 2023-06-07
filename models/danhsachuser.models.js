var db = require('./db');
const spChema = new db.mongoose.Schema(
    {
        name: {type: String, require: true},
        email: {type: String, require: true},
        Passs: {type: String,require: true},
        role: {type: String,require: true}
    },
    {
        collection: 'user'
    }

);
let userModal = db.mongoose.model('userModal',spChema);
module.exports = {userModal};

