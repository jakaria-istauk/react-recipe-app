import React, { useState } from 'react'
import Recipe from './Recipe';

const RecipeForm = () => {
    const [recipe, setRecipe] = useState(
        {
            image: 'https://www.foodiesfeed.com/wp-content/uploads/2023/04/delicious-steak-with-herbs-cut-on-slices.jpg',
            title: 'steak',
            ingredients: 'bun,chees,chciken,onion',
            recipe: 'The Card can add the image caption either to the top or the bottom, which is similar to the headers and footers & accordingly, an image can be aligned at the top or bottom of a card.'
        }
    );

    console.log(recipe)

    const handleSubmit = (e) => {
        e.preventDefault();
    }
  return (
    <form action="#" method='post' onSubmit={handleSubmit}> 
        <h1 className="display-6 text-center">Add a new <strong>Recipe</strong></h1>
        <div className='row'>
            <div className='col-md-8'>
                <div className='card p-4'>
                    <div className="mb-3">
                        <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                        <input id="name" name='name' type="text" className="form-control-plaintext border p-2 rounded" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="image" className="col-sm-2 col-form-label">Image Url</label>
                        <input id="image" name='image' type="text" className="form-control-plaintext border p-2 rounded" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="ingredients" className="col-sm-2 col-form-label">Ingredients</label>
                        <input id="ingredients" name='ingredients' type="text" className="form-control-plaintext border p-2 rounded" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="recipe" className="col-sm-2 col-form-label">How to cook</label>
                        <textarea id="recipe" name='recipe' className="form-control-plaintext border p-2 rounded"></textarea>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary">Save Recipe</button>
                    </div>
                </div>
            </div>
            <Recipe recipe={recipe} wrapperClass={`col-md-4 p-0`} />
        </div>
    </form>
  )
}

export default RecipeForm;
