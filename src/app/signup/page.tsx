'use client'

import React, { useState } from 'react'
import { useUser } from '@/context/UserContext'
import { Toaster } from 'react-hot-toast'
import Link from 'next/link'
import { 
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  Link as MuiLink,
  InputAdornment,
  IconButton
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

export default function SignUpPage() {
  const { register, isLoading } = useUser()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    username: '',
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    register(formData)
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        bgcolor: 'background.default',
        py: 4
      }}
    >
      <Toaster position="top-right" />
      <Container maxWidth="sm">
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center' 
          }}
        >
          <Typography component="h1" variant="h4" gutterBottom>
            Create your account
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Or{' '}
            <MuiLink component={Link} href="/login" underline="hover">
              sign in to your account
            </MuiLink>
          </Typography>
          
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                required
                id="name"
                name="name"
                label="Full Name"
                variant="outlined"
                value={formData.name}
                onChange={handleChange}
                autoFocus
              />
              
              <TextField
                fullWidth
                required
                id="username"
                name="username"
                label="Username"
                variant="outlined"
                value={formData.username}
                onChange={handleChange}
              />
              
              <TextField
                fullWidth
                required
                id="email"
                name="email"
                label="Email Address"
                variant="outlined"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
              />
              
              <TextField
                fullWidth
                required
                id="password"
                name="password"
                label="Password"
                variant="outlined"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={toggleShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isLoading}
                sx={{ mt: 2 }}
              >
                {isLoading ? 'Signing up...' : 'Sign up'}
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}
