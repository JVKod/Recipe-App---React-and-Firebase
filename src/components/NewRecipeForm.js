import React from 'react';
import { useState } from 'react';
import { Recipe } from './recipe';
import {auth, db} from "../firebaseConfig"
import firebase from 'firebase/compat/app';
import { signup, login, logout, useAuth } from "../firebaseConfig";

const NewRecipeForm = (props) => {
    const [IngredientsAmountsList, setIngredientsAmountsList] = useState([{ Ingredient: "", Amount: "" }]);
    const [stepsList, setStepsList] = useState([""]);
    const currentUser = useAuth();
    const [state, setState] = useState({
        name: 'undefined',
        allergens: 'undefined',
        calories: 'undefined',
        cost: 'low',
        difficulty: 'easy',
        prepTime: 'undefined',
        totalTime: 'undefined',
        vegan: 'not vegan',
        tags: 'undefined',
        url: 'undefined', 
        video: 'undefined',
        image: 'https://www.maiz.in/wp-content/uploads/2020/10/generic-food-icon.png',
        nutrition: 'not provided with user recipes'
    })
 
    // handle input change
    const handleIAChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...IngredientsAmountsList];
        list[index][name] = value;
        setIngredientsAmountsList(list);
    };

    const handleStepsChange = (e, index) => {
        const {value} = e.target;
        const list = [...stepsList];
        list[index] = value;
        setStepsList(list);
    };
    
    // handle click event of the Remove button
    const handleIARemoveClick = index => {
        const list = [...IngredientsAmountsList];
        list.splice(index, 1);
        setIngredientsAmountsList(list);
    };

    const handleStepsRemoveClick = index => {
        const list = [...stepsList];
        list.splice(index, 1);
        setStepsList(list);
    };
    
    // handle click event of the Add button
    const handleIAAddClick = () => {
        setIngredientsAmountsList([...IngredientsAmountsList, { Ingredient: "", Amount: "" }]);
    };

    const handleStepsAddClick = () => {
        setStepsList([...stepsList, ""]);
    };

    const handleStateChange = (event) => {
        setState(prevState => ({...prevState, [event.target.name]: event.target.value }));

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let ingredients = [];
        let amounts = [];
        let steps = [];
        for(let i = 0; i < IngredientsAmountsList.length; i++){
            ingredients = [...ingredients, IngredientsAmountsList[i].Amount, IngredientsAmountsList[i].Ingredient];
            amounts = [...amounts,  IngredientsAmountsList[i].Amount];
            steps = [...steps,  stepsList[i]];
        }
        
        
        let newRecipe = Recipe(
            (props.userRecipeList.length + 1),
            state.name,
            ingredients.toString(),
            amounts, 
            steps.toString(),
            state.tags,
            state.allergens,
            state.calories,
            state.cost,
            state.difficulty,
            state.prepTime, 
            state.totalTime,
            state.url,
            state.vegan,
            state.video,
            state.image,
            state.nutrition
        );
     
        props.setUserRecipeList(prevState => [...prevState,newRecipe]);
        console.log(newRecipe);
        if(currentUser){
            db.collection('users').doc(firebase.auth().currentUser.uid).set({
            recipes: firebase.firestore.FieldValue.arrayUnion(JSON.stringify(newRecipe))}, {merge: true});
          }

    }

    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Recipe Name" onChange={handleStateChange}/>
                {IngredientsAmountsList.map((x, i) => {
                return (
                    <div >
                        <input
                            name="Ingredient"
                            placeholder='Ingredient'
                            value={x.Ingredient}
                            onChange={e => handleIAChange(e, i)}
                        />
                        <input                            
                            name="Amount"
                            placeholder='Amount'
                            value={x.Amount}
                            onChange={e => handleIAChange(e, i)}
                        />
                        <div className="btn-box">
                            {IngredientsAmountsList.length !== 1 && 
                            <button
                                onClick={() => handleIARemoveClick(i)}
                            >Remove</button>}
                            {IngredientsAmountsList.length - 1 === i && <button onClick={handleIAAddClick}>Add</button>}
                        </div>
                    </div>
                    );
                })}
                {stepsList.map((x, i) => {
                return (
                    <div >
                        <input
                            name="Steps"
                            placeholder='Steps'
                            value={x}
                            onChange={e => handleStepsChange(e, i)}
                        />
                        <div >
                            {stepsList.length !== 1 && 
                            <button
                            onClick={() => handleStepsRemoveClick(i)}
                            >Remove</button>}
                            {stepsList.length - 1 === i && <button onClick={handleStepsAddClick}>Add</button>}
                        </div>
                    </div>
                    );
                })}
                <input name="tags" placeholder='tags' onChange={handleStateChange}/>
                <input name="prepTime" placeholder='Prep Time' onChange={handleStateChange}/>
                <input name="totalTime" placeholder='Total Time' onChange={handleStateChange}/>
                <input name="allergens" placeholder='Allergens' onChange={handleStateChange}/>
                <input name="calories" placeholder='calories' onChange={handleStateChange}/>
                <label>Difficulty:</label>
                    <select name='difficulty' onChange={handleStateChange}>
                        <option value='easy'>Easy</option>
                        <option value='medium'>Medium</option>
                        <option value='hard'>Hard</option>
                    </select>
                <label>Cost:</label>
                    <select name='cost' onChange={handleStateChange}>
                        <option value='low'>Low</option>
                        <option value='medium'>Medium</option>
                        <option value='high'>High</option>
                    </select>
                <label>Vegan:</label>
                    <select name='vegan' onChange={handleStateChange}>
                        <option value='not vegan'>Not Vegan</option>
                        <option value='vegan'>Vegan</option>
                    </select>
                <input name="url" placeholder='url' onChange={handleStateChange}/>
                <input name="video" placeholder='video' onChange={handleStateChange}/>
                <input type="submit"></input>
            </form>
            {/* <div style={{ marginTop: 20 }}>{JSON.stringify(IngredientsAmountsList)}</div>
            <div style={{ marginTop: 20 }}>{JSON.stringify(stepsList)}</div>
            <div style={{ marginTop: 20 }}>{JSON.stringify(state)}</div> */}
        </div>
    );
}

export default NewRecipeForm;