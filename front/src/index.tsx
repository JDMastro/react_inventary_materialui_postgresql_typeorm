import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';



import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';

import { THEME } from "./theme";


ReactDOM.render(
  <React.StrictMode>
    
    <Router>
      <ThemeProvider  theme={THEME}>
   <App />
   </ThemeProvider>
   
   </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


