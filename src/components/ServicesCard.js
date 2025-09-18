import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ServicesCard(props) {
  const navigate = useNavigate();
  const bucketUrl = "https://storage.googleapis.com/envibe/images/"

  const handleClick = () => {
    const imageUrls = {
      img1: bucketUrl + 'envibe_1.png',
      img2: bucketUrl + 'envibe_2.png',
      img3: bucketUrl + 'envibe_3.png',
      desc1: 'Events & locations near you',
      desc2: 'Activities to do, around you',
      desc3: 'Reels to get a feel of vibe'
    };
    const queryParams = new URLSearchParams(imageUrls).toString();

    navigate(`/iphone-mockup?${queryParams}`);
  };

  return (
    <Card style={{ margin: "10px"}}>
      <CardActionArea onClick={handleClick}>
        <Collapse in={!props.expanded} collapsedSize={150}>
          <CardMedia
            component="img"
            sx={{ width: "100%", height: 380, objectFit: "cover" }}
            image={props.imgUrl}
          />
        </Collapse>

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}