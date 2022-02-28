import './App.css';
import Header from './components/Header';
import { auth, db } from './firebaseConfig';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <div>
      <Header></Header>
      <SearchBar></SearchBar>
    </div>
  );
}

export default App;
