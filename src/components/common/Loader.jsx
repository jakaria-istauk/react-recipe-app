import React from 'react'

const LoaderElements = ({type}) => {
    return (
        <div className={`spinner-grow text-${type} mx-1`} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    )
    
}

const Loader = () => {

  return (
    <div className='d-flex justify-content-center align-items-center recipe-loader'>
        {
            ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark']
            .map ((item, index)=><LoaderElements key={index} type={item} /> )
        }
    </div>
  )
}

export default Loader