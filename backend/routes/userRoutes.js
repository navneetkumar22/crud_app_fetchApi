 // url paths

const express = require("express");
const { home, createUser, getUsers, editUser, deleteUser } = require("../controllers/userControllers");
const router = express.Router();

router.get("/", home);
router.post("/create", createUser);
router.get("/getUsers", getUsers);
router.put("/editUser", editUser);
router.delete("/deleteUser/:id", deleteUser);


module.exports = router;