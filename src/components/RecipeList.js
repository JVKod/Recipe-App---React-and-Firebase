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

    //////////////////retrieving data from database functions//////////////////////

    //names
    await db.collection("recipes").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) =>{
        nameArray = [...nameArray, doc.data().name.toLowerCase()];
        //console.log(doc.data());
    });
    });

    //steps
    for(let i = 1; i < nameArray.length+1; i++){
        await db.collection("recipes").doc(i.toString()).collection("steps").get().then((querySnapshot) =>{
            querySnapshot.forEach((doc) => {
            //console.log(doc.id, ' => ', doc.data());
            stepArray = [...stepArray, doc.data()];
            });
        });
    }

    //ingredients + amounts
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

    //tags
    for(let i = 1; i < nameArray.length; i++){
        await db.collection("recipes").get().then((querySnapshot) =>{
            querySnapshot.forEach((doc) => {
            //console.log(doc.id, ' => ', doc.data());
            tagArray = [...tagArray, doc.data().tags.toLowerCase()];
            });
        });
    }

    //allergens
    await db.collection("recipes").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) =>{
            allergensArray = [...allergensArray, doc.data().allergens.toLowerCase()];
            //console.log(doc.data());
        });
        });

    //caloriesPerServing
    await db.collection("recipes").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) =>{
            caloriesPerServingArray = [...caloriesPerServingArray, doc.data().caloriesPerServing.toLowerCase()];
            //console.log(doc.data());
        });
        });

    //cost
    await db.collection("recipes").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) =>{
            costArray = [...costArray, doc.data().cost.toLowerCase()];
            //console.log(doc.data());
        });
        });

    //difficulty
    await db.collection("recipes").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) =>{
            difficultyArray = [...difficultyArray, doc.data().difficulty.toLowerCase()];
            //console.log(doc.data());
        });
        });

    //prepTime
    await db.collection("recipes").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) =>{
            prepTimeArray = [...prepTimeArray, doc.data().prepTime.toLowerCase()];
            //console.log(doc.data());
        });
        });
    
    //totalTime
    await db.collection("recipes").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) =>{
            totalTimeArray = [...totalTimeArray, doc.data().totalTime.toLowerCase()];
            //console.log(doc.data());
        });
        });

    //url
    await db.collection("recipes").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) =>{
            urlArray = [...urlArray, doc.data().url];
            //console.log(doc.data());
        });
        });

    //vegan
    await db.collection("recipes").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) =>{
            veganArray = [...veganArray, doc.data().vegan.toLowerCase()];
            //console.log(doc.data());
        });
        });

    //video
    await db.collection("recipes").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) =>{
            videoArray = [...videoArray, doc.data().video];
            //console.log(doc.data());
        });
        });

//////////////////ends//////////////////////

//creates the master list of recipes

    for(let i = 0; i < nameArray.length; i++){
    let x = Recipe(
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
        );
    recipeListArray = [...recipeListArray, x];
    }

    return recipeListArray;
}

export default RecipeList;