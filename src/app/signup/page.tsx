'use client'

import React from 'react'
import {useUser} from '@/context/UserContext'
import {toast, Toaster} from 'react-hot-toast'
import Link from 'next/link'
import {Box, Container, Link as MuiLink, Paper, Typography} from '@mui/material'
import {SignupForm, SignupFormValues} from '@/components/SignupForm'
import axios from 'axios'
import {parseAxiosErrors} from "@/client/utils";

const DEFAULT_ERROR_MESSAGE = 'An error occurred during registration.'

export default function SignUpPage() {
    const {register, isLoading} = useUser()
    const handleSubmit = async (values: SignupFormValues) => {
        try {
            await register({
                username: values.username,
                email: values.email,
                password: values.password,
            })
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage = parseAxiosErrors(error) || DEFAULT_ERROR_MESSAGE
                toast.error(errorMessage)
            } else {
                toast.error(DEFAULT_ERROR_MESSAGE)
            }
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                py: 4
            }}
        >
            <Toaster position="top-right"/>
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
                    <Typography variant="body2" color="text.secondary" sx={{mb: 3}}>
                        Or{' '}
                        <MuiLink component={Link} href="/login" underline="hover">
                            sign in to your account
                        </MuiLink>
                    </Typography>

                    <Box sx={{width: '100%'}}>
                        <SignupForm
                            onSubmit={handleSubmit}
                            submitButtonText={isLoading ? "Signing up..." : "Sign up"}
                            showCancelButton={false}
                        />
                    </Box>
                </Paper>
            </Container>
        </Box>
    )
}
