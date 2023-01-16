import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FacebookIcon, TwitterIcon } from "react-share";
import {auth, db} from "../firebaseConfig"
import firebase from 'firebase/compat/app';
import { signup, login, logout, useAuth } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore"; 

//recipe component
const RecipeDisplay = (props) => {
    //check if a filteredList from searching exists
    const currentUser = useAuth();
    const handleFavourite = (id, image) => {
      console.log("this is the id: "+ id);
      if(image == 'https://www.maiz.in/wp-content/uploads/2020/10/generic-food-icon.png'){
        console.log("User Recipes cannot be favourited");
        return;
      }
      

      //evaluate if recipe already exist in the favouriteArray
      var index = props.favouritesList.findIndex(x => x.id == id);

      index === -1 ? props.setFavouritesList(prevState => [...prevState, props.recipeList[id-1]]) : console.log("object already exists");
      //adds favourite recipe id to the users firebase favourite field
      if(currentUser){
        db.collection('users').doc(firebase.auth().currentUser.uid).set({
        favourites: firebase.firestore.FieldValue.arrayUnion(id)}, {merge: true});
      }

      //console.log(props.favouritesList);
      //console.log(props.recipeList[id]);
      //console.log(currentUser.email);

      
    };

    function hideRecipe(id) {
      var recDiv = document.getElementById(id);
        recDiv.style.display = "none";
    }

    if(!props.isFiltered){
      //this takes the name property from every object in the recipeList and returns them
      return [props.recipeList.map(({
        id,
        name, 
        tags, 
        prepTime, 
        totalTime, 
        allergens, 
        caloriesPerServing,
        cost,
        difficulty,
        url,
        vegan,
        video,
        image,
        nutrition,
        ingredients2,
        steps2
      }) => (
        <div id={id} className='recipe'>

          <li key={id+name} className='recipeName'>
            {name}
          </li>

          <img src={image} width="260" height="200" className="image"/>

          <li key={id+tags} className='tags'>
            Tags: {tags}
          </li> 

          <li key={id+prepTime} className='tags'>
            Prep Time: {prepTime}
          </li> 
          
          <li key={id+totalTime} className='tags'>
            Total Cooking Time: {totalTime}
          </li> 

          <li key={id+allergens} className='tags'>
            Allergens: {allergens}
          </li> 

          <li key={id+caloriesPerServing} className='tags'>
            Calories: {caloriesPerServing}
          </li> 

          <li key={id+nutrition} className='tags'>
            Nutrition Info: {nutrition}
          </li>

          <li key={id+"cost:"+cost} className='tags'>
            Cost: {cost}
          </li> 

          <li key={id+"difficulty:"+difficulty} className='tags'>
            Difficulty: {difficulty}
          </li> 

          <li key={id+vegan} className='tags'>
            Vegan: {vegan}
          </li> 

          <li key={id+ingredients2} className='tags'>
            Ingredients: {ingredients2}
          </li> 

          <li key={id+url} className='tags'>
            <a href={url}>Link to Full Recipe</a>
          </li> 

          <li key={id+video} className='tags' >
            <a href={video}>Video of "Similar" Recipe from YouTube</a>
          </li> 

          <button className="span2" tabIndex="0">Show Steps</button>

          <p className="alert" key={id+steps2}>
            Steps: {steps2}
          </p>

          <div className='recipeCompBtnContainer'>
            <button className="urlBtn" onClick={() => handleFavourite(id, image)}>Save to Favourites</button>
            <button className="urlBtn" onClick={() => hideRecipe(id)}>Hide Recipe</button>

            <FacebookShareButton //key={url}
              url={ url }
              quote={"Fast and easy recipe!"}
              hashtag={"#recipeapp"}
            >
            <FacebookIcon size={32} round />
            </FacebookShareButton>

            <TwitterShareButton //key={url}
              url={ url }
              quote={"Fast and easy recipe!"}
              hashtag={"#recipeapp"}
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>

          </div>
        </div>)
      )]
    }

    else{
      //checks filteredList instead of RecipeList to exclude things not related to search
      return props.filteredList.map(({
        id, 
        name, 
        tags, 
        prepTime, 
        totalTime, 
        allergens, 
        caloriesPerServing,
        cost,
        difficulty,
        url,
        vegan,
        video,
        image,
        nutrition,
        ingredients2,
        steps2
      }) => (
        <div id={id} className='recipe'>

          <li  className='recipeName'>
            {name}
          </li>

          <img src={image} width="260" height="200" className="image"/>

          <li  className='tags'>
            Tags: {tags}
          </li>

          <li  className='tags'>
            Prep Time: {prepTime}
          </li> 
          
          <li  className='tags'>
            Total Cooking Time: {totalTime}
          </li> 

          <li  className='tags'>
            Allergens: {allergens}
          </li> 

          <li  className='tags'>
            Calories: {caloriesPerServing}
          </li> 

          <li key={id+nutrition} className='tags'>
            Nutrition Info: {nutrition}
          </li>

          <li  className='tags'>
            Cost: {cost}
          </li> 

          <li  className='tags'>
            Difficulty: {difficulty}
          </li> 

          <li  className='tags'>
            Vegan: {vegan}
          </li> 

          <li key={id+ingredients2} className='tags'>
            Ingredients: {ingredients2}
          </li> 

          <li  className='tags'>
            <a href={url}>Link to Full Recipe</a>
          </li> 

          <li  className='tags'>
            <a href={video}>Video of "Similar" Recipe from YouTube</a>
          </li> 

          <button className="span2" tabIndex="0">Show Steps</button>

          <p className="alert" key={id+steps2}>
            Steps: {steps2}
          </p>
          
          <div className='recipeCompBtnContainer'>
            <button className="urlBtn" onClick={() => handleFavourite(id, image)}>Save to Favourites</button>
            <button className="urlBtn" onClick={() => hideRecipe(id)}>Hide Recipe</button>

            <FacebookShareButton
              url={ url }
              quote={"Fast and easy recipe!"}
              hashtag={"#recipeapp"}
            >
            <FacebookIcon size={32} round />
            </FacebookShareButton>

            <TwitterShareButton 
              url={ url }
              quote={"Fast and easy recipe!"}
              hashtag={"#recipeapp"}
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>
          </div>
        </div>)
      );
    }
  };

  export default RecipeDisplay;