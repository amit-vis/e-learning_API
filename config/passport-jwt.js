const passport = require('passport');
const JWTStratergy = require('passport-jwt').Strategy;
const JWTExtract = require('passport-jwt').ExtractJwt;
const User = require('../model/user')
require('dotenv').config()

const opts={
    jwtFromRequest: JWTExtract.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
}

// jwt authentication for user
passport.use('user-jwt',new JWTStratergy(opts, async (jwt_payload, done)=>{
    try {
        const user = await User.findOne({where:{
            id: jwt_payload.id,
            isSuperadmin: false
        }});
        if(user){
            return done(null, user)
        }else{
            return done(null, false)
        }
    } catch (error) {
        console.log("Internal server error in creating authentication!!", error);
        return done(null, error)
    }
}));

module.exports = passport;