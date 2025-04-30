'use client'

import { SignupForm, SignupFormValues } from '@/components/SignupForm'
import { Card, CardContent, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignupPage() {
  const router = useRouter()

  const handleSubmit = async (values: SignupFormValues) => {
    // Here you would typically call your API to register the user
    console.log('Signing up:', values)
    
    // Redirect to home page or dashboard after successful signup
    // This is just a placeholder - you would do this after API call success
    router.push('/')
  }

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-64px-80px)] p-4">
      <Card className="max-w-md w-1/2 mx-auto shadow-lg">
        <CardContent className="p-6">
          <Typography variant="h4" component="h1" className="text-center mb-6">
            Create an Account
          </Typography>

          <SignupForm
            onSubmit={handleSubmit}
            submitButtonText="Create Account"
            showCancelButton={false}
          />

          <Typography variant="body2" className="text-center mt-8">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}
