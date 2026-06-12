import { Box, Paper, Avatar, Typography, Button } from '@mui/material';
import heroBg from '../../img/herobg.png';
import { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import WalletConnect from './WalletConnect';
const Profile = () => {
    const [name, setName] = useState([]);
    const [description, setDescription] = useState([]);
    const [role, setRole] = useState([]);
    const [website, setWebsite] = useState([]);
    const [location, setLocation] = useState([]);
    const [image, setImage] = useState({
        file: [],
        filepreview: null
    });

    const { auth } = useAuth()
    const navigate = useNavigate()

    const handleBack = () => {
        navigate(-1)
    }
    const getImage = async (imageName) => {
      setImage(prevState => ({
          ...prevState,
          filepreview: `http://localhost:5000/file/profile/${imageName}`
          })
      )
  }
    const handleData = async (e) => {
      console.log('auth',auth.user);
        const res = await axios.get(`http://localhost:5000/profile/${auth.user}`)
            .then(res => {
                console.log(JSON.stringify(res?.data[0]));
    
                setName(res?.data[0].name);
                setDescription(res?.data[0].description);
                setRole(res.data[0].role);
                setWebsite(res?.data[0].website);
                setLocation(res?.data[0].location);
                getImage(res?.data[0].image);
            })
    }

    useEffect(() => {
        handleData();
    }, []);

    return (
        <Box
          sx={{
            backgroundImage: `url(${heroBg})`,
            minHeight: '100vh',
            backgroundRepeat: 'no-repeat',
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundSize: 'cover',
            zIndex: -2,
            overflowY:'scroll'
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 20,
              right: 20,
            }}
          >
            <WalletConnect />
          </Box>
          <Paper
            elevation={3}
            sx={{
              width: '400px',
              margin: 'auto',
              marginTop: '10%',
              marginBottom: '10%',
              padding: '3%',
              backgroundColor: '#161232c4',
            }}
          >
            <Avatar
              alt={name}
              src={image.filepreview}
            
              sx={{
                width: 100,
                height: 100,
                margin: 'auto',
                marginBottom: '3%',
                backgroundColor: '#3f51b5',
              }}
            >
              {name[0]}
            </Avatar>
    
            <Typography
              variant="h4"
              sx={{
                textAlign: 'center',
                marginBottom: '5%',
                color: 'white',
              }}
            >
              {name}
            </Typography>
    
            <Typography
              variant="body1"
              sx={{
                textAlign: 'center',
                marginBottom: '3%',
                color: 'white',
              }}
            >
              Description: {description}
            </Typography>
    
            <Typography
              variant="body1"
              sx={{
                textAlign: 'center',
                marginBottom: '3%',
                color: 'white',
              }}
            >
              Role: {role}
            </Typography>
    
            <Typography
              variant="body1"
              sx={{
                textAlign: 'center',
                marginBottom: '3%',
                color: 'white',
              }}
            >
              Website: {website}
            </Typography>
    
            <Typography
              variant="body1"
              sx={{
                textAlign: 'center',
                marginBottom: '3%',
                color: 'white',
              }}
            >
              Location: {location}
            </Typography>
    
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Button
                onClick={handleBack}
                sx={{
                  marginTop: '5%',
                  backgroundColor: '#D1D8F0', // Light purple background color
                  color: '#4B0082', // Dark purple text color
                  fontSize: '1.2rem', // Increase font size
                  padding: '10px 22px', // Increase padding for a bigger button
                  borderRadius: '8px', // Add border radius for rounded corners
                  '&:hover': {
                    backgroundColor: '#A9A9A9', // Lighter shade of purple on hover
                    color: '#000000', // Black text color on hover
                  },
                }}
              >
                Back
              </Button>
            </Box>
          </Paper>
        </Box>
      )
}

export default Profile;
