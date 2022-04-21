import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from '../components/main-page/about/About';
import Header from '../components/main-page/header/Header';
import HomePage from '../components/main-page/home/HomePage';
import Login from '../components/main-page/login/Login';
import Register from '../components/main-page/register/Register';
import Rooms from '../components/main-page/rooms/Rooms';


const MainPageRoutes = ({setLoginSuccess}) => {
  return (
     <BrowserRouter>
     <Routes>
         <Route path='/' element={ <Header /> }>
             <Route index element={<HomePage />} />
             <Route path='about' element={<About />} />
             <Route path='login' element={<Login setLoginSuccess={setLoginSuccess} />} />
             <Route path='register' element={<Register />} />
             <Route path='rooms' element={<Rooms />} />
         </Route>
     </Routes>
   </BrowserRouter>  
  )
}

export default MainPageRoutes