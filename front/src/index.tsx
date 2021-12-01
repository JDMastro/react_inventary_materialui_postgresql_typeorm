import React from 'react';
import ReactDOM from 'react-dom';


import { Routes } from "./routes/routes";



import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';

import { THEME } from "./theme";


ReactDOM.render(
  <React.StrictMode>
    
    <Router>
      <ThemeProvider  theme={THEME}>
   <Routes />
   </ThemeProvider>
   
   </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


