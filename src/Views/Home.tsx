import React from 'react';
import ProjectCards from '../Components/ProjectCards';
import ViewWrapper from '../Components/ViewWrapper';
import AuthenticationInterface from '../Components/AuthenticationInterface';

const Home: React.FC = () => {
    return (
        <ViewWrapper >
            <ProjectCards />
            <AuthenticationInterface />
            <stripe-pricing-table pricing-table-id="prctbl_1PZusq2MtWvH2jpOU3cJKZXr"
                publishable-key="pk_test_51PZiyY2MtWvH2jpOQOb2WFFGxIw8jxLxYACcnRzNg30RqNy7IqJmhdRvrbjp8N8nWiqwwBeCw5DbZ407eUaxwR8b00Kg0q0N1g">
            </stripe-pricing-table>

            <stripe-pricing-table pricing-table-id="prctbl_1PZtNg2MtWvH2jpOdyZQhhxC"
                publishable-key="pk_test_51PZiyY2MtWvH2jpOQOb2WFFGxIw8jxLxYACcnRzNg30RqNy7IqJmhdRvrbjp8N8nWiqwwBeCw5DbZ407eUaxwR8b00Kg0q0N1g">
            </stripe-pricing-table>

        </ViewWrapper>
    )
};

export default Home;