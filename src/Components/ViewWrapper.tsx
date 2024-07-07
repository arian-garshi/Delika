import styled from 'styled-components';

const ViewWrapper = styled.div`
    max-width: 100%;
    margin: 0 auto;
    padding: 0 16px;

    @media (min-width: 768px) {
        max-width: 768px;
    }

    @media (min-width: 1024px) {
        max-width: 1024px;
    }

    @media (min-width: 1440px) {
        max-width: 1440px;
    }
`;

export default ViewWrapper;