const asyncHandler = require("express-async-handler");
const User = require("../model/User.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");


const usersController = {
  register: asyncHandler(async (req, res) => {


    const { username, email, password } = req.body
    // console.log(req.body)
    // validate
    if (!username || !email || !password) {
      throw new Error("Please all fields are required");
    }
    // ! check if user alreday exits
    const userExists = await User.findOne({ email })
    if (userExists) {
      throw new Error("User already exists")
    }
    // Hash The  user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)
    // create the user and save db
    const userCreated = await User.create({
      email,
      username,
      password: hashedPassword
    })
    // Send the response
    res.json({
      username: userCreated.username,
      email: userCreated.email,
      id: userCreated._id,


    })
    res.json({ message: "Register" })
  })
  ,
  login: asyncHandler(async (req, res) => {
    //! Get the user data
    const { email, password } = req.body;
    //!check if email is valid
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid login credentials");
    }
    //! Compare the user password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid login credentials");
    }
    //! Generate a token
    const token = jwt.sign({ id: user._id }, "masynctechKey", {
      expiresIn: "30d",
    });
    //!Send the response
    res.json({
      message: "Login Success",
      token,
      id: user._id,
      email: user.email,
      username: user.username,
    });
  }),
  //!profile
  profile: asyncHandler(async (req, res) => {
    //! Find the user
    console.log(req.user);
    const user = await User.findById(req.user);
    if (!user) {
      throw new Error("User not found");
    }
    //!Send the response
    res.json({ username: user.username, email: user.email });
  }),
  //! Change password
  // changeUserPassword: asyncHandler(async (req, res) => {
  //   const { newPassword } = req.body;
  //   //! Find the user
  //   const user = await User.findById(req.user);
  //   if (!user) {
  //     throw new Error("User not found");
  //   }
  //   //! Hash the new password before saving
  //   //!Hash the user password
  //   const salt = await bcrypt.genSalt(10);
  //   const hashedPassword = await bcrypt.hash(newPassword, salt);
  //   user.password = hashedPassword;
  //   //! ReSave
  //   await user.save({
  //     validateBeforeSave: false,
  //   });
  //   //!Send the response
  //   res.json({ message: "Password Changed successfully" });
  // }),
  changeUserPassword: asyncHandler(async (req, res) => {
  const { newPassword } = req.body;
  if (!newPassword || typeof newPassword !== "string") {
    return res.status(400).json({ message: "Password must be a string" });
  }

  const user = await User.findById(req.user);
  if (!user) throw new Error("User not found");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  user.password = hashedPassword;
  await user.save({ validateBeforeSave: false });

  res.json({ message: "Password Changed successfully" });
}),

  //! update user profile
  updateUserProfile: asyncHandler(async (req, res) => {
    const { email, username } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user,
      {
        username,
        email,
      },
      {
        new: true,
      }
    );
    res.json({ message: "User profile updated successfully", updatedUser });
  }),
}

module.exports = usersController