const HttpError = require("../helpers/HttpError.js");
const { ctrlWrapper } = require("../utils/index");
const Contact = require("../models/contact");

const getAllContacts = async (req, res, next) => {
  const contacts = await Contact.find();
  res.json(contacts);
};

const getContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw HttpError(404, `Contact with ${contactId} not found`);
  }
  res.json(contact);
};

const addNewContact = async (req, res, next) => {
  // const { name, email, phone, favorite } = req.body;
  const newContact = await Contact.create(req.body);
  res.json({
    status: "success",
    code: 201,
    data: { newContact },
  });
};

const deleteContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const deleteContact = await Contact.findByIdAndDelete(contactId);
  if (!deleteContact) {
    throw HttpError(404);
  }
  res.json({ message: "Contact deleted" });
};

const changeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContact: ctrlWrapper(getContact),
  addNewContact: ctrlWrapper(addNewContact),
  deleteContactById: ctrlWrapper(deleteContactById),
  updateContact: ctrlWrapper(changeContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
