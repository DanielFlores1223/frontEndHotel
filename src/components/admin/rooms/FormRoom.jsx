/*
     This component can be used for Admins and Receptionists
*/

import {useState, useEffect} from 'react'

//libs
import styled from '@emotion/styled'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Grid, 
         TextField, 
         Button, 
         makeStyles, 
         Box, 
         Hidden, 
         Typography, 
         FormControl, 
         InputLabel,
         Select, FormHelperText  } from '@material-ui/core'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'

//My imports
import service from '../../../service'
import { getToken, generateIdUnique } from '../../common/functions/general'
import Hr from '../../common/hr/Hr'
import HrTittle from '../../common/hr/HrTittle'
import Spinner from '../../common/spinner/Spinner'

//icons
import BedroomChildIcon from '@mui/icons-material/BedroomChild'
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import SaveIcon from '@mui/icons-material/Save'
import EditIcon from '@material-ui/icons/Edit'

const validationSchema = Yup.object({
     name: Yup
       .string()
       .required('Name is required'),
     floor: Yup
       .number()
       .positive()
       .min(0, 'The Floor must be 0 or greater than 0 ')
       .required('Floor is required')
       .typeError('This field must be a number'),
     idTypeRoom: Yup
        .string()
        .required('This field is required'),

});

const FormStyled = styled.form`
     max-width: 40rem;
     border-radius: 10px;
     border: 2px solid #F4F6F6;
     padding: 2rem;
     -webkit-box-shadow: 0px 0px 30px -21px rgba(46,74,117,1);
     -moz-box-shadow: 0px 0px 30px -21px rgba(46,74,117,1);
     box-shadow: 0px 0px 30px -21px rgba(46,74,117,1);
`;


