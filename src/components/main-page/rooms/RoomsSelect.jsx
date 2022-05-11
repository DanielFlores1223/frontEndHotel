import {useState, useEffect, useRef} from 'react'

//Libs
import { Grid, 
     Button, 
     Box, 
     Hidden, 
     Typography, 
     Card, 
     CardActionArea,
     CardActions,
     CardContent,
     CardMedia     } from '@material-ui/core'
import styled from '@emotion/styled'

//My imports
import { generateIdUnique } from '../../common/functions/general'
import Hr from '../../common/hr/Hr'

//Icons
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom'
import NoMeetingRoomIcon from '@mui/icons-material/NoMeetingRoom'

const DivContainer = styled.div`
     max-width: '1200px';
     display:'flex';
     flex-direction: 'column';
     align-items: 'center';
     justify-content: 'center';
`;

const DivRooms = styled.div`
     background-color: #FDFEFE ;
     padding: 2rem;
     border-top: 5px solid #5499C7;
     border-radius: 10px;
     -webkit-box-shadow: 0px 8px 29px -17px rgba(46,74,117,1);
     -moz-box-shadow: 0px 8px 29px -17px rgba(46,74,117,1);
     box-shadow: 0px 8px 29px -17px rgba(46,74,117,1);
     & h6 {
          margin: 0rem 1rem;
     }
`;


const CardRoomDisabledStyled = styled.div`
     background-color: #CB4335;
     color: white;
     display: flex;
     flex-direction: column;
     align-items: center;
     max-height: 5rem;
     padding: 1rem 2rem;
     border-radius: 10px;
`;

