import React, { useState, useEffect } from 'react';
import {
    Button, AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, ListItemIcon, Box
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { signOut } from '../Utils/Firebase';
import { useQueryClient } from '@tanstack/react-query';

const NavLink = styled(Link)({
    textDecoration: 'none',
    color: 'inherit',
});

const Wrapper = styled(Box)({
});

const Navbar: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [userData, setUserData] = useState<any>(null);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
    };

    const handleNavigation = (path: string) => () => {
        navigate(path);
        setDrawerOpen(false);
    };

    useEffect(() => {
        const cachedUserData = queryClient.getQueryData(["userData"]);
        setUserData(cachedUserData);
        console.log('userData:', cachedUserData);

        const unsubscribe = queryClient.getQueryCache().subscribe(() => {
            const updatedUserData = queryClient.getQueryData(["userData"]);
            setUserData(updatedUserData);
            console.log('userData updated:', updatedUserData);
        });

        return () => unsubscribe();
    }, [queryClient]);

    return (
        <Wrapper sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" variant="outlined" elevation={0} style={{ backgroundColor: '#071A2B' }}>
                <Toolbar>
                    <NavLink to="/" style={{ flexGrow: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            DELIKA
                        </Typography>
                    </NavLink>
                    <Button color="inherit" onClick={signOut}>Logg ut</Button>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer(true)}
                        sx={{ ml: 2 }} // Add margin-left to create space between Sign out button and menu icon
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <List>
                        <NavLink to="/">
                            <ListItem onClick={handleNavigation('/')}>
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary="Hjem" />
                            </ListItem>
                        </NavLink>
                        <NavLink to="/dashboard">
                            <ListItem onClick={handleNavigation('/dashboard')}>
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary="Dashbord" />
                            </ListItem>
                        </NavLink>
                        {/* Add more navigation items as needed */}
                    </List>
                </Box>
            </Drawer>
        </Wrapper>
    );
};

export default Navbar;
