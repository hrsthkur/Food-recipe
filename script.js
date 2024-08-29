const searchbtn = document.querySelector(".searchBtn");
const searchbox = document.querySelector(".SearchBox");
const recipecontainer = document.querySelector(".recipecontainer")
const recipeDetailsContent = document.querySelector(".recipe-details-content")
const recipeCloseBtn = document.querySelector(".recipe-close-btn")

const fetchRecipes = async(query) => {
    recipecontainer.innerHTML = "<h2> Finding Recipes.... </h2?"
    try {
        
    
    const data = await fetch(`https:www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response =await data.json();
    recipecontainer.innerHTML = ""
    response.meals.forEach(element => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
        <img src="${element.strMealThumb}">
        <h3>${element.strMeal}</h3>
        <p><span>${element.strArea} </span> Dish</p>
        <p> Belongs to <span>${element.strCategory}</span> Category</p>
        
        `
        const button = document.createElement('button')
        button.textContent = "View Recipe";
        recipeDiv.appendChild(button);
        button.addEventListener("click", () => {
            openRecipePopup(element);
        })



        recipecontainer.appendChild(recipeDiv)
    });
} catch (error) {
          recipecontainer.innerHTML = "<h2> Error in Finding Recipes </h2?"
}


}

const fetchIngridients = (meal) => {
    let Ingredientlist = "";
    for(let i=1; i<=20; i++){
        const ingridient = meal[`strIngredient${i}`];
        if(ingridient) {
            const measure = meal[`strMeasure${i}`];
            Ingredientlist += `<li>${measure} ${ingridient}</li>`
        }
        else break;
    }
    

    return Ingredientlist;
}

const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = ` 
    <h2 class = "recipeName" > ${meal.strMeal}</h2>
    <h3> Ingredients:</h3>
    <ul class = "IngredientList" >${fetchIngridients(meal)}</ul>
    <div class = "recipeInstruction">
    <h3>Instructions:</h3>
    <p  >${meal.strInstructions}</p>
    </div>
    
    `
    
    
    recipeDetailsContent.parentElement.style.display = "block"
}

recipeCloseBtn.addEventListener("click", () => {
    recipeDetailsContent.parentElement.style.display = "none";
})
searchbtn.addEventListener("click",(e) => {
    e.preventDefault();
    const searchInput = searchbox.value.trim();
    if(!searchInput) {
        recipecontainer.innerHTML = `<h2>Type the meal you want to search </h2>`
    return;
    }
    fetchRecipes(searchInput)

})