import images from "../icons/*.png";
class InfoView {
  container = document.querySelector(".w_info");

  render(data) {
    this.data = data;
    this.container.innerHTML = "";
    this.renderHtmlElement();
  }

  renderHtmlElement() {
    const data = this.data;
    const icons = document.createElement("img");
    //require is used to import external module files in js
    const city = document.querySelector(".city_name");
    city.innerHTML = data.name;
    icons.src = images[data.weather[0].icon];
    icons.className = "w_icon p-3";
    this.container.append(icons);
    this.container.insertAdjacentHTML(
      "beforeend",
      `<div class="p-3">
      <h3>${data.weather[0].description}</h3>
      <h4>${data.main.temp}*F</h4>
      <div class="pt-3">
           <div> Humidity : ${data.main.humidity}</div>
           <div> Wind Speed : ${data.wind.speed}</div>
        </div>
      </div>
      `
    );
  }

  renderSpinner() {
    this.container.innerHTML = `<div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>`;
  }
}

export default new InfoView();
