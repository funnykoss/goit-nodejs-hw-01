const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");
const filePath = path.join(__dirname, "db", "contacts.json");

const readData = async () => {
  const result = await fs.readFile(filePath, "utf8");
  console.log("contacts.json");
  return JSON.parse(result);
};
// TODO: задокументировать каждую функцию
const listContacts = async () => {
  return await readData();
};

const getContactById = async (contactId) => {
  const contacts = await readData();

  const result = contacts.filter(({ id }) => Number(id) === Number(contactId));
  return result;
};

const removeContact = async (contactId) => {
  const contacts = await readData();
  const result = contacts.findIndex(
    ({ id }) => Number(id) === Number(contactId),
  );
  if (result !== -1) {
    return null;
  }

  contacts.splice(result, 1);
  const contactPath = path.join(__dirname, "contacts.json");
  const contactString = JSON.stringify(contacts);

  await fs.writeFile(contactPath, contactString);
  return contacts;
};

const addContact = async (name, email, phone) => {
  const contacts = await readData();
  const newContact = { id: crypto.randomUUID(), name, email, phone };
  contacts.push(newContact);

  const contactPath = path.join(__dirname, "contacts.json");
  const contactString = JSON.stringify(contacts);

  await fs.writeFile(contactPath, contactString);
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
