import React, { useState, useEffect } from 'react';
import { Grid, Container, Typography, Card, CardContent, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSearchParams } from 'react-router-dom';

// Styled iPhone container
const IPhoneContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '250px',
  height: '550px', // Increased by 5% (500 * 1.05)
  margin: '0 auto',
  background: '#000',
  borderRadius: '35px',
  padding: '10px',
  border: '4px solid #333',
  boxShadow: '0 0 30px rgba(0,0,0,0.3)',
}));

const IPhoneScreen = styled(Box)({
  width: '100%',
  height: '100%',
  backgroundColor: '#fff',
  borderRadius: '25px',
  overflow: 'hidden',
  position: 'relative',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
});

export default function IPhoneMockupPage() {
  const [searchParams] = useSearchParams();
  const [images, setImages] = useState({
    phone1: 'https://via.placeholder.com/250x460/4CAF50/white?text=App+Screen+1',
    phone2: 'https://via.placeholder.com/250x460/2196F3/white?text=App+Screen+2',
    phone3: 'https://via.placeholder.com/250x460/FF9800/white?text=App+Screen+3'
  });

  useEffect(() => {
    // Get image URLs from URL parameters
    const img1 = searchParams.get('img1');
    const img2 = searchParams.get('img2');
    const img3 = searchParams.get('img3');

    setImages({
      phone1: img1 || 'https://via.placeholder.com/250x460/4CAF50/white?text=App+Screen+1',
      phone2: img2 || 'https://via.placeholder.com/250x460/2196F3/white?text=App+Screen+2',
      phone3: img3 || 'https://via.placeholder.com/250x460/FF9800/white?text=App+Screen+3'
    });
  }, [searchParams]);

  return (
    <Box sx={{
      display: 'flex',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    }}>
      <Container maxWidth="lg">
        <Box textAlign="center" sx={{ mb: 2 }}>
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ 
              color: 'white',
              fontWeight: 'bold',
              textShadow: '0 4px 8px rgba(0,0,0,0.3)',
              mb: 1
            }}
          >
            Envibe app
          </Typography>
          <Typography 
            variant="h5" 
            component="h2" 
            sx={{ 
              color: 'rgba(255,255,255,0.9)',
              fontWeight: 300,
              textShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            Find fun & interesting places around you
          </Typography>
        </Box>
        
        <Grid container spacing={4} justifyContent="center">
          {Object.entries(images).map(([phoneId, imageUrl], index) => (
            <Grid item xs={12} md={4} key={phoneId}>
              <Card 
                elevation={0} 
                sx={{ 
                  textAlign: 'center',
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '20px',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}
              >
                <CardContent>
                  <IPhoneContainer>
                    <IPhoneScreen
                      sx={{ backgroundImage: `url(${imageUrl})` }}
                    />
                  </IPhoneContainer>
                  
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      mt: 2,
                      color: 'white',
                      fontWeight: 500
                    }}
                  >
                    Screen {index + 1}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        <Box textAlign="center" sx={{ mt: 4 }}>
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'rgba(255,255,255,0.8)'
            }}
          >
            iPhone mockups displaying your app screenshots
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}