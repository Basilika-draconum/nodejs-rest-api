const express = require("express");

const validateBody = require("../../helpers/validateBody");
const schemas = require("../../schemas/contactSchemas");
const ctrls = require("../../controllers/contact");
const router = express.Router();

router.get("/", ctrls.getAllContacts);

router.get("/:contactId", ctrls.getContact);

router.post("/", validateBody(schemas.schemaAdd), ctrls.addNewContact);

router.delete("/:contactId", ctrls.deleteContactById);

router.put("/:contactId", validateBody(schemas.schemaAdd), ctrls.changeContact);

module.exports = router;
