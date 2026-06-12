import { Box, Button, styled, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import Navbar from "./Navbar";
// import bgImg from "../../img/bg.png";
import heroBg from "../../img/herobg.png";
import CustomButton from "./CustomButton";
import { Link } from "react-router-dom";
const Hero = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(5),
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
  }));

  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "64px",
    color: "#FFFFFF",
    fontWeight: "bold",
    margin: theme.spacing(4, 0, 4, 0),
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      fontSize: "40px",
    },
  }));

  return (
    <Box
      sx={{
        backgroundImage: `url(${heroBg})`, // Set the background image
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "95vh",
      }}
    >
      <Container>
        <Navbar />
        <CustomBox>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontSize: "28px",
                color: "#FFFFFF",
                fontWeight: 700,
                fontFamily: "Roboto",
                mt: -3,
                mb: 1,
                textAlign: "center",
              }}
            >
              WELCOME TO AUTHENTISCAN
            </Typography>

            <Title
              variant="h1"
              sx={{
                width: { xs: "90%", sm: "80%", md: "800px" },
                height: "auto",
                mt: 2,
              }}
            >
              Securely Authenticate Your Products with AuthentiScan 
            </Title>
            <Typography
              variant="body2"
              sx={{
                fontSize: "22px",
                color: "#5A6473",
                my: 2,
                width: { xs: "90%", sm: "80%", md: "600px" },
                textAlign: "center",
              }}
            >
              Our blockchain-based product identification system provides a
              secure and reliable way to authenticate your products and protect
              against fraud
            </Typography>
          
            <Link to="/scanner">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#0F1B4C",
                  color: "#fff",
                  fontSize: "19px",
                  padding: "15px 25px",
                  borderRadius: "50px",
                  "&:hover": {
                    backgroundColor: "#fff", // Change to your desired hover background color
                    color: "#0F1B4C", // Change to your desired hover text color
                    borderColor: "#0F1B4C", // Change to your desired hover border color
                  },
                }}
              >
                SCAN QR
              </Button>
            </Link>
          </Box>
        </CustomBox>
      </Container>
    </Box>
  );
};

export default Hero;
