import { useState } from 'react';
import styled from 'styled-components';
import Sidebar from '../Components/Dashboard/Sidebar';
import Dashboard from '../Components/Dashboard/Dashboard';

const ConsoleContainer = styled.div`
  display: flex;
  height: 100vh;
  padding-top: 60px;
`;

const Wrapper = styled.div`
  max-width: 1100px;
    flex: 1;
    margin: 0 auto;
`;

const Console = () => {
    const [selectedOption, setSelectedOption] = useState('Meny');

    return (
        <ConsoleContainer>
            <Sidebar setSelectedOption={setSelectedOption} />
            <Wrapper>
                <Dashboard selectedOption={selectedOption} />
            </Wrapper>
        </ConsoleContainer>
    );
};

export default Console;
