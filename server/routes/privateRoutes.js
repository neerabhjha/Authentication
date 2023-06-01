const router = require("express").Router();
const { privateRouteController } = require("../controllers/PrivateRouteController");
const requireuser = require("../middleware/requireuser");

router.get('/private',requireuser, privateRouteController);

module.exports = router;