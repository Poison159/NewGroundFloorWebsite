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
      <AppBar
        position="static"
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button color="inherit" component={Link} to="/">Groundfloor</Button>
          </Typography>
          <Button color="inherit" component={Link} to="/Team">Team</Button>
        </Toolbar>
      </AppBar>
      <div>
        <AppRouter />
      </div>
    </Box>
  );
}

export default App;
