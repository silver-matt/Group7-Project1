var food = "popular";
const foodKey = "0042429a5d9430ed059f828e86fb5761";
const recipeId = "f44e018b";


// **DELETE LATER**dummy ingredient list to set up html
var dummyArr = [
  "ingredient 1",
  "ingredient 2",
  "ingredient 3",
  "ingredient 4",
  "ingredient 5",
];

function callFoodAPI() {
  //call correct API, get data, and pass it to createIngrList()
  var foodInput = $(this).parent().siblings("input").val();
  var foodApi = `https://api.edamam.com/search?q=${foodInput}&app_id=${recipeId}&app_key=${foodKey}&from=0&to=20`;
  fetch(foodApi)
    .then(function (data) {
      return data.json();
    })
    .then(function (data) {
      var foodArray = data.hits[0].recipe.ingredientLines;
      displayIngrList(foodArray);
    });

  console.log(foodInput);
}

function callDrinkAPI() {
  var drinkInput = $(this).parent().siblings("input").val();
  var drinksApi = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?q=' + drinkInput;
fetch(drinksApi)
.then(function (data) {
  console.log(data);
  return data.json();
})
.then(function (data){
  var drinkArray = data;
  displayIngrList(drinkArray);
console.log(drinkArray);
})
}


function displayImage() {}
function displayIngrList(foodArray) {
  for (var i = 0; i < foodArray.length; i++) {
    console.log(foodArray[i]);
    $(".ingList").append("<li class='ingTest'></li>");
    $(".ingTest").text(foodArray[i]);
    $(".ingTest").removeClass("ingTest");
  }
}

$("#btnFood").on("click", "button", callFoodAPI);
$("#btnDrink").on("click", "button", callDrinkAPI);


// var foodApi = `https://api.edamam.com/search?q=${food}&app_id=${recipeId}&app_key=${foodKey}&from=0&to=20`;
// fetch(foodApi)
//   .then(function (data) {
//     return data.json();
//   })
//   .then(function (data) {
//     console.log(data);
//     console.log(data.hits);
//     console.log(data.hits[0].recipe.ingredients);
//   });