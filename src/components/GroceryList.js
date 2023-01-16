import React, {useState} from "react";
import './GroceryList.css';

function GroceryList() {
    const [groceryList, setGroceryList] = useState([]);
    const [groceryInput, setGroceryInput] = useState("");

    // function to add grocery item to grocery list
    const addItem = (item) => {
        const newItem = {
            id: Math.random(),
            item: item
        }

        setGroceryList([...groceryList, newItem]);

        setGroceryInput('');
    };

    // function to delete grocery item from grocery list
    const deleteItem = (id) => {
        const newList = groceryList.filter((item) => item.id !== id);

        setGroceryList(newList);
    };

    return (
        <div className="GroceryBox">
            <div>Grocery List</div>
            
            <input
                className="inputBar"
                type='text'
                value={groceryInput}
                onChange={(event) => setGroceryInput(event.target.value)}
            >
            </input>
            
            <button onClick={() => addItem(groceryInput)} className='addToListBtn'> Add to list </button>
            
            <ul>
                {groceryList.map((item) => (
                    <li key={item.id}>
                        {item.item}
                        <button className="xBtn" onClick={() => deleteItem(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>

        </div>
    );
}

export default GroceryList; 