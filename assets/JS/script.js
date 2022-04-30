var food = "chicken";
const foodKey = "0042429a5d9430ed059f828e86fb5761";
const recipeId = "f44e018b";

var drinksApi =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita";
fetch(drinksApi).then(function (data) {
  console.log(data);
  var drinkEl = document.createElement("p");
//   need to add content
  drinkEl.textContent = ;
  var test = document.getElementById("test");
  test.append(drinkEl);
  console.log();
});

var foodApi = `https://api.edamam.com/search?q=${food}&app_id=${recipeId}&app_key=${foodKey}&from=0&to=20`;
fetch(foodApi).then(function (data) {
  console.log(data);
});
