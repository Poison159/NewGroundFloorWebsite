import React, { useState } from 'react'
import ServicesCard from '../components/ServicesCard';
import Grid from '@mui/material/Grid';
import CustomAccordion from '../components/CustomAccordion';
import { Container, Typography, Card, CardContent, Box } from '@mui/material';

export default function HomePage() {
  const [expandedApps, setExpandedApps] = useState(false);
  const [expandedWeb, setExpandedWeb] = useState(false);
  const [expandedData, setExpandedData] = useState(false);

  const cardArray = [
    {
      title: "Apps",
      imgPath: "/images/apps-card.png",
      description: "We make mobile apps",
      appItems: [
        { imgPath: "/images/aspnet.png", title: ".Net C#", description: "We use C# for our backend" },
        { imgPath: "/images/react.png", title: "React", description: "We use react for our frontend" },
        { imgPath: "/images/expo.svg", title: "Expo", description: "We use Expo for cross-platform mobile development" }
      ]
    },
    {
      title: "Websites",
      imgPath: "/images/websites-card.jpg",
      description: "We make websites",
      appItems: [
        { imgPath: "/images/aspnet.png", title: "C#", description: "We use C# for our backend" },
        { imgPath: "/images/typescript.png", title: "Typescript", description: "We use typescript as a scripting language" },
        { imgPath: "/images/react.png", title: "React", description: "We use React for our frontend" }
      ]
    },
    {
      title: "Analytics",
      imgPath: "/images/analytics-card.jpg",
      description: "We analyze data",
      appItems: [
        { imgPath: "/images/mysql.png", title: "MySQL", description: "We use MySQL to store & query data" },
        { imgPath: "/images/python.jpg", title: "Python", description: "We use python to shape and anylyze data" },
        { imgPath: "/images/jupyter.png", title: "Jupyter Notebooks", description: "We use Jupyter to visualize the data" }
      ]
    }
  ]

  const toggleExpandedApps = () => setExpandedApps(!expandedApps);
  const toggleExpandedWeb = () => setExpandedWeb(!expandedWeb);
  const toggleExpandedData = () => setExpandedData(!expandedData);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h3"
        align="center"
        sx={{
          color: 'white',
          fontWeight: 700,
          mb: 1,
          textShadow: '0 4px 12px rgba(0,0,0,0.3)',
        }}
      >
        What We Build
      </Typography>
      <Typography
        variant="h6"
        align="center"
        sx={{
          color: 'rgba(255,255,255,0.8)',
          mb: 4,
          fontWeight: 300,
          maxWidth: 600,
          mx: 'auto',
        }}
      >
        Modern apps, websites, and data analytics — tailored for Africa
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {
          cardArray.map((appCard, index) => {
            const isExpanded =
              appCard.title === "Apps" ? expandedApps :
              appCard.title === "Websites" ? expandedWeb :
              expandedData;

            const toggleExpanded =
              appCard.title === "Apps" ? toggleExpandedApps :
              appCard.title === "Websites" ? toggleExpandedWeb :
              toggleExpandedData;

            return (
              <Grid key={index} item xs={12} md={4} sm={12}>
                <ServicesCard
                  imgUrl={appCard.imgPath}
                  title={appCard.title}
                  expanded={isExpanded}
                  description={appCard.description}
                />
                <CustomAccordion
                  items={appCard.appItems}
                  title="Tech Stack"
                  expanded={isExpanded}
                  toggleExpanded={toggleExpanded}
                />
              </Grid>
            );
          })
        }
        </Grid>

        <Box sx={{ my: 8 }}>
          <Typography
            variant="h3"
            align="center"
            sx={{
              color: 'white',
              fontWeight: 700,
              mb: 1,
              textShadow: '0 4px 12px rgba(0,0,0,0.3)',
            }}
          >
            Affordable Pricing
          </Typography>
          <Typography
            variant="h6"
            align="center"
            sx={{
              color: 'rgba(255,255,255,0.8)',
              mb: 5,
              fontWeight: 300,
              maxWidth: 700,
              mx: 'auto',
            }}
          >
            Expertly built by senior developers — at a fraction of the cost. We leverage AI to deliver fast, 
            but every solution is handcrafted, reviewed, and production-ready. Your investment goes into 
            real engineering, not overhead.
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  height: '100%',
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 4,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
                  },
                }}
              >
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ color: '#0f0', fontWeight: 700, mb: 1 }}>
                    R5 000
                  </Typography>
                  <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>
                    Mobile Apps
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 2, lineHeight: 1.7 }}>
                    Android & iOS — cross-platform. Working prototype with core features delivered 
                    within a month. Built with Expo and native modules for a genuine app experience.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  height: '100%',
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 4,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
                  },
                }}
              >
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ color: '#0f0', fontWeight: 700, mb: 1 }}>
                    R800
                  </Typography>
                  <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>
                    Websites
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>
                    Responsive, modern websites delivered within a week. Single-page or multi-page, 
                    fully functional and ready to deploy. Built with React and modern tooling for 
                    speed and performance.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  height: '100%',
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 4,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
                  },
                }}
              >
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ color: '#0f0', fontWeight: 700, mb: 1 }}>
                    R1 000
                  </Typography>
                  <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>
                    Analytics
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>
                    Add analytics to your existing solution. Dashboards, reporting, and data 
                    visualisation tailored to your business needs. Understand your users and 
                    make data-driven decisions.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Typography
            align="center"
            sx={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: '0.9rem',
              maxWidth: 680,
              mx: 'auto',
              mt: 5,
              lineHeight: 1.7,
            }}
          >
            We use AI to accelerate development, keeping your costs low. A portion covers the AI tokens used; 
            the rest goes into senior developer time, architecture, and quality assurance. You get a 
            production-grade app built by experienced engineers at a fraction of the normal price.
          </Typography>
        </Box>
    </Container>
  )
}
