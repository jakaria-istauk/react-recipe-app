import React from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import { Outlet } from 'react-router-dom'

export default function General() {
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}
