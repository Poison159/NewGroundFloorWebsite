import React, { useState, useEffect } from 'react';
import { Grid, Container, Typography, Card, CardContent, Box, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const IPhoneContainer = styled(Box)(() => ({
  position: 'relative',
  width: '250px',
  height: '520px',
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
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
});

export default function IPhoneMockupPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [images, setImages] = useState({
    phone1: 'https://via.placeholder.com/250x460/4CAF50/white?text=App+Screen+1',
    phone2: 'https://via.placeholder.com/250x460/2196F3/white?text=App+Screen+2',
    phone3: 'https://via.placeholder.com/250x460/FF9800/white?text=App+Screen+3'
  });
  const [descriptions, setDescriptions] = useState({
    phone1: 'Screen 1',
    phone2: 'Screen 2',
    phone3: 'Screen 3'
  });

  useEffect(() => {
    const img1 = searchParams.get('img1');
    const img2 = searchParams.get('img2');
    const img3 = searchParams.get('img3');

    const desc1 = searchParams.get('desc1');
    const desc2 = searchParams.get('desc2');
    const desc3 = searchParams.get('desc3');

    setImages({
      phone1: img1 || 'https://via.placeholder.com/250x460/4CAF50/white?text=App+Screen+1',
      phone2: img2 || 'https://via.placeholder.com/250x460/2196F3/white?text=App+Screen+2',
      phone3: img3 || 'https://via.placeholder.com/250x460/FF9800/white?text=App+Screen+3'
    });
    setDescriptions({
      phone1: desc1 || 'Screen 1',
      phone2: desc2 || 'Screen 2',
      phone3: desc3 || 'Screen 3'
    });
  }, [searchParams]);

  return (
    <Box sx={{ py: 4, position: 'relative' }}>
      <Container maxWidth="lg">
        <IconButton
          onClick={() => navigate(-1)}
          sx={{
            color: 'white',
            mb: 1,
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
          }}
        >
          <ArrowBackIcon />
        </IconButton>

        <Box textAlign="center" sx={{ mb: 3 }}>
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
            Envibe
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            sx={{
              color: 'rgba(255,255,255,0.9)',
              fontWeight: 300,
              textShadow: '0 2px 4px rgba(0,0,0,0.2)',
              letterSpacing: 1,
            }}
          >
            Discover local events, places, and things to do — curated for you
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
                  border: '1px solid rgba(255,255,255,0.2)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
                  },
                }}
              >
                <CardContent>
                  <IPhoneContainer>
                    <IPhoneScreen
                      sx={{ backgroundImage: `url('${imageUrl}')` }}
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
                    {descriptions[phoneId]}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box textAlign="center" sx={{ mt: 6 }}>
          <Typography
            variant="h5"
            sx={{
              color: 'rgba(255,255,255,0.9)',
              fontWeight: 300,
              mb: 3,
              letterSpacing: 1,
            }}
          >
            Now available on the App Store and Google Play
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 3,
              flexWrap: 'wrap',
            }}
          >
            <a
              href="https://apps.apple.com/za/app/spotvibe/id6747991573"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Box
                component="img"
                src="/apple-app-store-badge.svg"
                alt="Download on the App Store"
                sx={{ height: 60, width: 'auto', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.05)' } }}
              />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.groundfloor.envibe&pli=1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Box
                component="img"
                src="/google-play-badge.svg"
                alt="Get it on Google Play"
                sx={{ height: 60, width: 'auto', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.05)' } }}
              />
            </a>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
