import argon2i from "argon2";
import connectDB from "../../middleware/db";
import User from "../../models/user";

const handler = async (req, res) => {
  if (req.method == "POST") {
    const { name, email, mobile, password } = req.body;

    try {
      const userExist = await User.findOne({ email });

      if (userExist) {
        res.status(400).json({ message: "User already exists !" });
      } else {
        const passHash = await argon2i.hash(password)
        const result = new User({ name, email, mobile, password: passHash });
        const data = await result.save();

        if (data) {
          res.status(201).json({ message: "Sign up Success" });
        } else {
          res.status(500).json({ message: "Server Error, try again later" });
        }
      }
    } catch (error) {
      res.status(422).json({ message: error.toString() });
    }
  }
};

export default connectDB(handler);