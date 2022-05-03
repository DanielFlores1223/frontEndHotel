import React from 'react'

//libs
import { Backdrop } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

//My Imports
import Spinner from '../spinner/Spinner'

const useStyles = makeStyles((theme) => ({
     backdrop: {
       zIndex: theme.zIndex.drawer + 1,
       color: '#fff',
     },
}));

const BackDropSpinner = () => {
  const classes = useStyles();
  
  return (
   <Backdrop className={classes.backdrop} open={true} >
     <Spinner />
   </Backdrop>
  )
}

export default BackDropSpinner