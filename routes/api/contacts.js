const express = require("express");
const validateBody = require("../../helpers/validateBody");
const schemas = require("../../schemas/contactSchemas");
const ctrls = require("../../controllers/contact");
const { isValidId, authenticate } = require("../../middlewares/index");
const router = express.Router();

router.get("/", authenticate, ctrls.getAllContacts);

router.get("/:contactId", authenticate, isValidId, ctrls.getContact);

router.post(
  "/",
  authenticate,
  validateBody(schemas.schemaAdd),
  ctrls.addNewContact
);

router.delete("/:contactId", authenticate, isValidId, ctrls.deleteContactById);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.schemaAdd),
  ctrls.updateContact
);
router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrls.updateStatusContact
);
module.exports = router;
