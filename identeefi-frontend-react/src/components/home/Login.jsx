import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import heroBg from "../../img/herobg.png";
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const LOGIN_URL = '/auth';

export default function Login() {
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const handleBack = () => {
        navigate('/');
    }

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('user: ', user);
        console.log('pwd: ', pwd);

        try {
            const res = await axios.post(`${LOGIN_URL}/${user}/${pwd}`,
                {
                    headers: { 'Content-Type': 'application/json' },
                });
              console.log(res)
            console.log(res?.data[0])

            if (res?.data.length === 0) {
                setErrMsg('Login Failed. Please try again later.');
                // errRef.current.focus();
            } else {
                const role = res?.data[0].role;
                setAuth({ user, pwd, role })
                setUser('');
                setPwd('');
                navigate(`/${role}`, { replace: true });

            }
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
            backgroundImage: `url(${heroBg})`,
            minHeight: "100vh",
            backgroundRepeat: "no-repeat",
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            zIndex: -2,
        }}>

            <Container component="main" maxWidth="sm">
                <Box
                    sx={{
                        boxShadow: 3,
                        borderRadius: 2,
                        px: 4,
                        py: 6,
                        marginTop: 8,
                        backgroundColor: '#161232c4',
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        align: "center",

                    }}
                >
                    <Typography component="h1" variant="h5" color="#fff"
                        sx={{
                            textAlign: "center", marginBottom: "3%", marginTop: "3%",
                            fontFamily: 'Gambetta', fontWeight: "bold", fontSize: "2.5rem",
                        }}
                    >
                        AUTHENTISCAN
                    </Typography>
                    <Typography component="h1" variant="h5" color="#fff">
                        Login
                    </Typography>
                    {errMsg && <Typography component="h1" variant="body2" color="error" ref={errRef} sx={{marginTop: "2rem"}}>  {errMsg} </Typography>}
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoFocus
                            onChange={(e) => setUser(e.target.value)}
                            InputLabelProps={{ style: { color: "#fff" } }} // Input label color
                            InputProps={{ style: { color: "#fff" } }}
                            variant="outlined"
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                  borderColor: "#fff", // Set outline color to white
                                  opacity: 0.5, // Set opacity for the outline
                                },
                                "&:hover fieldset": {
                                  borderColor: "#fff", // Set outline color to white on hover
                                },
                                "&.Mui-focused fieldset": {
                                  borderColor: "#fff", // Set outline color to white when focused
                                },
                              },
                              "& .MuiInputLabel-root": {
                                color: "#fff", // Set label color to white
                              },
                              "& .MuiInputBase-input": {
                                color: "#fff", // Set text color to white
                                opacity: 1, // Set opacity for the input text
                              },
                            }}
                            


                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            InputLabelProps={{ style: { color: "#fff" } }} // Input label color
                            InputProps={{ style: { color: "#fff" } }}
                            variant="outlined"
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                  borderColor: "#fff", // Set outline color to white
                                  opacity: 0.5, // Set opacity for the outline
                                },
                                "&:hover fieldset": {
                                  borderColor: "#fff", // Set outline color to white on hover
                                },
                                "&.Mui-focused fieldset": {
                                  borderColor: "#fff", // Set outline color to white when focused
                                },
                              },
                              "& .MuiInputLabel-root": {
                                color: "#fff", // Set label color to white
                              },
                              "& .MuiInputBase-input": {
                                color: "#fff", // Set text color to white
                                opacity: 1, // Set opacity for the input text
                              },
                            }}

                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                            sx={{
                                color:"#fff",
                                "& .MuiCheckbox-root": {
                                  color: "#fff", // Set checkbox color to white
                                },
                                "& .MuiIconButton-root": {
                                  color: "#fff", // Set icon color to white
                                },
                            }}                
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Login
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

                            >
                                Back
                            </Button>

                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}