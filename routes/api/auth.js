const express = require("express");
const validateBody = require("../../helpers/validateBody");
const router = express.Router();
const { schemas } = require("../../models/user");
const { registerUser, loginUser } = require("../../controllers/auth");

router.post(
  "/users/register",
  validateBody(schemas.registerSchema),
  registerUser
);
router.post("/users/login", validateBody(schemas.loginSchema), loginUser);

module.exports = router;
