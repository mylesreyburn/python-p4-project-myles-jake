import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

export default function OutlinedCard({ character }) {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" sx={{minHeight: 440}}>
        <CardContent>
          <CardMedia
            component="img"
            height="194"
            image={character.image_1}
            alt="character"
          />
          <Typography variant="h5" component="div">
            {character.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {character.race}
          </Typography>
          <Typography variant="body2">
            {character.bio_1}
            <br />
            {character.bio_2}
          </Typography>
        </CardContent>
        <CardActions>
          <Link size="small" to={`/character/${character.id}`}>View Character Page</Link>
        </CardActions>
      </Card>
    </Box>
  );
}