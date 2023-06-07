var express = require('express');
var router = express.Router();
var dsController = require('../controller/infor.controller')

router.get('/',dsController.getListTT);


module.exports = router;