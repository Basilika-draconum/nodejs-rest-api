const express = require("express");
const Joi = require("joi");
const validateBody = require("../../helpers/validateBody");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const router = express.Router();

const schemaAdd = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  const contactList = await listContacts();
  res.json(contactList);
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  res.json(contact);
});

router.post("/", validateBody(schemaAdd), async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const newContact = await addContact(name, email, phone);
    res.json(newContact);
  } catch (error) {
    console.error(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const deleteContact = await removeContact(contactId);
  res.json(deleteContact);
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const { ...body } = req.body;
  const changeContactPhone = await updateContact(contactId, body);
  res.json(changeContactPhone);
});

module.exports = router;
