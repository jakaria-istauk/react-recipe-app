import React from 'react'
import { Link } from 'react-router-dom'
import { isLoggedIn } from '../../../hooks/authentication'

const Recipe = ({recipe}) => {
  return (
    <div className='col-md-3 p-1'>
        <div className="card">
            <img src={recipe.image} className="card-img-top image-square" alt={recipe.title}/>
            <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text">{recipe.recipe}</p>
                <div className="btn-group" role="group" aria-label="Basic example">
                    <Link to='/recipe/{recipe.id}' className="btn btn-primary">View Details</Link>
                    {isLoggedIn ? <Link to='/edit-recipe/id' className="btn btn-outline-primary">Edit Recipe</Link> : ''}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Recipe