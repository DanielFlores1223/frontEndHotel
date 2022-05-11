import {useState} from 'react'

//libs
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Book from '../components/customer/book/Book';
import Home from '../components/customer/home/Home';
import LayoutCustomer from '../components/customer/LayoutCustomer';

const CustomerRoutes = ( { setLoginSuccess } ) => {
  return (
     <BrowserRouter>
          <Routes>
              <Route path='/' element={ <LayoutCustomer setLoginSuccess={setLoginSuccess} /> }>
                 <Route index element={<Home />} />
                 <Route path='Book' element={<Book />} />
              </Route>
          </Routes>
   </BrowserRouter> 
  )
}

export default CustomerRoutes