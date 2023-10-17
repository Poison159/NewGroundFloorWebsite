import React, { useState } from 'react';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TopRow from './components/TopRow';

function App() {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Button color="inherit">Groundfloor</Button>
          <Button color="inherit">Projects</Button>
          <Button color="inherit">Team</Button>
          </Typography>
          <Button color="inherit">Request app</Button>
        </Toolbar>
      </AppBar>
      <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
        <br />
        <TopRow />
      </div>
    </Box>
  );
}

export default App;
