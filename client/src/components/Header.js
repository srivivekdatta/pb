import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import SavingsIcon from "@mui/icons-material/Savings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import HomeIcon from "@mui/icons-material/Home";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import BarChartIcon from "@mui/icons-material/BarChart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { removeUserTokenFromStorage } from "./userStore";

function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    const onClickSignOut = () => {
        navigate("/sign-in");
        removeUserTokenFromStorage();
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <SavingsIcon
                        sx={{
                            display: { xs: "none", md: "flex" },
                            mr: 2,
                            fontSize: "250%",
                        }}
                    />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        Manage Your Budget!
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: "flex" }}>
                        
                        
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            onClick={() => handleNavigation("/dashboard")}
                            sx={{
                                mr: 2,
                                display: { xs: "none", md: "flex" },
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: "0",
                                color: location.pathname === "/dashboard" ? "#ffa000" : "inherit",
                                textDecoration: "none",
                            }}
                        >
                            <DashboardIcon
                                style={{ fontSize: "150%", marginRight: "0.3rem" }}
                            />
                            Dashboard
                        </Typography>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            onClick={() => handleNavigation("/expense")}
                            sx={{
                                mr: 2,
                                display: { xs: "none", md: "flex" },
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: "0",
                                color: location.pathname === "/expense" ? "#ffa000" : "inherit",
                                textDecoration: "none",
                            }}
                        >
                            <DescriptionIcon
                                style={{ fontSize: "150%", marginRight: "0.3rem" }}
                            />
                            Expenses
                        </Typography>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            onClick={() => handleNavigation("/categories")}
                            sx={{
                                mr: 2,
                                display: { xs: "none", md: "flex" },
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: "0",
                                color: location.pathname === "/categories" ? "#ffa000" : "inherit",
                                textDecoration: "none",
                            }}
                        >
                            <AccountBalanceWalletIcon
                                style={{ fontSize: "150%", marginRight: "0.3rem" }}
                            />
                            Budget Management
                        </Typography>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            onClick={() => handleNavigation("/profile")}
                            sx={{
                                mr: 2,
                                display: { xs: "none", md: "flex" },
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: "0",
                                color: location.pathname === "/profile" ? "#ffa000" : "inherit",
                                textDecoration: "none",
                            }}
                        >
                            <HowToRegIcon
                                style={{ fontSize: "150%", marginRight: "0.3rem" }}
                            />
                            Profile
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <Button
                            variant="contained"
                            onClick={onClickSignOut}
                            style={{ fontFamily: "monospace", fontWeight: 700 }}
                        >
                            <ExitToAppIcon
                                style={{ fontSize: "150%", marginRight: "0.3rem" }}
                            />
                            Sign Out
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;