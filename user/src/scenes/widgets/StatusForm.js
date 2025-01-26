import React, { useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import axios from 'axios';

const StatusForm = ({ userId, handleClose, setChange }) => {
  const token = useSelector((state) => state.token);
  // const [content, setContent] = useState('');
  // const [mediaType, setMediaType] = useState('text');
  const [media, setMedia] = useState(null);
  console.log(userId, 121212)



  const handleSubmit = async (e) => {
    setChange(true)
    e.preventDefault();
    const formData = new FormData();

    formData.append('media', media);
    try {
      await axios.patch(`http://localhost:3001/users/${userId}/status`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      handleClose(); // Close the modal after successful submission
      setChange(false); // Close the modal after successful submission
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };



  console.log(media, "media")
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6">Update Status</Typography>
      <form encType='multipart/form-data' onSubmit={handleSubmit}>
        {/* <TextField
          label="Status Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          fullWidth
          multiline
          rows={4}
          sx={{ mb: 2 }}
        /> */}
        <Button variant="contained" component="label">
          Upload Media
          <input
            type="file"
            hidden
            onChange={(e) => setMedia(e.target.files[0])}
            required
          />
        </Button>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
          <Button variant="contained" onClick={handleClose} color="secondary" >
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default StatusForm;
