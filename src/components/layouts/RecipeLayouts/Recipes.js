import React, { useState } from 'react'
import Recipe from './Recipe';
import { getAllRecipes } from '../../../hooks/fetchRecipe';
import { Link } from 'react-router-dom';

const Recipes = () => {
  let recipes = getAllRecipes();
  return (
    <div className='row gy-3'>
        {
          recipes.length < 1 ? 
          <div class="alert alert-info" >
            No Recipe found. <Link to='/recipe/new'>Add Recipe</Link>
          </div>
          : ''
        }
        { recipes?.map( recipe => <Recipe key={recipe.id} recipe={recipe} className={`col-md-3 p-1`} /> ) }
    </div>
  )
}

export default Recipes;