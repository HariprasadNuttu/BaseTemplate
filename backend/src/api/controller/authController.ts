import { Request, Response , NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import passport from "passport"
import { CreateUserDTO } from "../dto/user.dto";
import * as UserService from '../../services/userService'
import LoggerInstance from "@/loaders/logger";
import { computePasswordHash , generateRandomString } from "../utils/auth";
export const login = async (req: Request, res: Response,next: NextFunction)=>{
  passport.authenticate('local', function (err, user, info) {
    const { JWT_AUDIENCE, JWT_EXPIRES_IN, JWT_ISSUER, JWT_SECRET } = process.env;
    // no async/await because passport works only with callback ..
    if (err) {
      res.status(200).json({ success: false, message: err })
      return next(err)
    }
    if (!user) {
      return res.status(401).json({ status: 'error', code: 'unauthorized' })
    } else {
      const jwtToken = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        JWT_SECRET,
        {
          issuer: JWT_ISSUER,
          audience: JWT_AUDIENCE,
          expiresIn: JWT_EXPIRES_IN,
        }
      );
      res.status(200);
  
      return (
        res
          .cookie("jwt", jwtToken, { httpOnly: true })
          .json({
            success: true,
            message: "User loggedin Successfully",
            data: {
              name: user.name,
              email: user.email,
              role: user.role,
            },
          })
      );
    }
  })(req, res, next);
}

export const signUp = async (req: Request, res: Response,next: NextFunction)=>{
    
    try {
      const payload:CreateUserDTO = req.body
      // const salt = generateRandomString(process.env.SALT_LENGTH);
      // const { passwordHash } = computePasswordHash(payload.password, salt);
      // let payloadObj = { ...payload, password: passwordHash};
      const result = await UserService.create(payload)
      return res.status(200).send(result) 
    } catch (e) {
      LoggerInstance.error('🔥 error: %o', e);
      return next(e);
    }

}