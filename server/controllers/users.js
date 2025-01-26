import User from "../models/User.js";
import multer from 'multer';

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const media = req.file ? req.file.filename : null; // Ensure media is correctly assigned

    const userDetails = await User.findById(id);
    if (!userDetails) {
      return res.status(404).json({ message: "User not found" });
    }

    userDetails.status.push({ media, date: new Date() }); // Add date if needed

    await userDetails.save();
    res.status(200).json(userDetails);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const updateUser = async (req, res) => {
  let user = await User.findById(req.params.id);
  console.log(user);
  if (!user) {
    console.log("User not found with this ID!");
    res.json({ message: "User not found with '" + req.params.id + "' ID!" });
  } else {
    const { firstName, lastName, email,linkedin,twitter } = req.body;
    const picturePath = req.file?.filename;
    console.log(picturePath);
    let updateUser = {};
    if (firstName) {
      updateUser.firstName = firstName;
    }
    if (lastName) {
      updateUser.lastName = lastName;
    }
    if (email) {
      updateUser.email = email;
    }
    if (linkedin) {
      updateUser.linkedin = linkedin;
    }
    if (twitter) {
      updateUser.twitter = twitter;
    }
    if (picturePath) {
      updateUser.picturePath = picturePath;
    }
    user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateUser },
      { new: true }
    );
    console.log("user info updated successfully");
    res.json({
      success: true,
      message: "User info updated successfully",
      data: user,
    });
  }
};



export const Get = async (req, res) => {
  try {
    if (req.params.id) {
      const user = await User.findById(req.params.id);
      res.json({ success: true, user })
    }
    else {
      const users = await User.find();
      res.json({ success: true, users })
    }

  }
  catch (err) {
    console.log("error:" + err.message)
    res.status(500).send("Internal server error")
  }

}

export const Delete = async (req, res) => {
  try {
    const id = req.params.id
    // console.log(id)
    const check = await User.findById(id);
    if (!check) {
      return res.json({ success: false, message: "not found" })
    }
    else {
      const user = await User.findByIdAndDelete(id)
      return res.json({ success: true, user })
    }

    // res.json({success:true,check})
  }
  catch (err) {
    console.log("error:" + err.message)
    res.status(500).send("Internal server error")
  }
}