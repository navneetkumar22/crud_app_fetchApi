//here we write all business logics

const User = require("../models/userModels");

//Home routes
exports.home = (req, res) => {
    res.sendFile(__dirname + "/index.html")
};

//Creating a user route
exports.createUser = async (req, res) => {
    try {
        const { name, email } = req.body;

        //validate the entry
        if (!name || !email) {
            throw new Error("Name and Email are required")
        }

        //check if user is already exists
        const userExists = await User.findOne({email});
        if (userExists) {
            throw new Error("User is already exists");
        }

        //inserting into database
        const user = await User.create({ name, email });
        res.status(200).json({
            success: true,
            message: "User created successfully",
            user
        });
    } catch (error) {
        console.log(error);
    }
};

//Getting all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            users
        });

    } catch (error) {
        console.log(error);
    }
};

//Edit a user
exports.editUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.body, req.body);
        res.status(200).json({
            success: true,
            message: "User updated successfully"
        });

    } catch (error) {
        console.log(error);
    }
};

//Delete a user
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        })
    } catch (error) {
        console.log(error);
    }
}