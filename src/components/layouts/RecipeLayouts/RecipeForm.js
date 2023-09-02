import React, { useCallback, useEffect, useRef, useState } from 'react'
import Recipe from './Recipe';

const RecipeForm = () => {
    const [recipe, setRecipe] = useState(
        {
            image: 'https://placehold.co/800?text=Recipe+Image&font=merienda',
            title: 'Recipe Name',
            ingredients: 'Ingredients 1, Ingredients 2, Ingredients 3',
            recipe: 'This recipe made with this process'
        }
    );

    const handlePreview = useCallback(e => {
        setRecipe({
            ...recipe,
            [e.target.name]: e.target.value
        });
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        const newRecipe = {
            id: Date.now(),
            title: formData.get('name'),
			image: formData.get('image'),
			ingredients: formData.get('ingredients'),
            recipe: formData.get('recipe')
		}

    }
  return (
    <form action="#" method='post' onSubmit={handleSubmit}> 
        <h1 className="display-6 text-center">Add a new <strong>Recipe</strong></h1>
        <div className='row'>
            <div className='col-md-8'>
                <div className='card p-4'>
                    <div className="mb-3">
                        <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                        <input id="name" name='title' type="text" className="form-control-plaintext border p-2 rounded" onKeyUp={handlePreview} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="image" className="col-sm-2 col-form-label">Image Url</label>
                        <input id="image" name='image' type="text" className="form-control-plaintext border p-2 rounded" onChange={handlePreview} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="ingredients" className="col-sm-2 col-form-label">Ingredients</label>
                        <input id="ingredients" name='ingredients' type="text" className="form-control-plaintext border p-2 rounded" placeholder='Ingredients 1, Ingredients 2, Ingredients 3' onKeyUp={handlePreview} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="recipe" className="col-sm-2 col-form-label">How to cook</label>
                        <textarea id="recipe" name='recipe' className="form-control-plaintext border p-2 rounded" onKeyUp={handlePreview}></textarea>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary">Save Recipe</button>
                    </div>
                </div>
            </div>
            <Recipe recipe={recipe} className={`col-md-4`} isPreview={true} />
        </div>
    </form>
  )
}

export default RecipeForm;
