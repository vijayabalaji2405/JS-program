import { ListView } from "./ListView";

class ExpenseTrackerView extends ListView {
  container = document.querySelector(".expene_container");
  filterSelect = document.querySelector("#expense_filter");
}

export default new ExpenseTrackerView();
