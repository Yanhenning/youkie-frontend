import React, { useState } from 'react';
import {Alert, Box, Button, CircularProgress, TextField, Typography} from '@mui/material';
import { useUser } from '@/context/UserContext';

interface LoginFormProps {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  redirectUrl?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ 
  onSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, loginError } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
    if (onSuccess) {
      onSuccess();
    }
  };

  function getErrorAlert() {
    return <>
      {loginError &&
          <Alert severity="error" sx={{mb: 2}}>
            <Typography>
              Failed to login. Please check your credentials and try again.
            </Typography>
          </Alert>}
    </>;
  }

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
          disabled={isLoading}
          sx={{mt: 2}}
      >
        {isLoading ? <CircularProgress size={24}/> : 'Login'}
      </Button>
      {getErrorAlert()}
    </Box>
  );
};
