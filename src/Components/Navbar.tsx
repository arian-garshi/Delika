import React, { useState } from 'react';
import {
    Button, AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, ListItemIcon, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { signInWithGooglePopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '../Utils/Firebase'; // Adjust the import paths as necessary

const NavLink = styled(Link)({
    textDecoration: 'none',
    color: 'inherit',
});

const Navbar: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
    };

    const handleNavigation = (path: string) => () => {
        navigate(path);
        setDrawerOpen(false);
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGooglePopup();
            console.log('Sign in successful');
        } catch (error) {
            console.error(error);
        }
    };

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleEmailSignIn = async () => {
        try {
            await signInWithEmailAndPassword(email, password);
            console.log('Sign in successful');
            setDialogOpen(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleRegister = async () => {
        try {
            await createUserWithEmailAndPassword(email, password);
            console.log('Registration successful');
            setDialogOpen(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" variant="outlined">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Alkymisten
                    </Typography>
                    <Button color="inherit" onClick={handleGoogleSignIn}>Sign in with Google</Button>
                    <Button color="inherit" onClick={handleDialogOpen}>Sign in / Register</Button>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer(true)}
                        sx={{ mr: 2 }}
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
                            <ListItem button onClick={handleNavigation('/')}>
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
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Sign in / Register</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To sign in or register, please enter your email address and password here.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button onClick={handleEmailSignIn}>Sign in</Button>
                    <Button onClick={handleRegister}>Register</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Navbar;
