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
      console.log(data);
      var foodArray = data.hits[0].recipe.ingredientLines;
      var foodName = data.hits[0].recipe.label;
      var foodImg = data.hits[0].recipe.image;
      displayImage(foodImg);
      displayIngrList(foodArray, foodName);
    });

  // console.log(foodInput);
}

function callDrinkAPI() {
  var drinkInput = $(this).parent().siblings("input").val();
  console.log("Drink button click, search: " + drinkInput);
  // var drinksApi = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?q=' + drinkInput;
  var drinksApi = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita";
  fetch(drinksApi)
  .then(function (data) {
    // console.log(data);
    return data.json();
  })
  .then(function (data){
    var drinkArray = data;
    // displayIngrList(drinkArray);
    console.log(drinkArray);
    // console.log(drinkArray.drinks);
    // console.log(drinkArray.drinks[0]);
    createDrinkArray(drinkArray.drinks[0]);
  })
}
function createDrinkArray(userDrink){
  var ingredientList = [];
  console.log(userDrink);
  var ingredientNum = 1;
  var ingredient = userDrink[`strIngredient${ingredientNum}`];
  var measure = userDrink[`strMeasure${ingredientNum}`];
  var ingredientString = "";
  var drinkName = userDrink.strDrink;
  var drinkImg = userDrink.strDrinkThumb;

  while(ingredient != null){
    ingredient = userDrink[`strIngredient${ingredientNum}`];
    measure = userDrink[`strMeasure${ingredientNum}`];
    if(ingredient && measure){
      ingredientString = measure + " " + ingredient;
      ingredientList.push(ingredientString);
    }
    else if(ingredient){
      ingredientString = ingredient;
      ingredientList.push(ingredientString);
    }
    ingredientNum++;
  }
  displayImage(drinkImg);
  displayIngrList(ingredientList, drinkName);
}


function displayImage(imgLink) {
  console.log(imgLink);
  var image = document.createElement("img");
  image.setAttribute("src", imgLink);
  document.querySelector(".img-holder").appendChild(image);
}
function displayIngrList(ingrArray, name) {
  clearCurrentDisplay();
  $(".food-name").text(name);
  for (var i = 0; i < ingrArray.length; i++) {
    // console.log(ingrArray[i]);
    $(".ingList").append("<li class='ingTest'></li>");
    $(".ingTest").text(ingrArray[i]);
    $(".ingTest").removeClass("ingTest");
  }
}
function clearCurrentDisplay(){
  var parentNode = document.querySelector(".ingList");
  while(parentNode.hasChildNodes()){
    let childNode = parentNode.firstChild;
    parentNode.removeChild(childNode);
  }
}

$("#btnFood").on("click", "button", callFoodAPI);
$("#btnDrink").on("click", "button", callDrinkAPI);