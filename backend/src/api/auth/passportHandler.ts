import passportConfig from "passport";
import * as passportLocal from "passport-local";
import { Strategy } from 'passport-jwt';
import { Request } from "express";
import * as UserDal from '../../dal/user'
import { computePasswordHash,generateRandomString } from "../utils/auth";

const { JWT_SECRET, JWT_AUDIENCE,JWT_ISSUER } = process.env;

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = Strategy;

passportConfig.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        if (!email || !password) {
            return done(new Error())
        }
        if (email.trim().length < 1 || password.trim().length < 1) {
            return done(new Error())
        }
        const user = await UserDal.authenticateUser(email, password);
        if (user) {
            return done(null, user);
        } else {
            return done('Incorrect email or password.', false);
        }
           

    } catch (error) {
        console.log(error)
        return done(error)
    }
}))


const cookieExtractor = (req:Request):string => {
    let token = null;
    const { cookies } = req as any;
    // const { jwt } = cookies as any;
    if (req && cookies) token = cookies.jwt

    return token
}


const opts:any = {}
opts.jwtFromRequest = cookieExtractor
opts.secretOrKey = JWT_SECRET
opts.issuer = JWT_ISSUER
opts.audience = JWT_AUDIENCE


passportConfig.use(new JwtStrategy(opts, async (jwtPayload, done) => {
    try {
console.log("Userd Details",jwtPayload)
        const user = await UserDal.get(jwtPayload.id);
        if (user) {
            return done(null, user)
        }
        return done(new Error())

        // done(null, user)
    } catch (error) {
        done(error, false)
    }
}))

export default passportConfig;