'use client'

import {AppBar, Box, Stack, Toolbar, Typography} from '@mui/material'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { LoginMenu } from '@/components/LoginMenu'
import { SignInButton } from '@/components/SignInButton'
import { useUser } from '@/context/UserContext'

export default function NavigationBar() {
    const router = useRouter()
    const { isLoggedIn } = useUser()
    const handleLogoClick = () => {
        const url = isLoggedIn() ? '/home' : '/'
        router.push(url)
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="sticky" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
                <Toolbar>
                    <Stack direction="row" spacing={1} sx={{flexGrow: 1}}>
                        <Box
                            sx={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}
                            onClick={handleLogoClick}
                        >
                            <Image
                                className="dark:invert"
                                src="/assets/logo.svg"
                                alt="Handly logomark"
                                width={32}
                                height={32}
                            />
                            <Typography variant="h6" component="div">
                                Youkie
                            </Typography>
                        </Box>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                        <SignInButton/>
                        <LoginMenu/>
                    </Stack>
                </Toolbar>
            </AppBar>
        </Box>
    )
}