import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Hidden } from '@material-ui/core';
import NavBar from './NavBar';
import DrawerNav from './DrawerNav';
import { Outlet } from 'react-router-dom';

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

function Header() {

  const [openSlide, setOpenSlide] = useState(false);
  const classes = useStyles();

  const display = () => {
    setOpenSlide( !openSlide );
  }


  return (
    <div className={classes.root}>
         <NavBar display={display}/>
         <Hidden smUp >
              <DrawerNav variant='temporary' open={openSlide} onClose={display} />  
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

export default Header