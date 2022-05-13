const URL_AREAS = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
const URL_MEALS_BY_AREA = (area) =>
   `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
const URL_MEAL_DETAILS_BY_ID = (id) =>
   `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

async function getAreas() {
   const response = await fetch(URL_AREAS);
   const data = await response.json();
   const areas = data.meals;

   areasContainer.innerHTML = '';

   areas.map((area) => {
      const button = document.createElement('button');
      const p = document.createElement('p');

      button.classList = 'areas--area';
      p.innerHTML = area.strArea;

      button.appendChild(p);
      areasContainer.appendChild(button);

      button.addEventListener('click', () => {
         getMealByArea(area.strArea);
      });
   });
}

async function getMealByArea(area) {
   const response = await fetch(URL_MEALS_BY_AREA(area));
   const data = await response.json();
   const meals = data.meals;

   foodTitle.innerText = `${area} food`;
   areaFoodList.innerHTML = '';

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
      areaFoodList.appendChild(card);
   });
}

async function getMealDetails(id) {
   const response = await fetch(URL_MEAL_DETAILS_BY_ID(id));
   const data = await response.json();
   const meals = data.meals;
}

getMealByArea('Mexican');
getAreas();
