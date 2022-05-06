import {useState} from 'react'

//libs
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../components/admin/home/Home';
import LayoutAdmin from '../components/admin/LayoutAdmin';
import FormRoom from '../components/admin/rooms/FormRoom';
import FormTypeRooms from '../components/admin/rooms/FormTypeRooms';
import Rooms from '../components/admin/rooms/Rooms';

const AdminRoutes = ( { setLoginSuccess } ) => {
  return (
     <BrowserRouter>
          <Routes>
              <Route path='/' element={ <LayoutAdmin setLoginSuccess={setLoginSuccess} /> }>
                 <Route index element={<Home />} />
                 <Route path='rooms' element={<Rooms />} />
                 <Route path='form-type-rooms' element={<FormTypeRooms />} />
                 <Route path='form-rooms' element={<FormRoom />} />
                 <Route path='form-rooms/:id' element={<FormRoom />} />
              </Route>
          </Routes>
   </BrowserRouter> 
  )
}

export default AdminRoutes