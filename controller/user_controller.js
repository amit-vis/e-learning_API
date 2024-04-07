const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cloudinary = require('../config/cloudinary')
require('dotenv').config();
const {RegistartionNoty} = require('../config/mailers');
const {errorHandler} = require('../config/errorHandler')

// get the user details
module.exports.view = async (req, res, next)=>{
    try {
        const getUserData = await User.findByPk(req.params.id,{
            attributes: {exclude: ['password']}
        });
        if(!getUserData){
            throw new errorHandler("User does not Exist!!", 400)
        }

        return res.status(200).json({
            message: "User Profile Details!!",
            success: true,
            user: getUserData
        })
    } catch (error) {
        next(error)
    }
}

// Register the new User
module.exports.create = async (req, res, next)=>{
    try {
        const {email, firstName, lastName, password, isSuperadmin} = req.body;
        if(!firstName || !lastName || !email || !password){
            throw new errorHandler("Missing Required fields in the request body!!", 401)
        }
        const existingUser = await User.findOne({where:{
            email: email
        }})

        if(existingUser){
            throw new errorHandler("User Already Exist!!", 400)
        }
        if(password.length<6){
            throw new errorHandler("password length must be 6 charcter!!", 403)
        }

        const hashedpassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedpassword,
            isSuperadmin: isSuperadmin
        })
        await newUser.save();
        await RegistartionNoty(firstName, email);
        return res.status(200).json({
            message: "User Registered Successfully!!",
            success: true,
            user: newUser
        })
    } catch (error) {
        next(error)
    }
}

// login the user to get token
module.exports.login = async (req, res, next)=>{
    try {
        const {email, password} = req.body;
        if(!email || !password){
            throw new errorHandler("Email or Password required for logged In", 400);
        }
        const user = await User.findOne({where:{email: email}});
        if(!user || !(await bcrypt.compare(password, user.password))){
            throw new errorHandler("Invalid email or password!!", 401);
        }
        return res.status(200).json({
            message: "LoggedIn SuccessFully!!",
            success: true,
            data:{
                token: jwt.sign(user.toJSON(), process.env.SECRET_KEY, {expiresIn: '1h'})
            }
        })
    } catch (error) {
        next(error)
    }
}

module.exports.update = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            throw new errorHandler("User Not Found or does not exist!!", 401);
        }

        if (req.body.email && req.body.email !== user.email) {
            const existingUser = await User.findOne({ where: { email: req.body.email } });
            if (existingUser) {
                throw new errorHandler("This Email is already exist!!", 400);
            }
        }

        const file = req.files.file;
        cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
            if (err) {
                next(err)
            }

            user.firstName = req.body.firstName || user.firstName;
            user.lastName = req.body.lastName || user.lastName;
            user.email = req.body.email || user.email
            user.avatar = result.secure_url || user.avatar

            await user.save();

            return res.status(200).json({
                message: "Details updated successfully!!",
                success: true,
                user
            });
        });

    } catch (error) {
        next(error)
    }
}