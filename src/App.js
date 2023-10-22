import React, { useState } from 'react';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AppRouter from './AppRouter';
import { Link } from 'react-router-dom';

function App() {
  return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Button color="inherit" component={Link} to="/">Groundfloor</Button>
              <Button color="inherit" component={Link} to="/Team">Team</Button>
              <Button color="inherit">Projects</Button>
            </Typography>
            <Button color="inherit">Request app</Button>
          </Toolbar>
        </AppBar>
        <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
          <br />
          <AppRouter />
        </div>
      </Box>
  );
}

export default App;
