const Todo = require("../Model/Todo");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const product = require("../Model/product");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
// const getTodos = (req, res) => {
//   Todo.find(async (err, todos) => {
//     const products = await product.find({user_id : req.params.user_id});
//     if (err) {
//       res.send(err);
//     }
//     let user = { ...todos[0]._doc, products };
//     res.json({ user });
//   });
// };
const getTodos = async (req, res) => {
  try {
    const userWithProducts = await Todo.aggregate([
      {
        $match: {
          _id: ObjectId(req.params.user_id),
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "user_id",
          as: "product",
        },
      },
    ]);

    if (!userWithProducts || userWithProducts.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user: userWithProducts[0] });
  } catch (error) {
    console.error("Error fetching user with products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// const createTodo = (req, res) => {
//   const todo = new Todo({
//     Name: req.body.Name,
//     Email: req.body.Email,
//     Birthdate: req.body.Birthdate,
//     Password : req.body.Password
//   });

//   todo.save((err, todo) => {
//     if (err) {
//       res.send(err);
//     }
//     res.json(todo);
//   });
// };
const createTodo = async (req, res) => {
  const { Name, Email, Birthdate, Password } = req.body;
  if (!Name || !Email || !Birthdate || !Password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Please Provide Required Information",
    });
  }

  const hash_password = await bcrypt.hash(Password, 10);

  const userData = {
    Name,
    Email,
    Birthdate,
    hash_password,
  };

  await Todo.findOne({ Email }).then((item) => {
    if (item !== null) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "User already registered",
      });
    } else {
      const todo = new Todo({
        Name: req.body.Name,
        Email: req.body.Email,
        Birthdate: req.body.Birthdate,
        Password: hash_password,
      });

      todo.save((err, todo) => {
        if (err) {
          res.send(err);
        }
        res.json({ message: "Succcessfully added", todo });
      });
    }
  });
};
const updateTodo = (req, res) => {
  Todo.findOneAndUpdate(
    { _id: req.params.todoID },
    {
      Name: req.body.Name,
    },
    { new: true },
    (err, Todo) => {
      if (err) {
        res.send(err);
      } else res.json(Todo);
    }
  );
};
const deleteTodo = (req, res) => {
  Todo.deleteOne({ _id: req.params.todoID })
    .then(() => res.json({ message: "Todo Deleted" }))
    .catch((err) => res.send(err));
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
