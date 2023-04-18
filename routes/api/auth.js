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
  updateAvatarUser,
  verifyEmail,
  resendEmail,
} = require("../../controllers/auth");
const { authenticate, upload } = require("../../middlewares");

// sign up
router.post(
  "/users/register",
  validateBody(schemas.registerSchema),
  registerUser
);
router.get("/users/verify/:verificationToken", verifyEmail);
router.post("/users/verify", validateBody(schemas.verifySchema), resendEmail);

// sign in
router.post("/users/login", validateBody(schemas.loginSchema), loginUser);
router.get("/users/current", authenticate, getCurrentUser);
router.post("/users/logout", authenticate, logoutUser);
router.patch(
  "/users",
  authenticate,
  validateBody(schemas.updateSubscriptionSchema),
  updateSubscriptionUser
);
router.patch(
  "/users/avatars",
  authenticate,
  upload.single("avatar"),
  updateAvatarUser
);

module.exports = router;
