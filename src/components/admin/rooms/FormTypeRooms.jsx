import {useState, useEffect} from 'react'

//libs
import styled from '@emotion/styled'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Grid, TextField, Button, makeStyles, Box, Hidden, Typography } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import { useSnackbar } from 'notistack';

//My imports
import service from '../../../service'
import { getToken, generateIdUnique } from '../../common/functions/general'
import Hr from '../../common/hr/Hr'
import HrTittle from '../../common/hr/HrTittle'

//icons
import BedroomChildIcon from '@mui/icons-material/BedroomChild'
import PaidIcon from '@mui/icons-material/Paid'
import NotesIcon from '@mui/icons-material/Notes'
import SaveIcon from '@mui/icons-material/Save'
import PeopleIcon from '@material-ui/icons/People'


const FormStyled = styled.form`
     max-width: 40rem;
     border-radius: 10px;
     border: 2px solid #F4F6F6;
     padding: 2rem;
     -webkit-box-shadow: 0px 0px 30px -21px rgba(46,74,117,1);
     -moz-box-shadow: 0px 0px 30px -21px rgba(46,74,117,1);
     box-shadow: 0px 0px 30px -21px rgba(46,74,117,1);
`;

const validationSchema = Yup.object({
     name: Yup
       .string()
       .required('Name is required'),
     features: Yup
       .string()
       .required('Features is required'),
     price: Yup
       .number()
       .positive()
       .min(0, 'The Price must be greater than 0 ')
       .required('Price is required')
       .typeError('This field must be a number'),
     guests: Yup
     .number()
     .positive()
     .min(0, 'The Number of Guests must be greater than 0 ')
     .integer('The number must be a integer')
     .required('Number of Guests is required')
     .typeError('This field must be a number'),

});

const FormTypeRooms = () => {

     const [filesState, setFilesState] = useState([]);
     const [errorDrop, setErrorDrop] = useState('');
     const navigateTo = useNavigate();
     const { enqueueSnackbar }  = useSnackbar();

     const formik = useFormik({
          initialValues: {
            name: '',
            features: '',
            price: '',
            guests: ''
          },
          validationSchema,
          onSubmit: (values) => {
               if ( validateDropZone() ) {
                   signUpTypeRoom(values);
               }
          }
     }); 

     // specify upload params and url for your files
     const getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }
  
     // called every time a file's `status` changes
     const handleChangeStatus = ({ meta, file }, status) => { 

          if (status == 'done') {
               file.idArray = generateIdUnique();
               setFilesState([...filesState, file]);
               validateDropZone();
          }

          if(status == 'removed') {
               const newFiles = filesState.filter( f => f.idArray !== file.idArray );
               setFilesState( newFiles );
               validateDropZone();
          }
          
     }

     const validateDropZone = () => {
          
          if (filesState.length === 0) {
               setErrorDrop('This field is required, You have to upload images here');
               return false;
          }

          if (filesState.length >= 10) {
               setErrorDrop('The number of files must be less than 10');
               return false;
          }

          setErrorDrop('');
          return true;
     }
  
     const signUpTypeRoom = async (values) => {
          const { developURL } = service;
          const formData = new FormData();
          formData.append('name', values.name);
          formData.append('features', values.features);
          formData.append('price', values.price);
          formData.append('guests', values.guests);

          //This travel all files in the state of files
          for (const file of filesState) {
               formData.append('image',file,file.name)
          }

          const url = `${developURL}/typeRoom`;
          const fetchConfig = {
               method: 'POST', 
               headers: { 'Authorization': getToken() } ,
               body: formData
          }

          try {
               const response = await fetch(url, fetchConfig);
               const responseJSON = await response.json();
          
               console.log(responseJSON)
               if (!responseJSON.success) {
                  enqueueSnackbar( responseJSON.msg , { variant: 'error', } );
                 return;
               }

               navigateTo('/rooms');
               enqueueSnackbar( responseJSON.msg , { variant: 'success', } );
               
               
          } catch (error) {
               enqueueSnackbar( responseJSON.msg , { variant: 'something went wrong... Try again later', } );
          }        
     }

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
                                        Add a Type Of Room
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
                                        <BedroomChildIcon />
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
                                {/* TEXTFIELD PRICE */}
                                 <Box mb={2}>
                                     <Grid container spacing={1} alignItems="flex-end" >
                                       <Grid item>
                                           <PaidIcon />
                                       </Grid>
                                       <Grid item xs={11} md={10}>
                                         <TextField
                                           fullWidth
                                           id="price"
                                           name="price"
                                           label="Price"
                                           value={formik.values.price}
                                           onChange={formik.handleChange}
                                           error={formik.touched.price && Boolean(formik.errors.price)}
                                           helperText={formik.touched.price && formik.errors.price}
                                         />
                                       </Grid>
                                     </Grid>
                                 </Box>
                           </Grid>        
                       </Grid>

                       <Grid container spacing={2}>
                           <Grid item xs={12} md={12}>
                                {/* TEXTFIELD GUESTS */}
                                <Box mb={2}>
                                     <Grid container spacing={1} alignItems="flex-end" >
                                       <Grid item>
                                           <PeopleIcon />
                                       </Grid>
                                       <Grid item xs={11}>
                                           <TextField
                                             fullWidth
                                             id="guests"
                                             name="guests"
                                             label="Number of Guests"
                                             type='number'
                                             multiline
                                             value={formik.values.guests}
                                             onChange={formik.handleChange}
                                             error={formik.touched.guests && Boolean(formik.errors.guests)}
                                             helperText={formik.touched.guests && formik.errors.guests}
                                           />
                                       </Grid>
                                     </Grid>
                                 </Box>
                           </Grid>
                       </Grid>

                       <Grid container spacing={2}>
                           <Grid item xs={12} md={12}>
                                {/* TEXTFIELD Features */}
                                <Box mb={2}>
                                     <Grid container spacing={1} alignItems="flex-end" >
                                       <Grid item>
                                           <NotesIcon />
                                       </Grid>
                                       <Grid item xs={11}>
                                           <TextField
                                             fullWidth
                                             id="features"
                                             name="features"
                                             label="Features"
                                             multiline
                                             value={formik.values.features}
                                             onChange={formik.handleChange}
                                             error={formik.touched.features && Boolean(formik.errors.features)}
                                             helperText={formik.touched.features && formik.errors.features}
                                           />
                                       </Grid>
                                     </Grid>
                                 </Box>
                           </Grid>
                       </Grid>

                       <Grid container spacing={2}>
                           <Grid item xs={12} md={12}>
                              <Dropzone
                                getUploadParams={getUploadParams}
                                onChangeStatus={handleChangeStatus}
                                accept='image/*'
                              />

                              { 
                                   errorDrop && errorDrop !== '' && (
                                        <Typography variant='body2' color='error' align='left'>
                                                  { errorDrop }
                                        </Typography>
                                   )
                              
                              }
                              
                           </Grid>
                       </Grid>
                       {/* BUTTON SUBMIT */}
                       
                         <Grid container justifyContent='flex-end'>
                              <Box mt={2}>
                                   <Hidden smDown>
                                        <Button color='primary'
                                                variant='contained'
                                                type='submit'
                                                startIcon={<SaveIcon />}
                                        >
                                             Save
                                        </Button>
                                   </Hidden>
                                   <Hidden mdUp>
                                        <Button color='primary'
                                                variant='contained'
                                                type='submit'
                                                fullWidth
                                                startIcon={<SaveIcon />}
                                        >
                                             Save
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

export default FormTypeRooms