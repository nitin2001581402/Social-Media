import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  updateUser,
  Get,
  Delete,
  updateStatus
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";
import multer from "multer";

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// Storage configuration for media files
const storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/status");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload2 = multer({ storage: storage2 });

/* READ */

router.get("/get", Get)
router.get("/get/:id", Get)

router.patch("/:id/status", upload2.single("media"), updateStatus)

router.get("/:id", verifyToken, getUser);
router.put("/updateUser/:id", upload.single("picturePath"), updateUser);
router.get("/:id/friends", verifyToken, getUserFriends);


router.delete("/delete/:id", Delete)

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
