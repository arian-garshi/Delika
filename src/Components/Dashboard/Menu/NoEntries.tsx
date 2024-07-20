import { Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const MainContainer = styled(motion.div)`
display: flex;
align-items: baseline;
flex-direction: column;
gap: 20px;
width: 400px
`;

const NoEntries = () => {
    return (
        <MainContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <Typography variant="body1" gutterBottom>
                        Her kan du opprette og administrere menyen din. Sørg for at alle rettene er oppdatert for å gi dine kunder den beste opplevelsen.
                    </Typography>
                    <Button variant="contained" color="primary">
                        Opprett Meny
                    </Button>
        </MainContainer>
    );
};

export default NoEntries;
