'use client';
import React from 'react';
import { Box, Container, Typography, Link, Divider, Stack, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 1, // Reduced padding-top and padding-bottom
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[900],
      }}
    >
      <Container maxWidth="lg">
        <Divider sx={{ mb: 3 }} />

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ mb: { xs: 2, md: 0 } }}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom>
              Youkie AI
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your friendly AI companion for content summarization
            </Typography>
          </Box>

          <Stack direction="row" spacing={2} sx={{ mb: { xs: 2, md: 0 } }}>
            <Link href="/about" color="inherit" underline="hover">About</Link>
            <Link href="/privacy" color="inherit" underline="hover">Privacy</Link>
            <Link href="/terms" color="inherit" underline="hover">Terms</Link>
            <Link href="/help" color="inherit" underline="hover">Help</Link>
          </Stack>

          <Stack direction="row" spacing={1}>
            <IconButton aria-label="GitHub" size="small">
              <GitHubIcon fontSize="small" />
            </IconButton>
            <IconButton aria-label="Twitter" size="small">
              <TwitterIcon fontSize="small" />
            </IconButton>
            <IconButton aria-label="LinkedIn" size="small">
              <LinkedInIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Box>

        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            © 2025 Youkie AI. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

