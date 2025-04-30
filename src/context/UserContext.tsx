"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'

export type User = {
  name: string
  email: string
  token: string
  refreshToken: string
  username: string
}

export type UserContextType = {
  user: User | null
  logout: () => void
  login: (user: User) => void
  isLoggedIn: () => boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)
const key = 'handly-user'

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem(key)
    if (storedUser) {
      setUserState(JSON.parse(storedUser))
    }
  }, [])

  const login = (user: User) => {
    setUserState(user)
    localStorage.setItem(key, JSON.stringify(user))
  }

  const logout = () => {
    setUserState(null)
    localStorage.removeItem(key)
  }

  const isLoggedIn = () => {
    return user !== null
  }

  return (
    <UserContext.Provider value={{ user, login, logout, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = (): UserContextType => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}