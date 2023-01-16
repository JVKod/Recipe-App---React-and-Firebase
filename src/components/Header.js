import React from "react";
import './Header.css';
import { Link, useNavigate } from "react-router-dom";

function Header() {
    return (
      <div className="appTitle">
        <h1>
          Recipe App
          <img src='https://media.istockphoto.com/photos/cheeseburger-isolated-on-white-picture-id1157515115?k=20&m=1157515115&s=612x612&w=0&h=1-tuF1ovimw3DuivpApekSjJXN5-vc97-qBY5EBOUts=' 
            width='100' height='100'>
          </img>
        </h1>
        
      </div>
    );
  }
  
  export default Header;