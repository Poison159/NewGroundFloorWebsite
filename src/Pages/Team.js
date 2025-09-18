import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid, Container, Link } from "@mui/material";

const bucketUrl = "https://storage.googleapis.com/envibe/images/"

const teamMembers = [
  {
    name: "Siyabonga Hadebe",
    role: "Founder & Senior Software Engineer",
    image:bucketUrl + "siya.png",
    linkedin: "https://www.linkedin.com/in/johnsmith"
  },
  {
    name: "Sibongiseni Buthelezi",
    role: "Founder & Senior Software Engineer",
    image:bucketUrl + "sibo.png",
    linkedin: "https://www.linkedin.com/in/janedoe"
  },
  {
    name: "Quintin Manamela",
    role: "Senior Software Engineer",
    image:bucketUrl + "quintin.png",
    linkedin: "https://www.linkedin.com/in/johnsmith"
  }
];

export default function TeamPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // blue → purple gradient
        display: "flex",
        padding: "40px 0"
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          style={{ color: "white", marginBottom: "40px" }}
        >
          The Team
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                style={{
                  borderRadius: "20px",
                  textAlign: "center",
                  backgroundColor: "rgba(255,255,255,0.9)",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.2)"
                }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={member.image}
              
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: "50%",
                      margin: "20px auto 10px",
                      objectFit: "cover",
                      border: "4px solid #3b82f6"
                    }}
                  />
                  <CardContent>
                    <Typography variant="h6" style={{ fontWeight: "bold" }}>
                      {member.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      {member.role}
                    </Typography>
                    <Link
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener"
                      underline="none"
                      style={{
                        display: "inline-block",
                        marginTop: "8px",
                        color: "#0a66c2",
                        fontWeight: "500"
                      }}
                    >
                      View LinkedIn
                    </Link>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
