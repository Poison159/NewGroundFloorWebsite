import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

export default function CustomAccordion(props) {
  return (
    <Accordion
      expanded={props.expanded}
      onChange={props.toggleExpanded}
      sx={{
        margin: '0 10px 10px',
        borderRadius: '12px !important',
        '&:before': { display: 'none' },
        bgcolor: '#1e1e1e',
        boxShadow: props.expanded
          ? '0 8px 24px rgba(102, 126, 234, 0.25)'
          : '0 2px 8px rgba(0,0,0,0.08)',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          px: 3,
          py: 1,
          borderRadius: 2,
          background: props.expanded
            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            : '#2a2a2a',
          '& .MuiTypography-root': {
            color: props.expanded ? 'white' : 'rgba(255,255,255,0.9)',
            fontWeight: 500,
          },
          '& .MuiSvgIcon-root': {
            color: props.expanded ? 'white' : 'rgba(255,255,255,0.7)',
            transition: 'transform 0.3s ease',
          },
        }}
      >
        <Typography>{props.title || "Tech Stack"}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ px: 0, pb: 0, bgcolor: '#1e1e1e' }}>
        <List sx={{ width: '100%', bgcolor: '#1e1e1e' }}>
          {
            props.items.map((item, index) => (
              <div key={index}>
                <ListItem alignItems="flex-start">
                  {item.imgPath && (
                    <ListItemAvatar>
                      <Avatar
                        alt={item.title}
                        src={item.imgPath}
                        sx={{ width: 40, height: 40 }}
                      />
                    </ListItemAvatar>
                  )}
                  <ListItemText
                    primary={
                      item.price ? (
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                          <Typography component="span" sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>
                            {item.title}
                          </Typography>
                          <Typography component="span" sx={{ fontWeight: 700, ml: 2, flexShrink: 0, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            {item.price}
                          </Typography>
                        </Box>
                      ) : (
                        item.title
                      )
                    }
                    secondary={item.description}
                    sx={{ '& .MuiListItemText-primary': { color: 'rgba(255,255,255,0.9)' }, '& .MuiListItemText-secondary': { color: 'rgba(255,255,255,0.5)' } }}
                  />
                </ListItem>
                <Divider variant={item.imgPath ? "inset" : "fullWidth"} component="li" />
              </div>
            ))
          }
        </List>
      </AccordionDetails>
    </Accordion>
  );
}
