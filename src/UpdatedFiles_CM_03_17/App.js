import './App.css';
import Header from './components/Header';
import Signup from "./components/Signup";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
//import { auth, db } from './firebaseConfig';
import { useEffect, useState } from 'react';
//import { Link, useNavigate } from "react-router-dom";
import RecipeList from "./components/RecipeList";
import SearchArray from './components/SearchArray';
import RecipeDisplay from "./components/RecipeDisplay";
import FavouritesDisplay from './components/FavouritesDisplay';


function App() {
  
  //local list of recipe objects
  const [recipeList, setRecipeList] = useState([]);
  const [listFetched, setListFetched] = useState(false);
  //the search string
  const [searchTerm, setSearchTerm] = useState('');
  //used with filtering from searches
  const [filteredList, setFilteredList] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    if(!listFetched){
      RecipeList().then(value => setRecipeList(value))
      .then(() => setListFetched(true));
      
    }
  });

  //debug function
  const outputToConsole = () => {
    console.log(recipeList);
  }
  
  return (
    <>
      <div className='appContainer'>
        
          <Header/>
          <button onClick={outputToConsole}>debug</button>
          <form onSubmit={ e => {
            setFilteredList([]);
            setFilteredList(SearchArray(e, recipeList, searchTerm));
            setIsFiltered(true);
            }}>
            <input
              name="search"
              type="text"
              value={searchTerm}
              onChange={ e => setSearchTerm(e.target.value)}
              className="searchBar"
            />
            <input className="searchBtn" type="submit" value="search"></input>
          </form>
          <button className="resetBtn" onClick={() => {setIsFiltered(false); setSearchTerm('');}}>reset search</button>
          
          
          {listFetched ? //this displays the word "loading" if false and the components if true
          (<><RecipeDisplay recipeList={recipeList} isFiltered={isFiltered} filteredList={filteredList} /><FavouritesDisplay /></>)
            :
            (<div>Loading</div>) //this can be styled to look better, just a placeholder - Chris
        }

          <Container
            className="d-flex align-items-center
            justify-content-center" style={{ minHeight: "100vh" }}>
            <div className="w-100" style={{ maxWidth: '400px' }}>
            
            <Router>
                <AuthProvider>
                  <Routes>
                    <Route
                        path="/"
                        element={
                          <PrivateRoute>
                            <Dashboard />
                          </PrivateRoute>
                        }
                      />              
                    <Route path="/signup" element={<Signup />} ></Route>
                    <Route path="/login" element={<Login />} ></Route>
                  </Routes>
                </AuthProvider>
              </Router>
            </div>
          </Container>
        
      </div>
    </>
  );
}

export default App;
