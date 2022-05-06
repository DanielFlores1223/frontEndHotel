import {useState, useEffect} from 'react'

//libs
import { Box } from '@material-ui/core'

//My imports
import TypeRooms from './TypeRooms'
import RoomsDash from './RoomsDash'

//icons


const Rooms = () => {
  return (
    <div>
         <TypeRooms />
         <Box mt={4}>
           <RoomsDash />
         </Box>
    </div>
  )
}

export default Rooms