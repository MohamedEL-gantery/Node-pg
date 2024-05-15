const express = require("express");
const User = require("../repos/user");

const router = express.Router();

router.post("/users", async (req, res) => {
  const { username, bio } = req.body;
  const newUser = await User.Create(username, bio);
  res.status(201).json({
    data: newUser,
  });
});

router.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.status(200).json({
    result: users.length,
    data: users,
  });
});

router.get("/user/:id", async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({
      message: "User not Found",
    });
  }

  res.status(200).json({
    data: user,
  });
});

router.put("/user/:id", async (req, res) => {
  const { id } = req.params;
  const { username, bio } = req.body;

  const user = await User.findByIdAndUpdate(username, bio, id);

  if (!user) {
    return res.status(404).json({
      message: "User not Found",
    });
  }

  res.status(200).json({
    data: user,
  });
});

router.delete("/user/:id", async (req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);

  if (!user) {
    return res.status(404).json({
      message: "User not Found",
    });
  }

  res.status(204).json({
    data: null,
  });
});

module.exports = router;
