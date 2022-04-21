import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Hidden } from '@material-ui/core';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled'

//Icons
import PersonAddAltSharpIcon from '@mui/icons-material/PersonAddAltSharp';
import MeetingRoomSharpIcon from '@mui/icons-material/MeetingRoomSharp';
import LoginSharpIcon from '@mui/icons-material/LoginSharp';
import BusinessSharpIcon from '@mui/icons-material/BusinessSharp';
import Logo from '../../common/logo/Logo';

const useStyles = makeStyles((theme) => ({
     root: {
       flexGrow: 1,
     },
     menuButton: {
       marginRight: theme.spacing(2),
     },
     title: {
       flexGrow: 1,
     },
     offset: {
       ...theme.mixins.toolbar, // min-height: 56px;
       marginBottom: "1rem", // margen opcional
     },
     appBar: {
          [theme.breakpoints.up('sm')]: {
              width: `100%`,
              marginLeft: 240,
          },
     },
}));

const LinkStyled = styled(Link)`
     color: #FFF;
     text-decoration: none;
     text-transform: none;
     font-size: 1rem;
     font-weight: 300;
     margin-right: 0.5rem;
    
`;

const NavBar = ({display}) => {
  
  const classes = useStyles();

  return (
     <>
          <AppBar className={classes.appBar} >
            <Toolbar>
              
              <Hidden smUp>
                    <IconButton edge="start" 
                                className={classes.menuButton} 
                                color="inherit" 
                                aria-label="menu"
                                onClick={ () => display() }
                     >
                          <MenuIcon />
                    </IconButton>
              </Hidden>

               <div className={classes.title}>
                    <Logo />
               </div>

               {/* LINKS */}
               <Hidden xsDown>
                    <Button color="inherit" 
                            startIcon={<MeetingRoomSharpIcon/>}
                            size='large'
                    > 
                         <LinkStyled to='/rooms'> Rooms </LinkStyled> 
                    </Button>
                    <Button color="inherit" 
                            startIcon={<BusinessSharpIcon/>}
                            size='large'
                    > 
                         <LinkStyled to='/about'> About </LinkStyled> 
                    </Button>
                    <Button color="inherit" 
                            startIcon={<LoginSharpIcon/>}
                            size='large'
                    > 
                         <LinkStyled to='/login'> Sign In </LinkStyled> 
                    </Button>
                    <Button color="inherit" 
                            startIcon={<PersonAddAltSharpIcon/>}
                            size='large'
                    > 
                         <LinkStyled to='/register'> Register </LinkStyled> 
                    </Button>
               </Hidden>
           </Toolbar>
          </AppBar>

          <div className={classes.offset}></div>
   </>
  )
}

export default NavBar