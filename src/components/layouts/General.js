import React from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import { Outlet } from 'react-router-dom'
import useStorage from '../../hooks/useStorage'
import { AppDataProvider } from '../../hooks/useData'

export default function General() {
    const [getValue, setState] = useStorage();

  return (
    <AppDataProvider value={{getValue, setState}}>
        <Header/>
        <Outlet/>
        <Footer/>
    </AppDataProvider>
  )
}
