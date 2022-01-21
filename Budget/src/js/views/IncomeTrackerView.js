import { ListView } from "./ListView";

class IncomeTrackerView extends ListView {
  container = document.querySelector(".income_container");
  filterSelect = document.querySelector("#income_filter");
}

export default new IncomeTrackerView();
