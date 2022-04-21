import React from 'react';
import HotelMain from '../../../img/hotel-main.jpg';
import ImgLogo from '../../../img/logo.png';
import styled from '@emotion/styled'
import { Grid } from '@mui/material';
import Logo from '../../common/logo/Logo';

const ImgMain = styled.img`
     max-width: 100%;
     width: 45rem;
     max-height: 100%;
     height: 30rem;
`;

const ImgLogoStyle = styled.img`
    max-width: 100%;
    width: 10rem;

`

const DivMain = styled.div`
    background-image: url(${HotelMain});
    height: 30rem;
    background-position: top;
    background-size: cover;
    background-repeat: no-repeat;
`;


const HomePage = () => {
  return (
    <DivMain>
        <Grid container>
            <Grid item md={3}>
                  <p>Hola</p>

            </Grid>

        </Grid>
         
    </DivMain>
  )
}

export default HomePage