var express = require('express');
var router = express.Router();
var dsController = require('../controller/danhsach.controller');
var check_login = require('../middlewares/check_login')


router.get('/',check_login.yeu_cau_login, dsController.getList);
router.post('/',dsController.getList);

router.get('/add',dsController.getAddFrom);
router.post('/add',dsController.getAddFrom);

router.get('/delete/:idsp', dsController.delete);
router.post('/delete/:idsp', dsController.delete);


router.get('/edit/:idsp',dsController.getEditsp);
router.post('/edit/:idsp',dsController.getEditsp);

module.exports = router;
