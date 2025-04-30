'use client'

import { useUser } from '@/context/UserContext'
import { Button } from '@mui/material'
import { RegisterDialog } from '@/components/RegisterDialog'
import { useState } from 'react'

export const SignInButton = () => {
  const { isLoggedIn } = useUser()
  const [registerDialogOpen, setRegisterDialogOpen] = useState<boolean>(false)

  if (isLoggedIn()) {
    return null
  }

  return (
    <>
      <Button
        color="inherit"
        onClick={() => setRegisterDialogOpen(true)}
      >
        Sign in
      </Button>
      <RegisterDialog open={registerDialogOpen} onClose={() => setRegisterDialogOpen(false)} />
    </>
  )
}