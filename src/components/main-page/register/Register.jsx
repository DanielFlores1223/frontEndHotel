import { useState, useEffect } from 'react'

//Libs
import { Grid, TextField, Box, Button, Backdrop, CircularProgress  } from '@material-ui/core'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import styled from '@emotion/styled'

//My Imports
import { phoneRegex } from '../../common/functions/regularExpressions'
import DivLogo from '../../common/divlogo/DivLogo'
import ImgReception from '../../../img/reception.jpg'
import service from '../../../service'

//Icons
import AccountCircle from '@material-ui/icons/AccountCircle'
import PersonIcon from '@material-ui/icons/Person'
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid'
import VpnKeyIcon from '@material-ui/icons/VpnKey'

const FormLogin = styled.form`
    padding: 2rem 2rem;
    @media (max-width: 480px) {
      margin-top: 2rem; 
    }
`;

const validationSchema = Yup.object({
  name: Yup
    .string()
    .required('Name is required'),
  lastName: Yup
    .string()
    .required('Last Name is required'),
  numberPhone: Yup
    .string()
    .required('Name is required')
    .matches(phoneRegex, 'Only international format are allowed for this field, example: +541331225489')
    .min(14)
    .max(14),
  email: Yup
    .string()
    .email()
    .required('Email is required'),
  password: Yup
    .string()
    .required('Password is required'),
});



const Register = () => {
  
  const formik = useFormik({
    initialValues: {
      name: '',
      lastName: '',
      numberPhone: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      signUp(values);
    }
  });

  const signUp = async (values) => {
    const { developURL } = service;
     
    const data = { ...values }
    const url = `${developURL}/user/customer`;
    const fetchConfig = {
         method: 'POST', 
         headers: { 'Content-Type': 'application/json'} ,
         body: JSON.stringify( data )
    }

    try {
      const response = await fetch(url, fetchConfig);
      const responseJSON = await response.json();
      
      if (!responseJSON.success) {
        return;
      }
      
      
    } catch (error) {
      
    }

  }

  return (
    <div>
        <Grid container spacing={2}>
            <Grid container
                  item
                  xs={12}
                  md={6}
                  alignItems='center'
            >
                <img src={ImgReception} 
                    alt='Reception img' 
                    style={{
                            width: '100%', 
                            height: '25rem', 
                            borderRadius:'10px'
                          }} 
                />
            </Grid>
            <Grid container
                  item
                  xs={12}
                  md={6}
            >
              
              <Grid  item xs={12} >
                <FormLogin onSubmit={formik.handleSubmit}>
                  <DivLogo msg='Sign Up' />
                  <Grid container>
                      <Grid item xs={6}>
                          <Box mb={2}>
                              <Grid container spacing={1} alignItems="flex-end" >
                                <Grid item>
                                  <PersonIcon />
                                </Grid>
                                <Grid item xs={10}>
                                  <TextField
                                    fullWidth
                                    id="name"
                                    name="name"
                                    label="Your Name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}      
                                  />
                                </Grid>
                              </Grid>
                          </Box>
                      </Grid>
                      <Grid item xs={6}>
                         <Box mb={2}>
                              <Grid container spacing={1} alignItems="flex-end" >
                                <Grid item>
                                  <PersonIcon />
                                </Grid>
                                <Grid item xs={10}>
                                  <TextField
                                    fullWidth
                                    id="lastName"
                                    name="lastName"
                                    label="Your Last Name"
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                    helperText={formik.touched.lastName && formik.errors.lastName}      
                                  />
                                </Grid>
                              </Grid>
                          </Box>
                      </Grid>
                   </Grid>

                   <Box mb={2}>
                        <Grid container spacing={1} alignItems="flex-end" >
                          <Grid item>
                            <PhoneAndroidIcon />
                          </Grid>
                          <Grid item xs={11}>
                            <TextField
                              fullWidth
                              id="numberPhone"
                              name="numberPhone"
                              label="Your Phone"
                              value={formik.values.numberPhone}
                              onChange={formik.handleChange}
                              error={formik.touched.numberPhone && Boolean(formik.errors.numberPhone)}
                              helperText={formik.touched.numberPhone && formik.errors.numberPhone}      
                            />
                          </Grid>
                        </Grid>
                    </Box>

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
                              label="Your Email"
                              value={formik.values.email}
                              onChange={formik.handleChange}
                              error={formik.touched.email && Boolean(formik.errors.email)}
                              helperText={formik.touched.email && formik.errors.email}
                              
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
                              label="Your Password"
                              type="password"
                              value={formik.values.password}
                              onChange={formik.handleChange}
                              error={formik.touched.password && Boolean(formik.errors.password)}
                              helperText={formik.touched.password && formik.errors.password}
                              
                            />
                          </Grid>
                        </Grid>
                    </Box>

                    <Button color="primary" 
                            variant="contained" 
                            fullWidth 
                            type="submit" 
                    >
                            Sign up
                    </Button>
                 </FormLogin>
              </Grid>
            </Grid>
        </Grid>

    </div>
  )
}

export default Register