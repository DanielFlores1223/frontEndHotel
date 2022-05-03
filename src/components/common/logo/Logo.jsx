import React from 'react'
import ImgLogo from '../../../img/logo.png';
import { ContainerLogo, ImageLogo, PLogo } from './LogoStyles';

const Logo = () => {
  return (
    <ContainerLogo>
         <ImageLogo src={ImgLogo} 
              alt="logo" 
          />
          <PLogo className='font-logo'>Posada Real</PLogo>
    </ContainerLogo>
  )
}

export default Logo