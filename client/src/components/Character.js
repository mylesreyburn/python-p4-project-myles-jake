// Import necessary components from Material UI and React
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { spacing } from '@mui/system';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Character({ comments }) {
    // Define state variables for character data, comments, and status
    const [{ data: character, error, status }, setCharacter] = useState({
        data: null,
        error: null,
        status: "pending",
    });
    
    const { id } = useParams();
    const filteredComments = comments.filter(comment => comment.character_id === character.id)

    const handleSubmit = (event) => {
        const data = new FormData(event.currentTarget);
        const newComment = {
            user_id: id,
            character_id: character.id,
            contents: data.contents
        }
        fetch("/comments", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newComment),
          });
    }

    // Fetch comments data from server and filter based on character ID

    // Fetch character data from server based on character ID
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

    // Render character image, name, race, age, gender, bio, and comments
    return (
        <Box>
            <Box sx= {{
                m:50
            }}>
                {/* Render character avatar if image exists */}
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
                {/* Render character name, race, age, and gender if they exist */}
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
                {/* Render character bio paragraphs if they exist */}
                {character && character.bio_1 && character.bio_2 && (
                    <Typography component="h1" variant="h6" sx={{
                        ml:125,
                        mt:-100
                    }}>
                        {character.bio_1}
                        <br></br>
                        {character.bio_2}
                        <br></br>
                    </Typography>
                )}
                {/* Render all comments for this character */}
                {filteredComments.map((comment) => (
                    <Typography component="h1" varient="h6" key={comment.id} sx={{ml:125, mt:5}}>
                        {comment.user.display_name}
                        <br></br>
                        {comment.contents}
                    </Typography>
                ))}
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 20 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={2} sx={{ml:125}}>
                            <TextField
                            required
                            fullWidth
                            name="Comment"
                            label="Enter Comment"
                            type="contents"
                            id="contents"
                            />
                        </Grid>
                    </Grid>
                    <Button
                    type="submit"
                    variant="contained"
                    sx={{ ml: 125, mt: 1 }}
                    >
                    Post Comment
                    </Button>
                    <Grid container justifyContent="flex-end">
                    </Grid>
                    </Box>
            </Box>
        </Box>
    )
}

export default Character