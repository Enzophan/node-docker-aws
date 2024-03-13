const express = require("express");
const {
  findAllUsers,
  registerUser,
  loginUser,
  currentUser,
  getUserById,
  deleteUser
} = require("../Controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.get("/", findAllUsers);

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", validateToken, currentUser);

router.get('/:id', getUserById)

router.delete('/:id', deleteUser)


module.exports = router;