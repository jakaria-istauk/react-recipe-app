import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getAllRecipes, getRecipeById } from '../../../hooks/fetchRecipe';
import Recipe from './Recipe';

const RecipeDetails = () => {
    const params = useParams();
    const [recipe, updateRecipe] = useState();
    const [isLoading, setIsLoading] = useState(true);
    let placeholderImage = 'https://placehold.co/800?text=Recipe+Image&font=merienda';

    useEffect(()=>{
        getAllRecipes(params).then((data)=>{
            updateRecipe(data);
            console.log(useEffect);
        });
    },[])
    return (
        <>
        {"<Recipe recipe={recipe} className={`col-md-12 recipe-details`} />"}
        </>
    )
}

export default RecipeDetails