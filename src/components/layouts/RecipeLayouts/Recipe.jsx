import React, { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'

const Ingredient = ({ingredient}) => {
    return(
        ingredient !== '' ? <span className="badge bg-primary me-1">{ingredient}</span> : ''
    )
}

const Recipe = ({recipe, className, isPreview, ...props}) => {
    let placeholderImage = 'https://placehold.co/800?text=Recipe+Image&font=merienda';
  return (
    <div className={className}>
        <div className="card">
            { isPreview ? <h6 className='card-header text-center'>Recipe Preview</h6> : '' }
            <img src={recipe.image ? recipe.image : placeholderImage} className="card-img-top image-square" alt={recipe.title}/>
            <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <div className='mb-3'>
                    {recipe.ingredients?.split(",")?.map((ingredient, index)=> <Ingredient key={index} ingredient={ingredient} />)}
                </div>
                <div className="card-text" dangerouslySetInnerHTML={{__html: recipe.instructions?.slice(0, isPreview ? 400 : 80 )+'...' }}></div>
                {
                    !isPreview ? 
                    <>
                        <div className='d-flex justify-content-center mt-3'>
                            <div className="btn-group">
                                <Link to={`/recipe/${recipe.slug}`} className="btn btn-primary btn-sm">View Details</Link>
                                {props?.user?.postHash == recipe?.user_hash ? <Link to={`/recipe/edit/${recipe.slug}`} className="btn btn-outline-primary btn-sm">Edit Recipe</Link> : ''}
                                {/* {isLoggedIn && userCanEdit == recipe?.user_hash ? <button onClick={deletePost} data-id={recipe.id} className="btn btn-outline-danger btn-sm">Delete</button> : ''} */}
                            </div>
                        </div>
                    </> : ''
                }
            </div>
        </div>
    </div>
  )
}

export default Recipe