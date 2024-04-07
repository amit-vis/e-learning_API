const passport = require('passport');
const JWTStratergy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../model/user');
require('dotenv').config();

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
}

// jwt authentication for admin
passport.use('admin-jwt', new JWTStratergy(opts, async (jwt_payload, done)=>{
    try {
        const user = await User.findOne({where:{
            id: jwt_payload.id,
            isSuperadmin: true
        }});
        if(user){
            return done(null, user)
        }else{
            return done(null, false)
        }
    } catch (error) {
        console.log("Error in authentication in super admin", error);
        return done(error, false)
    }
}));

module.exports = passport;