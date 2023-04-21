import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function Landing(){
    return (
        <Box>
            <Typography component="h1" variant="h3" align="center" sx={{
                mt: 25
            }}>
                Welcome to WebsiteName!!
            </Typography>
            <Typography component="h1" variant="h5" align="center">
                Website Info!
            </Typography>
        </Box>

    )
}

export default Landing