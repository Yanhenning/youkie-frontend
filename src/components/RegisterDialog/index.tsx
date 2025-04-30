'use client'

import { Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { SignupForm, SignupFormValues } from '@/components/SignupForm'

export type RegisterDialogProps = {
  open: boolean
  onClose: () => void
}

export function RegisterDialog({ open, onClose }: RegisterDialogProps) {
  const handleSubmit = (values: SignupFormValues) => {
    console.log(values)
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Register your account</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please fill in the following details to create your account.
        </DialogContentText>
        <SignupForm 
          onSubmit={handleSubmit} 
          onCancel={onClose} 
          submitButtonText="Confirm"
        />
      </DialogContent>
    </Dialog>
  )
}
