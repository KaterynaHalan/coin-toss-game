import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/user.js";
import tokensGet from "../tokens/tokens-get.js";

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User Does Not Exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const token = jwt.sign(
      {
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        password: existingUser.password,
      },
      "test",
      { expiresIn: "1h" }
    );

    const tokens = await tokensGet({ userId: existingUser._id });

    if (tokens?.message) {
      return res.status(400).json({ message: tokens.message });
    }

    res.status(200).json({ token, tokens });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default login;