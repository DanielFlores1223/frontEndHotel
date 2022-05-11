import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { useNavigate } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogBook = ( openDialog ) => {

     const [open, setOpen] = React.useState(openDialog);
     const navigateTo = useNavigate();

     const handleClose = () => {
      openDialog.setOpenDialog(false);
     };

     useEffect(() => {
        setOpen(openDialog.openDialog)
     }, [openDialog]);

     return (
        <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">{"Do you want to book a room?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
               You must log in to be able to reserve a room
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {
                                      handleClose();
                                      navigateTo('/register')
                                   }
                            } 
                    color="primary">
              Sign Up
            </Button>
            <Button onClick={ () => {
                                      handleClose();
                                      navigateTo('/login')
                                    } 
                            }
                    color="primary">
              Sign In
            </Button>
          </DialogActions>
        </Dialog>
      </div>
     )
}    

export default DialogBook