var express = require('express');
var router = express.Router();
var dsController = require('../controller/danhsachadmin.controller')

router.get('/',dsController.getListAdmin);


module.exports = router;