import React from 'react';
import { useParams } from 'react-router-dom';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { fetchProjects, generateImageUrl } from '../Utils/Api';
import { Project } from '../Utils/Interfaces';
import { Typography, Card, CardContent, CardMedia, CircularProgress } from '@mui/material';

const ProjectDetails: React.FC = () => {
    const { id } = useParams();
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
    );
};

export default ProjectDetails;
