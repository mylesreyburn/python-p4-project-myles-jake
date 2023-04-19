import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const card = (
  <React.Fragment>
    <CardContent>
    <CardMedia
        component="img"
        height="194"
        image="https://media.discordapp.net/attachments/710352472379752499/1069644892319535134/20221225_091448.jpg?width=397&height=530"
        alt="character"
      />
      <Typography variant="h5" component="div">
        CHARACTER NAME
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        RACE
      </Typography>
      <Typography variant="body2">
        Character Info
        <br />
        More
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">View Character Page</Button>
    </CardActions>
  </React.Fragment>
);

export default function OutlinedCard() {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}