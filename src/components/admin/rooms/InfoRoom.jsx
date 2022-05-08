import {useState, useEffect} from 'react'

//Libs
import { useParams } from 'react-router-dom'
import { Grid, 
  TextField, 
  Button, 
  makeStyles, 
  Box,
  Typography,
  ImageList,
  ImageListItem  } from '@material-ui/core'

//My imports
import service from '../../../service'
import { getToken, generateIdUnique } from '../../common/functions/general'
import Hr from '../../common/hr/Hr'
import HrTittle from '../../common/hr/HrTittle'
import Spinner from '../../common/spinner/Spinner'


//Icons
import BedroomChildIcon from '@mui/icons-material/BedroomChild'
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom'
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered'
import NoMeetingRoomIcon from '@material-ui/icons/NoMeetingRoom'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import InfoIcon from '@material-ui/icons/Info'
import PeopleIcon from '@material-ui/icons/People'
import PaidIcon from '@mui/icons-material/Paid'
import NotesIcon from '@mui/icons-material/Notes'
import CollectionsIcon from '@mui/icons-material/Collections'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    maxWidth: 700,
    height: 450,
  },
}));

const InfoRoom = () => {
     const [showSpinner, setShowSpinner] = useState(false);
     const [showSpinnerImg, setShowSpinnerImg] = useState(false);
     const [roomInfo, setRoomInfo] = useState({});
     const [siteImgs, setSiteImgs] = useState([]);
     const { id } = useParams();
     const [idInfo, setIdInfo] = useState(id);
     const classes = useStyles();
    
     const getInfo = async (idRoom) => {
        const { developURL } = service;

        const url = `${developURL}/room/${idRoom}`;
        const fetchConfig = {
                  method: 'GET', 
                  headers: { 'Content-Type': 'application/json', 'Authorization': getToken() }
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
             setRoomInfo(responseJSON.result);
        } catch (error) {
             //Error

        }
     }

     useEffect(() => {

        getInfo(idInfo);
        
     }, [idInfo])

     return (
        <>
          {/* HEADER SECTION */}
          {
            showSpinner ? (<Spinner />) :
            (
              <> 
              <Box mb={3}>
                  <Grid container 
                        spacing={2}
                        justifyContent='space-between'
                  >
                       <Grid item 
                             xs={12} 
                             md={12}
                       >
                            <Grid container justifyContent='flex-start' alignItems='flex-end' >
                                 <HrTittle />
                                 <Typography variant='h5'>
                                     Details About Room: { roomInfo.name }
                                 </Typography>
                            </Grid>
                            <Hr />
                       </Grid>
                  </Grid>
              </Box>
              <Box>
                
              {/* INFORMATION AND FEATURES SECTION */}
              { Object.keys(roomInfo).length > 0 &&
                            (

                  <>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                            { /* SUB-HEADER INFORMATION */ }
                            <Grid container alignItems='flex-end'>
                                <Grid item xs={1}>
                                  <InfoIcon />
                                </Grid>
                                <Grid item xs={11}>
                                  <Typography variant='h6' align='left'>
                                    Information
                                  </Typography>
                                </Grid>
                            </Grid>
                            <Hr />

                            {/* FlOOR */}
                            <Grid container>
                                <Grid item xs={1}>
                                  <FormatListNumberedIcon />
                                </Grid>
                                <Grid item xs={11}>
                                  <Typography variant='body1' align='left'>
                                      <b>Floor: </b> { roomInfo.floor }
                                  </Typography>
                                </Grid>
                            </Grid>

                            {/* STATUS */}
                            <Grid container>
                                <Grid item xs={1}>
                                  { roomInfo && roomInfo.status === 'available' ? <CheckCircleIcon /> : <NoMeetingRoomIcon /> }

                                </Grid>
                                <Grid item xs={11}>
                                  <Typography variant='body1' align='left'>
                                    <b>Status: </b> { roomInfo.status }  
                                  </Typography>
                                </Grid>  
                            </Grid>
                              
                            {/* TypeRoom NAME */}
                            <Grid container>
                              <Grid item xs={1}>
                                <BedroomChildIcon />
                              </Grid>
                              <Grid item xs={11}>
                                  <Typography variant='body1' align='left'>
                                    <b>Type of Room: </b> { roomInfo.idTypeRoom.name } 
                                  </Typography>
                              </Grid>  
                            </Grid>

                            {/* TypeRoom PRICE */}
                            <Grid container>
                              <Grid item xs={1}>
                                <PaidIcon />
                              </Grid>
                              <Grid item xs={11}>
                                  <Typography variant='body1' align='left'>
                                      <b>Price: </b> ${ roomInfo.idTypeRoom.price }
                                  </Typography>
                              </Grid>  
                            </Grid>     
                              
                            {/* TypeRoom GUESTS */}
                            <Grid container>
                              <Grid item xs={1}>
                                <PeopleIcon />
                              </Grid>
                              <Grid item xs={11}>
                                  <Typography variant='body1' align='left'>
                                    <b>Guests: </b> { roomInfo.idTypeRoom.guests }
                                  </Typography>
                              </Grid>  
                            </Grid>    
                        </Grid>

                        {/* TypeRoom FEATURES */}
                        <Grid item xs={12} md={6}>
                            { /* SUB-HEADER INFORMATION */ }
                            <Grid container alignItems='flex-end'>
                                <Grid item xs={1}>
                                  <NotesIcon />
                                </Grid>
                                <Grid item xs={11}>
                                <Typography variant='h6' align='left'>
                                Features 
                              </Typography>
                                </Grid>
                            </Grid>
                            <Hr />
                            <Grid item xs={12}>
                              <Typography variant='body1' align='justify'>
                                  { roomInfo.idTypeRoom.features }
                              </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Hr />
                    {/* GALLERY */}

                    {/* SUB-HEADER GALLERY  */}
                    <Box my={3}>
                      <Grid container >
                            <Grid item xs={12}>
                              <Grid container spacing={2} alignItems='flex-end'>
                                <Grid container justifyContent='flex-end' item xs={6}>
                                  <CollectionsIcon />
                                </Grid>
                                <Grid item xs={6}>
                                  <Typography variant='h6' align='left'>
                                    Gallery 
                                  </Typography>
                                </Grid>
                              </Grid>  
                            </Grid>
                      </Grid>
                    </Box>
                    <Hr />

                    {/* IMAGES */}
                    <div className={classes.root}>
                    <ImageList rowHeight={160} className={classes.imageList} cols={3}>
                      { roomInfo.idTypeRoom.picture.map((item, index) => 
                        {
                          return(
                            ((roomInfo.idTypeRoom.picture.lenght%2) != 0) && ( index == (roomInfo.idTypeRoom.picture.length - 1)) ? (
                              <ImageListItem key={generateIdUnique()} cols={3}>
                              <img src={`${service.developImgURL}/${item}`} alt={item} />
                              </ImageListItem>
                            ) : (
                              <ImageListItem key={generateIdUnique()} cols={index%2 == 0 ?  1 :  2}>
                              <img src={`${service.developImgURL}/${item}`} alt={item} />
                              </ImageListItem>
                            ))
                        } 
                         
                      )}
                    </ImageList>
                    </div>  
                  </> 
            )}
              </Box>
                    
             </>
            )
          }
         
        </>  
      )
}

export default InfoRoom