import React, { useState } from 'react';
import { Box, TextField, Button, CircularProgress, Alert } from '@mui/material';
import { useUser } from '@/context/UserContext';

interface LoginFormProps {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  redirectUrl?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ 
  onSuccess,
  redirectUrl = '/home'  
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoggingIn, loginError } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password }, redirectUrl);
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '100%',
        maxWidth: '400px',
      }}
    >
      {loginError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {(loginError as Error).message || 'Failed to login. Please try again.'}
        </Alert>
      )}
      
      <TextField
        label="Email"
        type="email"
        fullWidth
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        variant="outlined"
      />
      
      <TextField
        label="Password"
        type="password"
        fullWidth
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        variant="outlined"
      />
      
      <Button 
        type="submit" 
        variant="contained" 
        color="primary" 
        fullWidth
        disabled={isLoggingIn}
        sx={{ mt: 2 }}
      >
        {isLoggingIn ? <CircularProgress size={24} /> : 'Login'}
      </Button>
    </Box>
  );
};
