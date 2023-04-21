import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function Landing(){
    return (
        <Box>
            <Typography component="h1" variant="h3" align="center" sx={{
                mt: 25
            }}>
                Welcome to Character Database!
            </Typography>
            <Typography component="h1" variant="h5" align="center">
                The Character Database allows you to save all your characters you've ever come up with!
            </Typography>
        </Box>

    )
}

export default Landing