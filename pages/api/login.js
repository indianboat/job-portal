import argon2i from "argon2";
import connectDB from "../../middleware/db";
import User from "../../models/user";
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
  if (req.method == "POST") {
    const { email, password } = req.body;

    try {
      const userExist = await User.findOne({ email });

      if (!userExist) {
        res.status(400).json({ message: "User not found!" });
      } else {
        const matchPassword = await argon2i.verify(userExist.password,password);
        
        if (!matchPassword) {
          res.status(400).json({ message: "Invalid Credentials" });
        } else {
          const token = jwt.sign({id: userExist._id, email:userExist.email, name:userExist.name}, process.env.TOKEN_KEY, {expiresIn:"1h"});
          res.status(200).json({ message: "Login success", token });
        }
      }
    } catch (error) {
      res.status(422).json({ message: error });
    }
  }
};

export default connectDB(handler);