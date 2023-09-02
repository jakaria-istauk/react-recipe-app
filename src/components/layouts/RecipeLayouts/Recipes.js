import React, { useState } from 'react'
import Recipe from './Recipe';
import { getAllRecipes } from '../../../hooks/fetchRecipe';

const Recipes = () => {
  let recipes = getAllRecipes();

  return (
    <div className='row gy-3'>
        { recipes?.map( recipe => <Recipe key={recipe.id} recipe={recipe} className={`col-md-3 p-1`} /> ) }
    </div>
  )
}

export default Recipes;