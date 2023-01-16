//this should return an array based on a form filter solution
//needs allergens, a range of calories, cost, difficulty, range of prep time and total time, and whether or not its vegan.

const FilterArray = (filterOptions, recipeList) =>{
    //console.log(filterOptions.allergens);
    //console.log(recipeList.recipeList[0].name); //this needs to be recipeList.recipeList because its an object encapsulating the recipeList Array

    let filteredArray = Array.from(recipeList.recipeList);
    console.log(filteredArray);
    //console.log(typeof(filteredArray[0].caloriesPerServing));

    //cost
    for(let i = 0; i < filteredArray.length; i++){
        if(filterOptions.cost !== 'all'){
            if(filteredArray[i].cost !== filterOptions.cost){
                filteredArray.splice(i, 1);
                i--;
            }
        }
    }

    //difficulty
    for(let i = 0; i < filteredArray.length; i++){
        if(filterOptions.difficulty !== 'all'){
            if(filteredArray[i].difficulty !== filterOptions.difficulty){
                filteredArray.splice(i, 1);
                i--;
            }
        }
    }

    //allergens
    for(let i = 0; i < filteredArray.length; i++){
        for(let j = 0; j < filterOptions.allergens.length; j++){
            if (
                (filteredArray[i].allergens).includes(filterOptions.allergens[j])
                ){
                    console.log(filteredArray[i].name);
                    filteredArray.splice(i, 1);
                    i--;
                    break;
            }
        }
    }

    //vegan
    for(let i = 0; i < filteredArray.length; i++){
        if(filterOptions.vegan.length === 0 || filterOptions.vegan.length === 2){
            break;
        }
        for(let j = 0; j < filterOptions.vegan.length; j++){
            if (
                filteredArray[i].vegan.match(filterOptions.vegan[j])
                ){
                    filteredArray.splice(i, 1);
                    i--;
                    break;
            }
        }
    }

    //calories
    let calories;
    for(let i = 0; i < filteredArray.length; i++){
        calories = filteredArray[i].caloriesPerServing.split(' ');
        calories = parseInt(calories[0]);
        if(calories < filterOptions.caloriesMin || calories > filterOptions.caloriesMax){
                filteredArray.splice(i, 1);
                i--;
        }
    }

    //prepTime
    let prepTime;
    for(let i = 0; i < filteredArray.length; i++){
        prepTime = filteredArray[i].prepTime.split(' ');
        prepTime = parseInt(prepTime[0]);
        if(prepTime < filterOptions.prepTimeMin || prepTime > filterOptions.prepTimeMax){
                filteredArray.splice(i, 1);
                i--;
        }
    }

    //totalTime
    let totalTime;
    for(let i = 0; i < filteredArray.length; i++){
        totalTime = filteredArray[i].totalTime.split(' ');
        totalTime = parseInt(totalTime[0]);
        if(totalTime < filterOptions.totalTimeMin || totalTime > filterOptions.totalTimeMax){
                filteredArray.splice(i, 1);
                i--;
        }
    }

    console.log("After all filters:");
    console.log(filteredArray);

    return(filteredArray);

}

export default FilterArray;