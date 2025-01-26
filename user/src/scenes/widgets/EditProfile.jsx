import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { useTheme, InputBase, Typography } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "rgba(1, 1, 1, 0.001)", // Almost transparent
  border: "2px solid #FFFF",
  boxShadow: 24,
  p: 4,
  borderRadius: "20px", // Rounded edges
  
};

export default function MediaCard({
  setUser,
  user,
  handleClose,
  state,
  setState,
}) {
  const token = useSelector((state) => state.token);
  const { palette } = useTheme();
  const [updated, setUpdated] = React.useState(user);
  const [updatedProfile, setUpdatedProfile] = React.useState(null);
  const navigate = useNavigate();

  const handleFileUpload = (event) => {
    // Handle file upload logic here
    console.log("File uploaded:", event.target.files[0]);
    setUpdatedProfile(event.target.files[0]);
  };
  const handleProfile = (e) => {
    setUpdated({ ...updated, [e.target.name]: e.target.value });
    console.log(updated);
  };
  const update = async () => {
    const data = new FormData();
    data.append("firstName", updated.firstName);
    data.append("lastName", updated.lastName);
    data.append("email", updated.email);
    data.append("picturePath", updatedProfile);
    data.append("linkedin", updated.linkedin);
    data.append("twitter", updated.twitter);

    axios
      .put(`http://localhost:3001/users/updateUser/${updated?._id}`, data)
      .then(async (response) => {
        console.log(response.data);
        if (response.data.success == true) {
          setState(!state);
          await handleClose();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Card sx={style}>
      <CardContent>
        <FlexBetween gap="5rem">
          <InputBase
            name="firstName"
            onChange={handleProfile}
            value={updated?.firstName}
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "2rem",
              padding: "1rem 2rem",
              marginTop: "1px",
            }}
          />
        </FlexBetween>
        <FlexBetween gap="20rem">
          <InputBase
            name="lastName"
            onChange={handleProfile}
            value={updated?.lastName}
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "2rem",
              padding: "1rem 2rem",
              marginTop: "50px",
            }}
          />
        </FlexBetween>
        <FlexBetween gap="20rem">
          <InputBase
            name="email"
            placeholder="Email"
            onChange={handleProfile}
            value={updated?.email}
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "2rem",
              padding: "1rem 2rem",
              marginTop: "50px",
            }}
          />
        </FlexBetween>
        <FlexBetween gap="20rem">
          <InputBase
            name="twitter"
            placeholder="Twitter Link"
            onChange={handleProfile}
            value={updated?.twitter}
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "2rem",
              padding: "1rem 2rem",
              marginTop: "50px",
            }}
          />
        </FlexBetween>
        <FlexBetween gap="20rem">
          <InputBase
            name="linkedin"
            placeholder="Linkedin Link"
            onChange={handleProfile}
            value={updated?.linkedin}
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "2rem",
              padding: "1rem 2rem",
              marginTop: "50px",
            }}
          />
        </FlexBetween>
        <FlexBetween gap="20rem" alignItems="center" sx={{ marginTop: "30px" }}>
          <label htmlFor="file-upload">
            <input
              id="file-upload"
              type="file"
              style={{ display: "none" }}
              onChange={handleFileUpload}
            />
            <Button
              variant="contained"
              component="span"
              startIcon={<CloudUploadIcon />}
              sx={{
                borderRadius: "2rem",
                padding: "0.5rem 2rem",
                backgroundColor: "gray",
                color: palette.common.white,
              }}
            >
              Upload Profile Picture
            </Button>
          </label>
          <Typography variant="body2" color="textSecondary"></Typography>
        </FlexBetween>
        <FlexBetween style={{ marginTop: "30px" }} gap="10rem">
          <Button
            onClick={handleClose}
            fullWidth
            variant="contained"
            color="error"
          >
            Cancel
          </Button>
          <Button
            onClick={update}
            fullWidth
            variant="contained"
            color="primary"
          >
            Update
          </Button>
        </FlexBetween>
      </CardContent>
    </Card>
  );
}
