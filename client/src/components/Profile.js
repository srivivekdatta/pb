import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
    Avatar,
    Container,
    Grid,
    Paper,
    ThemeProvider,
    createTheme,
} from "@mui/material";
import Header from "./Header";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import Footer from "./Footer";
import { getUserTokenFromStorage } from "./userStore";
import img from "../assets/img/budget.jpg";
import img2 from "../assets/img/profile.jpg";
const defaultTheme = createTheme();

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost';
const SERVER_PORT = process.env.SERVER_PORT || 3001;
const Profile = () => {
    const [userData, setUserData] = useState({
        username: "",
        email: "",
    });
    const token = getUserTokenFromStorage();
    useEffect(() => {
        axios
            .get(`${BASE_URL}/user/`)
            .then((response) => {
                setUserData(response.data);
            })
            .catch((error) => {});
    }, []);
    const backgroundImg = img;
    const backgroundImg2 = img2;
    return (
        <ThemeProvider theme={defaultTheme}>
            <Header />
            <Container>
                <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    className="profile"
                    style={{
                        minHeight: "100vh",
                        marginTop: "1%",
                        backgroundImage: `url(${backgroundImg})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                    }}
                >
                    <Paper
                        elevation={3}
                        style={{
                            padding: 100,
                            background: "#f0f0f0",
                            marginTop: "-1%",
                            backgroundColor: "#f0f0f0",
                            backgroundImage: `url(${backgroundImg2})`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                        }}
                    >
                        <Avatar sx={{ bgcolor: "#1976d2", marginLeft: 12 }}>
                            <AssignmentIndIcon sx={{}} />{" "}
                        </Avatar>
                        <Box p={2}>
                            <TextField
                                label="Username"
                                fullWidth
                                disabled
                                value={userData.username}
                            />
                        </Box>
                        <Box p={2}>
                            <TextField
                                label="Email"
                                fullWidth
                                disabled
                                value={userData.email}
                            />
                        </Box>
                    </Paper>
                </Grid>
                <Footer />
            </Container>
        </ThemeProvider>
    );
};

export default Profile;
