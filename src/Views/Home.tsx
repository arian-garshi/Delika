import React from 'react';
import ProjectCards from '../Components/ProjectCards';
import ViewWrapper from '../Components/ViewWrapper';
import AuthenticationInterface from '../Components/AuthenticationInterface';
import StripePricingTable from '../Components/StripePricingTable';

const Home: React.FC = () => {
    return (
        <ViewWrapper >
            <ProjectCards />
            <AuthenticationInterface />
            <StripePricingTable id="prctbl_1PZusq2MtWvH2jpOU3cJKZXr"
                publishableKey="pk_test_51PZiyY2MtWvH2jpOQOb2WFFGxIw8jxLxYACcnRzNg30RqNy7IqJmhdRvrbjp8N8nWiqwwBeCw5DbZ407eUaxwR8b00Kg0q0N1g">
            </StripePricingTable>
            <StripePricingTable id="prctbl_1PZtNg2MtWvH2jpOdyZQhhxC"
                publishableKey="pk_test_51PZiyY2MtWvH2jpOQOb2WFFGxIw8jxLxYACcnRzNg30RqNy7IqJmhdRvrbjp8N8nWiqwwBeCw5DbZ407eUaxwR8b00Kg0q0N1g">
            </StripePricingTable>
        </ViewWrapper>
    )
};

export default Home;