import React from 'react'
//libs
import styled from '@emotion/styled';
import { Typography } from '@material-ui/core'

//My imports
import Logo from '../logo/Logo';

const DivLogoE = styled.div`
  display:flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const HrE = styled.hr`
  height: 0.2rem;
  background-color: black;
  border-radius: 30px;
  width: 10rem;
`;

const DivLogo = ({msg}) => {
  return (
    <div>
         <DivLogoE>
                <Logo />
          </DivLogoE>
          <HrE />
          <Typography variant="h5" color="initial" align='center'>
              { msg }
          </Typography>
    </div>
  )
}

export default DivLogo