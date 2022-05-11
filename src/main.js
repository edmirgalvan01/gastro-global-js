const URL_AREAS = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
const URL_MEALS_BY_AREA = (area) =>
   `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;

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
   });
}

async function getMealByArea(area) {
   const response = await fetch(URL_MEALS_BY_AREA(area));
   const data = await response.json();
   const meals = data.meals;

   areaFoodContainer.innerHtml = '';

   const foodTitle = document.createElement('h1');
   foodTitle.innerText = `${area} food`;
   foodTitle.classList = 'area-food--title';
   foodTitle.classList = 'title';
   areaFoodContainer.appendChild(foodTitle);

   meals.map((meal) => {
      const card = document.createElement('div');
      const cardImg = document.createElement('img');
      const cardInfo = document.createElement('div');
      const infoTitle = document.createElement('p');

      infoTitle.innerHTML = meal.strMeal;
      cardImg.setAttribute('src', meal.strMealThumb);

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

getMealByArea('Mexican');
getAreas();
