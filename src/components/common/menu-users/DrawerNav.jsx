import React from 'react'

//libs
import { Drawer } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles';

//My imports
import NavList from './NavList';
import LogoMenu from './logo-menu/LogoMenu';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
     drawer: {
          [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
          },
     },
     drawerPaper: {
          width: drawerWidth,
     },
     toolbar: theme.mixins.toolbar,
     logo: {
          // margin: '0.7rem',
          margin: '1.2rem 1rem'
     },
}));

const DrawerNav = (props) => {

  const classes = useStyles();   
  return (
    <Drawer
          className={classes.drawer}
          classes={{
               paper: classes.drawerPaper,
           }}
          anchor="left"
          variant={props.variant}
          open={props.open}
          onClose={props.onClose ? props.onClose : null}     
    >
          <div className={classes.toolbar}>
               <LogoMenu />
          </div>
          <NavList links={props.links} />
     </Drawer>
  )
}

export default DrawerNav