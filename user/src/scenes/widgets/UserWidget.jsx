import React, { useState, useEffect } from 'react';
import { ManageAccountsOutlined, EditOutlined, LocationOnOutlined, WorkOutlineOutlined, PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, Typography, Divider, useTheme, Modal, Button, IconButton } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import StatusForm from './StatusForm'; // Import the StatusForm component
import MediaCard from './EditProfile';
import { setFriends } from 'state';
import AdjustIcon from '@mui/icons-material/Adjust';
import StatusModal from './StatusModal';

import MessageIcon from '@mui/icons-material/Message';
import MessageModal from './MessageModal';

const UserWidget = ({ users, userId, picturePath, state, setState }) => {
  const { palette } = useTheme();
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();




  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);

  const logUser = useSelector((state) => state.user);

  const login = useSelector((state) => state.user.login);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleOpenStatusModal = () => { logUser._id == userId && setOpenStatusModal(true) };
  const handleCloseStatusModal = () => setOpenStatusModal(false);

  const handleOpenEditModal = () => setOpenEditModal(true);
  const handleCloseEditModal = () => setOpenEditModal(false);

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  const friends = useSelector((state) => state.user.friends)




  const [modalOpen, setModalOpen] = useState(false);

  const [modalOpen2, setModalOpen2] = useState(false);


  const [change, setChange] = useState(false)

  useEffect(() => {
    getUser();
  }, [state, change]); // eslint-disable-line react-hooks/exhaustive-deps


  if (!user) {
    return null;
  }



  const patchFriend = async (friendId) => {
    const response = await fetch(
      `http://localhost:3001/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };




  const { firstName, lastName, linkedin, twitter, location, occupation, viewedProfile, impressions, _id, status } = user;



  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleOpenModal2 = () => {
    setModalOpen2(true);
  };

  const handleCloseModal2 = () => {
    setModalOpen2(false);
  };


  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage
            image={picturePath}
            handleOpenStatusModal={handleOpenStatusModal}
          />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>
        {logUser._id == userId &&
          <ManageAccountsOutlined
            sx={{
              "&:hover": {
                color: palette.primary.main,
                cursor: "pointer",
              },
            }}
            onClick={handleOpenEditModal} // Open edit modal
          />}
        <Modal
          open={openEditModal}
          onClose={handleCloseEditModal}
          aria-labelledby="modal-edit-title"
          aria-describedby="modal-edit-description"
        >
          <Box sx={{ p: 2 }}>
            <MediaCard
              setState={setState}
              state={state}
              setUser={setUser}
              handleClose={handleCloseEditModal}
              user={user}
            />
          </Box>
        </Modal>
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">

        <Box onClick={handleOpenModal} display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <AdjustIcon fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>Status</Typography>
        </Box>

        <StatusModal
          open={modalOpen}
          handleClose={handleCloseModal}
          imageUrls={status}
        />
        {logUser._id != userId &&
          <Box onClick={handleOpenModal2} display="flex" alignItems="center" gap="1rem" mb="0.5rem">
            <MessageIcon fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>Message</Typography>
          </Box>}

        <MessageModal
          open={modalOpen2}
          handleClose={handleCloseModal2}
          sender_id={logUser._id}
          receiver_id={userId}
        />

        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* FOURTH ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="../assets/twitter.png" alt="twitter" />
            <Box>
              <Typography color={main} fontWeight="500">
                {twitter ? <Link target='_blank' style={{ textDecoration: "none" }} to={twitter}>Twitter</Link> : "Twitter"}
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          {/* <EditOutlined sx={{ color: main }} /> */}
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src="../assets/linkedin.png" alt="linkedin" />
            <Box>
              <Typography color={main} fontWeight="500">
                {linkedin ? <Link target='_blank' style={{ textDecoration: "none" }} to={linkedin}>Linkedin</Link> : "Linkedin"}
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          {/* <EditOutlined sx={{ color: main }} /> */}
        </FlexBetween>

        {/* Uncomment if needed */}
        {/* <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img
              src={insta}
              style={{ width: "25px", height: "25px", objectFit: "cover" }}
              alt="Instagram"
            />
            <Box>
              <Typography color={main} fontWeight="500">
                Instagram
              </Typography>
              <Typography color={medium}>Social Media</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween> */}
      </Box>

      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Users
        </Typography>

        {users.map((use) => {
          if (use._id !== _id && use._id != logUser._id) {
            return (
              <FlexBetween gap="1rem" mb="0.5rem" key={use._id}>
                <FlexBetween gap="1rem">

                  <UserImage image={use?.picturePath} size="55px" />
                  <Box>
                    <Typography color={main} fontWeight="500">
                      {use?.firstName} {use?.lastName}
                    </Typography>
                    <Typography color={medium}>{use?.occupation}</Typography>
                  </Box>
                </FlexBetween>


                <IconButton
                  onClick={() => patchFriend(use._id)}
                  sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
                >
                  {friends?.some(item => item._id === use._id) ? (
                    <PersonRemoveOutlined sx={{ color: primaryDark }} />
                  ) : (
                    <PersonAddOutlined sx={{ color: primaryDark }} />
                  )}
                </IconButton>
              </FlexBetween>
            );
          }
          return null;
        })}


      </Box>


      {/* Status Modal */}
      <Modal
        open={openStatusModal}
        onClose={handleCloseStatusModal}
        aria-labelledby="modal-status-title"
        aria-describedby="modal-status-description"
      >
        <Box sx={{ p: 2 }}>
          <StatusForm
            userId={userId}
            handleClose={handleCloseStatusModal}
            setChange={setChange}
          />
        </Box>
      </Modal>
    </WidgetWrapper>
  );
};

export default UserWidget;
