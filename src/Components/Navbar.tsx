import React, { useState } from 'react';
import {
    Button, AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, ListItemIcon, Box
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { signOut } from '../Utils/Firebase';
import { useQuery } from '@tanstack/react-query';
import { UserProfile } from '../Utils/Interfaces';

const NavLink = styled(Link)({
    textDecoration: 'none',
    color: 'inherit',
});

const Wrapper = styled(Box)({});

const Navbar: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const navigate = useNavigate();

    const { data: userData } = useQuery<UserProfile | null>({
        queryKey: ['userData']
    });

    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
    };

    const handleNavigation = (path: string) => () => {
        navigate(path);
        setDrawerOpen(false);
    };

    return (
        <Wrapper sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" variant="outlined" elevation={0} style={{ backgroundColor: '#071A2B' }}>
                <Toolbar>
                    <NavLink to="/" style={{ flexGrow: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            DELIKA
                        </Typography>
                    </NavLink>
                    {userData === null ? (
                        <Button color="inherit" component={NavLink} to="/login">Logg inn</Button>
                    ) : userData && (
                        <Button color="inherit" onClick={signOut}>Logg ut</Button>
                    )}                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer(true)}
                        sx={{ ml: 2 }}
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
