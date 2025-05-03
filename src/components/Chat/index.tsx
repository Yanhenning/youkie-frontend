import React, { useEffect, useRef, useState } from 'react'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Divider,
    Paper,
    TextField,
    Typography
} from '@mui/material'
import { Send as SendIcon } from '@mui/icons-material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { SummarizationStyle } from '@/constants'
import SelectSummarizeChoices from '@/components/SelectSummarizeChoices'

type Message = {
    text: string;
    isUser: boolean;
};

interface ChatProps {
    text: string;
    setText: (text: string) => void;
    connected: boolean;
    messages: Array<Message>;
    loading?: boolean;
    messagesEndRef: React.RefObject<HTMLDivElement> | null;
    handleStartConnection: () => void;
    handleSendMessage: () => void;
    onStyleChange?: (style: SummarizationStyle) => void;
}

export default function Chat({
                                 text,
                                 setText,
                                 connected,
                                 messages,
                                 loading = false,
                                 messagesEndRef,
                                 handleStartConnection,
                                 handleSendMessage,
                                 onStyleChange
                             }: ChatProps) {
    const [selectedStyle, setSelectedStyle] = useState<SummarizationStyle>(SummarizationStyle.NORMAL);
    const [expanded, setExpanded] = useState<boolean>(false);
    const chatContainerRef = useRef<HTMLDivElement | null>(null);

    // Add effect to scroll the chat container when messages change
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages, loading]);

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    const formatMessageText = (text: string) => {
        if (text.includes('- ') || text.includes('• ')) {
            return text.split(/(?=- |• )/)
                .map((item, index) => (
                    <div key={index} className="mb-2">
                        {item}
                    </div>
                ));
        }
        return text;
    };

    const handleStyleChange = (style: SummarizationStyle) => {
        setSelectedStyle(style);
        if (onStyleChange) {
            onStyleChange(style);
        }
    };

    const handleAccordionChange = () => {
        setExpanded(!expanded);
    };

    return (
        <>
            {!connected ? (
                <Box sx={{display: 'flex', justifyContent: 'center', my: 4}}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={handleStartConnection}
                    >
                        Start Now
                    </Button>
                </Box>
            ) : (
                <>
                    <Card sx={{mb: 4}}>
                        <CardContent>
                            {/* Connection status indicator above messages */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'flex-end',
                                    mb: 1
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 10,
                                        height: 10,
                                        borderRadius: '50%',
                                        backgroundColor: connected ? 'success.main' : 'error.main',
                                        mr: 1
                                    }}
                                />
                                <Typography variant="caption" color={connected ? "success.main" : "error.main"}>
                                    {connected ? "online" : "offline"}
                                </Typography>
                            </Box>

                            <Paper
                                elevation={0}
                                className="bg-gray-50"
                                sx={{
                                    height: '320px',
                                    p: 2,
                                    mb: 2,
                                    overflowY: 'auto',
                                    border: '1px solid #e0e0e0',
                                    borderRadius: 1
                                }}
                                ref={chatContainerRef}
                            >
                                {messages.map((msg, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            p: 1.5,
                                            mb: 1,
                                            borderRadius: 2,
                                            maxWidth: '80%',
                                            bgcolor: msg.isUser ? '#e3f2fd' : '#f5f5f5',
                                            ml: msg.isUser ? 'auto' : 0,
                                            mr: msg.isUser ? 0 : 'auto',
                                        }}
                                    >
                                        {msg.isUser ? (
                                            <Typography variant="body2">{msg.text}</Typography>
                                        ) : (
                                            <Typography
                                                variant="body2"
                                                component="div"
                                                sx={{
                                                    whiteSpace: 'pre-line',
                                                    '& > div': {marginBottom: '8px'}
                                                }}
                                            >
                                                {formatMessageText(msg.text)}
                                            </Typography>
                                        )}
                                    </Box>
                                ))}

                                {/* Loading indicator when waiting for response */}
                                {loading && (
                                    <Box
                                        sx={{
                                            p: 1.5,
                                            mb: 1,
                                            borderRadius: 2,
                                            maxWidth: '80%',
                                            bgcolor: '#f5f5f5',
                                            mr: 'auto',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1
                                        }}
                                    >
                                        <CircularProgress size={20} thickness={4} color="primary" />
                                        <Typography variant="body2" color="text.secondary">
                                            Youkie is thinking...
                                        </Typography>
                                    </Box>
                                )}

                                {/* Keep this invisible div for future reference if needed */}
                                <div ref={messagesEndRef} style={{ height: 0 }}/>
                            </Paper>

                            <Divider sx={{mb: 2}}/>

                            <Box sx={{display: 'flex', alignItems: 'flex-end', gap: 1}}>
                                <TextField
                                    multiline
                                    maxRows={4}
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    fullWidth
                                    variant="outlined"
                                    placeholder="Type your text for summarization..."
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSendMessage}
                                    disabled={!text.trim()}
                                    sx={{
                                        minWidth: '48px',
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: '50%',
                                        padding: 0,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        alignSelf: 'center'
                                    }}
                                >
                                    <SendIcon/>
                                </Button>
                            </Box>
                                    {loading && (
                                    <Box
                                        sx={{
                                            p: 1.5,
                                            mb: 1,
                                            borderRadius: 2,
                                            maxWidth: '80%',
                                            bgcolor: '#c72b2b',
                                            mr: 'auto',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1
                                        }}
                                    >
                                        <CircularProgress size={20} thickness={4} color="primary" />
                                        <Typography variant="body2" color="text.secondary">
                                            Youkie is thinking...
                                        </Typography>
                                    </Box>
                                )}
                            <Accordion
                                expanded={expanded}
                                onChange={handleAccordionChange}
                                sx={{
                                    mt: 2,
                                    boxShadow: 'none',
                                    '&:before': {display: 'none'}
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon/>}
                                    aria-controls="summarization-options-content"
                                    id="summarization-options-header"
                                    sx={{px: 1}}
                                >
                                    <Typography variant="subtitle2">Summarization Options</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{px: 1}}>
                                    <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                                        <SelectSummarizeChoices
                                            selected={selectedStyle}
                                            onChange={handleStyleChange}
                                            disabled={!connected}
                                        />
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        </CardContent>
                    </Card>
                </>
            )}
        </>
    )
}
