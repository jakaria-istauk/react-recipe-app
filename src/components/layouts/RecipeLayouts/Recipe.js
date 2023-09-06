import React from 'react'
import { Link } from 'react-router-dom'
import { isLoggedIn } from '../../../hooks/authentication'
import { userPostHash } from '../../../hooks/helper'

const Ingredient = ({ingredient}) => {
    return(
        ingredient !== '' ? <span className="badge bg-primary me-1">{ingredient}</span> : ''
    )
}

const Recipe = ({recipe, className, isPreview}) => {
    let userCanEdit = userPostHash();
    let placeholderImage = 'https://placehold.co/800?text=Recipe+Image&font=merienda';
  return (
    <div className={className}>
        <div className="card">
            { isPreview ? <h6 className='card-header text-center'>Recipe Preview</h6> : '' }
            <img src={recipe.image ? recipe.image : placeholderImage} className="card-img-top image-square" alt={recipe.title}/>
            <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <div className='mb-3'>
                    {recipe.ingredients.split(",")?.map((ingredient, index)=> <Ingredient key={index} ingredient={ingredient} />)}
                </div>
                <div className="card-text" dangerouslySetInnerHTML={{__html: recipe.instructions.slice(0, isPreview ? 400 : 80 )+'...' }}></div>
                {
                    !isPreview ? 
                    <>
                        <div className="btn-group mt-3" role="group" aria-label="Basic example">
                            <Link to={`/recipe/${recipe.slug}`} className="btn btn-primary">View Details</Link>
                            {isLoggedIn && userCanEdit == recipe?.user_hash ? <Link to={`/recipe/edit/${recipe.slug}`} className="btn btn-outline-primary">Edit Recipe</Link> : ''}
                        </div>
                    </> : ''
                }
            </div>
        </div>
    </div>
  )
}

export default Recipe