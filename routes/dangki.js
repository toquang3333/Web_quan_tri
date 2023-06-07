var express = require('express');
var router = express.Router();
var dangki = require('../controller/danhsach.controller');




router.get('/login',dangki.Login);
router.post('/login',dangki.Login);

router.get('/reg',dangki.Reg);
router.post('/reg',dangki.Reg);

router.get('/logout',dangki.Logout);

module.exports = router;