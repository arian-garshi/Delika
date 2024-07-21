import { Button } from '@mui/material';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const MainContainer = styled(motion.div)`
  display: flex;
  align-items: baseline;
  flex-direction: column;
  gap: 20px;
  width: 400px;
`;

const NoEntries = () => {
    return (
        <MainContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p>
                Velkommen til din restaurantens dashbord. På denne 
                siden kan du redigere din meny og administrere innstillinger.
            </p>
            <Button variant="contained" color="primary">
                Opprett Meny
            </Button>
        </MainContainer>
    );
};

export default NoEntries;
