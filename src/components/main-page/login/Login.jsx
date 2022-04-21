import { Grid, TextField, Button, makeStyles, Box } from '@material-ui/core'
import { useState } from 'react'
import styled from '@emotion/styled';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import service from '../../../service';
import { cleanAlert } from '../../common/functions/general';
import { Alert, Typography } from '@mui/material';
import Spinner from '../../common/spinner/Spinner';
import AccountCircle from '@material-ui/icons/AccountCircle';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import VideoHotelLogin from '../../../videos/hotel-login.mp4';
import Logo from '../../common/logo/Logo';

const FormLogin = styled.form`
    padding: 0 2rem;
  
    @media (max-width: 480px) {
      margin-top: 2rem; 
    }
`;

const Video = styled.video`
  max-width: 100%;
  border-radius: 10px;
`;

const DivLogo = styled.div`
  display:flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const Hr = styled.hr`
  height: 0.2rem;
  background-color: black;
  border-radius: 30px;
  width: 10rem;
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
    <Box px={2}>
        <Grid container>
            <Grid item
                  container
                  xs={12}
                  md={7}
                  alignItems='center'
            >
                <Video autoPlay muted loop>
                    <source src={VideoHotelLogin} type='video/mp4' />
                </Video>
            </Grid>

            <Grid item
                  xs={12}
                  md={5}
            >
                <FormLogin onSubmit={formik.handleSubmit}>
                      { showAlert && <Alert severity="error"> {msgAlert} </Alert>}
                      
                      <DivLogo >
                            <Logo />
                      </DivLogo>
                      <Hr />
                      <Typography variant="h5" color="initial" align='center'>
                          Sign In
                      </Typography>
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

                      { showSpinner && <Spinner /> }
                </FormLogin>
            </Grid>
        </Grid>

    </Box>
  )
}

export default Login