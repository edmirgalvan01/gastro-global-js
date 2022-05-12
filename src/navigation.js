window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

btnBack.addEventListener('click', () => {
   location.hash = '#';
});

function navigator() {
   if (location.hash.startsWith('#mealDetails')) {
      mealDetails();
   } else {
      home();
   }
}

function home() {
   welcomeContainer.classList.remove('hidden');
   areasContainer.classList.remove('hidden');
   areaFoodContainer.classList.remove('hidden');

   detailsHeader.classList.add('hidden');
   foodDetailsContainer.classList.add('hidden');
}

function mealDetails() {
   welcomeContainer.classList.add('hidden');
   areasContainer.classList.add('hidden');
   areaFoodContainer.classList.add('hidden');

   detailsHeader.classList.remove('hidden');
   foodDetailsContainer.classList.remove('hidden');
}
