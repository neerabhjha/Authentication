const router = require("express").Router();
const {signupController, loginController, refreshAccessTokenController} = require("../controllers/AuthController");

router.post('/signup', signupController);
router.post("/login", loginController);
router.get("/refresh", refreshAccessTokenController);

module.exports = router;