import '../../css/Role.css'
import { TextField, Box, Paper, Typography, Autocomplete, Button } from '@mui/material';
import React from 'react'
import { useRef, useState, useEffect } from 'react';
import bgImg from '../../img/bg.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const options = ["manufacturer", "supplier", "retailer"]

const AddAccount = () => {
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [pwd2, setPwd2] = useState('');
    const [role, setRole] = React.useState(options[0])
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [website, setWebsite] = useState('');
    const [location, setLocation] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [image, setImage] = useState({
        file: [],
        filepreview: null
    });
    
    const errRef = useRef();
    const navigate = useNavigate()

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);

    const handleImage = async (e) => {
        setImage({
            ...image,
            file: e.target.files[0],
            filepreview: URL.createObjectURL(e.target.files[0])
        })
    }

    // to upload image
    const uploadImage = async (image) => {
        const data = new FormData();
        data.append("image", image.file);

        axios.post("http://localhost:5000/upload/profile", data, {
            headers: { "Content-Type": "multipart/form-data" }
        }).then(res => {
            console.log(res);

            if (res.data.success === 1) {
                console.log("image uploaded");
            }
        })
    }

    const handleBack = () => {
        navigate(-1)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // for debugging only
        console.log("-----------------------------------")
        console.log("user: " + user);
        console.log("pwd: " + pwd);
        console.log("pwd2: " + pwd2);
        console.log("role: " + role);
        console.log("image: " + image.file.name);
        console.log("name: " + name);
        console.log("description: " + description);
        console.log("website: " + website);
        console.log("location: " + location);

        try {
            const accountData = JSON.stringify({
                "username": user,
                "password": pwd,
                "role": role
            });

            const profileData = JSON.stringify({
                "username": user,
                "name": name,
                "description": description,
                "website": website,
                "location": location,
                "image": image.file.name,
                "role" : role
              });

            const res = await axios.post('http://localhost:5000/addaccount', accountData,
                {
                    headers: {'Content-Type': 'application/json'}, 
                });
            
            console.log(JSON.stringify(res.data));

            const res2 = await axios.post('http://localhost:5000/addprofile', profileData,
                {
                    headers: {'Content-Type': 'application/json'},
                });
            
            console.log(JSON.stringify(res2.data));

            uploadImage(image);
            
            setUser('');
            setPwd('');
            setPwd2('');
            setRole(options[0]);
            setName('');
            setDescription('');
            setWebsite('');
            setLocation('');
            setImage({
                file: [],
                filepreview: null
            });

        } catch (err) {
            if (!err?.response) {
                setErrMsg('Server is down. Please try again later.');
            } else if (err.response?.status === 400) {
                setErrMsg('Invalid username or password.');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized access.');
            } else {
                setErrMsg('Login Failed. Please try again later.');
            }
            errRef.current.focus();
        }

    };


    return (
        <Box sx={{
            backgroundImage: `url(${bgImg})`,
            minHeight: "100vh",
            backgroundRepeat: "no-repeat",
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundSize: 'cover',
            zIndex: -2,
            overflowY: "scroll"

        }}>
            <Paper elevation={3} sx={{ width: "400px", margin: "auto", marginTop: "10%", marginBottom: "10%", padding: "3%", backgroundColor: "#e3eefc" }}>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

                <Typography
                    variant="h2"
                    sx={{
                        textAlign: "center", marginBottom: "3%",
                        fontFamily: 'Gambetta', fontWeight: "bold", fontSize: "2.5rem"
                    }}
                >
                    Add Account</Typography>
                    
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        margin="normal"
                        label="Username"
                        variant="outlined"
                        inherit="False"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                    />

                    <TextField
                        fullWidth
                        id="outlined-basic"
                        margin="normal"
                        label="Password"
                        type='password'
                        variant="outlined"
                        inherit="False"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                    />

                    <TextField
                        fullWidth
                        id="outlined-basic"
                        margin="normal"
                        label="Confirm Password"
                        type='password'
                        variant="outlined"
                        inherit="False"
                        onChange={(e) => setPwd2(e.target.value)}
                        value={pwd2}
                    />

                    {pwd == pwd2? null:
                            <Typography
                                variant="body2"
                                sx={{
                                    textAlign: "center", 
                                    fontSize: "12px", color: "red"
                                }}
                            >
                                Passwords do not match
                            </Typography>

                        }

                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={options}
                        fullWidth
                        value={role}
                        onChange={(event, newRole) => {
                            setRole(newRole);
                        }}
                        renderInput={(params) =>
                            <TextField {...params}
                                fullWidth
                                id="outlined-basic"
                                margin="normal"
                                label="Role"
                                variant="outlined"
                                inherit="False"

                            />}
                    />

                    <Button
                        variant="outlined"
                        component="label"
                        fullWidth
                        // onChange = {handleImage}
                        sx={{ marginTop: "3%" }}
                    >
                        Upload Image
                        <input
                            type="file"
                            hidden
                            onChange={handleImage}
                        />
                    </Button>

                    {image.filepreview !== null ?
                        <img src={image.filepreview} alt="preview" style={{ width: "100%", height: "100%" }} />
                        : null}

                    <TextField
                        fullWidth
                        id="outlined-basic"
                        margin="normal"
                        label="Name"
                        variant="outlined"
                        inherit="False"                        
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />

                    <TextField
                        fullWidth
                        id="outlined-basic"
                        margin="normal"
                        label="Description"
                        variant="outlined"
                        inherit="False"
                        multiline
                        minRows={2}
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                    />

                    <TextField
                        fullWidth
                        id="outlined-basic"
                        margin="normal"
                        label="Website"
                        variant="outlined"
                        inherit="False"
                        onChange={(e) => setWebsite(e.target.value)}
                        value={website}
                    />

                    <TextField
                        fullWidth
                        id="outlined-basic"
                        margin="normal"
                        label="Location"
                        variant="outlined"
                        inherit="False"                        
                        onChange={(e) => setLocation(e.target.value)}
                        value={location}
                    />

                    <Button
                        variant="contained"
                        type="submit"
                        sx={{ width: "100%", marginTop: "3%", backgroundColor: '#98b5d5', '&:hover': { backgroundColor: '#618dbd' } }}
                    >
                        Add Account
                    </Button>

                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >


                        <Button
                            onClick={handleBack}
                            sx={{
                                marginTop: "5%",
                            }}
                        >
                            Back
                        </Button>

                    </Box>

                </form>
            </Paper>
        </Box>
    );
}

export default AddAccount;