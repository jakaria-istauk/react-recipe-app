import React, { useState,useEffect, useCallback } from 'react'
import Recipe from './Recipe';
import { getAllRecipes } from '../../../hooks/recipeApiHandler';
import { Link } from 'react-router-dom';
import Loader from '../../common/Loader';
import { fetchRecipes, updateRecipe } from '../../redux/reducers';
import { useDispatch, useSelector } from 'react-redux';

const Recipes = (props) => {
  const dispatchAction = useDispatch();
  const [recipes, setRecipes] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [paging, setPaging] = useState(parseInt(2));
  const [btnText, setBtnText] = useState('Load More');
  let   [filteredRecipes, setFilteredRecipes] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const userData = useSelector((state)=>state?.user);
  const posts = useSelector((state) => state.recipes)
  let   per_page = 8;
  
  useEffect(()=>{
      getAllRecipes({per_page:per_page,author:props?.type}).then((data)=>{
        setRecipes(data);
        setIsLoading(false);
      })
  },[])
  useEffect(()=>{
    // dispatchAction(fetchRecipes({per_page:per_page,author:props?.type}));
    // console.log(posts);
  }, [ dispatchAction ])


  const loadeMorePosts = useCallback((e)=>{
    setIsLoadingMore(true);
    setBtnText('Loading...');
    let paging = parseInt(e.target.getAttribute('data-paging'));
    if(e.target.value == 'all'){
      per_page = -1;
    }
    
    getAllRecipes({page:paging,per_page:per_page, author:props?.type}).then((data)=>{
        if(e.target.value == 'all'){
          setPaging(0);
          setRecipes(data);
        }
        else{
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
        }
    })
  })

  const searchRecipe = useCallback((e)=>{
    let searchKey = e.target.value;
    setIsSearching(searchKey.length);
    if(searchKey.length > 0){
      filteredRecipes = recipes.filter((recipe) =>{
          return JSON.stringify(recipe).toLowerCase().includes(searchKey.toLowerCase());
      });
      setFilteredRecipes(filteredRecipes);
    }
  })

  const deletePost = useCallback((e)=>{

    dispatchAction(updateRecipe(parseInt(e.target.getAttribute('data-id'))))

      console.log( parseInt(e.target.getAttribute('data-id')), recipes);
  })
  
  return (
    <div className='row gy-3'>
        {
          isLoading ? <Loader/> :
          <>
          <div className='col-md-12 mb-1'>
            <div className="input-group">
              <input onChange={searchRecipe} type="search" className="form-control" placeholder="Search Recipe" />
               {isSearching ? <label className={`input-group-text text-white bg-${filteredRecipes?.length ? 'success' : 'danger'}`}>{filteredRecipes?.length} Recipe{filteredRecipes?.length > 1 ? 's' : ''} Found</label> : ''}
              {
                !paging ? <button type="button" className="btn btn-outline-secondary">Search Recipe</button>
                : <select data-paging={paging} onChange={loadeMorePosts} className="btn btn-outline-secondary">
                    <option >Search From Visible</option>
                    <option value="all">Search From All</option>
                  </select> 
              }
            </div>
          </div>
          
          { isSearching 
              ? filteredRecipes?.map( recipe => <Recipe key={recipe.id} recipe={recipe} className={`col-md-3 p-1`} deletePost={deletePost} user={userData}/> ) 
              : recipes?.map( recipe => <Recipe key={recipe.id} recipe={recipe} className={`col-md-3 p-1`} deletePost={deletePost} user={userData}/> )}
          </>
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