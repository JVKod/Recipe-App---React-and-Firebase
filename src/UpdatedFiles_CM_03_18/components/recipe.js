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
    return {
        name: name, 
        ingredients: ingredients, 
        amounts: amounts, 
        steps: steps, 
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
    } 
}