const RoomsSelect = ({roomsAvailableDates, setRoomsReservation, roomsReservation}) => {

     const [floor1, setFloor1] = useState([]);
     const [floor2, setFloor2] = useState([]);
     const [floor3, setFloor3] = useState([]);
     const [floor4, setFloor4] = useState([]);
     const [floor5, setFloor5] = useState([]);
     const cardsRefs = useRef([]);
     cardsRefs.current = [];
     //const [refRooms, setRefRooms] = useState([]);

     const selectRoom = (e, idRoom, name) => {
          
          let indexFound = 0;
          
          cardsRefs.current.forEach( (cr, index) => {
               console.log(cr.innerText);
               if( cr.innerText === name ) {
                    console.log(index)
                    indexFound = index;
               }
          } );


          if (roomsReservation.includes(idRoom)) {
               const filterArray = roomsReservation.filter( rr => rr !== idRoom );
               cardsRefs.current[indexFound].classList.remove('roomActive');
               setRoomsReservation([...filterArray]);
               
          } else {
               cardsRefs.current[indexFound].classList.add('roomActive');
               setRoomsReservation([...roomsReservation, idRoom]);
          }
     }

     const addRefs = ( el ) => {
          if( el && !cardsRefs.current.includes(el) ) {
               cardsRefs.current.push(el);
          }
     }

     useEffect(() => {

          let isMounted = true;

          if ( isMounted && roomsAvailableDates.length > 0) {

               setFloor1( 
                          roomsAvailableDates.length >= 1 &&
                          roomsAvailableDates[0][`floor${1}`] 
                          && roomsAvailableDates[0][`floor${1}`].length > 0 ? 
                          [...roomsAvailableDates[0][`floor${1}`]] : []
                         );

               setFloor2(
                         roomsAvailableDates.length >= 2 &&
                         roomsAvailableDates[1][`floor${2}`] 
                         && roomsAvailableDates[1][`floor${2}`].length > 0 ? 
                         [...roomsAvailableDates[1][`floor${2}`]] : []
                         );
          
               setFloor3(
                          roomsAvailableDates.length >= 3 &&
                          roomsAvailableDates[2][`floor${3}`]
                          && roomsAvailableDates[2][`floor${3}`].length > 0 ? 
                          [...roomsAvailableDates[2][`floor${3}`]] : []
                         );
               setFloor4(
                          roomsAvailableDates.length >= 4 &&
                          roomsAvailableDates[3][`floor${4}`] 
                          && roomsAvailableDates[3][`floor${4}`].length > 0 ? 
                          [...roomsAvailableDates[3][`floor${4}`]] : []
                         );
               setFloor5(
                          roomsAvailableDates.length >= 5 &&
                          roomsAvailableDates[4][`floor${5}`] 
                          && roomsAvailableDates[4][`floor${5}`].length > 0 ? 
                          [...roomsAvailableDates[4][`floor${5}`]] : []
                         );
          }

          return () => { isMounted = false }; 
          
     }, [roomsAvailableDates])
  
     return (
     <DivContainer >
      <DivRooms>
           {/* FLOOR 1 */}
           <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h6' align='center'>
                         Floor 1
                    </Typography>
                </Grid>
           </Grid>
           <Grid container justifyContent='center' spacing={2}>
                 {
                      floor1.map.length === 0 && (
                         <Grid container justifyContent='center' item xs={12} >
                              <Typography variant='body1' color='textSecondary' align='center'>
                                   There aren't available rooms in this floor.
                              </Typography>
                         </Grid>
                      )
                 }
                 {
                      floor1.map( (fr) => {
                         return fr.availableToReservation ? (
                              <Grid item xs={6} md={1} >
                                   <div className='roomCard' id={fr._id} 
                                                   onClick={(e) => selectRoom(e, fr._id, fr.name)}
                                                   ref={addRefs} 
                                   >
                                             <MeetingRoomIcon />
                                             <Typography variant='body1'>
                                                  { fr.name }
                                             </Typography>
                                   </div>
                               </Grid> 
                         ):(
                              <Grid item xs={6} md={1}>
                                   <CardRoomDisabledStyled>
                                        <NoMeetingRoomIcon />
                                        <Typography variant='body1'>
                                             { fr.name }
                                        </Typography>
                                   </CardRoomDisabledStyled>
                               </Grid>
                         )
                      })
                 }    
           </Grid>
      
             {/* FLOOR 2 */}
           <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Hr />
                    <Typography variant='h6' align='center'>
                         Floor 2
                    </Typography>
                </Grid>
           </Grid>
           <Grid container justifyContent='center' spacing={2}>
                 {
                      floor2.map.length === 0 && (
                         <Grid container justifyContent='center' item xs={12} >
                              <Typography variant='body1' color='textSecondary' align='center'>
                                   There aren't available rooms in this floor.
                              </Typography>
                         </Grid>
                      )
                 }
                 {
                      floor2.map( (fr) => {
                         return fr.availableToReservation ? (
                              <Grid item xs={6} md={1} >
                                   <div className='roomCard' id={fr._id} 
                                                   onClick={(e) => selectRoom(e, fr._id, fr.name)}
                                                   ref={addRefs} 
                                   >
                                             <MeetingRoomIcon />
                                             <Typography variant='body1'>
                                                  { fr.name }
                                             </Typography>
                                   </div>
                               </Grid> 
                         ):(
                              <Grid item xs={6} md={1}>
                                   <CardRoomDisabledStyled>
                                        <NoMeetingRoomIcon />
                                        <Typography variant='body1'>
                                             { fr.name }
                                        </Typography>
                                   </CardRoomDisabledStyled>
                               </Grid>
                         )
                      })
                 }    
           </Grid>
             {/* FLOOR 3 */}
             <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Hr />
                    <Typography variant='h6' align='center'>
                         Floor 3
                    </Typography>
                </Grid>
           </Grid>
           <Grid container alignItems='center' spacing={2}>
                 {
                      floor3.length === 0 && (
                              <Grid container justifyContent='center' item xs={12} >
                                   <Typography variant='body1' color='textSecondary' align='center'>
                                        There aren't available rooms in this floor.
                                   </Typography>
                              </Grid>
                          
                      )
                 }
              
                 {
                      floor3.map( (fr) => {
                         return fr.availableToReservation ? (
                              <Grid item xs={6} md={1} >
                                   <div className='roomCard' id={fr._id} 
                                                   onClick={(e) => selectRoom(e, fr._id, fr.name)}
                                                   ref={addRefs} 
                                   >
                                             <MeetingRoomIcon />
                                             <Typography variant='body1'>
                                                  { fr.name }
                                             </Typography>
                                   </div>
                               </Grid> 
                         ):(
                              <Grid item xs={6} md={1}>
                                   <CardRoomDisabledStyled>
                                        <NoMeetingRoomIcon />
                                        <Typography variant='body1'>
                                             { fr.name }
                                        </Typography>
                                   </CardRoomDisabledStyled>
                               </Grid>
                         )
                      })
                 }    
           </Grid>
           {/* FLOOR 4 */}
           <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Hr />
                    <Typography variant='h6' align='center'>
                         Floor 4
                    </Typography>
                </Grid>
           </Grid>
           <Grid container alignItems='center' spacing={2}>
                 {
                      floor4.length === 0 && (
                              <Grid container justifyContent='center' item xs={12} >
                                   <Typography variant='body1' color='textSecondary' align='center'>
                                        There aren't available rooms in this floor.
                                   </Typography>
                              </Grid>
                          
                      )
                 }
              
                 {
                      floor4.map( (fr) => {
                         return fr.availableToReservation ? (
                              <Grid item xs={6} md={1} >
                                   <div className='roomCard' id={fr._id} 
                                                   onClick={(e) => selectRoom(e, fr._id, fr.name)}
                                                   ref={addRefs} 
                                   >
                                             <MeetingRoomIcon />
                                             <Typography variant='body1'>
                                                  { fr.name }
                                             </Typography>
                                   </div>
                               </Grid> 
                         ):(
                              <Grid item xs={6} md={1}>
                                   <CardRoomDisabledStyled>
                                        <NoMeetingRoomIcon />
                                        <Typography variant='body1'>
                                             { fr.name }
                                        </Typography>
                                   </CardRoomDisabledStyled>
                               </Grid>
                         )
                      })
                 }    
           </Grid>
           {/* FLOOR 5 */}
           <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Hr />
                    <Typography variant='h6' align='center'>
                         Floor 5
                    </Typography>
                </Grid>
           </Grid>
           <Grid container alignItems='center' spacing={2}>
                 {
                      floor5.length === 0 && (
                              <Grid container justifyContent='center' item xs={12} >
                                   <Typography variant='body1' color='textSecondary' align='center'>
                                        There aren't available rooms in this floor.
                                   </Typography>
                              </Grid>
                          
                      )
                 }
              
                 {
                      floor5.map( (fr) => {
                         return fr.availableToReservation ? (
                              <Grid item xs={6} md={1} >
                                   <div className='roomCard' id={fr._id} 
                                                   onClick={(e) => selectRoom(e, fr._id, fr.name)}
                                                   ref={addRefs} 
                                   >
                                             <MeetingRoomIcon />
                                             <Typography variant='body1'>
                                                  { fr.name }
                                             </Typography>
                                   </div>
                               </Grid> 
                         ):(
                              <Grid item xs={6} md={1}>
                                   <CardRoomDisabledStyled>
                                        <NoMeetingRoomIcon />
                                        <Typography variant='body1'>
                                             { fr.name }
                                        </Typography>
                                   </CardRoomDisabledStyled>
                               </Grid>
                         )
                      })
                 }    
           </Grid>
      </DivRooms>
      </DivContainer>
     )
}    

export default RoomsSelect