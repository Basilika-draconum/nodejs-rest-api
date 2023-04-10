const express = require("express");
const validateBody = require("../../helpers/validateBody");
const router = express.Router();
const { schemas } = require("../../models/user");
const {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
  updateSubscriptionUser,
} = require("../../controllers/auth");
const { authenticate } = require("../../middlewares");

router.post(
  "/users/register",
  validateBody(schemas.registerSchema),
  registerUser
);

router.post("/users/login", validateBody(schemas.loginSchema), loginUser);

router.get("/users/current", authenticate, getCurrentUser);

router.post("/users/logout", authenticate, logoutUser);

router.patch(
  "/users",
  authenticate,
  validateBody(schemas.updateSubscriptionSchema),
  updateSubscriptionUser
);
module.exports = router;
