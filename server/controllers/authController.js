const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Đăng ký
exports.register = async(req, res) =>
  {
  const {
    userName,
    password,
  } = req.body;
  try
    {
    const userExists = await User.findOne({userName});
    if (userExists)
      return res.status(400).json({message: "User already exists"});

    const user = new User({
      userName,
      password,
    });
    await user.save();
    res.status(201).json({message: "User registered successfully"});
    }
  catch (err)
    {
    console.log(err);
    res.status(500).json({error: err._message});
    }
  };

// Đăng nhập
exports.login = async(req, res) =>
  {
  const {
    username,
    password,
  } = req.body;
  try
    {
    const user = await User.findOne({username});
    if ( !user || !(await user.matchPassword(password)))
      {
      return res.status(401).json({message: "Invalid credentials"});
      }
    const token = jwt.sign({id: user._id}, "your_secret_key", {
      expiresIn: "1h",
    });
    console.log(user);
    res.status(200).
    json({
      token,
      userName: user.userName,
    });
    }
  catch (err)
    {
    res.status(500).json({error: "Failed to login"});
    }
  };

exports.check = async(req, res) =>
  {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "your_secret_key");
  const user = await User.findById(decoded.id);
  res.status(200).json({user});
  };
