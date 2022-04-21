export const cleanAlert = ( setShowAlert, setMsgAlert ) => {
     setTimeout(() => {
          setShowAlert(false);
          setMsgAlert('');
     }, 4000);
}