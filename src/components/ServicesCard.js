import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useTheme } from '@mui/material/styles';


export default function ServicesCard(props) {
  const theme = useTheme();

  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          height={props.expanded ? "100px" : "380px"}
          image={props.imgUrl}
          onClick={() => {alert("hello")}}
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
