import { useState, useEffect } from 'react'

//libs
import { ThemeProvider } from '@material-ui/core/styles'

//My imports
import theme from './styles/theme'

//Route Files
import MainPageRoutes from './routes/MainPageRoutes'
import ReceptionistRoutes from './routes/ReceptionistRoutes'
import AdminRoutes from './routes/AdminRoutes'
import CustomerRoutes from './routes/CustomerRoutes'

function App() {
  /*
      IMPORTANT: you have to pass setLoginSucces for every route, becuase this state is really important for close session. 
  */
  const [loginSuccess, setLoginSuccess] = useState( Boolean(localStorage.getItem('t')) );
  const [role, setRole] = useState( (localStorage.getItem('r')) ?? '' );

  useEffect(() => {

    //When the state loginSucces changes, verify the values of localStorage and put values in the state
    setLoginSuccess(Boolean(localStorage.getItem('t')) );
    setRole((localStorage.getItem('r')) ?? '');

  }, [loginSuccess]);

  return (
    <ThemeProvider theme={theme}>
          { !loginSuccess && <MainPageRoutes setLoginSuccess={setLoginSuccess} /> }
          { loginSuccess && role === 'Admin' && <AdminRoutes setLoginSuccess={setLoginSuccess} /> } 
          { loginSuccess && role === 'Receptionist' && <ReceptionistRoutes setLoginSuccess={setLoginSuccess} /> } 
          { loginSuccess && role === 'Customer' && <CustomerRoutes setLoginSuccess={setLoginSuccess} /> }          
    </ThemeProvider>
  )

}

export default App
