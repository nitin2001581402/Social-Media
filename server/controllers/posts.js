import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */

export const getFeedPosts = async (req, res) => {
  try {
    // Find all posts and populate the userId in comments
    const posts = await Post.find().populate('comments.userId', 'firstName lastName'); // Only populate necessary fields like name
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const commentPosts = async (req, res) => {
  try {
    const { id } = req.params; // Post ID from the request parameters
    const { userId, comment } = req.body; // User ID and comment from the request body

    // Find the post by its ID
    const post = await Post.findById(id);

    // Add the new comment to the post's comments array
    post.comments.push({ userId, comment });

    // Save the updated post
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { comments: post.comments },
      { new: true }
    );
    // Return the updated post in the response
    res.status(200).json(updatedPost);
  } catch (err) {
    // Handle errors and send a 404 response with the error message
    res.status(404).json({ message: err.message });
  }
};



export const Get = async (req, res) => {
  try {
    if (req.params.id) {
      const posts = await Post.findById(req.params.id).populate('comments.userId', 'firstName lastName');;
      res.json({ success: true, posts })
    }
    else {
      const posts = await Post.find().populate('comments.userId', 'firstName lastName');;
      res.json({ success: true, posts })
    }

  }
  catch (err) {
    console.log("error:" + err.message)
    res.status(500).send("Internal server error")
  }

}

export const countPostsByDayOfWeek = async (req, res) => {
  try {
    const postCounts = await Post.aggregate([
      {
        $addFields: {
          dayOfWeek: { $dayOfWeek: "$createdAt" }
        }
      },
      {
        $group: {
          _id: "$dayOfWeek",
          postsCount: { $sum: 1 }, // Count of posts
          commentsCount: { $sum: { $size: "$comments" } }, // Count of comments
          likesCount: { $sum: { $size: { $objectToArray: "$likes" } } } // Count of likes
        }
      },
      {
        $sort: { _id: 1 } // Sort by day of the week (Sunday = 1, Monday = 2, ..., Saturday = 7)
      }
    ]);

    // Convert the numeric day of the week to a string (e.g., 1 -> Sunday)
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const results = postCounts.map(dayData => ({
      day: dayNames[dayData._id - 1], // Convert dayOfWeek number to day name
      postsCount: dayData.postsCount,
      commentsCount: dayData.commentsCount,
      likesCount: dayData.likesCount
    }));

    console.log(results);
    res.json({ success: true, results });
  } catch (err) {
    console.log("error:" + err.message);
    res.status(500).send("Internal server error");
  }
}

export const Count = async (req, res) => {
  try {
    // Count total number of users
    const users = await User.countDocuments();

    // Count total number of posts
    const posts = await Post.countDocuments();

    // Fetch all posts to count total comments and likes
    const allPosts = await Post.find();

    // Calculate total comments
    const totalComments = allPosts.reduce((acc, post) => acc + post.comments.length, 0);

    // Calculate total likes (assuming likes are stored as an array of user IDs in the post schema)
    const totalLikes = allPosts.reduce((acc, post) => acc + Object.keys(post.likes).length, 0);

    res.json({
      success: true,
      users,
      posts,
      totalComments,
      totalLikes,
    });
  } catch (err) {
    console.log("error:" + err.message);
    res.status(500).send("Internal server error");
  }
};


export const UpdateStatus = async (req, res) => {
  try {
    const { message } = req.body

    const posts = await Post.findById(req.params.id).populate('comments.userId', 'firstName lastName');
    res.json({ success: true, posts })
  }
  catch (err) {
    console.log("error:" + err.message)
    res.status(500).send("Internal server error")
  }
}

export const Delete = async (req, res) => {
  try {
    const posts = await Post.findByIdAndDelete(req.params.id);
    if (posts) {
      res.json({ success: true, posts })
    }
    else {
      res.json({ success: false, message: "not found" })
    }
  }
  catch (err) {
    console.log("error:" + err.message)
    res.status(500).send("Internal server error")
  }
}
