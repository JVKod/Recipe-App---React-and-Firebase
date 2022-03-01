import logo from './logo.svg';
import './App.css';
import { auth, db } from './firebaseConfig';
import { useState, useEffect } from 'react';
import { Recipe } from './components/recipe';
import Header from './components/Header';

function App() {
  
  //used with retrieval of data from database
  const [recipeSteps, setRecipeSteps] = useState([]);
  const [recipeNames, setRecipeNames] = useState([]);
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [recipeAmounts, setRecipeAmounts] = useState([]);
  const [recipeTags, setRecipeTags] = useState([]);
  //local list of recipe objects
  const [recipeList, setRecipeList] = useState([]);
  //the search string
  const [searchTerm, setSearchTerm] = useState('');
  //used with filtering from searches
  const [filteredList, setFilteredList] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  //////////////////retrieving data from database functions//////////////////////

  const getRecipeNames = async () => {
    await db.collection("recipes").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) =>{
        setRecipeNames(recipeNames => [...recipeNames, doc.data().name.toLowerCase()]);
        //console.log(doc.data());
      });
      getRecipeSteps();
    });
  }

  const getRecipeSteps = async () => {
    for(let i = 1; i < 4; i++){
      await db.collection("recipes").doc(i.toString()).collection("steps").get().then((querySnapshot) =>{
        querySnapshot.forEach((doc) => {
          //console.log(doc.id, ' => ', doc.data());
          setRecipeSteps(recipeSteps => [...recipeSteps, doc.data()]);
        });
      });
    }
    getRecipeIngredients();
  }

  const getRecipeIngredients = async () => {
    for(let i = 1; i < 4; i++){
      await db.collection("recipes").doc(i.toString()).collection("ingredients").get().then((querySnapshot) =>{
        querySnapshot.forEach((doc) => {
          //console.log(doc.id, ' => ', doc.id);
          if (doc.id === 'items'){
            setRecipeIngredients(recipeIngredients => [...recipeIngredients, doc.data()]);
          }
          if (doc.id === 'amounts'){
            setRecipeAmounts(recipeAmounts => [...recipeAmounts, doc.data()]);
          }
        });
      });
    }
    getRecipeTags(); 
  }

  const getRecipeTags = async () => {
    for(let i = 1; i < 4; i++){
      await db.collection("recipes").get().then((querySnapshot) =>{
        querySnapshot.forEach((doc) => {
          //console.log(doc.id, ' => ', doc.data());
          setRecipeTags(recipeTags=> [...recipeTags, doc.data().tags.toLowerCase()]);
        });
      });
    }
  }

  //////////////////ends//////////////////////

  //creates the master list of recipes
  const createRecipeObjects = () => {
    //ensures no double list writing + debug functions
    if (recipeList.length > 0){
      console.log(recipeList);
      return;
    }
    for(let i = 0; i < recipeNames.length; i++){
      let x = Recipe(recipeNames[i], recipeIngredients[i], recipeAmounts[i], recipeSteps[i], recipeTags[i]);
      setRecipeList(recipeList => [...recipeList, x]);
    }
  }

  /*searching function
  this creates an array of booleans that correlate 1:1 with the recipe list. 
  true if search term is included, false if search term is not included*/
  const searchArray = (e) => {
    let arrayx = [];
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
    //stops "submit" from refreshing the page
    e.preventDefault();
    filterList(arrayx);
  }

  //debug function
  const outputToConsole = () => {
    console.log(recipeNames);
    console.log(recipeSteps);
    console.log(recipeIngredients);
    console.log(recipeAmounts);
  }

  // recipe component
  const RecipeComponent = () => {
    //check if a filteredList from searching exists
    if(!isFiltered){
      //this takes the name property from every object in the recipeList and returns them
      return recipeList.map(({name}) => (<div key={name} className='recipe'><li key={name} className='recipeName'>{name}</li></div>));
    }
    else{
      //checks filteredList instead of RecipeList to exclude things not related to search
      return filteredList.map(({name}) => (<div key={name} className='recipe'><li key={name} className='recipeName'>{name}</li></div>));
    }
  };

  //creates the filteredList array, called in searchArray()
  //if the arrayx argument is true, add from recipeList to filteredList
  const filterList = (arrayx) => {
    setFilteredList([]);
    for(let i = 0; i < recipeList.length; i++){
      if (arrayx[i]){
        setFilteredList(filteredList => [...filteredList, recipeList[i]]);
      }
    }
    setIsFiltered(true);
  }

  return (
    <>
    <div className='appContainer'>
      <Header></Header>
      <button onClick={getRecipeNames}>retrieve data from database</button>
      <button onClick={outputToConsole}>output to console</button>
      <button onClick={createRecipeObjects}>Create Recipe List</button>
      <form onSubmit={ e => {searchArray(e)}}>
        <input
          name="search"
          type="text"
          value={searchTerm}
          onChange={ e => setSearchTerm(e.target.value)}
          className="searchBar"
        />
        <input type="submit" value="search"></input>
      </form>
      <button onClick={() => {setIsFiltered(false)}}>reset search</button>

        <RecipeComponent/>
    </div>
    </>

  )
}

export default App;
