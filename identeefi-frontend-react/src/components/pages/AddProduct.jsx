import { Box, Paper, Typography } from '@mui/material';
import bgImg from '../../img/bg.png';
import { TextField, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { ethers } from "ethers";
import axios from 'axios';
import abi from '../../utils/Identeefi.json';
import QRCode from 'qrcode.react';
import dayjs from 'dayjs';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Geocode from "react-geocode";

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
            alert("Make sure you have Metamask!");
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


const AddProduct = () => {    

    const [currentAccount, setCurrentAccount] = useState("");
    const [serialNumber, setSerialNumber] = useState("");
    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState({
        file: [],
        filepreview: null
    });
    const [qrData, setQrData] = useState('');
    const [manuDate, setManuDate] = useState('');
    const [manuLatitude, setManuLatitude] = useState("");
    const [manuLongtitude, setManuLongtitude] = useState("");
    const [manuName, setManuName] = useState("");
    const [loading, setLoading] = useState("");
    const [manuLocation, setManuLocation] = useState("");
    const [isUnique, setIsUnique] = useState(true);

    const CONTRACT_ADDRESS  = '0x62081f016446585cCC507528cc785980296b4Ccd';
    const contractABI = abi.abi;

    const { auth } = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
        findMetaMaskAccount().then((account) => {
            if (account !== null) {
                setCurrentAccount(account);
            }
        });
        getUsername();
        getCurrentTimeLocation();
    }, []);

    useEffect(() => {
        Geocode.setApiKey('AIzaSyB5MSbxR9Vuj1pPeGvexGvQ3wUel4znfYY')

        Geocode.fromLatLng(manuLatitude, manuLongtitude).then(
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
              setManuLocation(address.replace(/,/g, ';'));
              console.log("city, state, country: ", city, state, country);
              console.log("address:", address);
            },
            (error) => {
              console.error(error);
            }
          );

    }, [manuLatitude, manuLongtitude]);

    const generateQRCode = async (serialNumber) => {
        // const qrCode = await productContract.getProduct(serialNumber);
        const data = CONTRACT_ADDRESS + ',' + serialNumber
        setQrData(data);
        console.log("QR Code: ", qrData);

    }

    const downloadQR = () => {
        const canvas = document.getElementById("QRCode");
        const pngUrl = canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `${serialNumber}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      };

    
    const handleBack = () => {
        navigate(-1)
    }

    const handleImage = async (e) => {
        setImage({
            ...image,
            file: e.target.files[0],
            filepreview: URL.createObjectURL(e.target.files[0])
        })
    }

    const getUsername = async (e) => {
        const res = await axios.get(`http://localhost:5000/profile/${auth.user}`)
            .then(res => {
                console.log(JSON.stringify(res?.data[0]));
                setManuName(res?.data[0].name);

            })
    }


    // to upload image
    const uploadImage = async (image) => {
        const data = new FormData();
        data.append("image", image.file);

        axios.post("http://localhost:5000/upload/product", data, {
            headers: { "Content-Type": "multipart/form-data" }
        }).then(res => {
            console.log(res);

            if (res.data.success === 1) {
                console.log("image uploaded");
            }
        })
    }

    const registerProduct = async (e) => {
        e.preventDefault();

        try {
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const productContract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);

                console.log("here")

                // write transactions
                const registerTxn = await productContract.registerProduct(name, brand, serialNumber, description.replace(/,/g, ';'), image.file.name, manuName, manuLocation, manuDate.toString());
                console.log("Mining (Registering Product) ...", registerTxn.hash);
                setLoading("Mining (Register Product) ...", registerTxn.hash);

                await registerTxn.wait();
                console.log("Mined (Register Product) --", registerTxn.hash);
                setLoading("Mined (Register Product) --", registerTxn.hash);

                generateQRCode(serialNumber);

                const product = await productContract.getProduct(serialNumber);

                console.log("Retrieved product...", product);
                setLoading("");

            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getCurrentTimeLocation = () => {
        setManuDate(dayjs().unix())
        navigator.geolocation.getCurrentPosition(function(position) {
            setManuLatitude(position.coords.latitude);
            setManuLongtitude(position.coords.longitude);
          });
    }   

    const addProductDB = async (e) => {
        try {
            const profileData = JSON.stringify({
                "serialNumber": serialNumber,
                "name": name,
                "brand": brand,
              });

            const res = await axios.post('http://localhost:5000/addproduct', profileData,
                {
                    headers: {'Content-Type': 'application/json'},
                });
            
            console.log(JSON.stringify(res.data));
            


        } catch (err) {
            console.log(err);
        }
    }

    const checkUnique = async () => {
        const res = await axios.get("http://localhost:5000/product/serialNumber");

        const existingSerialNumbers = res.data.map((product) => product.serialnumber);
        existingSerialNumbers.push(serialNumber);
         
        // checking for duplicated serial number
        const duplicates = existingSerialNumbers.filter((item, index) => existingSerialNumbers.indexOf(item) != index)
        console.log("duplicates: ", duplicates)
        const isDuplicate = duplicates.length >= 1;

        setIsUnique(!isDuplicate);   
        console.log(existingSerialNumbers)
        console.log("isUnique: ", isUnique)
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
          
        console.log("..............................");
        console.log("name: ", name);
        console.log("brand: ", brand);
        console.log("description: ", description);
        console.log("image: ", image.file.name);
        console.log("serialNumber: ", serialNumber);
        console.log("manufacture date: ", manuDate);
        console.log("manufactured at: ", manuLocation);
        console.log("manufactured by: ", manuName);

        checkUnique();

        if(isUnique){
            uploadImage(image);
            addProductDB(e); // add product to database
            setLoading("Please pay the transaction fee to update the product details...")
            await registerProduct(e);
        }

        setIsUnique(true);
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
            backgroundRepeat: 'no-repeat',
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
                    Add Product</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        error={!isUnique}
                        helperText={!isUnique ? "Serial Number already exists" : ""}
                        id="outlined-basic"
                        margin="normal"
                        label="Serial Number"
                        variant="outlined"
                        inherit="False"
                        onChange={(e) => setSerialNumber(e.target.value)}
                        value={serialNumber}
                    />
                    
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
                        label="Brand"
                        variant="outlined"
                        inherit="False"
                        onChange={(e) => setBrand(e.target.value)}
                        value={brand}
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


                    <Button
                        variant="outlined"
                        component="label"
                        fullWidth
                        sx={{ marginTop: "3%", marginBottom: "3%" }}
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

                    {qrData !== "" ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '3%' }}>
                        <QRCode 
                            value={qrData}
                            id="QRCode" />
                
                    </div> : null}

                    {qrData !== "" ? <div style={{ display: 'flex',  justifyContent: 'center', alignItems: 'center', marginTop: '3%' }}>
                        <Button
                            variant="outlined"
                            component="label"
                            fullWidth
                            sx={{ marginTop: "3%", marginBottom: "3%" }}                            
                            onClick={downloadQR}
                        >
                            Download
                        </Button>
      
                    </div> : null}

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

                    <Button
                        variant="contained"
                        type="submit"
                        sx={{ width: "100%", marginTop: "3%", backgroundColor: '#98b5d5', '&:hover': { backgroundColor: '#618dbd' } }}
                        onClick={getCurrentTimeLocation}
                    >
                        Add Product
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

export default AddProduct;