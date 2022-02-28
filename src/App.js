import './App.css';
import Header from './components/Header';
import { auth, db, firebaseConfig } from './firebaseConfig';
import SearchBar from './components/SearchBar';
import { useState, useEffect } from 'react';
import { Recipe } from './components/recipe';

function App() {

  const [recipeSteps, setRecipeSteps] = useState([]);
  const [recipeNames, setRecipeNames] = useState([]);
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [recipeAmounts, setRecipeAmounts] = useState([]);
  const [recipeList, setRecipeList] = useState([]);

  //useEffect(() => {
    //test2();

  //}, [recipeIDList]);

  const testFunction = () => {
    const query = db.collectionGroup("ingredients");
    query.get().then(querySnapshot => { 
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
        });
    });
  }

  const test2 = () => {
    //for (let i = 0; i < recipeIDList.length; i++){
      //db.collection("recipes").doc(recipeIDList[i]).get()
    //}
    console.log(recipeNames);
  }

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
          /*for(let x = 0; x < doc.length; x++){

            let item = doc.data().x
            setRecipeIngredients(recipeIngredients => [...recipeIngredients, {}]);
          }*/
          
        });
      });
    } 
  }

  const createRecipeObjects = () => {
    for(let i = 0; i < 3; i++){
      let x = Recipe(recipeNames[i], recipeIngredients[i], recipeAmounts[i], recipeSteps[i]);
      setRecipeList(recipeList => [...recipeList, x]);
    }
    console.log(recipeList);

  }

  const outputToConsole = () => {
    console.log(recipeNames);
    console.log(recipeSteps);
    console.log(recipeIngredients);
    console.log(recipeAmounts);
  }

  return (
    <div className='AppContainer'>
      <Header>
      </Header>
      <SearchBar></SearchBar>
      <>
        <button onClick={getRecipeNames}>click</button>
        <button onClick={outputToConsole}>console</button>
        <button onClick={createRecipeObjects}>Create List</button>
      </>
    </div>
    
  );
}

export default App;
