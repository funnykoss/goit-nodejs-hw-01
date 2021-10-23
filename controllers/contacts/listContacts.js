const fs = require("fs/promises");
const path = require("path");

const filePath = path.join(__dirname, "db", "contacts.json");

const listContacts = async () => {
  const result = await fs.readFile(filePath, "utf8");
  console.log("contacts.json");
  return JSON.parse(result);
};

module.exports = listContacts;
