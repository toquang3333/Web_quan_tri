var express = require('express');
var router = express.Router();
var spController = require('../controller/sanphamDT.controller')

router.get('/',spController.getListSPDT);

router.get('/add',spController.getAddFromSPDT);
router.post('/add',spController.getAddFromSPDT);

router.get('/delete/:idsp', spController.delete);
router.post('/delete/:idsp', spController.delete);


router.get('/edit/:idsp',spController.getEditTL);
router.post('/edit/:idsp',spController.getEditTL);
module.exports = router;