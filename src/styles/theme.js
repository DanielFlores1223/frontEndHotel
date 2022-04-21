import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
     palette: {
          primary: {
              light: '#EBEDEF',
              main: '#2471A3'
          },
          secondary : {
               main: '#85C1E9'
          },
          error: {
               main: '#CD6155'
          },
          warning: {
               main: '#F0B27A'
          },
          success: {
               main: '#52BE80'
          }
     }
});

export default theme;