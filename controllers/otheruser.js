const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const cloudinary = require("cloudinary").v2;
const User = require('../models/user');
const Post = require('../models/userpost');
const app = express();
const cors = require('cors');
app.use(cors());

cloudinary.config({
  cloud_name: "dar4ws6v6",
  api_key: "131471632671278",
  api_secret: "d0UW2ogmMnEEMcNVcDpzG33HKkY",
});

const multer = require('multer');

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb('invalid image file!', false);
  }
};
const uploads = multer({ storage, fileFilter });



router.use(authMiddleware);

router.get('/fetch-user', async (req, res) => {
  try {
    const userId = req.userId; 
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get("/profile/posts", async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found.");
    }
  
    const Posts = await Post.find({ createdBy: userId })
      .sort({ createdAt: -1 })
      .populate("createdBy");
    res.json(Posts);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.get('/fetch-user-connections', async (req, res) => {
  try {
    const userId = req.userId; 
    const userProfile = await User.findById(userId)
      .populate("pendingConnections")
      .populate("connections");
    if (!userProfile) {
      return res.status(404).json({ error: 'User not found' });
    }

    const connectedUserIds = userProfile.connections;
    const connectedUsers = await User.find({ _id: { $in: connectedUserIds } });
    const pendingConnectionUsersIds = userProfile.pendingConnections;
    const pendingConnectionUsers = await User.find({ _id: { $in: pendingConnectionUsersIds }});
    res.json({ connectedUsers, pendingConnectionUsers });
  } catch (error) {
    console.error('Error fetching con nections:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;