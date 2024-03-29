
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    
  },
  profileImage: { 
    type: String,
  },
  mobileNumber: {
    type: String,
    required: true,
  
  },
  name: {
    type: String,
  },
  college: {
    type: String,
  },
  year: {
   type: String,
  },
  branch: {
    type: String,
  },
  bio: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  files: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
    },
  ],
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  connections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  pendingConnections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  sentConnections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
   createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
