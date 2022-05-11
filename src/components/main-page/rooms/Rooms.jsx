import {useState, useEffect} from 'react'

//Libs
import { makeStyles } from '@material-ui/core/styles'
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
import 'date-fns'
import { alpha } from '@material-ui/core/styles'
import DateFnsUtils from '@date-io/date-fns'
import {
          MuiPickersUtilsProvider,
          KeyboardTimePicker,
          KeyboardDatePicker,
        } from '@material-ui/pickers'
import styled from '@emotion/styled'

//My imports
import service from '../../../service'
import { generateIdUnique, giveFormatDate } from '../../common/functions/general'
import Spinner from '../../common/spinner/Spinner'
import HrTittle from '../../common/hr/HrTittle'
import CardsRoom from './CardsRoom'
import RoomsSelect from './RoomsSelect'

//Icons
import SearchIcon from '@material-ui/icons/Search'
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import DialogBook from './DialogBook'

const FormFilters = styled.form`
    background-color: #EAEDED;
    padding: 1rem;
    margin-bottom: 0;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    border-top: 4px solid #34495E;
`;

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});


const Rooms = () => {
  const classes = useStyles();
  const [typeRooms, setTypeRooms] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showSpinner2, setShowSpinner2] = useState(false);
  const [selectedDate1, setSelectedDate1] = useState(new Date());
  //Sum a day to data currently
  const [selectedDate2, setSelectedDate2] = useState(new Date().setDate(new Date().getDate() + 1));
  const [typeRoomSelected, setTypeRoomSelected] = useState('');
  const [nameTRSelected, setNameTRSelected] = useState('');
  const [roomsAvailableDates, setRoomsAvailableDates] = useState([]);
  const [errorTR, setErrorTR] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  //
  const [roomsReservation, setRoomsReservation] = useState([]);

  const handleDateChange1 = (date) => {
    setSelectedDate1(date);
  };
  
  const handleDateChange2 = (date) => {
    setSelectedDate2(date);
  };

  useEffect(() => {
    const fecha = new Date(selectedDate1);
    const sumFecha = fecha.setDate( fecha.getDate() + 1 );
    setSelectedDate2( new Date(sumFecha) )
  }, [selectedDate1])

  //Saving values in localStorage
  useEffect(() => {

    if ( typeRoomSelected !== '' ) {
      localStorage.setItem('typeRoomSelected', typeRoomSelected );
      localStorage.setItem('startDate', JSON.stringify(selectedDate1) );
      localStorage.setItem('finishDate', JSON.stringify(selectedDate2) );
      localStorage.setItem('idRooms', JSON.stringify(roomsReservation));
    }

  }, [typeRoomSelected ,selectedDate1, selectedDate2, roomsReservation])

  const validateTypeSelected = () => {
      if (typeRoomSelected === '') {
        setErrorTR(true);
        return false;
      }

      setErrorTR(false);
      return true;
  }

  const getTypeRooms = async () => {
      const { developURL } = service;

      const url = `${developURL}/typeRooms`;
      const fetchConfig = {
                method: 'GET', 
                headers: { 'Content-Type': 'application/json' }
           }

      try {

           setShowSpinner(true);
           const response = await fetch( url, fetchConfig );
           const responseJSON = await response.json();
           setShowSpinner(false);

           if (!responseJSON.success) {
                //Error
                return;
           }

           //request successfully
           setTypeRooms( responseJSON.result );
      } catch (error) {
           //Error

      }
  }

  const searchRooms = async (e) => {

      e.preventDefault();
      setRoomsReservation([]);
      if ( !validateTypeSelected() )
        return;

      const { developURL } = service;
      const startDate = giveFormatDate( selectedDate1 );
      const finishDate = giveFormatDate( selectedDate2 );
      const data = { 
          startDate, 
          finishDate,
          idTypeRoom: typeRoomSelected
      }
      const url = `${developURL}/room/available/reservation`;
      const fetchConfig = {
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( data )
           }

      try {

      

           setShowSpinner2(true);
           const response = await fetch( url, fetchConfig );
           const responseJSON = await response.json();
           setShowSpinner2(false);
           console.log(responseJSON)
           if (!responseJSON.success) {
                //Error
                return;
           }

           //request successfully
           setRoomsAvailableDates(responseJSON.result);
      } catch (error) {
           //Error

      }
  }

  useEffect(() => {
    getTypeRooms();
  }, [])

  return (
    <div>
        <Grid container spacing={2}>
            { showSpinner ? ( <Spinner /> ) :
            (
              typeRooms.map( tr => (
                <Grid item xs={12} md={4} key={generateIdUnique()}>
                  <CardsRoom 
                      urlImgs={ tr.picture }
                      idRoom={ tr._id }
                      tittle={tr.name}
                      textSecondary={tr.features}
                      guests={tr.guests}
                      price={tr.price}
                      setTypeRoomSelected={setTypeRoomSelected}
                      setErrorTR={setErrorTR}
                      setNameTRSelected={setNameTRSelected}
                      key={generateIdUnique()}
                  />
                </Grid>

              ) )
            )
            }
        </Grid>
        <Box my={3}>
          <Grid container justifyContent='center'>
            {/* FORM FOR SEND DATES AND TYPE OF ROOM */}
              <FormFilters onSubmit={(e) => searchRooms(e)}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container spacing={2} alignItems='center'>
                    {/* SHOW TYPE OF ROOM OR ERROR IF THIS STAST DOESN'T HAVE INFORMATION */}
                    <Grid item>
                        { !errorTR && nameTRSelected !== '' && 
                          (
                            <Typography variant='body1' align='center' paragraph>
                              { `${nameTRSelected}` }
                            </Typography>
                          )
                        }
                        
                        
                        {
                          !errorTR && nameTRSelected === '' && 
                            (
                              <Typography variant='body1' align='center' paragraph>
                                Select a type of room
                              </Typography>
                            )
                          
                        }

                        {
                           errorTR && nameTRSelected === '' && 
                           (
                              <Typography variant='body1' align='center' color='error' paragraph>
                                You must select a type of room
                              </Typography>
                           )
                        }
                        
                    </Grid>
                    <Grid item>
                        <KeyboardDatePicker
                          margin="normal"
                          id="start-date-picker"
                          label="Start Date"
                          value={selectedDate1}
                          onChange={handleDateChange1}
                          minDate={new Date()}
                          format="MM/dd/yyyy"
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                        />
                    </Grid> 

                    <Grid item>
                        <KeyboardDatePicker
                          margin="normal"
                          id="finish-date-picker"
                          label="Finish Date"
                          value={selectedDate2}
                          onChange={handleDateChange2}
                          format="MM/dd/yyyy"
                          minDate={selectedDate2}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                        />
                    </Grid> 
                    <Grid item>
                        <Button type='submit'>
                            <SearchIcon />
                        </Button>
                    </Grid>

                    {
                      roomsReservation.length > 0 && (
                        <Grid item>
                            <Button variant='contained'
                                    color='primary'
                                    startIcon={<LocalLibraryIcon />}
                                    onClick={ () => { setOpenDialog(true) } }
                            >
                               Book
                            </Button>
                        </Grid>   
                      )
                    }
                  </Grid>
      
                </MuiPickersUtilsProvider>
              </FormFilters>
          </Grid>
        </Box>
        {/* ROOMS SELECT */}
        <Box my={3}>
          {
            showSpinner2 ? ( <Spinner /> ) :
            (
              roomsAvailableDates.length > 0 && (
  
                <RoomsSelect 
                  setRoomsAvailableDates={setRoomsAvailableDates}
                  roomsAvailableDates={roomsAvailableDates}
                  setRoomsReservation={setRoomsReservation}
                  roomsReservation={roomsReservation}
                />
  
              
            )
            )
          }
          {
            
          }
            
        
        </Box>        
        {
          openDialog && (
            <DialogBook openDialog={openDialog} 
            setOpenDialog={setOpenDialog} 
            />       
          )
        }
    </div>
  )
}

export default Rooms