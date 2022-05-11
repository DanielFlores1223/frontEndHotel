import {useState} from 'react'

//libs
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Employees from '../components/admin/employees/Employees';
import Home from '../components/admin/home/Home';
import LayoutAdmin from '../components/admin/LayoutAdmin';
import FormRoom from '../components/admin/rooms/FormRoom';
import FormTypeRooms from '../components/admin/rooms/FormTypeRooms';
import InfoRoom from '../components/admin/rooms/InfoRoom';
import Rooms from '../components/admin/rooms/Rooms';

const AdminRoutes = ( { setLoginSuccess } ) => {
  return (
     <BrowserRouter>
          <Routes>
              <Route path='/' element={ <LayoutAdmin setLoginSuccess={setLoginSuccess} /> }>
                 <Route index element={<Home />} />
                 <Route path='rooms' element={<Rooms />} />
                 <Route path='employees' element={<Employees />} />
                 <Route path='form-type-rooms' element={<FormTypeRooms />} />
                 <Route path='form-rooms' element={<FormRoom />} />
                 <Route path='form-rooms/:id' element={<FormRoom />} />
                 <Route path='info-room/:id' element={<InfoRoom />} />

                 <Route path='*' element={<Home />} />
              </Route>
          </Routes>
   </BrowserRouter> 
  )
}

export default AdminRoutes