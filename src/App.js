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
import { useEffect, useState, useRef } from 'react';
//import { Link, useNavigate } from "react-router-dom";
import RecipeList from "./components/RecipeList";
import SearchArray from './components/SearchArray';
import RecipeDisplay from "./components/RecipeDisplay";
import FavouritesDisplay from './components/FavouritesDisplay';
import Modal from 'react-bootstrap/Modal'
import { Form, Button, Card, Alert } from "react-bootstrap"
import { signup, login, logout, useAuth } from "./firebaseConfig";


function App() {

  //local list of recipe objects
  const [recipeList, setRecipeList] = useState([]);
  const [listFetched, setListFetched] = useState(false);
  //the search string
  const [searchTerm, setSearchTerm] = useState('');
  //used with filtering from searches
  const [filteredList, setFilteredList] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

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


  useEffect(() => {
    if (!listFetched) {
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

        <Header />
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

        <span onClick={handleShow}>
          Log In
        </span>

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
        <button onClick={outputToConsole}>debug</button>
        <form onSubmit={e => {
          setFilteredList([]);
          setFilteredList(SearchArray(e, recipeList, searchTerm));
          setIsFiltered(true);
        }}>
          <input
            name="search"
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="searchBar"
          />
          <input className="searchBtn" type="submit" value="search"></input>
        </form>
        <button className="resetBtn" onClick={() => { setIsFiltered(false); setSearchTerm(''); }}>reset search</button>


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
