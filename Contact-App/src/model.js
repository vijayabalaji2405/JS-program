export let state = {
  isSearching: false,
};

export class ContactPerson {
  constructor(name, phone, email) {
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.id = `${name}-${phone}-${Math.random().toFixed(2)}`;
  }

  saveContactInLs() {
    const contact = {
      name: this.name,
      phone: this.phone,
      email: this.email,
      id: this.id,
    };
    let list = JSON.parse(localStorage.getItem("contacts") || "[]");
    list.push(contact);
    localStorage.setItem("contacts", JSON.stringify(list));
  }
}
