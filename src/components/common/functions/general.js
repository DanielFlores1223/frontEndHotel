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

export const giveFormatDate = ( date ) => {
     /*
          This function converts this format "dd/mm/yyyy" to "yyyy-mm-dd"
     */
     const formatEs = new Date(date)
                                   .toLocaleDateString('es-ES', { year: 'numeric', 
                                                                  month: '2-digit', 
                                                                  day: '2-digit' });
                                                  
     const separeteDate = formatEs.split('/');

     const formatYYYYMMDD = `${separeteDate[2]}-${separeteDate[1]}-${separeteDate[0]}`;

     return formatYYYYMMDD;
}