import React from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import { Outlet } from 'react-router-dom'

export default function General() {

  return (
    <>
        <Header/>
        <div className='container py-3'>
          <Outlet/>
        </div>
        <Footer/>
    </>
  )
}
