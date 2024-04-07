const Token = require('../model/token');
const User = require('../model/user');
const crypto = require('crypto');
const {resetPassword} = require('../config/mailers');
const bcrypt = require('bcrypt');
const {errorHandler} = require('../config/errorHandler')


module.exports.create = async (req, res, next)=>{
    try {
        const findUser = await User.findByPk(req.params.id);
        if(!findUser){
            throw new errorHandler("User does not exist or not found!!", 400)
        }
        let newToken = crypto.randomBytes(20).toString('hex');
        const createToken = await Token.create({
            email: findUser.email,
            token: newToken,
            isValid: true
        })
        await createToken.save();
        await resetPassword(findUser.firstName, findUser.email, newToken);
        return res.status(200).json({
            message: "Check your mail!!",
            success: true
        })
    } catch (error) {
        next(error)
    }
}

module.exports.updatePassword = async (req, res, next)=>{
    try {
        const getToken = await Token.findOne({where:{token: req.body.token}});
        if(!getToken){
            throw new errorHandler("Token does not exist or not found!!", 400)
        }

        if(getToken.isValid === false){
            throw new errorHandler("Token has been expired!!", 403)
        }

        const user = await User.findOne({where:{email: getToken.email}})
        const password = req.body.password;
        const cpassword = req.body.cpassword;
        if(password !== cpassword){
            throw new errorHandler("Password does not matched!!", 401)
        }

        const hashedpassword = await bcrypt.hash(password, 10);
        user.password = hashedpassword;
        getToken.isValid = false;
        await user.save();
        await getToken.save()
        return res.status(200).json({
            message: "Password update successfully!!",
            success: true,
            user: user,
            token: getToken
        })
    } catch (error) {
        next(error)
    }
}