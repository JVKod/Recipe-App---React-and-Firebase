//recipe component
const RecipeDisplay = (props) => {
    //check if a filteredList from searching exists
<<<<<<< HEAD

=======
>>>>>>> 00208cf914e848a6322136bf4592edba3f3e0997
    if(!props.isFiltered){
      //this takes the name property from every object in the recipeList and returns them
      return props.recipeList.map(({name, tags}) => (
        <div key={name} className='recipe'>
          <li key={name} className='recipeName'>
            {name}
          </li>
          <li key={tags} className='tags'>
            {tags}
          </li> 
          <div className='recipeCompBtnContainer'>
            <button className="urlBtn">See Full Recipe</button>
            <button className="urlBtn">Save to Favourites</button>
            <button className="urlBtn">Share</button>
          </div>
        </div>)
      );
    }

    else{
      //checks filteredList instead of RecipeList to exclude things not related to search
      return props.filteredList.map(({name, tags}) => (
        <div key={name} className='recipe'>
          <li key={name} className='recipeName'>
            {name}
          </li>
          <li key={tags} className='tags'>
            {tags}
          </li>
          <div className='recipeCompBtnContainer'>
            <button className="urlBtn">See Full Recipe</button>
            <button className="urlBtn">Save to Favourites</button>
            <button className="urlBtn">Share</button>
          </div>
        </div>)
      );
    }
  };

  export default RecipeDisplay;