const bcrypt = require("bcrypt");
const Todo = require("../Model/Todo");
const { StatusCodes } = require("http-status-codes");
const Jwt = require("jsonwebtoken");
const jwtKey = "e-comm";

const Login = async (req, res) => {
  // try {
  //   console.log("try");
  //   const { Email, Password } = req.body;

  //   if (!Email || !Password) {
  //     return res.status(400).json({
  //       message: "Username or Password not present",
  //     });
  //   }
  //   console.log({ Email, Password });
  //   await Todo.findOne({ Email })
  //     .then(async(item) => {
  //       if (item !== null) {
  //         const isMatch = await bcrypt.compare(Password,item.Password)
  //         console.log("ismatch",isMatch)
  //         if (isMatch) {
  //           console.log("item", item);
  //           res.status(200).json(item);
  //         } else {
  //           res.status(200).json({ message: "Password is not valid" });
  //         }
  //       } else {
  //         console.log("invalid details");
  //         res.status(400).json({ message: "Invalid details" });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("err", err);
  //     });
  // } catch (error) {
  //   console.log("User data error ", error);
  //   res.status(400).json(error);
  // }

  const { Email, Password } = req.body;
  if (!Email || !Password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Please Provide Required Information",
    });
  }

  const user = await Todo.findOne({ Email });
  console.log("user", user);

  const isMatch = await bcrypt.compare(Password, user.Password);
  console.log("isMatch", isMatch);

  if (isMatch) {
    console.log("Success");
    res.status(200).json(user);
  } else {
    console.log("not valid");
    res.status(400).json({ message: "Invalid details" });
  }
};
module.exports = {
  Login,
};
