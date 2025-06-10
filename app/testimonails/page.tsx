"use client";
import { useState, useEffect } from 'react';
import { Box, Button, Container, Paper, Stack, TextField, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import { Testimonial } from '@/Providers/clientData';

export default function TestimonialsPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [error, setError] = useState('');

    const verifyToken = async (token: string) => {
        try {
            const response = await axios.post('/api/auth/verify-token', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data.valid;
        } catch {
            return false;
        }
    };

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                const isValid = await verifyToken(token);
                if (isValid) {
                    fetchTestimonials(token);
                } else {
                    // Remove invalid token
                    localStorage.removeItem('token');
                    setTestimonials([]);
                }
            }
        };
        
        checkToken();
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/check-email', {
                email,
                password
            });

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                fetchTestimonials(response.data.token);
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    const fetchTestimonials = async (token: string) => {
        try {
            const response = await axios.get('/api/testimonials/list', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTestimonials(response.data);
        } catch (err) {
            console.error('Error fetching testimonials:', err);
            setError('Failed to fetch testimonials');
            // If there's an error fetching testimonials, it might be due to an invalid token
            localStorage.removeItem('token');
            setTestimonials([]);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setTestimonials([]);
        setError('');
    };

    const handleStatusChange = async (testimonial: Testimonial, status: string) => {
        try {
            const response = await axios.post('/api/testimonials/update-status', {
                testimonialId: testimonial._id,
                status: status
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.data.success) {
                fetchTestimonials(localStorage.getItem('token') || '');
            }
        } catch (err) {
            console.error('Error updating testimonial status:', err);
            setError('Failed to update testimonial status');
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            {!localStorage.getItem('token') ? (
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Stack spacing={3}>
                        <Typography variant="h5" component="h1" align="center">
                            Login
                        </Typography>
                        {error && (
                            <Typography color="error" align="center">
                                {error}
                            </Typography>
                        )}
                        <form onSubmit={handleLogin}>
                            <Stack spacing={2}>
                                <TextField
                                    label="Email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    fullWidth
                                />
                                <TextField
                                    label="Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    fullWidth
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                >
                                    Login
                                </Button>
                            </Stack>
                        </form>
                    </Stack>
                </Paper>
            ) : (
                <Stack spacing={3}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h5" component="h1">
                            Testimonials
                        </Typography>
                        <Button variant="outlined" onClick={handleLogout}>
                            Logout
                        </Button>
                    </Box>
                    {testimonials.length > 0 ? (
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Phone</TableCell>
                                        <TableCell>Comment</TableCell>
                                        <TableCell>Rating</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {testimonials.map((testimonial, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{testimonial.name}</TableCell>
                                            <TableCell>{testimonial.email}</TableCell>
                                            <TableCell>{testimonial.phone}</TableCell>
                                            <TableCell>{testimonial.comment}</TableCell>
                                            <TableCell>{testimonial.rate}/5</TableCell>
                                            <TableCell>
                                                <Typography 
                                                    color={testimonial.status === 'approved' ? 'success.main' : 'warning.main'}
                                                >
                                                    {testimonial.status}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                {testimonial.status === 'pending' && (
                                                    <Box display="flex" gap={1}>
                                                        <Button 
                                                            variant="contained" 
                                                            color="success"
                                                            size="small"
                                                            onClick={() => handleStatusChange(testimonial, 'approved')}
                                                        >
                                                            Accept
                                                        </Button>
                                                        <Button 
                                                            variant="contained" 
                                                            color="error"
                                                            size="small"
                                                            onClick={() => handleStatusChange(testimonial, 'rejected')}
                                                        >
                                                            Decline
                                                        </Button>
                                                    </Box>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    ) : (
                        <Typography align="center">
                            No testimonials found
                        </Typography>
                    )}
                </Stack>
            )}
        </Container>
    );
}
