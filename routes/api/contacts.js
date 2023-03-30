const express = require("express");
const validateBody = require("../../helpers/validateBody");
const schemas = require("../../schemas/contactSchemas");
const ctrls = require("../../controllers/contact");
const { isValidId } = require("../../middlewares/index");
const router = express.Router();

router.get("/", ctrls.getAllContacts);

router.get("/:contactId", isValidId, ctrls.getContact);

router.post("/", validateBody(schemas.schemaAdd), ctrls.addNewContact);

// router.delete("/:contactId",isValidId, ctrls.deleteContactById);

// router.put("/:contactId",isValidId, validateBody(schemas.schemaAdd), ctrls.changeContact);

module.exports = router;
