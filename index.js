const { Command } = require("commander");
const program = new Command();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts.js");
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
(async ({ action, id, name, email, phone }) => {
  try {
    switch (action) {
      case "list":
        const contactsList = await listContacts();
        console.table(contactsList);
        break;

      case "get":
        const contactById = await getContactById(id);
        if (contactById) {
          console.log("Contact found");
          console.table(contactById);
        } else {
          throw new Error("contact not found");
        }
        break;

      case "add":
        const newContact = await addContact(name, email, phone);
        console.log("Add new contact");
        console.table(newContact);
        break;

      case "remove":
        const contact = await removeContact(id);
        console.table(contact);
        break;

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    throw error;
  }
})(argv);
