<<<<<<< HEAD
export const Recipe = (
        name, 
        ingredients,
        amounts, 
        steps, 
        tags, 
        allergens,
        caloriesPerServing,
        cost,
        difficulty,
        prepTime,
        totalTime,
        url,
        vegan,
        video
    ) => { 
=======
export const Recipe = (name, ingredients, amounts, steps, tags) => { 
>>>>>>> 17b793d3f9af89127fbdd99054c6c153c8fb5804
    return {
        name: name, 
        ingredients: ingredients, 
        amounts: amounts, 
        steps: steps, 
<<<<<<< HEAD
        tags: tags,
        allergens: allergens,
        caloriesPerServing: caloriesPerServing,
        cost: cost,
        difficulty: difficulty,
        prepTime: prepTime,
        totalTime: totalTime,
        url: url,
        vegan: vegan,
        video: video,
=======
        tags: tags
>>>>>>> 17b793d3f9af89127fbdd99054c6c153c8fb5804
    } 
}