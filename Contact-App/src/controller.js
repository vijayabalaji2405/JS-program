import { ContactPerson } from "./model";
import addContactView from "./views/addContactView";
import contactContainerView from "./views/contactContainerView";
import searchView from "./views/searchView";
import { state } from "./model";

const getContactFromLs = () => {
  return JSON.parse(localStorage.getItem("contacts") || "[]");
};

const controlContactDelete = (id) => {
  let list = getContactFromLs();
  if (Array.isArray(list)) {
    list = list.filter((contact) => {
      if (contact.id === id) return false;
      else return true;
    });
    // console.log(list);
    contactContainerView.render(list);
    if (state.isSearching) handleSearchClear();
    list = JSON.stringify(list);
    localStorage.setItem("contacts", list);
  }
};

const hanleSearch = (e) => {
  state.isSearching = true;
  e.preventDefault();
  const { query } = searchView;
  location.hash = `#q=${query}`;
};

const search = (query) => {
  const list = getContactFromLs();
  console.log(list);
  let results = [];
  if (Array.isArray(list)) {
    list.forEach((contact) => {
      if (
        contact.name.includes(query) ||
        contact.phone.toString().includes(query)
      ) {
        results.push(contact);
      }
    });
  }
  console.log(results);
  return results;
};

const handleSearchClear = (e) => {
  state.isSearching = false;
  if (e) e.preventDefault();
  searchView.toggleButtons();
  searchView.clearForm();
  location.hash = "";
};

const controlHashChange = () => {
  const query = location.hash.split("=")[1];
  console.log(query);
  const results = search(query);
  if (typeof query !== "undefined" && query.length > 0)
    contactContainerView.render(results);
  else {
    contactContainerView.render(getContactFromLs());
  }
};

const controlAddContact = (event) => {
  event.preventDefault();
  const { Name, Email, Person } = addContactView;
  const newContact = new ContactPerson(Name, Email, Person);
  newContact.saveContactInLs();
  addContactView.clearForm();
  contactContainerView.pushContactIntoContainer(newContact);
};

const init = () => {
  addContactView.addContactSubmitListener(controlAddContact);
  contactContainerView.addDeleteListener(controlContactDelete);
  contactContainerView.render(getContactFromLs());
  searchView.addSubmitEvent(hanleSearch);
  window.onhashchange = controlHashChange;
  searchView.addHandleClear(handleSearchClear);
};
init();
