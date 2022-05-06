import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import Slide from '@material-ui/core/Slide';
import { SnackbarProvider } from 'notistack';

ReactDOM.render(
  <React.StrictMode>
      <SnackbarProvider
          anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
          }}
          TransitionComponent={Slide}
          maxSnack={3}
      >
        <App />
      </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
