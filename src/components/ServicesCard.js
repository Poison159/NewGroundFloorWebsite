import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ServicesCard(props) {
  const navigate = useNavigate();

  const handleClick = () => {
    const imageUrls = {
      img1: 'https://lh3.googleusercontent.com/pw/AP1GczP70TJR5eq9aFlGY_l2V8n6dbrU6LY-gRN0yL0IyfiOtc2gR2jlXOGNJampEfpDzlWyRCZ0AN5P287PQFp2Y6unSpUxy6ErQVhc_lOtCRosnmZ3YTWn6Aqi7YxYMBUaRTVF8ypqQynb_bvGsSWSlwlP-Q=w436-h945-s-no-gm?authuser=0',
      img2: 'https://lh3.googleusercontent.com/pw/AP1GczNMQn5WvZwXJlzezLCkVRRqeEtN9lxngJlstHdINQPU9_NNC0VYCVWFPHLCq-ydS2pd1vgMRwGe8CH0GW6muLygk8OtQUIYQUWjsP-Kff3a-rimfln-KmmiIvxGIezuQAwLiCx6WeEQPWRrYyRSqo-t4w=w436-h945-s-no-gm?authuser=0', 
      img3: 'https://lh3.googleusercontent.com/pw/AP1GczMq0BdNkRdYWmEx5swAB-aqykxH6VdVfUikxHmA7NDWNQPtTcSSXhYCNMeKYLd5NahpqwGbgno8up2ISTN5mVglfFYK-9HY__mKW6_bQ_LuHnNc5jU9GnV8fKk9Q8tBjBRI36fZnuxtRCdyghS_tK880w=w436-h945-s-no-gm?authuser=0'
    };

    
    const queryParams = new URLSearchParams(imageUrls).toString();
    navigate(`/iphone-mockup?${queryParams}`);
  };

  return (
    <Card style={{margin:10}}>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          height={props.expanded ? "100px" : "380px"}
          image={props.imgUrl}
        />
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