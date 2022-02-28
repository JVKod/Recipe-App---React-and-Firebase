import logo from './logo.svg';
import './App.css';
import { auth, db } from './firebaseConfig';
import { useState, useEffect } from 'react';
import { Recipe } from './components/recipe';
import Header from './components/Header';

function App() {

  const [recipeSteps, setRecipeSteps] = useState([]);
  const [recipeNames, setRecipeNames] = useState([]);
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [recipeAmounts, setRecipeAmounts] = useState([]);
  const [recipeList, setRecipeList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  const getRecipeNames = async () => {
    await db.collection("recipes").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) =>{
        setRecipeNames(recipeNames => [...recipeNames, doc.data().name]);
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
  }

  const createRecipeObjects = () => {
    if (recipeList.length > 0){
      console.log(recipeList);
      return;
    }
    for(let i = 0; i < 3; i++){
      let x = Recipe(recipeNames[i], recipeIngredients[i], recipeAmounts[i], recipeSteps[i]);
      setRecipeList(recipeList => [...recipeList, x]);
    }
  console.log(recipeList);
  }

  const searchArray = (e) => {
    let arrayx = [];
    for(let i = 0; i < 3; i++){
      arrayx.push(Object.values(recipeList[i].ingredients).filter(el => el.includes(searchTerm)));
    }
    console.log(arrayx);
    e.preventDefault();
  }

  const outputToConsole = () => {
    console.log(recipeNames);
    console.log(recipeSteps);
    console.log(recipeIngredients);
    console.log(recipeAmounts);
  }

  // recipe component
  const RecipeComponent = () => {
    
    return (
      <div className='recipe'>
        <span className='recipeName'>{recipeNames[0]}</span>
        <span className='recipeName'>{recipeNames[1]}</span>
        <span className='recipeName'>{recipeNames[2]}</span>
      </div>
    )
  };

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
        <RecipeComponent></RecipeComponent>
    </div>
    </>

  )
}

export default App;
