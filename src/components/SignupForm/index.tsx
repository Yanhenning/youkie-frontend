'use client'

import { Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export type SignupFormProps = {
  onSubmit: (values: SignupFormValues) => void
  onCancel?: () => void
  submitButtonText?: string
  showCancelButton?: boolean
}

export type SignupFormValues = {
  email: string
  name: string
  password: string
}

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  name: Yup.string().required('Name is required'),
  password: Yup.string().min(6, 'Password should be at least 6 characters').required('Password is required'),
})

export function SignupForm({ 
  onSubmit, 
  onCancel, 
  submitButtonText = "Sign Up", 
  showCancelButton = true 
}: SignupFormProps) {
  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit(values)
    },
  })

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
      <TextField
        margin="dense"
        label="Email"
        type="email"
        fullWidth
        {...formik.getFieldProps('email')}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <TextField
        margin="dense"
        label="Name"
        type="text"
        fullWidth
        {...formik.getFieldProps('name')}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />
      <TextField
        margin="dense"
        label="Password"
        type="password"
        fullWidth
        {...formik.getFieldProps('password')}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />
      
      <div className="flex justify-end gap-2 mt-4">
        {showCancelButton && onCancel && (
          <Button onClick={onCancel} color="primary">
            Cancel
          </Button>
        )}
        <Button type="submit" variant="contained" color="primary">
          {submitButtonText}
        </Button>
      </div>
    </form>
  )
}
