
import { useState } from 'react'

//libs
import styled from '@emotion/styled'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Alert } from '@mui/material'
import { Grid, TextField, Button, makeStyles, Box } from '@material-ui/core'

//My imports
import DivLogo from '../../common/divlogo/DivLogo'
import VideoHotelLogin from '../../../videos/hotel-login.mp4'
import Spinner from '../../common/spinner/Spinner'
import { cleanAlert } from '../../common/functions/general'
import service from '../../../service'

//Icons
import AccountCircle from '@material-ui/icons/AccountCircle'
import VpnKeyIcon from '@material-ui/icons/VpnKey'

const FormLogin = styled.form`
    padding: 2rem 2rem;
    @media (max-width: 480px) {
      margin-top: 2rem; 
    }
`;

const Video = styled.video`
  max-width: 100%;
  border-radius: 10px;
`;

const DivVideo = styled.div`
  
`;

const validationSchema = Yup.object({
  email: Yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup
    .string('Enter your password')
    .required('Password is required'),
});

const Login = ({setLoginSuccess}) => {
  const [showAlert, setShowAlert] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [msgAlert, setMsgAlert] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: (values) => {
      login(values);
    }
  }) 

  const login = async( values ) => {
    const { developURL } = service;
     
    const data = { ...values }
    const url = `${developURL}/user/login`;
    const fetchConfig = {
         method: 'POST', 
         headers: { 'Content-Type': 'application/json'} ,
         body: JSON.stringify( data )
    }

    try {
      setShowSpinner(true);
      const response = await fetch(url, fetchConfig);
      const responseJSON = await response.json();
      setShowSpinner(false);

      if (!responseJSON.success) {
        setShowAlert(true);
        setMsgAlert(responseJSON.msg);
        cleanAlert(setShowAlert, setMsgAlert);
        return;
      }

      setLoginSuccess(true);
      localStorage.setItem('r', responseJSON.result.role);
      localStorage.setItem('t', responseJSON.result.token);
      localStorage.setItem('n', responseJSON.result.name);

    } catch (error) {
        setShowAlert(true);
        setMsgAlert('Something went wrong, please try again later');
        cleanAlert(setShowAlert, setMsgAlert);
    }
}

  return (
    <Box px={1} py={4}>
        <Grid container spacing={2}>
            <Grid item
                  container
                  xs={12}
                  md={7}
                  alignItems='center'
            > 
            <DivVideo>
                <Video autoPlay muted loop>
                    <source src={VideoHotelLogin} type='video/mp4' />
                </Video>
            </DivVideo>
            </Grid>

            <Grid item
                  xs={12}
                  md={5}
            >
              
                <FormLogin onSubmit={formik.handleSubmit}>
                      { showAlert && <Alert severity="error"> {msgAlert} </Alert>}       
                      <DivLogo msg='Sign In' />
                      { !showSpinner && (
                       <div>
                          <Box mb={2}>
                              <Grid container spacing={1} alignItems="flex-end" >
                                <Grid item>
                                  <AccountCircle />
                                </Grid>
                                <Grid item xs={11}>
                                  <TextField
                                    fullWidth
                                    id="email"
                                    name="email"
                                    label="Email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                    disabled={showSpinner}
                                  />
                                </Grid>
                              </Grid>
                          </Box>
                          
                          <Box mb={3}>
                              <Grid container spacing={1} alignItems="flex-end" className='mb-2'>
                                <Grid item>
                                  <VpnKeyIcon />
                                </Grid>
                                <Grid item xs={11}>
                                  <TextField
                                    fullWidth
                                    id="password"
                                    name="password"
                                    label="Password"
                                    type="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                    disabled={showSpinner}
                                  />
                                </Grid>
                              </Grid>
                          </Box>
                          
                          <Button color="primary" variant="contained" fullWidth type="submit" disabled={showSpinner}>
                            Sign in
                          </Button>
                      </div>
                      ) }

                      { showSpinner && <Spinner /> }
                </FormLogin>
            </Grid>
        </Grid>

    </Box>
  )
}

export default Login