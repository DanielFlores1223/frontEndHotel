export const cleanAlert = ( setShowAlert, setMsgAlert ) => {
     setTimeout(() => {
          setShowAlert(false);
          setMsgAlert('');
     }, 4000);
}

export const getToken = () => {
     return localStorage.getItem('t');
}

export const generateIdUnique = () => {
     /*
          This function generate a unique id
     */
     const random = Math.random().toString(36).substring(2);
     const dateNow = Date.now().toString(36);
     return random + dateNow;
}