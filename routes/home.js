var express = require('express');
var router = express.Router();
var dsController = require('../controller/home.controller')

router.get('/',dsController.getListHome);


module.exports = router;