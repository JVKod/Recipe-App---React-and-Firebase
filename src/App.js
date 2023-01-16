import './App.css';
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
import { signup, login, logout, useAuth, auth, db } from "./firebaseConfig";
import GroceryList from "./components/GroceryList";
import NewRecipeForm from "./components/NewRecipeForm";
import firebase from 'firebase/compat/app';
import image from "./img/1vegetables-4884726_1920.jpg"; 


function App() {
  
  //local list of recipe objects
  const [recipeList, setRecipeList] = useState([]);
  const [userRecipeList, setUserRecipeList] = useState([]);
  const [listFetched, setListFetched] = useState(false);
  //used with filtering from searches
  const [filteredList, setFilteredList] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [favouritesList, setFavouritesList] = useState([]);
  const [favouriteIdArray, setFavouriteIdArray] = useState(null);

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

  //User Recipe Modal
  const [userRecipeInputModal, setUserRecipeInputModal] = useState(false);
  const [userRecipeDisplay, setUserRecipeDisplay] = useState(false);
  const [userRecipeRetrieve, setUserRecipeRetrieve] = useState(null);

  /*   let signInUser = auth().currentUser; */ //this was originally commented out, but might be needed? not sure

  //this runs at startup
  //if the list has not been fetched, we attempt to get a json object stored in the window
  //if that returns null, there is no object and we run the code that grabs everything from the database
    //then we assign it to the recipeList state variable and save that as a json object in the window
  //if that returns with an object, we assign it to our recipeList variable
  useEffect(() => {
    console.log("in useEffect");
    if(!listFetched){
      let localStorageRecipeList = window.localStorage.getItem('RecipeList');
      if(localStorageRecipeList == null || localStorageRecipeList == "[]"){
        console.log("in localStorageRecipeList == null");
        RecipeList().then(value => setRecipeList(value));
        setListFetched(true);
        } 
        else{
          console.log("in else");
          setRecipeList(JSON.parse(localStorageRecipeList));
          setListFetched(true);
        }
      }
      // if(currentUser) { 
      //   console.log("inside the grabbing favourites/user Recipes area");
      //   db.collection("users").doc(currentUser.uid).get().then((querySnapshot) =>{ 
      //     setFavouriteIdArray(querySnapshot.data().favourites);
      //     setUserRecipeRetrieve(querySnapshot.data().recipes);
      //   });
      // }
    }, []);
  
  useEffect(() => {
    if(favouriteIdArray){
      for(let i = 0; i < favouriteIdArray.length; i++){
        setFavouritesList(prevState => [...prevState, recipeList[favouriteIdArray[i]-1]]);
      }
    }
  }, [favouriteIdArray]);

  useEffect(() => {
    if(userRecipeRetrieve){
      console.log("in useEffect userRecipeRetrieve has changed");
      console.log(userRecipeRetrieve.length);
      for(let i = 0; i < userRecipeRetrieve.length; i++){
        let recipe = JSON.parse(userRecipeRetrieve[i]);
        recipe.id = 100 + i;
        setUserRecipeList(prevState => [...prevState, recipe]);
      }
    }
  }, [userRecipeRetrieve]);

  useEffect(() => {
    if(currentUser) { 
      console.log("inside the grabbing favourites/user Recipes area");
      db.collection("users").doc(currentUser.uid).get().then((querySnapshot) =>{ 
        setFavouriteIdArray(querySnapshot.data().favourites);
        setUserRecipeRetrieve(querySnapshot.data().recipes);
      });
    }
  }, [currentUser]);

  useEffect(() => {
    //console.log("in recipeList useEffect");
    //console.log(JSON.stringify(recipeList));
    window.localStorage.setItem("RecipeList", JSON.stringify(recipeList));
  }, [recipeList]);


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
  }

  //debug function
  const outputToConsole = () => {
    //console.log(userRecipeList);
    console.log(recipeList);
    //console.log(favouriteIdArray);
    //console.log(favouritesList);
    //console.log(currentUser.uid);
    //console.log(userRecipeRetrieve);
    //console.log(userRecipeList);

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
      <div className='appContainer' style={{ backgroundImage:`url(${image})` }}>
        
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

        <button class="loginBtn" onClick={handleShow}>
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
          <div class="topButtons">
          <button class="span2" onClick={outputToConsole}>debug</button>
          <button class="span2" onClick={debugRetrieve}>redownload data</button>
          <button class="span2" onClick={() => {setUserRecipeInputModal(!userRecipeInputModal)}}>Input your recipe</button>
          <button class="span2" onClick={() => {setUserRecipeDisplay(!userRecipeDisplay)}}>show your recipes</button>
          </div>
           <SearchBar recipeList={recipeList} setFilteredList={setFilteredList} setIsFiltered={setIsFiltered} />
          <FormFilter recipeList={recipeList} filteredList={filteredList} setFilteredList={setFilteredList} setIsFiltered={setIsFiltered}/> 
          
          {!listFetched ? (
            <div>Loading</div>
          ):<></>}
          {listFetched && !userRecipeDisplay ? 
          (<RecipeDisplay 
            recipeList={recipeList} 
            isFiltered={isFiltered} 
            filteredList={filteredList}
            favouritesList={favouritesList}
            setFavouritesList={setFavouritesList}/>):<></>}
            {listFetched && userRecipeDisplay ? 
          (<RecipeDisplay 
            recipeList={userRecipeList} 
            isFiltered={isFiltered} 
            filteredList={filteredList}
            favouritesList={favouritesList}
            setFavouritesList={setFavouritesList}/>):<></>}
             {listFetched && recipeList ? (
            <FavouritesDisplay favouritesList={favouritesList}/>) : <></>}
            <GroceryList />
  
        <Modal show={userRecipeInputModal} onHide={() => {setUserRecipeInputModal(!userRecipeInputModal)}}>
          <NewRecipeForm userRecipeList={userRecipeList} setUserRecipeList={setUserRecipeList}/>
          <button type="button" data-dismiss="modal" aria-label="Close" onClick={() => {setUserRecipeInputModal(!userRecipeInputModal)}}>
            <span aria-hidden="true">Close</span>
          </button>
        </Modal>        
      </div>
    </>
  );
}

export default App;
