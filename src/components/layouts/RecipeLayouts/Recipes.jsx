import React, { useState, useEffect, useCallback } from "react";
import Recipe from "./Recipe";
import Loader from "../../common/Loader";
import { fetchRecipes, updateRecipe } from "../../redux/reducers";
import { useDispatch, useSelector } from "react-redux";

const Recipes = (props) => {
  const dispatchAction = useDispatch();
  let [filteredRecipes, setFilteredRecipes] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const userData = useSelector((state) => state?.user);
  let per_page = 8;

  const recipes = useSelector((state) => {
    return state.recipes;
  });

  useEffect(() => {
    if (recipes?.firstLoad) {
      dispatchAction(fetchRecipes({ per_page: per_page, author: props?.type }));
    }
  }, [dispatchAction]);

  const loadeMorePosts = useCallback((e) => {
    let paging = parseInt(e.target.getAttribute("data-paging"));

    dispatchAction(
      fetchRecipes({
        per_page: per_page,
        page: paging,
        author: props?.type,
        isLoadMore: "yes",
      })
    );
  });

  const searchRecipe = useCallback((e) => {
    let searchKey = e.target.value;
    setIsSearching(searchKey.length);
    if (searchKey.length > 0) {
      filteredRecipes = recipes.data?.filter((recipe) => {
        return JSON.stringify(recipe)
          .toLowerCase()
          .includes(searchKey.toLowerCase());
      });
      setFilteredRecipes(filteredRecipes);
    }
  });

  const deletePost = useCallback((e) => {
    dispatchAction(updateRecipe(parseInt(e.target.getAttribute("data-id"))));

    console.log(parseInt(e.target.getAttribute("data-id")), recipes);
  });

  return (
    <div className="row gy-3">
      {recipes.isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="col-md-12 mb-1">
            <div className="input-group">
              <input
                onChange={searchRecipe}
                type="search"
                className="form-control"
                placeholder="Search Recipe"
              />
              {isSearching ? (
                <label
                  className={`input-group-text text-white bg-${
                    filteredRecipes?.length ? "success" : "danger"
                  }`}
                >
                  {filteredRecipes?.length} Recipe
                  {filteredRecipes?.length > 1 ? "s" : ""} Found
                </label>
              ) : (
                ""
              )}
              {!recipes?.paging ? (
                <button type="button" className="btn btn-outline-secondary">
                  Search Recipe
                </button>
              ) : (
                <select
                  data-paging={recipes?.paging}
                  onChange={loadeMorePosts}
                  className="btn btn-outline-secondary"
                >
                  <option>Search From Visible</option>
                  <option value="all">Search From All</option>
                </select>
              )}
            </div>
          </div>

          {isSearching
            ? filteredRecipes?.map((recipe) => (
                <Recipe
                  key={recipe.id}
                  recipe={recipe}
                  className={`col-md-3 p-1`}
                  deletePost={deletePost}
                  user={userData}
                />
              ))
            : recipes.data?.map((recipe) => (
                <Recipe
                  key={recipe.id}
                  recipe={recipe}
                  className={`col-md-3 p-1`}
                  deletePost={deletePost}
                  user={userData}
                />
              ))}
        </>
      )}
      {recipes?.paging > 0 ? (
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-lg btn-primary mt-5"
            data-paging={recipes?.paging}
            onClick={loadeMorePosts}
          >
            {recipes.isLoadMore ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Loading...
              </>
            ) : (
              "Load More"
            )}
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Recipes;
