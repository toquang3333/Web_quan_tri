var express = require('express');
var multer = require('multer');
var uploader = multer({dest: './tmp'});
var router = express.Router();
var spController = require('../controller/sanpham.controller')

router.get('/',spController.getListSP);
router.post('/',spController.getListSP);

router.get('/add',spController.getAddFromSP);
router.post('/add',uploader.single('anh'),spController.getAddFromSP);

router.get('/edit/:idsp',spController.getEditSP);
router.post('/edit/:idsp',uploader.single('anh'),spController.getEditSP);

router.get('/delete/:idsp', spController.delete);
router.post('/delete/:idsp', spController.delete);

router.get('/listDS/:idsp',spController.getListSP1);

module.exports = router;