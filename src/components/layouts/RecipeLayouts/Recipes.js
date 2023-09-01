import React, { useState } from 'react'
import Recipe from './Recipe';

const Recipes = () => {
  const [recipes, setRecipes] = useState([
    {
      id: 1213,
      image: 'https://www.foodiesfeed.com/wp-content/uploads/2023/04/cheeseburger.jpg',
      title: 'cheeseburger',
      ingredients: 'bun,chees,chciken,onion',
      recipe: 'The Card can add the image caption either to the top or the bottom, which is similar to the headers and footers & accordingly, an image can be aligned at the top or bottom of a card.'
    },
    {
      id: 123323,
      image: 'https://www.foodiesfeed.com/wp-content/uploads/2021/01/fried-egg-and-guacamole-sandwiches.jpg',
      title: 'sandwiches',
      ingredients: 'bun,chees,chciken,onion',
      recipe: 'The Card can add the image caption either to the top or the bottom, which is similar to the headers and footers & accordingly, an image can be aligned at the top or bottom of a card.'
    },
    {
      id: 233131,
      image: 'https://www.foodiesfeed.com/wp-content/uploads/2023/04/delicious-steak-with-herbs-cut-on-slices.jpg',
      title: 'steak',
      ingredients: 'bun,chees,chciken,onion',
      recipe: 'The Card can add the image caption either to the top or the bottom, which is similar to the headers and footers & accordingly, an image can be aligned at the top or bottom of a card.'
    },
    {
      id: 234313133,
      image: 'https://www.foodiesfeed.com/wp-content/uploads/2023/04/delicious-steak-with-herbs-cut-on-slices.jpg',
      title: 'steak',
      ingredients: 'bun,chees,chciken,onion',
      recipe: 'The Card can add the image caption either to the top or the bottom, which is similar to the headers and footers & accordingly, an image can be aligned at the top or bottom of a card.'
    }
  ]);
  return (
    <div className='row gy-3'>
        { recipes?.map( recipe => <Recipe key={recipe.id} recipe={recipe} /> ) }
    </div>
  )
}

export default Recipes;