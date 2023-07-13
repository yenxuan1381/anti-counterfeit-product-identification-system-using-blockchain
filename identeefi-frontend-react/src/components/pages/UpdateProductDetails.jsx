import { Box, Paper, Typography, Autocomplete } from '@mui/material';
import bgImg from '../../img/bg.png';
import { TextField, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { ethers } from "ethers";
import axios from 'axios';
import Geocode from "react-geocode";
import dayjs from 'dayjs';
import { useLocation, useNavigate } from 'react-router-dom';
import abi from '../../utils/Identeefi.json';

const options = ["true", "false"]

const getEthereumObject = () => window.ethereum;

/*
 * This function returns the first linked account found.
 * If there is no account linked, it will return null.
 */
const findMetaMaskAccount = async () => {
    try {
        const ethereum = getEthereumObject();

        /*
        * First make sure we have access to the Ethereum object.
        */
        if (!ethereum) {
            console.error("Make sure you have Metamask!");
            return null;
        }

        console.log("We have the Ethereum object", ethereum);
        const accounts = await ethereum.request({ method: "eth_accounts" });

        if (accounts.length !== 0) {
            const account = accounts[0];
            console.log("Found an authorized account:", account);
            return account;
        } else {
            console.error("No authorized account found");
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
};

const UpdateProductDetails = () => {

    const [currentAccount, setCurrentAccount] = useState("");
    const [currDate, setCurrDate] = useState('');
    const [currLatitude, setCurrLatitude] = useState("");
    const [currLongtitude, setCurrLongtitude] = useState("");
    const [currName, setCurrName] = useState("");
    const [currLocation, setCurrLocation] = useState("");
    const [serialNumber, setSerialNumber] = useState("");
    const [isSold, setIsSold] = useState(false);
    const [loading, setLoading] = useState("");


    const CONTRACT_ADDRESS = '0x62081f016446585cCC507528cc785980296b4Ccd';
    const CONTRACT_ABI = abi.abi;

    const { auth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const qrData = location.state?.qrData;


    useEffect(() => {
        console.log("qrdata", qrData)
        const data = qrData.split(",");
        // const contractAddress = data[0];
        setSerialNumber(data[1]);
        console.log("serialNumber", serialNumber)

        findMetaMaskAccount().then((account) => {
            if (account !== null) {
                setCurrentAccount(account);
            }
        });
    });

    useEffect(() => {
        console.log("useEffect 3")

        getUsername();
        getCurrentTimeLocation();
    }, []);


    useEffect(() => {
        Geocode.setApiKey('AIzaSyB5MSbxR9Vuj1pPeGvexGvQ3wUel4znfYY')

        Geocode.fromLatLng(currLatitude, currLongtitude).then(
            (response) => {
                const address = response.results[0].formatted_address;
                let city, state, country;
                for (let i = 0; i < response.results[0].address_components.length; i++) {
                    for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
                        switch (response.results[0].address_components[i].types[j]) {
                            case "locality":
                                city = response.results[0].address_components[i].long_name;
                                break;
                            case "administrative_area_level_1":
                                state = response.results[0].address_components[i].long_name;
                                break;
                            case "country":
                                country = response.results[0].address_components[i].long_name;
                                break;
                        }
                    }
                }

                setCurrLocation(address.replace(/,/g, ';'));
                console.log("city, state, country: ", city, state, country);
                console.log("address:", address);
            },
            (error) => {
                console.error(error);
            }
        );

    }, [currLatitude, currLongtitude]);

    const getCurrentTimeLocation = () => {
        setCurrDate(dayjs().unix())
        navigator.geolocation.getCurrentPosition(function (position) {
            setCurrLatitude(position.coords.latitude);
            setCurrLongtitude(position.coords.longitude);
        });
    }

       

    const getUsername = async (e) => {
        const res = await axios.get(`http://localhost:5000/profile/${auth.user}`)
            .then(res => {
                console.log(JSON.stringify(res?.data[0]));
                setCurrName(res?.data[0].name);

            })
    }

    const updateProduct = async (e) => {
        e.preventDefault();

        try {
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const productContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

                console.log("here")

                // write transactions
                const registerTxn = await productContract.addProductHistory(serialNumber, currName, currLocation, currDate.toString(), Boolean(isSold));
                console.log("Mining (Adding Product History) ...", registerTxn.hash);
                setLoading("Mining (Add Product History) ...", registerTxn.hash);

                await registerTxn.wait();
                console.log("Mined (Add Product History) --", registerTxn.hash);
                setLoading("Mined (Add Product History) --", registerTxn.hash);

                const product = await productContract.getProduct(serialNumber);

                console.log("Retrieved product...", product);
                setLoading("Done! Product details updated successfully!");

            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("here")
        setLoading("Please pay the transaction fee to update the product details...")
        await updateProduct(e);


    }

    const handleBack = () => {
        navigate(-1)
    }


    return (
        <Box sx={{
            backgroundImage: `url(${bgImg})`,
            minHeight: "80vh",
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

                <Typography
                    variant="h2"
                    sx={{
                        textAlign: "center", marginBottom: "3%",
                        fontFamily: 'Gambetta', fontWeight: "bold", fontSize: "2.5rem"
                    }}
                >
                    Update Product Details</Typography>

                    <TextField
                        fullWidth
                        id="outlined-disabled"
                        margin="normal"
                        label="Serial Number"
                        disabled

                        value={serialNumber}
                    />

                    <TextField
                        fullWidth
                        id="outlined-disabled"
                        margin="normal"
                        label="Name"
                        disabled
                        value={currName}
                    />
                    <TextField
                        fullWidth
                        id="outlined-disabled"
                        margin="normal"
                        label="Location"
                        disabled
                        multiline
                        minRows={2}
                        value={currLocation.replace(/;/g, ",")}
                    />
                    <TextField
                        fullWidth
                        id="outlined-disabled"
                        margin="normal"
                        label="Date"
                        disabled

                        value={dayjs(currDate * 1000).format("MMMM D, YYYY h:mm A")}
                    />

                    {auth.role === "supplier" ? null
                        : <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={options}
                            fullWidth
                            value={isSold}
                            onChange={(event, newVal) => {
                                setIsSold(newVal);
                            }}
                            renderInput={(params) =>
                                <TextField {...params}
                                    fullWidth
                                    id="outlined-basic"
                                    margin="normal"
                                    label="Is Sold?"
                                    variant="outlined"
                                    inherit="False"

                                />}
                        />
                    }
                {loading === "" ? null
                        : <Typography
                            variant="body2"
                            sx={{
                                textAlign: "center", marginTop: "3%"
                            }}
                        >
                            {loading}
                        </Typography>
                    }
                    
                
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >

                        <Button
                            variant="contained"
                            type="submit"
                            onClick={handleSubmit}
                            sx={{ textAlign: "center", width: "50%", marginTop: "3%", backgroundColor: '#98b5d5', '&:hover': { backgroundColor: '#618dbd' } }}
                            >
                            Update Product
                        </Button>
                    </Box>



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
            </Paper>
        </Box>
    )
}

export default UpdateProductDetails;