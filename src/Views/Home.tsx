import React from 'react';
import ProjectCards from '../Components/ProjectCards';
import ViewWrapper from '../Components/ViewWrapper';
const Home: React.FC = () => {
    return <ViewWrapper >
        <ProjectCards />
        <stripe-pricing-table pricing-table-id="prctbl_1PZkIv2MtWvH2jpOF0JOzRBP"
            publishable-key="pk_test_51PZiyY2MtWvH2jpOQOb2WFFGxIw8jxLxYACcnRzNg30RqNy7IqJmhdRvrbjp8N8nWiqwwBeCw5DbZ407eUaxwR8b00Kg0q0N1g">
        </stripe-pricing-table>
    </ViewWrapper>;
};

export default Home;