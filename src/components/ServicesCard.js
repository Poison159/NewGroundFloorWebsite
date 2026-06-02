import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { CardActionArea, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ServicesCard(props) {
  const navigate = useNavigate();
  const bucketUrl = "/images/"

  const handleClick = () => {
    if (props.title === "Analytics") {
      navigate('/analytics');
      return;
    }
    if (props.title === "Websites") {
      navigate('/websites');
      return;
    }

    const imageUrls = {
      img1: bucketUrl + 'Simulator Screenshot - iPhone 17 - 1.png',
      img2: bucketUrl + 'Simulator Screenshot - iPhone 17 - 3.png',
      img3: bucketUrl + 'Simulator Screenshot - iPhone 17 - 2.png',
      desc1: 'Browse events & venues near you',
      desc2: 'Discover activities tailored to your vibe',
      desc3: 'Watch short reels to preview the experience'
    };
    const queryParams = new URLSearchParams(imageUrls).toString();

    navigate(`/iphone-mockup?${queryParams}`);
  };

  return (
    <Card
      sx={{
        margin: "10px",
        borderRadius: 3,
        overflow: 'hidden',
        bgcolor: '#1e1e1e',
        color: 'white',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: '0 16px 40px rgba(0,0,0,0.3)',
        },
      }}
    >
      <CardActionArea onClick={handleClick}>
        <Collapse in={!props.expanded} collapsedSize={150}>
          <CardMedia
            component="img"
            sx={{
              width: "100%",
              height: 180,
              objectFit: "cover",
              transition: 'transform 0.4s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
            image={props.imgUrl}
          />
        </Collapse>

        <CardContent sx={{ pt: 2 }}>
          <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 600 }}>
            {props.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
            {props.description}
          </Typography>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Button
              size="small"
              variant="outlined"
              sx={{
                borderColor: '#667eea',
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                '&:hover': {
                  borderColor: '#667eea',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  boxShadow: 'inset 0 0 0 999px rgba(102,126,234,0.1)',
                },
              }}
            >
              View Projects
            </Button>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
