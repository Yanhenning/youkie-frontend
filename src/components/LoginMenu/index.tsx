'use client'

import { useUser } from '@/context/UserContext'
import Logout from '@mui/icons-material/Logout'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import { Avatar, Button, Divider, IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'

export const LoginMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { login, isLoggedIn, logout } = useUser()
  const isOpen = Boolean(anchorEl);

  const openMenuList = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const closeMenuList = () => {
    setAnchorEl(null)
  }

  const onClickLogout = () => {
    logout()
    closeMenuList()
  }

  if (isLoggedIn()) {
    return (
      <>
        <IconButton
          onClick={openMenuList}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={isOpen ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={isOpen ? 'true' : undefined}
        >
          <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={isOpen}
          onClose={closeMenuList}
          onClick={closeMenuList}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={closeMenuList}>
            <Avatar /> Profile
          </MenuItem>
          <MenuItem onClick={closeMenuList}>
            <Avatar /> My account
          </MenuItem>
          <Divider />
          <MenuItem onClick={closeMenuList}>
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            Add another account
          </MenuItem>
          <MenuItem onClick={closeMenuList}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={onClickLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </>
    )
  }

  return (
    <Button
      color="inherit"
      onClick={
        () => login({
          name: 'John Doe',
          email: 'email@email.com',
          token: 'my-token',
          refreshToken: 'refresh',
          username: 'john_doe',
        })}
    >
      Login
    </Button>
  )
}