import { useState, useEffect } from 'react'

//libs
import { makeStyles } from '@material-ui/core/styles';
import { Hidden } from '@material-ui/core';
import { Outlet } from 'react-router-dom';

//My imports
import NavBar from './NavBar';
import DrawerNav from './DrawerNav';


const useStyles = makeStyles((theme) => ({
     root: {
          display: 'flex',
     },
     toolbar: theme.mixins.toolbar,
     content: {
        flexGrow: 1,
        padding: theme.spacing(3),
     },
}));


const Menu = ( { children, setLoginSuccess } ) => {
     const [openSlide, setOpenSlide] = useState(false);
     const classes = useStyles();
   
     const display = () => {
       setOpenSlide( !openSlide );
     }
   
   
     return (
       <div className={classes.root}>
            <NavBar display={display} setLoginSuccess={setLoginSuccess}/>
            <Hidden xsDown>
               <DrawerNav links={ children } variant="permanent" open={true} />
            </Hidden>
            <Hidden smUp >
                 <DrawerNav links={ children } variant='temporary' open={openSlide} onClose={display} />  
            </Hidden>
            <div className={classes.content}>
               <div className={classes.toolbar}></div>
   
               <div style={{marginTop: '2rem'}}>
                   <Outlet/>
               </div>
            </div>
       </div>
     )
}

export default Menu