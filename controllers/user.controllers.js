const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const user = new User({ username, email, password });
    await user.save();

    const token = jwt.sign({ id: user._id }, "secretkey");
    res.json({ token, user: { id: user._id, username, email } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "User not found" });

      const isMatch = await user.matchPassword(password);
      if (!isMatch)
        return res.status(400).json({ message: "Invalid credentials" });

      const token = jwt.sign({ id: user._id }, "secretkey");
      res.json({
        token,
        user: { id: user._id, username: user.username, email },
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
};
