import { useState } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './styles/theme';
import MainPageRoutes from './routes/MainPageRoutes';

function App() {
  const [loginSuccess, setLoginSuccess] = useState( Boolean(localStorage.getItem('t')) );
  const [role, setRole] = useState( (localStorage.getItem('r')) ?? '' );

  return (
    <ThemeProvider theme={theme}>
          { !loginSuccess && <MainPageRoutes setLoginSuccess={setLoginSuccess} /> }
          { /*loginSuccess && role === 'Admin'*/ } 
          { /*loginSuccess && role === 'Receptionist'*/ } 
          { /*loginSuccess && role === 'Customer'*/ }          
    </ThemeProvider>
  )

}

export default App
