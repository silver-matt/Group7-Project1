var food = "popular";
const foodKey = "0042429a5d9430ed059f828e86fb5761";
const recipeId = "f44e018b";


// var drinksApi =
//   "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita";
// fetch(drinksApi).then(function (data) {
//   console.log(data);
//   var drinkEl = document.createElement("p");
// //   need to add content
//   drinkEl.textContent = "";
//   var test = document.getElementById("finders");
//   test.append(drinkEl);
//   console.log();
// });

var foodApi = `https://api.edamam.com/search?q=${food}&app_id=${recipeId}&app_key=${foodKey}&from=0&to=20`;
fetch(foodApi).then(function (data) {
return data.json();
}).then(function (data) {
  // console.log(data);
  // console.log(data.hits);
  // console.log(data.hits[0].recipe.ingredientLines);
  var ingrArray = data.hits[0].recipe.ingredientLines;
  displayIngrList(ingrArray);
  
});

// **DELETE LATER**dummy ingredient list to set up html
var dummyArr = ["ingredient 1", "ingredient 2", "ingredient 3", "ingredient 4", "ingredient 5"];

function callFoodAPI(){
  //call correct API, get data, and pass it to createIngrList()
  console.log("food button clicked");
  console.log($(this));
  var foodInput = $(this).parent().siblings("input").val();
  console.log(foodInput);
}
function callDrinkAPI(){
  //call correct API, get data, and pass it to createIngrList()
  console.log("drink button clicked");
  console.log($(this));
  var drinkInput = $(this).parent().siblings("input").val();
  console.log(drinkInput);
}
function createIngrList(){
  //get data from the fetch and create an array with each ingredient being a separate element
  //call display functions 
}
function displayImage(){
  
}
function displayIngrList(ingredientList){
  console.log(ingredientList);
  for (var i =0; i< ingredientList.length; i++){
    console.log(ingredientList[i]);
  }

}

$("#btnFood").on("click", "button", callFoodAPI);
$("#btnDrink").on("click", "button", callDrinkAPI);
// displayIngrList();