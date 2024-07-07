import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProjects } from '../Utils/Sanity';
import { Project } from '../Utils/Interfaces';
import { generateImageUrl } from '../Utils/Sanity';
import { ButtonBase, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProjectCards: React.FC = () => {
    const navigate = useNavigate();
    const { data, status } = useQuery<Project[], Error>({
        queryKey: ["projects"],
        queryFn: fetchProjects,
        staleTime: 5 * 60 * 1000, // data will be considered fresh for 5 minutes
    });

    if (status === 'pending') return <div>Loading...</div>;
    if (status === 'error') return <div>Error loading projects</div>;

    return (
        <Grid container spacing={4}>
            {data?.map((project) => (
                <Grid item key={project._id} xs={12} sm={6} md={4} lg={3}>
                    <ButtonBase
                        onClick={() => navigate(`/project/${project._id}`)}
                        style={{ width: '100%' }}
                    >
                        <Card variant="outlined">
                            <CardMedia
                                component="img"
                                height="200"
                                image={generateImageUrl(project.mainImage.asset.url, 300, 200)}
                                alt={project.title}
                            />
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {project.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {project.subTitle}
                                </Typography>
                            </CardContent>
                        </Card>
                    </ButtonBase>
                </Grid>
            ))}
        </Grid>
    );
};

export default ProjectCards;
