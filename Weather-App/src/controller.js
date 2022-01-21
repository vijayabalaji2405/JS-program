import searchView from "./views/search-view";
import info_view from "./views/info_view";
import { getCityData, state } from "./model";
import "regenerator-runtime";
import { StateMan } from "./model";

const handleSearch = async (e) => {
  e.preventDefault();
  console.log("hi i am searched");
  const { query } = searchView;
  StateMan.setState({
    ...StateMan.state,
    isLoading: true,
  });
  const data = await getCityData(query);
  StateMan.setState({
    ...StateMan.state,
    isLoading: false,
    info: data,
  });
  searchView.clearForm();
  console.log(data);
};

window.addEventListener("stateUpdate", () => {
  if (StateMan.state.isLoading) {
    info_view.renderSpinner();
  } else info_view.render(StateMan.state.info);
});

const init = () => {
  searchView.addSubmitController(handleSearch);
  // info_view.renderSpinner();
};
init();
