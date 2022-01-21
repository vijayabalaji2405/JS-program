class SearchView {
  container = document.querySelector(".search_form");
  inputQuery = document.querySelector(".search_input");

  // constructor() {}

  addSubmitEvent(handler) {
    this.container.addEventListener("submit", (e) => {
      handler(e);
      this.toggleButtons();
      //toggling button to clear form
    });
  }
  addHandleClear(handler) {
    this.container
      .querySelector(".clear_search")
      .addEventListener("click", handler.bind(this));
    // this.toggleButtons();
  }
  toggleButtons() {
    this.container.querySelector(".clear_search").classList.toggle("remove");
    // console.log(this.container.querySelector(".clear_search").classList);
    this.container.querySelector(".search_btn").classList.toggle("remove");
    // console.log(this.container.querySelector(".search_btn").classList);
  }

  get query() {
    return this.inputQuery.value;
  }
  clearForm() {
    this.inputQuery.value = "";
  }
}
export default new SearchView();
