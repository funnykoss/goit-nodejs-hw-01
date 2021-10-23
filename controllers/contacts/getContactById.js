const listContacts = require("./listContacts");

const getContactById = async (contactId) => {
  const contacts = await listContacts();

  const result = contacts.filter(({ id }) => Number(id) === Number(contactId));
  return result;
};

module.exports = getContactById;
