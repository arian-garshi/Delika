import React, { useState } from 'react';
import {
    Button, AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, ListItemIcon, Box
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { signOut } from '../Utils/Firebase'; // Adjust the import paths as necessary

const NavLink = styled(Link)({
    textDecoration: 'none',
    color: 'inherit',
});


const Navbar: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
    };

    const handleNavigation = (path: string) => () => {
        navigate(path);
        setDrawerOpen(false);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" variant="outlined" elevation={0}>
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
                        {/* Add more navigation items as needed */}
                    </List>
                </Box>
            </Drawer>
        </Box>
    );
};

export default Navbar;
