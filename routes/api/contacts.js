const express = require("express");
const Joi = require("joi");
const validateBody = require("../../helpers/validateBody");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
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
  res.json({ message: "template message" });
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
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
