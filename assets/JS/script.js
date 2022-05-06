var food = "popular";
const foodKey = "0042429a5d9430ed059f828e86fb5761";
const recipeId = "f44e018b";

var recipeIndex = 0;


function callFoodAPI() {
  recipeIndex = 0;
  //call correct API, get data, and pass it to createIngrList()
  // var foodInput = $(this).parent().siblings("input").val();
  var foodInput = $(this).siblings("input").val();
  console.log(foodInput);
  var foodApi = `https://api.edamam.com/search?q=${foodInput}&app_id=${recipeId}&app_key=${foodKey}&from=0&to=20`;
  fetch(foodApi)
    .then(function (data) {
      return data.json();
    })
    .then(function (data) {
      var prevSearch = JSON.stringify(data);
      localStorage.setItem("foodInput", prevSearch);
      selectFood(recipeIndex);
      // console.log(data);
      // var foodArray = data.hits[0].recipe.ingredientLines;
      // var foodName = data.hits[0].recipe.label;
      // var foodImg = data.hits[0].recipe.image;
      // displayIngrList(foodArray, foodName);
      // displayImage(foodImg);
    });
}
function selectFood(recipeIndex){
  var data = JSON.parse(localStorage.getItem("foodInput"));
  console.log(data);
  console.log(recipeIndex);
  var foodArray = data.hits[recipeIndex].recipe.ingredientLines;
  var foodName = data.hits[recipeIndex].recipe.label;
  var foodImg = data.hits[recipeIndex].recipe.image;
  document.getElementById("prevFood").disabled = false;
  document.getElementById("nextFood").disabled = false;
  if(!foodArray[recipeIndex-1]){
    //disable prevBtn
    document.getElementById("prevFood").disabled = true;
  }
  if(!foodArray[recipeIndex+1]){
    //disable nextBtn
    document.getElementById("nextFood").disabled = true;
  }
  // console.log(!!foodArray[recipeIndex-1]);
  displayIngrList(foodArray, foodName);
  displayImage(foodImg);
}

function callDrinkAPI() {
  recipeIndex = 0;
  // var drinkInput = $(this).parent().siblings("input").val();
  var drinkInput = $(this).siblings("input").val();
  console.log("Drink button click, search: " + drinkInput);
  var drinksApi = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + drinkInput;
  // var drinksApi = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita";
  fetch(drinksApi)
  .then(function (data) {
    return data.json();
  })
  .then(function (data){
    var prevSearch = JSON.stringify(data);
    console.log(data);
    localStorage.setItem("drinkInput", prevSearch);
    selectDrink(recipeIndex);
    // var drinkArray = data;
    // console.log(drinkArray);
    // // console.log(drinkArray.drinks);
    // // console.log(drinkArray.drinks[0]);
    // createDrinkArray(drinkArray.drinks[0]);
  })
}
function selectDrink(recipeIndex){
  var data = JSON.parse(localStorage.getItem("drinkInput"));
  var drinkArray = data;
  console.log(drinkArray);
  document.getElementById("prevDrink").disabled = false;
  document.getElementById("nextDrink").disabled = false;
  if(!drinkArray.drinks[recipeIndex-1]){
    //disable prevBtn
    document.getElementById("prevDrink").disabled = true;
  }
  if(!drinkArray.drinks[recipeIndex+1]){
    //disable nextBtn
    document.getElementById("nextDrink").disabled = true;
  }
  // console.log(drinkArray.drinks);
  // console.log(drinkArray.drinks[0]);
  createDrinkArray(drinkArray.drinks[recipeIndex]);
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
  displayIngrList(ingredientList, drinkName);
  displayImage(drinkImg);
}


function displayImage(imgLink) {
  // console.log(imgLink);
  var image = document.createElement("img");
  image.setAttribute("src", imgLink);
  // image.setAttribute("class", "float-right");
  document.querySelector("#img-holder").appendChild(image);
}
function displayIngrList(ingrArray, name) {
  clearCurrentDisplay();
  $("#food-name").text(name);
  for (var i = 0; i < ingrArray.length; i++) {
    // console.log(ingrArray[i]);
    $("#ingList").append("<li class='ingTest'></li>");
    $(".ingTest").text(ingrArray[i]);
    $(".ingTest").removeClass("ingTest");
  }
}
function clearCurrentDisplay(){
  var imgParent = document.querySelector("#img-holder");
  if(imgParent){
    while(imgParent.hasChildNodes()){
      let imgEl = imgParent.firstChild;
      imgParent.removeChild(imgEl);
    }
  } 
  var parentNode = document.querySelector("#ingList");
  if(parentNode){
    while(parentNode.hasChildNodes()){
      let childNode = parentNode.firstChild;
      parentNode.removeChild(childNode);
    }
  }
}

$("#btnFood").on("click", "button", callFoodAPI);
$("#btnDrink").on("click", "button", callDrinkAPI);
$("#nextFood").on("click", function(){
  recipeIndex++;
  selectFood(recipeIndex);
});
$("#prevFood").on("click", function(){
  recipeIndex--;
  selectFood(recipeIndex);
});
$("#nextDrink").on("click", function(){
  recipeIndex++;
  selectDrink(recipeIndex);
});
$("#prevDrink").on("click", function(){
  recipeIndex--;
  selectDrink(recipeIndex);
});