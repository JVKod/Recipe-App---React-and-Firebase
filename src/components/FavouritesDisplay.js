import React, { useState } from "react";

const FavouritesDisplay = (props) => {
  //console.log("this is the favouriteList: " + props.favouriteList);

  if(props.favouritesList == null || props.favouritesList == "[]"){
    return;
  }
  return [
      <div className='recipeContainer'>
        <h1 className="favRecipeTitle">Favourite Recipes</h1>
        {props.favouritesList.map(({
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
          steps2
        }) => {
          return(
          <div  className='recipe'>

            <li key={id+name} className='recipeName'>
              {name}
            </li>
            
            <img src={image} width="250" height="200" className="image"/>

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

            <span className="span2" tabIndex="0">Show Steps</span>

            <p className="alert" key={id+steps2}>
              Steps: {steps2}
            </p>

            <li key={id+url} className='tags'>
              <a href={url}>Link to Full Recipe</a>
            </li> 

            <li key={id+video} className='tags'>
              <a href={video}>Video of "Similar" Recipe from YouTube</a>
            </li>

          </div>
        )})}
      </div>
    
  ]
}

  export default FavouritesDisplay;