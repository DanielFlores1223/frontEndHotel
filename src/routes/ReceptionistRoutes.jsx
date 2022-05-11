import {useState} from 'react'

//libs
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//My imports
import LayoutReceptionist from '../components/receptionist/LayoutReceptionist';
import Home from '../components/receptionist/home/Home';
import Rooms from '../components/admin/rooms/Rooms'

const ReceptionistRoutes = ( { setLoginSuccess } ) => {
  return (
    <BrowserRouter>
     <Routes>
         <Route path='/' element={ <LayoutReceptionist setLoginSuccess={setLoginSuccess} /> }>
            <Route index element={<Home />} />
            <Route path='rooms' element={<Rooms />} />

            <Route path='*' element={<Home />} />
         </Route>
     </Routes>
   </BrowserRouter> 
  )
}

export default ReceptionistRoutes