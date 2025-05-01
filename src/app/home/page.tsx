'use client'

import React from 'react'
import { Box, Container, Typography } from '@mui/material'
import { useUser } from '@/context/UserContext'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useSummarizeWebsocket } from './hooks'
import Chat from '@/components/Chat'

export default function HomePage() {
    const {
        text,
        setText,
        connected,
        messages,
        messagesEndRef,
        handleStartConnection,
        handleSendMessage,
        handleStyleChange
    } = useSummarizeWebsocket()
    
    const {isLoggedIn} = useUser()
    const router = useRouter()
    
    React.useEffect(() => {
        if (!isLoggedIn()) {
            router.push('/login')
        }
    }, [isLoggedIn, router])

    return (
        <Container maxWidth="lg" sx={{py: 4}}>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2, position: 'relative'}}>
                <Typography variant="h3" component="h1" gutterBottom align="center">
                    Youkie your friendly Summarizer
                </Typography>
                <Box sx={{position: 'absolute', right: 0}}>
                    <Image
                        src="/assets/youkie.png"
                        alt="Youkie"
                        width={80}
                        height={80}
                    />
                </Box>
            </Box>

            <Typography variant="h6" component="h2" gutterBottom align="center" sx={{mb: 4}}>
                Paste your blog post, email, or article below to get an instant summary
            </Typography>

            <Chat 
                text={text}
                setText={setText}
                connected={connected}
                messages={messages}
                messagesEndRef={messagesEndRef as React.RefObject<HTMLDivElement>}
                handleStartConnection={handleStartConnection}
                handleSendMessage={handleSendMessage}
                onStyleChange={handleStyleChange}
            />
        </Container>
    )
}
