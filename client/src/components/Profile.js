import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { spacing } from '@mui/system';
import Button from '@mui/material/Button';

function Profile({ logout }) {
    return (
        <Box>
        <Box sx= {{
            m:50
        }}>
        <Avatar
        sx={{
            bgcolor: deepOrange[500],
            width: "18%",
            height: "18%"
        }}
            sizes="lg"
            alt="Remy Sharp"
            src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
        />
        <Typography component="h1" variant="h5" sx={{
            ml:13,
            mt:2
        }}>
            Username
          </Typography>
          <Button onClick={logout}>Logout</Button>
        </Box>
        <Box>
            <Typography component="h1" variant="h6" sx={{
                ml:140,
                mt:-75
            }}>
                Bio
            </Typography>
        </Box>
        </Box>
    )
}

export default Profile