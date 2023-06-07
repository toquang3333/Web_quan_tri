var express = require('express');
var router = express.Router();
var api = require("../controller/api/user.api");

router.get("/users", api.list);
router.post("/users", api.add);
router.put("/users/:id", api.update);

router.get("/sp",api.listSP);
router.post("/sp",api.listSP);
module.exports = router;