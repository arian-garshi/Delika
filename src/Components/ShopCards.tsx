import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchShops } from '../Utils/Sanity';
import { Shop } from '../Utils/Interfaces';
import { generateImageUrl } from '../Utils/Sanity';
import { ButtonBase, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ShopCards: React.FC = () => {
    const navigate = useNavigate();
    const { data, status } = useQuery<Shop[], Error>({
        queryKey: ["shops"],
        queryFn: fetchShops,
        // staleTime: 5 * 60 * 1000, // data will be considered fresh for 5 minutes
    });

    if (status === 'pending') return <div>Loading...</div>;
    if (status === 'error') return <div>Error loading projects</div>;

    console.log(data);

    return (
        <div>
            <h2>Våre partnere</h2>

            <Grid container spacing={4}>

                {data?.map((shop) => (
                    <Grid item key={shop._id} xs={12} sm={6} md={4} lg={3}>
                        <ButtonBase
                            onClick={() => navigate(`/partners/${shop.slug.current}`)}
                            style={{ width: '100%' }}
                        >
                            <Card variant="outlined">
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={generateImageUrl(shop.logo.asset.url, 300, 200)}
                                    alt={shop.name}
                                />
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {shop.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {shop.city}, {shop.country}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </ButtonBase>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default ShopCards;
