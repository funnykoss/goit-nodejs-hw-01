const fs = require("fs/promises");
const path = require("path");
const listContacts = require("./listContacts");
const crypto = require("crypto");

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = { id: crypto.randomUUID(), name, email, phone };
  contacts.push(newContact);

  const contactPath = path.join(__dirname, "contacts.json");
  const contactString = JSON.stringify(contacts);

  await fs.writeFile(contactPath, contactString);
  return newContact;
};
module.exports = addContact;
