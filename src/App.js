import React from 'react';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AppRouter from './AppRouter';
import { Link, useLocation } from 'react-router-dom';
import { Avatar } from '@mui/material';

function App() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: 'rgba(20, 20, 20, 0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          position: 'relative',
          zIndex: 20,
        }}
      >
        <Toolbar sx={{ maxWidth: 1200, width: '100%', mx: 'auto', px: { xs: 1, md: 2 } }}>
          <Avatar src="/images/gfloor.jpg" sx={{ width: 32, height: 32, mr: 1 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button
              color="inherit"
              component={Link}
              to="/"
              sx={{
                fontWeight: isActive('/') ? 700 : 400,
                fontSize: '1.1rem',
                textTransform: 'none',
                letterSpacing: 0.5,
                color: '#0f0',
              }}
            >
              Groundfloor
            </Button>
          </Typography>
          <Button
            color="inherit"
            component={Link}
            to="/Team"
            sx={{
              mx: 0.5,
              fontWeight: isActive('/Team') ? 700 : 400,
              borderBottom: isActive('/Team') ? '2px solid #0f0' : '2px solid transparent',
              borderRadius: 0,
              textTransform: 'none',
              color: isActive('/Team') ? '#0f0' : '#aaa',
            }}
          >
            Team
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/Privacy Policy"
            sx={{
              mx: 0.5,
              fontWeight: isActive('/Privacy Policy') ? 700 : 400,
              borderBottom: isActive('/Privacy Policy') ? '2px solid #0f0' : '2px solid transparent',
              borderRadius: 0,
              textTransform: 'none',
              color: isActive('/Privacy Policy') ? '#0f0' : '#aaa',
            }}
          >
            Terms
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          background: '#1e1e1e',
          minHeight: 'calc(100vh - 64px)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <AppRouter />
      </Box>
    </Box>
  );
}

export default App;
