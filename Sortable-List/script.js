const draggable_list = document.getElementById("draggable-list");
const check = document.getElementById("check");
const richestPeople = [
  "Elon Musk",
  "Bernard Arnault",
  "Bill Gates",
  "Larry Ellison",
  "Larry Page",
  "Mark Zuckerberg",
  "Sergey Brin",
  "Warren Buffet",
  "Mukesh Ambani",
  "Jeff Bezos",
];

const listItems = [];
let dragStartIndex;
createList();
function createList() {
  [...richestPeople]
    .map((a) => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((people, index) => {
      const listItem = document.createElement("li");
      listItem.setAttribute("data-index", index);
      // console.log(listItem);
      listItem.innerHTML = `
    <span class='number'>${index + 1}</span>
    <div class='draggable' draggable = 'true'>
    <p class='person-name'>${people}</p>
    <i class="fas fa-grip-lines"></i>
    </div>
    `;
      listItems.push(listItem);
      draggable_list.appendChild(listItem);
    });
  addEventListener();
}

function drgStart() {
  dragStartIndex = +this.closest("li").getAttribute("data-index");
  // console.log(dragStartIndex);
}

function drgEnter() {
  this.classList.add("over");
}

function drgLeave() {
  this.classList.remove("over");
}

function drgOver(e) {
  e.preventDefault();
}

function drgDrop() {
  const dradEndIndex = +this.getAttribute("data-index");

  swapItems(dragStartIndex, dradEndIndex);
  this.classList.remove("over");
}

function swapItems(from, to) {
  const itemOne = listItems[from].querySelector(".draggable");
  const itemTwo = listItems[to].querySelector(".draggable");
  // console.log(itemOne, itemTwo);

  listItems[from].appendChild(itemTwo);
  listItems[to].appendChild(itemOne);
}

function checkOrder() {
  listItems.forEach((listitem, index) => {
    const personName = listitem.querySelector(".draggable").innerText.trim();

    if (personName !== richestPeople[index]) {
      listitem.classList.add("wrong");
    } else {
      listitem.classList.remove("wrong");
      listitem.classList.add("right");
    }
  });
}

function addEventListener() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItems = document.querySelectorAll(".draggable-list li");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", drgStart);
  });
  dragListItems.forEach((item) => {
    item.addEventListener("dragover", drgOver);
    item.addEventListener("drop", drgDrop);
    item.addEventListener("dragenter", drgEnter);
    item.addEventListener("dragleave", drgLeave);
  });
}

check.addEventListener("click", checkOrder);
