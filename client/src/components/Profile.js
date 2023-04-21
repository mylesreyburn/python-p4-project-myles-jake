import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { spacing } from '@mui/system';

function Profile() {
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
            src="https://cdn.discordapp.com/avatars/1040152162736541736/1fcc07e35902662bf91a68fdbed29dcd.png?size=4096"
        />
        <Typography component="h1" variant="h5" sx={{
            ml:13,
            mt:2
        }}>
            Username
          </Typography>
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