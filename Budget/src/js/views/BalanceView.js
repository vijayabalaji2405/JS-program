class BalanceView {
  container = document.querySelector(".balance");

  render(balance) {
    this.container.innerHTML = "Rs. " + balance;
    if (balance > 0) {
      this.container.classList.add("green");
    } else {
      this.container.classList.add("red");
    }
  }
}

export default new BalanceView();
