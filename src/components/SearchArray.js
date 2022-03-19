  /*searching function
  this creates an array of booleans that correlate 1:1 with the recipe list. 
  true if search term is included, false if search term is not included*/
<<<<<<< HEAD
  const SearchArray = (recipeList, searchTerm) => {
=======
  const SearchArray = (e, recipeList, searchTerm) => {
>>>>>>> 00208cf914e848a6322136bf4592edba3f3e0997
    let arrayx = [];
    let filteredArray = [];
    //for each recipe object...
    for(let i = 0; i < recipeList.length; i++){
      //...checks if the search term is included in ingredients, tags, or names
      if (
         Object.values(recipeList[i].ingredients).filter(el => el.includes(searchTerm)).length !== 0
      || recipeList[i].tags.includes(searchTerm)
      || recipeList[i].name.includes(searchTerm)) {
        arrayx.push(true);
      }
      else {
        arrayx.push(false);
      }
    }
    console.log(arrayx);
<<<<<<< HEAD
    
=======
    //stops "submit" from refreshing the page
>>>>>>> 00208cf914e848a6322136bf4592edba3f3e0997
    
    for(let i = 0; i < recipeList.length; i++){
        if(arrayx[i]){
            filteredArray = [...filteredArray, recipeList[i]];
        }
    }
<<<<<<< HEAD

    //stops "submit" from refreshing the page
=======
    //setIsFiltered(true);
    
    e.preventDefault();
>>>>>>> 00208cf914e848a6322136bf4592edba3f3e0997
    console.log(filteredArray);

    return filteredArray;
    }


  export default SearchArray;