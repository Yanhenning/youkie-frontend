'use client';

import React from 'react';
import { Box, Container, Link as MuiLink, Paper, Typography } from '@mui/material';
import Link from 'next/link';
import { LoginForm } from '@/components/LoginForm';

const LoginPage = () => (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
        }}
      >
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
            Sign In
          </Typography>
          
          <LoginForm redirectUrl="/home" />
          
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2">
              Don&apos;t have an account?{' '}
              <MuiLink component={Link} href="/signup">
                Sign up
              </MuiLink>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );

export default LoginPage;
