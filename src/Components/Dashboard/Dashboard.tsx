// MainContent.js
import { Typography } from '@mui/material';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import NoEntries from './Menu/NoEntries';

const MainContainer = styled(motion.div)`
  padding: 20px;
  flex: 1;
`;

const MainContent = ({ selectedOption }: { selectedOption: string }) => {
    return (
        <MainContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Typography variant="h5" gutterBottom>
                {selectedOption}
            </Typography>

            <Typography variant="body1">
                {selectedOption === 'Meny' && (
                    <NoEntries />
                )}
            </Typography>
        </MainContainer>
    );
};

export default MainContent;
