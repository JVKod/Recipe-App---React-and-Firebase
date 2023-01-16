  /*searching function
  this creates an array of booleans that correlate 1:1 with the recipe list. 
  true if search term is included, false if search term is not included*/
  const SearchArray = (recipeList, searchTerm) => {
    let arrayx = [];
    let filteredArray = [];
    //for each recipe object...
    for(let i = 0; i < recipeList.length; i++){
      //...checks if the search term is included in ingredients, tags, or names
      let lowerCaseIngredients = recipeList[i].ingredients2.toLowerCase();
      searchTerm = searchTerm.toLowerCase();
      if (
        lowerCaseIngredients.includes(searchTerm)
      || recipeList[i].tags.includes(searchTerm)
      || recipeList[i].name.includes(searchTerm)) {
        arrayx.push(true);
      }
      else {
        arrayx.push(false);
      }
    }
    console.log(arrayx);
    
    
    for(let i = 0; i < recipeList.length; i++){
        if(arrayx[i]){
            filteredArray = [...filteredArray, recipeList[i]];
        }
    }

    return filteredArray;
    }


  export default SearchArray;