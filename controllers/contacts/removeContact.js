const fs = require("fs/promises");
const path = require("path");
const listContacts = require("./listContacts");

const removeContact = async (contactId) => {
  const contacts = await listContacts();
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

module.exports = removeContact;
