import { db } from '../firebaseConfig';
import { Recipe } from './recipe';

const RecipeList = async () =>{
    let nameArray = [];
    let stepArray = [];
    let ingredientArray = [];
    let amountArray = [];
    let tagArray = [];
    let allergensArray = [];
    let caloriesPerServingArray = [];
    let costArray = [];
    let difficultyArray = [];
    let prepTimeArray = [];
    let totalTimeArray = [];
    let urlArray = [];
    let veganArray = [];
    let videoArray = [];
    let recipeListArray = [];
    let imageArray = [];
    let nutritionArray = [];

    //////////////////retrieving data from database functions//////////////////////

    //names
    await db.collection("recipes").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) =>{
            nameArray = [...nameArray, doc.data().name.toLowerCase()];
            tagArray = [...tagArray, doc.data().tags.toLowerCase()];
            allergensArray = [...allergensArray, doc.data().allergens.toLowerCase()];
            caloriesPerServingArray = [...caloriesPerServingArray, doc.data().caloriesPerServing.toLowerCase()];
            costArray = [...costArray, doc.data().cost.toLowerCase()];
            difficultyArray = [...difficultyArray, doc.data().difficulty.toLowerCase()];
            prepTimeArray = [...prepTimeArray, doc.data().prepTime.toLowerCase()];
            totalTimeArray = [...totalTimeArray, doc.data().totalTime.toLowerCase()];
            urlArray = [...urlArray, doc.data().url];
            veganArray = [...veganArray, doc.data().vegan.toLowerCase()]
            videoArray = [...videoArray, doc.data().video];
            imageArray = [...imageArray, doc.data().image];
            nutritionArray = [...nutritionArray, doc.data().nutrition];
            ingredientArray = [...ingredientArray, doc.data().ingredients2];
            stepArray = [...stepArray, doc.data().steps2];
            });
        });

    // //steps
    // for(let i = 1; i < nameArray.length+1; i++){
    //     await db.collection("recipes").doc(i.toString()).collection("steps").get().then((querySnapshot) =>{
    //         querySnapshot.forEach((doc) => {
    //         stepArray = [...stepArray, doc.data()];
    //         });
    //     });
    // }

    // //ingredients + amounts
    // for(let i = 1; i < nameArray.length+1; i++){
    //     await db.collection("recipes").doc(i.toString()).collection("ingredients").get().then((querySnapshot) =>{
    //         querySnapshot.forEach((doc) => {
    //         if (doc.id === 'items'){
    //             ingredientArray = [...ingredientArray, doc.data()];
    //         }
    //         if (doc.id === 'amounts'){
    //             amountArray = [...amountArray, doc.data()];
    //         }
    //         });
    //     });
    // }


//////////////////ends//////////////////////

//creates the master list of recipes

    for(let i = 0; i < nameArray.length; i++){
    let x = Recipe(
        (i+1),
        nameArray[i], 
        ingredientArray[i], 
        amountArray[i], 
        stepArray[i], 
        tagArray[i],
        allergensArray[i],
        caloriesPerServingArray[i],
        costArray[i],
        difficultyArray[i],
        prepTimeArray[i],
        totalTimeArray[i],
        urlArray[i],
        veganArray[i],
        videoArray[i],
        imageArray[i],
        nutritionArray[i]
        );
    recipeListArray = [...recipeListArray, x];
    }

    return recipeListArray;
}

export default RecipeList;