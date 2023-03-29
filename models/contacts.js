const fs = require("fs/promises");
const path = require("path");
const uniqid = require("uniqid");

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const list = await listContacts();
  const contact = list.find((item) => item.id === contactId);
  return contact || null;
}

async function removeContact(contactId) {
  const list = await listContacts();
  const contactIndex = list.findIndex((item) => item.id === contactId);
  if (contactIndex === -1) {
    return null;
  }
  const removeContact = list[contactIndex];
  const newContact = list.filter((_, index) => index !== contactIndex);
  await fs.writeFile(contactsPath, JSON.stringify(newContact));
  return removeContact;
}

async function addContact(name, email, phone) {
  const list = await listContacts();
  const newContact = { id: uniqid(), name, email, phone };
  const contactsList = JSON.stringify([newContact, ...list], null, "\t");
  await fs.writeFile(contactsPath, contactsList);
  return newContact;
}

const updateContact = async (list) =>
  await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));

async function updateContactById(contactId, { name, email, phone }) {
  const list = await listContacts();
  const contactIndex = list.findIndex((item) => item.id === contactId);
  if (contactIndex === -1) {
    return null;
  }
  list[contactIndex] = { contactId, name, email, phone };
  await updateContact(list);
  return list[contactIndex];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};
