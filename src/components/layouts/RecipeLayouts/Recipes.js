import React, { useState,useEffect, useCallback } from 'react'
import Recipe from './Recipe';
import { getAllRecipes } from '../../../hooks/recipeApiHandler';
import { Link } from 'react-router-dom';
import Loader from '../../common/Loader';
import { updateRecipe } from '../../redux/reducers';
import { useDispatch } from 'react-redux';

const Recipes = (props) => {
  const dispatchAction = useDispatch();
  const [recipes, setRecipes] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [paging, setPaging] = useState(parseInt(2));
  const [btnText, setBtnText] = useState('Load More');
  const per_page = 8;
  
  useEffect(()=>{
      getAllRecipes({per_page:per_page,author:props?.type}).then((data)=>{
        setRecipes(data);
        setIsLoading(false);
      })
  },[])

  const loadeMorePosts = useCallback((e)=>{
    setIsLoadingMore(true);
    setBtnText('Loading...');
    let paging = parseInt(e.target.getAttribute('data-paging'));
    getAllRecipes({page:paging,per_page:per_page, author:props?.type}).then((data)=>{
        if(data?.length > 0){
          setRecipes([...recipes,...data]);
          setPaging(paging+1);
          setIsLoadingMore(false);
          setBtnText('Load More');
        }else{
          setBtnText('No More Recipe Found');
          setTimeout(()=>{
            setPaging(0);
          },2500);
        }
    })
  })

  const deletePost = useCallback((e)=>{

    dispatchAction(updateRecipe(parseInt(e.target.getAttribute('data-id'))))

      console.log( parseInt(e.target.getAttribute('data-id')), recipes);
  })
  
  return (
    <div className='row gy-3'>
        {
          isLoading ? <Loader/> :
          recipes?.map( recipe => <Recipe key={recipe.id} recipe={recipe} className={`col-md-3 p-1`} deletePost={deletePost} /> )
        }
        {
            paging > 0 ? 
            <div className='d-flex justify-content-center'>
              <button className='btn btn-lg btn-primary mt-5' data-paging={paging} onClick={loadeMorePosts} disabled={isLoadingMore} >
              {
                  isLoadingMore ? 
                  <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  {btnText}
                  </>
                  : <>{btnText}</>
              }
              </button>
            </div> : ''
          }
    </div>
  )
}

export default Recipes;