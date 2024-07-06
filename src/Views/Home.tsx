import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProjects } from '../Utils/Api';
import { Project } from '../Utils/Interfaces';

const Home: React.FC = () => {
    const { data, status } = useQuery<Project[], Error>({
        queryKey: ["projects"],
        queryFn: fetchProjects
    });

    console.log(status);
    console.log(data);

    return <div>home</div>;
};

export default Home;