import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import {Accordion} from './Accordion';

export default function ServicesCard(props) {
  return (
    <Card style={{paddingLeft:"20px"}} sx={{ maxWidth: 345 }} onClick={() => {alert("hello")}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
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
        <CustomAccordion/>
      </CardActionArea>
    </Card>
  );
}
