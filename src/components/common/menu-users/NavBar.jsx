//libs
import { Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import styled from '@emotion/styled'
import { Link } from 'react-router-dom';
//icons
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import LogoutIcon from '@mui/icons-material/Logout';

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

const NavBar = ( { display, setLoginSuccess } ) => {
  
  const classes = useStyles();
  
  const closeSession = () => {
    localStorage.removeItem('t');
    localStorage.removeItem('r');
    localStorage.removeItem('n');
    setLoginSuccess(false);
  }

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
                
                <div className={classes.title}></div>

                {/* LINKS NAVBAR */}
                <Button color="inherit" 
                            startIcon={<LogoutIcon/>}
                            size='large'
                    > 
                         <LinkStyled to='/' onClick={() => closeSession()}> Sign out </LinkStyled> 
                </Button>
           </Toolbar>
          </AppBar>
          <div className={classes.offset}></div>
   </>
  )
}

export default NavBar 