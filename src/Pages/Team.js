import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid, Container, IconButton } from "@mui/material";
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const bucketUrl = "/images/"

const teamMembers = [
  {
    name: "Siyabonga Hadebe",
    role: "Founder & Senior Software Engineer",
    image: bucketUrl + "siya.png",
    linkedin: "https://www.linkedin.com/in/siyabonga-hadebe-a981b016/",
    description: "Founder of Ground Floor Technologies with 7+ years building full-stack apps. Previously Senior Frontend Developer at Platform45, Senior Software Engineer at Singular Systems, and Frontend Developer at Advance.io. Built and launched SpotVibe on the iOS App Store."
  },
  {
    name: "Sibongiseni Buthelezi",
    role: "Founder & Senior Software Engineer",
    image: bucketUrl + "sibo.png",
    linkedin: "https://www.linkedin.com/in/sibongiseni-buthelezi-09599935/",
    description: "Senior C# Developer at Avantedge Group building Practice Manager Pro for the legal industry. 6 years as Senior Software Developer at JSE, previously at Peregrine Holdings and Barclays Africa. Selected as BRICS Future Skills Challenge expert in data science."
  },
  {
    name: "Quentin Manamela",
    role: "Senior Software Engineer",
    image: bucketUrl + "quintin.png",
    linkedin: "https://www.linkedin.com/in/quentinmanamela/",
    description: "Senior Software Engineer at Signant Health working on clinical trial technologies. Previously Senior Frontend Developer at Platform45 and Java Developer at FNB South Africa. WeThinkCode graduate skilled in web dev, Java, C/C++, UI/UX, and systems architecture."
  }
];

export default function TeamPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography
        variant="h3"
        align="center"
        sx={{
          color: "white",
          mb: 1,
          fontWeight: 700,
          textShadow: '0 4px 12px rgba(0,0,0,0.3)',
        }}
      >
        The Team
      </Typography>
      <Typography
        variant="h6"
        align="center"
        sx={{
          color: "rgba(255,255,255,0.8)",
          mb: 5,
          fontWeight: 300,
        }}
      >
        Meet the people behind Groundfloor
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {teamMembers.map((member, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                borderRadius: 4,
                textAlign: "center",
                backgroundColor: "#1e1e1e",
                color: "white",
                boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
                },
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={member.image}
                  sx={{
                    width: 130,
                    height: 130,
                    borderRadius: "50%",
                    margin: "28px auto 10px",
                    objectFit: "cover",
                    border: "4px solid",
                    borderColor: '#667eea',
                    transition: 'border-color 0.3s ease',
                  }}
                />
                <CardContent sx={{ px: 3, pb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 0.5, color: 'rgba(255,255,255,0.9)' }}>
                    {member.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'rgba(255,255,255,0.6)', mb: 0.5 }}
                  >
                    {member.role}
                  </Typography>
                  {member.description && (
                    <Typography
                      variant="body2"
                      sx={{ color: 'rgba(255,255,255,0.5)', px: 1, fontSize: '0.8rem', lineHeight: 1.5, mb: 1.5 }}
                    >
                      {member.description}
                    </Typography>
                  )}
                  <IconButton
                    component="a"
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener"
                    sx={{
                      color: "#0a66c2",
                      backgroundColor: "rgba(10, 102, 194, 0.08)",
                      '&:hover': {
                        backgroundColor: "#0a66c2",
                        color: "white",
                      },
                    }}
                  >
                    <LinkedInIcon />
                  </IconButton>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
