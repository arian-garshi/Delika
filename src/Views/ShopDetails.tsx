import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { fetchShopBySlug, generateImageUrl } from '../Utils/Sanity';
import { Shop } from '../Utils/Interfaces';
import { Typography, Card, CardContent, CardMedia, CircularProgress, IconButton, Grid, Box } from '@mui/material';
import styled from 'styled-components';
import ViewWrapper from '../Components/ViewWrapper';

const BackButton = styled(IconButton)`
  position: absolute;
  top: 20px;
  left: 20px;
`;

const ProjectDetails: React.FC = () => {
    const navigate = useNavigate();
    const { slug } = useParams<{ slug: string }>();

    if (!slug) {
        throw new Error('No slug provided');
    }

    const { data, status } = useQuery<Shop, Error>({
        queryKey: ["shop", slug],
        queryFn: () => fetchShopBySlug(slug),
    });

    if (status === 'pending') return <CircularProgress />;
    if (status === 'error') return <Typography>Error loading project details</Typography>;

    if (!data) return <Typography>Project not found</Typography>;

    return (
        <ViewWrapper>
            <Box sx={{ position: 'relative', padding: '20px' }}>
                <BackButton onClick={() => navigate(-1)}>
                    <p>Back</p>
                </BackButton>
                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12} md={8}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="300"
                                image={generateImageUrl(data.logo.asset.url, 600, 400)}
                                alt={data.name}
                            />
                            <CardContent>
                                <Typography variant="h4" component="div">
                                    {data.name}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    {data.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </ViewWrapper>
    );
};

export default ProjectDetails;
