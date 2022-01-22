class State {
  state = {
    loading: false,
    number: "random",
    type: "math",
  };
  updateState(props) {
    this.state = {
      ...this.state,
      ...props,
    };
  }
}
const state = new State();

const DOM = {
  okBtn: document.querySelector(".okBtn"),
  randomBtn: document.querySelector(".randomBtn"),
  typeSelector: document.querySelector(".type"),
  number: document.querySelector(".number"),
  factbox: document.querySelector(".factbox"),
};

DOM.number.addEventListener("input", (e) => {
  state.updateState({
    number: e.target.value,
  });
  console.log(state.state);
});

DOM.typeSelector.addEventListener("change", (e) => {
  state.updateState({
    type: e.target.value,
  });
  console.log(state.state);
});

DOM.okBtn.addEventListener("click", () => {
  state.updateState({ loading: true });
  showSpinner();
  getFact(state.state.number, state.state.type)
    .then((fact) => {
      console.log(fact);
      state.updateState({ loading: false });
    })
    .catch((err) => {
      console.error(err);
    });
});

DOM.randomBtn.addEventListener("click", () => {
  state.updateState({ loading: true });
  showSpinner();
  getFact("random", state.state.type)
    .then((fact) => {
      console.log(fact);
      state.updateState({ loading: false });
    })
    .catch((err) => {
      console.error(err);
    });
});

const getFact = (number = "random", type = "math") => {
  state.updateState({ loading: true });
  return new Promise((resolve, reject) => {
    fetch(`http://numbersapi.com/${number}/${type}`)
      .then((res) => res.text())
      .then((data) => {
        showFact(data);
        state.updateState({ loading: false });
        resolve(data);
      })
      .catch((err) => {
        state.updateState({ loading: false });
        reject(err);
      });
  });
};
const showFact = (fact) => {
  DOM.factbox.innerHTML = fact;
};
const showSpinner = () => {
  DOM.factbox.innerHTML = `<div class="lds-ring"><div>`;
};
