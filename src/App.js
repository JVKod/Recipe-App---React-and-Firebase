import logo from './logo.svg';
import './App.css';
<<<<<<< HEAD
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipeList from "./components/RecipeList";
import RecipeDisplay from "./components/RecipeDisplay";
import FavouritesDisplay from './components/FavouritesDisplay';
import FormFilter from './components/FormFilter';
import SearchBar from './components/SearchBar';
import { useEffect, useState, useRef } from 'react';
import Modal from 'react-bootstrap/Modal'
import { Form, Button, Card, Alert } from "react-bootstrap"
import { signup, login, logout, useAuth } from "./firebaseConfig";


function App() {
  
  //local list of recipe objects
  const [recipeList, setRecipeList] = useState([]);
  const [listFetched, setListFetched] = useState(false);
=======
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
>>>>>>> 17b793d3f9af89127fbdd99054c6c153c8fb5804
  //used with filtering from searches
  const [filteredList, setFilteredList] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

<<<<<<< HEAD
  //for auth user
  const [loading, setLoading] = useState(false);
  const currentUser = useAuth();
  const emailRef = useRef()
  const passwordRef = useRef()
  const signUpEmailRef = useRef()
  const signUpPasswordRef = useRef()
  const passwordConfirmRef = useRef()
  const [error, setError] = useState("")

  //show modal login and signup page
  const [show, setShow] = useState(false);
  const [signUpShow, setsignUpShow] = useState(false);

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



  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true)
    setsignUpShow(false)
  }
  const handleSignUpClose = () => setsignUpShow(false);
  const handleSignUpShow = () => {
    setShow(false);
    setsignUpShow(true)
  }
  async function handleSignup(e) {
    setLoading(true);
    e.preventDefault();
    if (signUpPasswordRef.current.value !== passwordConfirmRef.current.value) {
        return setError("Passwords do not match")
      }
        try {
            setError("")
            setLoading(true)
         await  signup(signUpEmailRef.current.value, signUpPasswordRef.current.value)
        } catch(error) {
            var errorMessage = error.message;
            console.log(errorMessage);
            setError('Failed to create the account')
        }
   alert('registered successfully');
   setLoading(false);
   setsignUpShow(false)
  }

  async function handleLogin() {
    setLoading(true);
    try {
      await login(emailRef.current.value, passwordRef.current.value);
      console.log('success login')
      setShow(false)
    } catch {
      var errorMessage = error.message;
      console.log(errorMessage);
      setError("Failed to log in")
    }
    setLoading(false);

  }

  async function handleLogout() {
    setLoading(true);
    try {
      await logout();
    } catch {
      alert("Error!");
    }
    setLoading(false);
=======
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
      let x = Recipe(recipeNames[i], recipeIngredients[i], recipeAmounts[i], recipeSteps[i], recipeTags[i], );
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
>>>>>>> 17b793d3f9af89127fbdd99054c6c153c8fb5804
  }

  //debug function
  const outputToConsole = () => {
<<<<<<< HEAD
    console.log(recipeList);
  }

  const debugRetrieve = () => {
    setRecipeList([]);
    RecipeList().then(value => setRecipeList(value))
        .then(() => {
          setListFetched(true);
          window.localStorage.setItem("RecipeList", JSON.stringify(recipeList));
        });
=======
    console.log(recipeNames);
    console.log(recipeSteps);
    console.log(recipeIngredients);
    console.log(recipeAmounts);
  }

  //recipe component
  const RecipeComponent = () => {
    //check if a filteredList from searching exists
    if(!isFiltered){
      //this takes the name property from every object in the recipeList and returns them
      return recipeList.map(({name, tags}) => (
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
      return filteredList.map(({name, tags}) => (
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

  //favourites box
  const FavouritesComponent = () => {
    return (
      <div className='favouriteBox'>Favourite Recipes</div>
    );
  }

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
>>>>>>> 17b793d3f9af89127fbdd99054c6c153c8fb5804
  }

  return (
    <>
<<<<<<< HEAD
      <div className='appContainer'>
        
          <Header/>
          <div id="main">
      {currentUser && <div>Logged in as: {currentUser?.email} </div>}
          

          {/*   <div id="fields">
        <input ref={emailRef} placeholder="Email" />
        <input ref={passwordRef} type="password" placeholder="Password" />
      </div>

      <button disabled={ loading || currentUser } onClick={handleSignup}>Sign Up</button>
      <button disabled={ loading || currentUser } onClick={handleLogin}>Log In</button> */}
           {currentUser &&<button disabled={loading || !currentUser} onClick={handleLogout}>Log Out</button>}

        </div>

        <button onClick={handleShow}>
          Log In
        </button>

                                            {/* - - Login Modal - - */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>

          </Modal.Header>
          <Modal.Body>
            <Card>
              <Card.Body>
                <h2 className="text-center mb-4">Log In</h2>

                <Form>
                  <Form.Group id="email">
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form.Label>Email</Form.Label>
                    <Form.Control ref={emailRef} placeholder="Email" type="email" required />
                  </Form.Group>
                  <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control ref={passwordRef} type="password" placeholder="Password" required />
                  </Form.Group>
                  <Button className="w-100" onClick={handleLogin}>
                    Log In
                  </Button>
                </Form>

              </Card.Body>
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <div className="w-100 text-center mt-2">
              <span onClick={handleSignUpShow}>Need an account? Sign Up</span>
            </div>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
                                {/* - - - End of Login Modal - - -  */}


                                      {/* - - SignUp Modal - - */}
        <Modal show={signUpShow} onHide={handleSignUpClose}>
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
            <Card>
              <Card.Body>

                <h2 className="text-center mb-4">Sign Up</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form>
                  <Form.Group id="email">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" ref={signUpEmailRef} required />
                  </Form.Group>
                  <Form.Group id="password">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" ref={signUpPasswordRef} required />
                  </Form.Group>
                  <Form.Group id="passwordConfirmation">
                    <Form.Label>Confirm Password:</Form.Label>
                    <Form.Control type="password" ref={passwordConfirmRef} required />
                  </Form.Group>
                  <Button disabled={loading} className="w-100" onClick={handleSignup}>Sign Up</Button>
                </Form>

              </Card.Body>
            </Card></Modal.Body>
          <Modal.Footer>
         
            <div className="w-100 text-center mt-2">
            <span onClick={handleShow}>Already have an account? Log In</span>
            </div>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>

          </Modal.Footer>
        </Modal>
          <button onClick={outputToConsole}>debug</button>
          <button onClick={debugRetrieve}>redownload data</button>

                                      {/* - - - End of Signup Modal - - -  */}

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
=======
    <div className='appContainer'>
      <Header></Header>
      <div>
        <button onClick={getRecipeNames}>retrieve data from database</button>
        <button className='topBtns' onClick={outputToConsole}>output to console</button>
        <button className='topBtns' onClick={createRecipeObjects}>Create Recipe List</button>
        <button className='topBtns'>Sign Up for an Account</button>
      </div>
      <form onSubmit={ e => {searchArray(e)}}>
        <input
          name="search"
          type="text"
          value={searchTerm}
          onChange={ e => setSearchTerm(e.target.value)}
          className="searchBar"
        />
        <input className="searchBtn" type="submit" value="search"></input>
      </form>
      <button className="resetBtn" onClick={() => {setIsFiltered(false)}}>reset search</button>

        <RecipeComponent/>
        <FavouritesComponent/>
    </div>
    </>

  )
>>>>>>> 17b793d3f9af89127fbdd99054c6c153c8fb5804
}

export default App;
