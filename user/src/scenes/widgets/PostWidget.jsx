import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, TextField, Typography, useTheme, Menu, MenuItem } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import Friend2 from "components/Friend2";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    if (newComment.trim()) {
      const response = await fetch(`http://localhost:3001/posts/${postId}/comment`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId, comment: newComment }),
      });
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
      setNewComment("");  // Clear the input field
    }
  };

  const handleShareClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleShareClose = () => {
    setAnchorEl(null);
  };

  const handleShare = (platform) => {
    const postUrl = `http://localhost:3001/posts/${postId}`;
    let shareUrl = '';

    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(description + ' ' + postUrl)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(description)}&url=${encodeURIComponent(postUrl)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, '_blank');
    handleShareClose();
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend2
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />

      {picturePath && (
        <img
          style={{ padding: "10px", objectFit: "cover" }}
          width="100%"
          height="auto"
          alt="post"
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton onClick={handleShareClick}>
          <ShareOutlined />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleShareClose}
        >
          <MenuItem onClick={() => handleShare('whatsapp')}>Share on WhatsApp</MenuItem>
          <MenuItem onClick={() => handleShare('twitter')}>Share on Twitter</MenuItem>
          <MenuItem onClick={() => handleShare('facebook')}>Share on Facebook</MenuItem>
        </Menu>
      </FlexBetween>
      {isComments && (
        <>
          <Box mt="0.5rem">
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Add a comment"
              value={newComment}
              onChange={handleCommentChange}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleCommentSubmit();
                }
              }}
            />
            <Box mt="0.5rem">
              {comments.length > 0 && (
                <Box sx={{ maxHeight: '200px', overflowY: 'auto' }}>
                  {comments.map((comment, i) => (
                    <Box key={`${name}-${i}`}>
                      <Divider />
                      <Box sx={{ m: "0.5rem 0", pl: "1rem" }}>
                        <Typography sx={{ color: main }}>
                          {comment?.comment}
                        </Typography>
                        <Typography sx={{ color: main, textAlign: "right", mt: "0.5rem" }}>
                          - {comment?.userId?.firstName} {comment?.userId?.lastName}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                  <Divider />
                </Box>
              )}
            </Box>


          </Box>
        </>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
