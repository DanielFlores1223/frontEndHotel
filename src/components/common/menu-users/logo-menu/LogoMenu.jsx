import React from 'react'
import ImgLogo from '../../../../img/logo.png';
import { ContainerLogo, ImageLogo, PLogo, PWelcome } from './LogoMenuStyled';

const LogoMenu = () => {
  return (
    <ContainerLogo>
         <ImageLogo src={ImgLogo} 
              alt="logo" 
          />
          <PLogo className='font-logo'>Posada Real</PLogo>
          <PWelcome className='font-logo'>Welcome</PWelcome>
    </ContainerLogo>
  )
}

export default LogoMenu