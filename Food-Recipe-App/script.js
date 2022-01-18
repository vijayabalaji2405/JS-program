const mealsEl = document.getElementById("meals");
const favoriteContainer = document.getElementById("fav-meals");
const mealPopup = document.getElementById("meal-popup");
const mealInfoEl = document.getElementById("meal-info");
const popupCloseBtn = document.getElementById("close-popup");
const searchTerm = document.getElementById("search-term");
const searchBtn = document.getElementById("search");
getRandomMeal();
fetchFavMeals();
//viewing random meal
async function getRandomMeal() {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  const respData = await resp.json();
  const randomMeal = respData.meals[0];
  addMeal(randomMeal, true);
}
//search by id
async function getMealById(id) {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
  );
  const respData = await resp.json();
  const meal = respData.meals[0];
  return meal;
}
//search by name
async function getMealsBySearch(term) {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term
  );
  const respData = await resp.json();
  const meals = respData.meals;
  return meals;
}
function addMeal(mealData, random = false) {
  const meal = document.createElement("div");
  meal.classList.add("meal");

  meal.innerHTML = ` <div class="meal-header">
            ${
              random
                ? `
            <span class="random"> Random Recipe </span>`
                : ""
            }
            <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}"/>
        </div>
        <div class="meal-body">
            <h4>${mealData.strMeal}</h4>
            <button class="fav-btn">
                <i class="fas fa-heart"></i></button> </div>`;

  const btn = meal.querySelector(".meal-body .fav-btn");

  btn.addEventListener("click", () => {
    if (btn.classList.contains("active")) {
      removeMealLS(mealData.idMeal);
      btn.classList.remove("active");
    } else {
      //adding meals if the like btn is pressed
      addMealLS(mealData.idMeal);
      btn.classList.add("active");
    }
    fetchFavMeals();
    //used to display the fav meal
  });

  meal.addEventListener("click", () => {
    showMealInfo(mealData);
    //showing meal info if user click upon meal
  });

  // mealsEl.appendChild(meal);
  mealsEl.appendChild(meal);
}
//adding meal
function addMealLS(mealId) {
  console.log(mealId);
  const mealsIDs = getMealsLS();

  localStorage.setItem("mealIds", JSON.stringify([...mealsIDs, mealId]));
}
//removing meal
function removeMealLS(mealId) {
  console.log(mealId);
  const mealsIDs = getMealsLS();
  localStorage.setItem(
    "mealIds",
    JSON.stringify(mealsIDs.filter((id) => id !== mealId))
  );
}
//getting meal from local storage
function getMealsLS() {
  const mealIds = JSON.parse(localStorage.getItem("mealIds"));
  console.log(mealIds);
  return mealIds === null ? [] : mealIds;
}

async function fetchFavMeals() {
  //clean the container
  favoriteContainer.innerHTML = "";
  const mealIds = getMealsLS();
  for (let i = 0; i < mealIds.length; i++) {
    const mealId = mealIds[i];
    meal = await getMealById(mealId);

    addMealFav(meal);
  }
}

function addMealFav(mealData) {
  const favMeal = document.createElement("li");
  favMeal.innerHTML = `
    <img
       src="${mealData.strMealThumb}"
       alt="${mealData.strMeal}"
    />
    <span>${mealData.strMeal}</span>
    <button class="clear"><i class="fas fa-window-close"></i></button>
    `;
  const btn = favMeal.querySelector(".clear");
  btn.addEventListener("click", () => {
    removeMealLS(mealData.idMeal);

    fetchFavMeals();
  });

  favMeal.addEventListener("click", () => {
    showMealInfo(mealData);
  });
  favoriteContainer.appendChild(favMeal);
}

function showMealInfo(mealData) {
  //cleaning
  mealInfoEl.innerHTML = "";
  const mealEl = document.createElement("div");
  ingredients = [];

  for (i = 1; i <= 20; i++) {
    if (mealData["strIngredient" + i]) {
      ingredients.push(
        `${mealData["strIngredient" + i]} - ${mealData["strMeasure" + i]}`
      );
    } else {
      break;
    }
  }
  mealEl.innerHTML = `
    <h1>${mealData.strMeal}</h1>
    <img
        src="${mealData.strMealThumb}"
        alt="${mealData.strMeal}"
    />

    <p>
      ${mealData.strInstructions}
    </p>

    <h3>Ingredients:</h3>
    <ul>
      ${ingredients
        .map(
          (ing) => `
          <li>${ing}</li>`
        )
        .join("")}
    </ul>
    `;
  mealInfoEl.appendChild(mealEl);
  mealPopup.classList.remove("hidden");
}

searchBtn.addEventListener("click", async () => {
  mealsEl.innerHTML = "";
  const search = searchTerm.value;
  const meals = await getMealsBySearch(search);

  if (meals) {
    meals.forEach((meal) => {
      addMeal(meal);
      console.log(meal);
    });
  }
});

popupCloseBtn.addEventListener("click", () => {
  mealPopup.classList.add("hidden");
});
