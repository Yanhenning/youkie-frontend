'use client'

import { useUser } from '@/context/UserContext'
import { Button } from '@mui/material'

import { useRouter } from 'next/navigation'


export const SignInButton = () => {
  const router = useRouter()
  const { isLoggedIn } = useUser()

  if (isLoggedIn()) {
    return null
  }

  return (
    <>
      <Button
        color="inherit"
        onClick={() => router.push("/signup")}
      >
        Sign up
      </Button>
    </>
  )
}