const express = require("express");
const Joi = require("joi");
const validateBody = require("../../helpers/validateBody");
const HttpError = require("../../helpers/HttpError.js");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
} = require("../../models/contacts");
const router = express.Router();

const schemaAdd = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "any.required": `"name" must be exist`,
    "string.base": `"name" must be string`,
    "string.empty": `"name" cannot be empty`,
  }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      throw HttpError(404);
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", validateBody(schemaAdd), async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const newContact = await addContact(name, email, phone);
    res.json({
      status: "success",
      code: 201,
      data: { newContact },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deleteContact = await removeContact(contactId);
    if (!deleteContact) {
      throw HttpError(404);
    }
    res.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = schemaAdd.validate(req.body);
    if (error) {
      throw HttpError(400);
    }
    const { contactId } = req.params;
    const result = await updateContactById(contactId, req.body);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);

    // const { contactId } = req.params;
    // const { ...body } = req.body;
    // const changeContact = await updateContact(contactId, body);
    // res.json(changeContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
