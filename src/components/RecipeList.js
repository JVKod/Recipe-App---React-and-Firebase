import { db } from '../firebaseConfig';
import { Recipe } from './recipe';

const RecipeList = async () =>{
    let nameArray = [];
    let stepArray = [];
    let ingredientArray = [];
    let amountArray = [];
    let tagArray = [];
    let recipeListArray = [];
    
    //////////////////retrieving data from database functions//////////////////////

    await db.collection("recipes").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) =>{
        nameArray = [...nameArray, doc.data().name.toLowerCase()];
        //console.log(doc.data());
    });
    });

    for(let i = 1; i < nameArray.length+1; i++){
        await db.collection("recipes").doc(i.toString()).collection("steps").get().then((querySnapshot) =>{
            querySnapshot.forEach((doc) => {
            //console.log(doc.id, ' => ', doc.data());
            stepArray = [...stepArray, doc.data()];
            });
        });
    }

    for(let i = 1; i < nameArray.length+1; i++){
        await db.collection("recipes").doc(i.toString()).collection("ingredients").get().then((querySnapshot) =>{
            querySnapshot.forEach((doc) => {
            //console.log(doc.id, ' => ', doc.data());
            if (doc.id === 'items'){
                ingredientArray = [...ingredientArray, doc.data()];
            }
            if (doc.id === 'amounts'){
                amountArray = [...amountArray, doc.data()];
            }
            });
        });
    }

    for(let i = 1; i < nameArray.length; i++){
        await db.collection("recipes").get().then((querySnapshot) =>{
            querySnapshot.forEach((doc) => {
            //console.log(doc.id, ' => ', doc.data());
            tagArray = [...tagArray, doc.data().tags.toLowerCase()];
            });
        });
    }

//////////////////ends//////////////////////

//creates the master list of recipes

    for(let i = 0; i < nameArray.length; i++){
    let x = Recipe(nameArray[i], ingredientArray[i], amountArray[i], stepArray[i], tagArray[i], );
    recipeListArray = [...recipeListArray, x];
    }

    return recipeListArray;
}

export default RecipeList;