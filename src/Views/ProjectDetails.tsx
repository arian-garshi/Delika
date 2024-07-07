import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { fetchProjects, generateImageUrl } from '../Utils/Sanity';
import { Project } from '../Utils/Interfaces';
import { Typography, Card, CardContent, CardMedia, CircularProgress, IconButton, Grid, Box } from '@mui/material';
import styled from 'styled-components';
import ViewWrapper from '../Components/ViewWrapper';

const BackButton = styled(IconButton)`
  position: absolute;
  top: 20px;
  left: 20px;
`;

const ProjectDetails: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const projects = queryClient.getQueryData<Project[]>(['projects']);
    const project = projects?.find((proj) => proj._id === id);

    const { data, status } = useQuery<Project[], Error>({
        queryKey: ["projects"],
        queryFn: fetchProjects,
        staleTime: 5 * 60 * 1000, // data will be considered fresh for 5 minutes
    });

    if (status === 'pending') return <CircularProgress />;
    if (status === 'error') return <Typography>Error loading project details</Typography>;

    const projectData = data?.find((proj) => proj._id === id) || project;

    if (!projectData) return <Typography>Project not found</Typography>;

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
                                image={generateImageUrl(projectData.mainImage.asset.url, 600, 400)}
                                alt={projectData.title}
                            />
                            <CardContent>
                                <Typography variant="h4" component="div">
                                    {projectData.title}
                                </Typography>
                                <Typography variant="h6" color="text.secondary">
                                    {projectData.subTitle}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    {projectData.description}
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
