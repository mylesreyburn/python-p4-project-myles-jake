import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { spacing } from '@mui/system';
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";

function Profile({ logout, user, setUser }) {
    const history = useHistory();
    const handleDelete = () => {
        fetch(`/user/${user.id}`, {
          method: 'DELETE',
        })
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            throw new Error('Network broken oops');
          })
          .then(() => {
            window.alert('User deleted successfully!');
            setUser(undefined);
            history.push('/');
          })
          .catch((error) => {
            console.error(error);
          });
      };
    function handleEdit() {
        history.push("/edit")
    }
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
            src={user.profile_image}
        />
        <Typography component="h1" variant="h5" sx={{
            ml:17,
            mt:3
        }}>
            {user.display_name}
          </Typography>
          <Button onClick={logout} sx={{ml:95, mt:-55}}>Logout</Button>
          <br></br>
          <Button onClick={handleEdit} sx={{ml:95, mt:-55}}>Edit Profile</Button>
          <br></br>
          <Button onClick={handleDelete} sx={{ml:95, mt:-55}}>Delete Profile</Button>
        </Box>
        </Box>
    )
}

export default Profile