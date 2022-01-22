const canvas = document.querySelector("#myCanvas");
const ctx = canvas.getContext("2d");
let colorContainer = document.querySelector(".color_container");
const colorArray = ["#267BD1", "#F56147", "#DA1B1B", "#1BDA27"];
let currentColor = colorArray[0];
var clrBtn = document.querySelector(".clear");
var downloadBtn = document.querySelector(".download");

clrBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

downloadBtn.addEventListener("click", () => {
  var link = document.createElement("a");
  link.download = new Date().toDateString() + ".png";
  link.href = canvas.toDataURL();
  link.click();
});

colorArray.forEach((color) => {
  const colorPlate = document.createElement("div");
  colorPlate.className = "color";
  colorPlate.style.backgroundColor = color;
  colorPlate.onclick = () => {
    currentColor = color;
  };
  colorContainer.insertAdjacentElement("beforeend", colorPlate);
});

const draw = (e) => {
  const rect = canvas.getBoundingClientRect(); //give the size of element
  ctx.lineWidth = 3;
  ctx.lineCap = "round"; //to make round brush
  ctx.lineTo(e.pageX - rect.left, e.pageY - rect.top);
  ctx.strokeStyle = currentColor;
  ctx.stroke();
  ctx.moveTo(e.pageX - rect.left, e.pageY - rect.top);
};

let onmousedown = false;
canvas.onmousedown = (e) => {
  draw(e);
  onmousedown = true;
  console.log("click");
};

canvas.onmousemove = (e) => {
  if (onmousedown) {
    draw(e);
    console.log("moving");
  }
};
canvas.onmouseup = (e) => {
  ctx.beginPath();
  onmousedown = false;
  console.log("up");
};
