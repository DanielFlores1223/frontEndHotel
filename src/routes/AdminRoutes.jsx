import {useState} from 'react'

//libs
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../components/admin/home/Home';
import LayoutAdmin from '../components/admin/LayoutAdmin';

const AdminRoutes = ( { setLoginSuccess } ) => {
  return (
     <BrowserRouter>
          <Routes>
              <Route path='/' element={ <LayoutAdmin setLoginSuccess={setLoginSuccess} /> }>
                 <Route index element={<Home />} />
              </Route>
          </Routes>
   </BrowserRouter> 
  )
}

export default AdminRoutes