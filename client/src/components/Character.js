import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { spacing } from '@mui/system';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

function Character() {
    const [{ data: character, error, status }, setCharacter] = useState({
        data: null,
        error: null,
        status: "pending",
      });
      const { id } = useParams();
      const [comments, setComments] = useState([]);

      useEffect(() => {
        fetch(`/comment/${id}`)
          .then((response) => response.json())
          .then((data) => setComments(data));
      }, [id]);
    
    
      useEffect(() => {
        fetch(`/character/${id}`).then((r) => {
          if (r.ok) {
            r.json().then((character) =>
              setCharacter({ data: character, error: null, status: "resolved" })
            );
          } else {
            r.json().then((err) =>
              setCharacter({ data: null, error: err.error, status: "rejected" })
            );
          }
        });
      }, [id]);

    return (
        <Box>
        <Box sx= {{
            m:50
        }}>
        {character && character.image_1 && (
  <Avatar
    sx={{
      bgcolor: deepOrange[500],
      width: "18%",
      height: "18%",
    }}
    sizes="lg"
    alt="Remy Sharp"
    src={character.image_1}
  />
)}
        {character && character.name && character.race && character.age && character.gender && (
        <Typography component="h1" variant="h5" sx={{
            ml:9,
            mt:2
        }}>
            Name: {character.name}
            <br></br>
            Race: {character.race}
            <br></br>
            Age: {character.age}
            <br></br>
            Gender: {character.gender}
          </Typography>
        )}
        </Box>
        <Box>
        {character && character.bio_1 && character.bio_2 && (
            <Typography component="h1" variant="h6" sx={{
                ml:140,
                mt:-100
            }}>
                {character.bio_1}
                <br></br>
                {character.bio_2}
                <br></br>
            </Typography>
        )}
        {comments.map((comment) => (
            <Typography>
                {comment.contents}
            </Typography>
        ))}
        </Box>
        </Box>
    )
}

export default Character