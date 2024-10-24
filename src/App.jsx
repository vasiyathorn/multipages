import { HashRouter, Route, Routes } from 'react-router-dom'
import { Component, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

import Todo from './pages/Todo/Todo'
import Home from './pages/Home/Home'
import Layout from './layouts/Layout/Layout'
import Calculator from './pages/Calculator/Calculator'
import Carts from './pages/Carts/Carts'
import Products from './pages/Products/Products'  
import Components from './pages/Components/Components'
import Login from './pages/Login/Login'


import 'bootstrap/dist/css/bootstrap.min.css' 
import 'bootstrap-icons/font/bootstrap-icons.css' 

import { fetchProducts } from './data/products'

import './App.css'

const intTab = 'home'


function App() {
  const [products , setProducts] = useState([])
  const [carts, setCarts] = useState([])
  const [tab,setTab] = useState('')

  const [token, setToken] = useState('')
  const [role, setRole] = useState('')


  useEffect(()=> {
    setProducts(fetchProducts())
  },[] )

  useEffect(()=> console.log(products) , [products] )

  useEffect(()=>{
    setTab(intTab)
  }, [])


  if (token === '') {
    return <Login setToken={setToken} setRole={setRole}/>
  } else {
      return (
        <div className='app-container'>
          <HashRouter>
            <Routes>
              <Route element={<Layout products={products} carts={carts} setToken={setToken}/>}>
                <Route path={'/'} element={<Home />} />
                <Route path={'/home'} element={<Home />} />
                <Route path={'/calculator'} element={<Calculator />} />
                <Route path={'/carts'} element={<Carts carts={carts} setCarts={setCarts}/>} />
                <Route path={'/components'} element={<Components />} />
                <Route path={'/products'} element={<Products 
                                                      products={products}  
                                                      carts={carts}
                                                      setCarts={setCarts}
                                                      />} />
                <Route path={'/todo'} element={<Todo />} />
              
              </Route>
            </Routes>
          </HashRouter>
          
        </div>
      )

  }
}

export default App
