import React, { useCallback, useEffect, useState } from 'react'
import { getPost } from '../../hooks/blogsApiHandler'
import Blog from './Blog';
import Loader from '../common/Loader';

const Blogs = () => {
    const [posts, setPosts] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [paging, setPaging] = useState(parseInt(2));
    const [btnText, setBtnText] = useState('Load More');
    const per_page = 8;

    useEffect(()=>{
        getPost({per_page:per_page}).then((data)=>{
            if(data){
              setPosts(data);
              setIsLoading(false);
            }
        })
    },[])

    const loadeMorePosts = useCallback((e)=>{
      setIsLoadingMore(true);
      setBtnText('Loading...');
      let paging = parseInt(e.target.getAttribute('data-paging'));
      getPost({page:paging,per_page:per_page}).then((data)=>{
          if(data){
            setPosts([...posts,...data]);
            setPaging(paging+1);
            setIsLoadingMore(false);
            setBtnText('Load More');
          }else{
            setBtnText('No More blog Found');
            setTimeout(()=>{
              setPaging(0);
            },2500);
          }
      })
    })
  return (
    <>
    {
      isLoading ? <Loader/> : 
      <>
          <div className='row gy-3'>{posts?.map((post => <Blog key={post.id} post={post} className={`col-md-3 p-1`} />))}</div>
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
      </>
    }
    </>
  )
}

export default Blogs