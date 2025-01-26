import React, { useEffect, useState } from 'react';
import { Modal, Box, IconButton, LinearProgress } from '@mui/material';
import { Close, ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const StatusModal = ({ open, handleClose, imageUrls }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    // Filter images that are less than 24 hours old
    const validImages = imageUrls.filter(image => {
        const imageDate = new Date(image.date);
        const currentDate = new Date();
        const timeDifference = currentDate - imageDate;
        return timeDifference <= 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    });

    useEffect(() => {
        let timer;
        let progressTimer;

        if (open && validImages.length > 0) {
            timer = setInterval(() => {
                setCurrentImageIndex((prevIndex) => {
                    if (prevIndex < validImages.length - 1) {
                        return prevIndex + 1;
                    } else {
                        handleClose();
                        return prevIndex;
                    }
                });
            }, 4000);

            progressTimer = setInterval(() => {
                setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 1));
            }, 40); // 4000ms / 100 = 40ms per progress increment
        }

        return () => {
            clearInterval(timer);
            clearInterval(progressTimer);
            setProgress(0);
        };
    }, [open, validImages.length, handleClose]);

    const handleNext = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex < validImages.length - 1 ? prevIndex + 1 : prevIndex));
        setProgress(0);
    };

    const handlePrev = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
        setProgress(0);
    };

    if (!open || validImages.length === 0) {
        return null;
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    width: '100vw',
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    position: 'relative',
                    overflow: 'hidden',
                    px: 2,
                }}
            >
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        color: 'white',
                        zIndex: 2,
                    }}
                    onClick={handleClose}
                >
                    <Close sx={{ fontSize: 30 }} />
                </IconButton>
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: 16,
                        color: 'white',
                        zIndex: 2,
                        transform: 'translateY(-50%)',
                    }}
                    onClick={handlePrev}
                >
                    <ArrowBackIos sx={{ fontSize: 30 }} />
                </IconButton>
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        right: 16,
                        color: 'white',
                        zIndex: 2,
                        transform: 'translateY(-50%)',
                    }}
                    onClick={handleNext}
                >
                    <ArrowForwardIos sx={{ fontSize: 30 }} />
                </IconButton>
                <Box
                    component="img"
                    src={`http://localhost:3001/status/${validImages[currentImageIndex]?.media}`}
                    alt={`status ${currentImageIndex}`}
                    sx={{
                        maxHeight: '80%',
                        maxWidth: '80%',
                        height: 'auto',
                        width: 'auto',
                        borderRadius: 2,
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                        objectFit: 'cover',
                        zIndex: 1,
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 16,
                        left: 0,
                        right: 0,
                        height: 4,
                        backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    }}
                >
                    <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{
                            height: '100%',
                            backgroundColor: 'transparent',
                            '& .MuiLinearProgress-bar': {
                                backgroundColor: 'white',
                            },
                        }}
                    />
                </Box>
            </Box>
        </Modal>
    );
};

export default StatusModal;
