class ContactContainerView {
  _container = document.querySelector(".contacts_container");

  render(data) {
    this.data = data;
    const html = this.#generateHTMLString();
    this._container.innerHTML = html;
    this.applyDeleteEvent();
  }

  applyDeleteEvent() {
    const deleteBtn = document.querySelectorAll(".delete_contact");
    deleteBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.onDelete(btn.id);
      });
    });
  }

  addDeleteListener(handler) {
    this.onDelete = handler;
  }

  pushContactIntoContainer(contact) {
    const html = this.#generatCardContactHTML(contact);
    this._container.insertAdjacentHTML("afterbegin", html);
    this.applyDeleteEvent();
  }
  #generateHTMLString() {
    let html = "";
    const data = this.data;

    if (Array.isArray(data)) {
      data.forEach((contact) => {
        html += this.#generatCardContactHTML(contact);
      });
      return html;
    }
  }
  #generatCardContactHTML(contact) {
    return ` <div class="contact_card">
            <div class="contact_info">
              <div style="font-size:x-large">${contact.name}</div>
              <div>${contact.phone}</div>
              <div>${contact.email}</div>
            </div>
            <button class="delete_contact" id="${contact.id}">delete</button>
        </div>`;
  }
}
export default new ContactContainerView();
