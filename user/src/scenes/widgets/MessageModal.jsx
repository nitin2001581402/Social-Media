import React, { useEffect, useState } from 'react';
import { Modal, Box, TextField, IconButton, Button, List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography } from '@mui/material';
import { Close, Send } from '@mui/icons-material';
import { useSelector } from 'react-redux';

const MessageModal = ({ open, handleClose, sender_id, receiver_id }) => {
    const [newMessage, setNewMessage] = useState('');

    const token = useSelector((state) => state.token)
    const handleSendMessage = async () => {
        try {
            const response = await fetch(`http://localhost:3001/message/insert`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ sender_id, receiver_id, message: newMessage })
            });

            if (!response.ok) {
                throw new Error("Failed to send message");
            }

            const data = await response.json();
            setMessages(data.messages);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };



    const [messages, setMessages] = useState([])
    const getMessage = async () => {
        const response = await fetch(`http://localhost:3001/message/get/${sender_id}/${receiver_id}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setMessages(data.messages);
    };
    useEffect(() => {
        getMessage();
    }, []);

    console.log(messages, 111333)

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: '80vh',
                    width: '50vw',
                    backgroundColor: 'white',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 4,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6">Messages</Typography>
                    <IconButton onClick={handleClose}>
                        <Close />
                    </IconButton>
                </Box>

                <Box
                    sx={{
                        width: '100%',
                        flexGrow: 1,
                        overflowY: 'auto',
                        mt: 2,
                        mb: 2,
                        display: 'flex',
                        flexDirection: 'column-reverse',
                    }}
                >
                    <List>
                        {messages.map((message, index) => (
                            <ListItem style={{ backgroundColor: sender_id === message.sender_id._id ? "#d9fae5" : "aliceblue", borderRadius: "20px", marginTop: "5px" }} key={index} alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt={message?.sender_id?.firstName} src={message?.sender_id?.picturePath} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={message.message}
                                    secondary={`${message?.sender_id?.firstName} ${message?.sender_id?.lastName}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>

                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        sx={{ mr: 2 }}
                    />
                    <IconButton color="primary" onClick={handleSendMessage}>
                        <Send />
                    </IconButton>
                </Box>
            </Box>
        </Modal>
    );
};

export default MessageModal;
