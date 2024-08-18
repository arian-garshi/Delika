import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Container, Paper, Select, MenuItem } from '@mui/material';
import styled from 'styled-components';
import { slugify } from '../Utils/Helpers';
import useShopMutations from '../Hooks/useStoreMutations';
const FormContainer = styled(Paper)`
  padding: 2rem;
  margin: 2rem 0;
`;



const ShopForm: React.FC = () => {
    const { useCreateShopMutation } = useShopMutations();
    const createShopMutation = useCreateShopMutation();

    const [formData, setFormData] = useState({
        name: '',
        street: '',
        city: '',
        country: '',
        postalCode: '',
        phone: '',
        email: '',
        website: '',
        subDomainName: '',
        description: '',
        languages: '',
        openingHours: '',
        location: '',
        role: '',
    });

    const onSubmit = (data: any) => {
        console.log(data);
        createShopMutation.mutate(data);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const slug = slugify(formData.name);
        onSubmit({ ...formData, slug });
    };

    return (
        <Container maxWidth="sm">
            <FormContainer elevation={3}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Create Shop
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="name"
                                label="Shop Name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Select
                                fullWidth
                                name="role"
                                label="Your role"
                                value={formData.role}
                                onChange={(e) => handleChange(e as any)}
                            >
                                <MenuItem value="administrator">Administrator</MenuItem>
                                <MenuItem value="editor">Editor</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="street"
                                label="Street"
                                value={formData.street}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="city"
                                label="City"
                                value={formData.city}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="country"
                                label="Country"
                                value={formData.country}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="postalCode"
                                label="Postal Code"
                                value={formData.postalCode}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="phone"
                                label="Phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="email"
                                label="Email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="website"
                                label="Website"
                                value={formData.website}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="description"
                                label="Description"
                                value={formData.description}
                                onChange={handleChange}
                                multiline
                                rows={4}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary">
                                Create Shop
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </FormContainer>
        </Container>
    );
};

export default ShopForm;
