const URL_AREAS = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
const URL_MEALS_BY_AREA = (area) =>
   `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
const URL_MEAL_DETAILS_BY_ID = (id) =>
   `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
const URL_MEAL_BY_KEYWORDS = (keyword) =>
   `https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`;

function createAreas(areas, container) {
   container.innerHTML = '';

   areas.map((area) => {
      const button = document.createElement('button');
      const p = document.createElement('p');

      button.classList = 'areas--area';
      p.innerHTML = area.strArea;

      button.appendChild(p);
      container.appendChild(button);

      button.addEventListener('click', () => {
         getMealByArea(area.strArea);
      });
   });
}

function createMeals(meals, container) {
   container.innerHTML = '';

   if (meals === null) {
      const p = document.createElement('p');
      p.innerText = 'Not found results';
      container.appendChild(p);
   } else {
      meals.map((meal) => {
         const card = document.createElement('div');
         const cardImg = document.createElement('img');
         const cardInfo = document.createElement('div');
         const infoTitle = document.createElement('p');

         infoTitle.innerHTML = meal.strMeal;
         cardImg.setAttribute('src', meal.strMealThumb);

         card.addEventListener('click', () => {
            location.hash = `#mealDetails=${meal.idMeal}`;
            getMealDetails(meal.idMeal);
         });

         card.classList = 'card';
         cardImg.classList = 'card--img';
         cardInfo.classList = 'card--info';
         infoTitle.classList = 'info--title';

         cardInfo.appendChild(infoTitle);
         card.appendChild(cardImg);
         card.appendChild(cardInfo);
         container.appendChild(card);
      });
   }
}

async function getAreas() {
   const response = await fetch(URL_AREAS);
   const data = await response.json();
   const areas = data.meals;

   createAreas(areas, areasContainer);
}

async function getMealByArea(area) {
   const response = await fetch(URL_MEALS_BY_AREA(area));
   const data = await response.json();
   const meals = data.meals;

   foodTitle.innerText = `${area} food`;
   createMeals(meals, areaFoodList);
}

async function getMealDetails(id) {
   const response = await fetch(URL_MEAL_DETAILS_BY_ID(id));
   const data = await response.json();
   const meals = data.meals;

   instructionsContent.innerText = '';
   ingredientsList.innerText = '';

   foodImg.setAttribute('src', meals[0].strMealThumb);
   infoTitleFood.innerText = meals[0].strMeal;

   const mealObject = meals[0];
   const mealEntries = Object.entries(mealObject);
   const ingredientsEntries = mealEntries.filter((entry) =>
      entry[0].startsWith('strIngredient')
   );
   const ingredientsFill = ingredientsEntries.filter((entry) => entry[1]);
   const ingredients = ingredientsFill.map((ingredient) => ingredient[1]);

   ingredients.map((ingredient) => {
      const listItem = document.createElement('li');
      listItem.innerText = ingredient;
      ingredientsList.appendChild(listItem);
   });

   const instructions = meals[0].strInstructions;
   instructionsContent.innerText = instructions;
}

async function getMealByKeyword(keyword) {
   const response = await fetch(URL_MEAL_BY_KEYWORDS(keyword));
   const data = await response.json();
   const meals = data.meals;

   foodTitle.innerText = keyword;
   createMeals(meals, areaFoodList);
}

buttonSearch.addEventListener('click', (e) => {
   e.preventDefault();
   const value = inputSearch.value;
   getMealByKeyword(value);
   inputSearch.value = '';
});

getMealByArea('American');
getAreas();