const FormRoom = () => {

     const [typeRooms, setTypeRooms] = useState([]);
     const [showSpinner, setShowSpinner] = useState(true);
     const navigateTo = useNavigate();
     const { id } = useParams();
     const [edit, setEdit] = useState(false);
     const [roomInfo, setRoomInfo] = useState({});
     const { enqueueSnackbar }  = useSnackbar();

     let formik = useFormik({
          initialValues: {
             name: '',
             floor: '',
             idTypeRoom: ''
          },
          validationSchema,
          onSubmit: (values) => {
               if( edit ) {
                    //edit
                    updateRoom( id, values );

               } else {
                    //create
                    signUpRoom(values);
               }
               
          }
     });

     const getTypeOfRooms = async () => {
          const { developURL } = service;

          const url = `${developURL}/typeRooms`;
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
               setTypeRooms( responseJSON.result );
          } catch (error) {
               //Error
               
          }
     }

     const signUpRoom = async (values) => {
          const { developURL } = service;

          const url = `${developURL}/room`;
          const data = {...values}
          const fetchConfig = {
                    method: 'POST', 
                    headers: { 'Content-Type': 'application/json', 'Authorization': getToken() },
                    body: JSON.stringify(data)
               }

          try {
               
               const response = await fetch( url, fetchConfig );
               const responseJSON = await response.json();

               if (!responseJSON.success) {
                    enqueueSnackbar( responseJSON.msg , { variant: 'error', } );
                   return;
                 }
  
                 navigateTo('/rooms');
                 enqueueSnackbar( responseJSON.msg , { variant: 'success', } );
                 
          } catch (error) {
               //Error
               enqueueSnackbar( responseJSON.msg , { variant: 'something went wrong... Try again later', } );
          }
     }

     const getRoom = async (idRoom) => {
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
               setRoomInfo(responseJSON.result)
               formik.values.name = roomInfo.name;
               formik.values.floor = roomInfo.floor;
               formik.values.idTypeRoom = roomInfo.idTypeRoom;
          } catch (error) {
               //Error
               
          }
     }

     const updateRoom = async (idRoom, values) => {
          const { developURL } = service;

          const url = `${developURL}/room/${idRoom}`;
          const data = {...values}
          const fetchConfig = {
                    method: 'PUT', 
                    headers: { 'Content-Type': 'application/json', 'Authorization': getToken() },
                    body: JSON.stringify(data)
               }

          try {
               
               const response = await fetch( url, fetchConfig );
               const responseJSON = await response.json();

               console.log(responseJSON)
               if (!responseJSON.success) {
                    enqueueSnackbar( responseJSON.msg , { variant: 'error', } );
                   return;
                 }
  
                 navigateTo('/rooms');
                 enqueueSnackbar( responseJSON.msg , { variant: 'success', } );
                 
          } catch (error) {
               //Error
               enqueueSnackbar( responseJSON.msg , { variant: 'something went wrong... Try again later', } );
          }
     }

     useEffect( () => {
          
          if (id !== undefined) {
               setEdit(true);
               getRoom( id );
               console.log('editar');
          } else {
               setEdit(false)
          }

          getTypeOfRooms();

     }, [] );

     useEffect( () => {
          if (edit) {
               formik.values.name = roomInfo.name;
               formik.values.floor = roomInfo.floor;
               formik.values.idTypeRoom = roomInfo.idTypeRoom;
          }
     }, [roomInfo])

     return (
          <>
           {/* HEADER SECTION */}
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
                                   { edit ? `Edit Room: ${roomInfo.name}` : 'Add a Room' } 
                               </Typography>
                          </Grid>
                          <Hr />
                     </Grid>
                </Grid>
          </Box>
          <Grid container item xs={12} justifyContent='center'>
               {/* FORM */}
               <FormStyled onSubmit={formik.handleSubmit}>
                    <Grid container item xs={12}>
                         <Grid container>
                             <Grid item xs={12} md={6}>
                                {/* TEXTFIELD NAME */}
                                <Box mb={2}>
                                    <Grid container spacing={1} alignItems="flex-end" >
                                      <Grid item> 
                                          <MeetingRoomIcon />
                                      </Grid>
                                      <Grid item xs={11} md={10}>
                                        <TextField
                                          fullWidth
                                          id="name"
                                          name="name"
                                          label="Name"
                                          value={formik.values.name}
                                          onChange={formik.handleChange}
                                          error={formik.touched.name && Boolean(formik.errors.name)}
                                          helperText={formik.touched.name && formik.errors.name}
                                        />
                                      </Grid>
                                    </Grid>
                                </Box>
                             </Grid>
                             <Grid item xs={12} md={6}>
                                  {/* TEXTFIELD FLOOR */}
                                   <Box mb={2}>
                                       <Grid container spacing={1} alignItems="flex-end" >
                                         <Grid item>
                                             <FormatListNumberedIcon />
                                         </Grid>
                                         <Grid item xs={11} md={10}>
                                           <TextField
                                             fullWidth
                                             id="floor"
                                             name="floor"
                                             label="Floor"
                                             type='number'
                                             value={formik.values.floor}
                                             onChange={formik.handleChange}
                                             error={formik.touched.floor && Boolean(formik.errors.floor)}
                                             helperText={formik.touched.floor && formik.errors.floor}
                                           />
                                         </Grid>
                                       </Grid>
                                   </Box>
                             </Grid>        
                         </Grid>

                         {
                              typeRooms && showSpinner ? (
                                   <Spinner />
                              ) :
                              (    <>
                                   {/* SELECT TYPE OF ROOM */}
                                   <Grid container>   
                                        <Grid item xs={12}>
                                             <Box mb={2}>
                                                   <Grid container spacing={1} alignItems="flex-end" >
                                                     <Grid item> 
                                                         <BedroomChildIcon />
                                                     </Grid>
                                                     <Grid item xs={11} >
                                                       <FormControl 
                                                                 error={formik.touched.idTypeRoom && Boolean(formik.errors.idTypeRoom)} 
                                                                 fullWidth
                                                       >
                                                            <InputLabel htmlFor="name-native-error">
                                                                 Select Type of Room
                                                            </InputLabel>
                                                            <Select
                                                              value={formik.values.idTypeRoom}
                                                              onChange={formik.handleChange}
                                                              label="idTypeRoom"
                                                              inputProps={{
                                                                name: 'idTypeRoom',
                                                                id: 'name-native-error',
                                                              }}
                                                              defaultValue={ edit ? formik.values.idTypeRoom : '' }
                                                            >
                                                              { !edit && (
                                                                   <option aria-label='None' 
                                                                           value='' 
                                                                           selected
                                                                           key={generateIdUnique()} 
                                                                   />
                                                              ) }
                                                              
                                                              {
                                                                   typeRooms.map( tr => <option value={tr._id}
                                                                                                key={generateIdUnique()}
                                                                                         >
                                                                                               {tr.name}
                                                                                        </option> 
                                                                                )
                                                              }

                                                            </Select>
                                                            <FormHelperText>
                                                                 {formik.touched.idTypeRoom && formik.errors.idTypeRoom}
                                                            </FormHelperText>
                                                        </FormControl>
                                                     </Grid>
                                                   </Grid>
                                             </Box>
                                        </Grid>
                                   </Grid>
                                   </>
                              )
                         }
                         
                         {/* BUTTON SUBMIT */}
                           <Grid container justifyContent='flex-end'>
                                <Box mt={2}>
                                     <Hidden smDown>
                                          <Button color='primary'
                                                  variant='contained'
                                                  type='submit'
                                                  startIcon={ !edit ? <SaveIcon /> : <EditIcon /> }
                                          >
                                               { !edit ? 'Save' : 'Edit' }
                                          </Button>
                                     </Hidden>
                                     <Hidden mdUp>
                                          <Button color='primary'
                                                  variant='contained'
                                                  type='submit'
                                                  fullWidth
                                                  startIcon={ !edit ? <SaveIcon /> : <EditIcon /> }
                                          >
                                               { !edit ? 'Save' : 'Edit' }
                                          </Button>
                                     </Hidden>
                                </Box>
                           </Grid>

                    </Grid> 
               </FormStyled>
          </Grid> 
       </>
     )    
}    

export default FormRoom