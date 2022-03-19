import './App.css';
import Header from './components/Header';
// import Signup from "./components/Signup";
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Container } from "react-bootstrap";
// import { AuthProvider } from './contexts/AuthContext';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./components/Login";
// import Dashboard from "./components/Dashboard";
// import PrivateRoute from "./components/PrivateRoute";
//import { auth, db } from './firebaseConfig';
import { useEffect, useState } from 'react';
//import { Link, useNavigate } from "react-router-dom";
import RecipeList from "./components/RecipeList";
//import SearchArray from './components/SearchArray';
import RecipeDisplay from "./components/RecipeDisplay";
import FavouritesDisplay from './components/FavouritesDisplay';
import FormFilter from './components/FormFilter';
import SearchBar from './components/SearchBar';


function App() {
  
  //local list of recipe objects
  const [recipeList, setRecipeList] = useState([]);
  const [listFetched, setListFetched] = useState(false);
  //used with filtering from searches
  const [filteredList, setFilteredList] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  //this runs at startup
  //if the list has not been fetched, we attempt to get a json object stored in the window
  //if that returns null, there is no object and we run the code that grabs everything from the database
    //then we assign it to the recipeList state variable and save that as a json object in the window
  //if that returns with an object, we assign it to our recipeList variable
  useEffect(() => {
    console.log("in useEffect");
    if(!listFetched){
      let localStorageRecipeList = window.localStorage.getItem('RecipeList');
      if(localStorageRecipeList == null){
        console.log("in localStorageRecipeList == null");
        RecipeList().then(value => setRecipeList(value))
        .then(() => {
          console.log("in .then");
          setListFetched(true);
          window.localStorage.setItem("RecipeList", JSON.stringify(recipeList));
          localStorageRecipeList = recipeList;
          });
        } 
        else{
          console.log("in else");
          setRecipeList(JSON.parse(localStorageRecipeList));
          setListFetched(true);
        }
      }
    }, []);

  //debug function
  const outputToConsole = () => {
    console.log(recipeList);
  }

  const debugRetrieve = () => {
    setRecipeList([]);
    RecipeList().then(value => setRecipeList(value))
        .then(() => {
          setListFetched(true);
          window.localStorage.setItem("RecipeList", JSON.stringify(recipeList));
        });
  }

  return (
    <>
      <div className='appContainer'>
        
          <Header/>
          <button onClick={outputToConsole}>debug</button>
          <button onClick={debugRetrieve}>redownload data</button>

          <SearchBar recipeList={recipeList} setFilteredList={setFilteredList} setIsFiltered={setIsFiltered} />
          <FormFilter recipeList={recipeList} filteredList={filteredList} setFilteredList={setFilteredList} setIsFiltered={setIsFiltered}/>
          
          {listFetched ? //this displays the word "loading" if false and the components if true
          (<><RecipeDisplay recipeList={recipeList} isFiltered={isFiltered} filteredList={filteredList}/><FavouritesDisplay /></>)
            :
            (<div>Loading</div>) //this can be styled to look better, just a placeholder - Chris
        }
        
      </div>
    </>
  );
}

export default App;
