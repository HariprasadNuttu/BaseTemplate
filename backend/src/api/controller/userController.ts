import { Request, Response , NextFunction } from "express";
import * as UserService from '../../services/userService'

export const profileDetails = async (req: Request, res: Response,next: NextFunction)=>{    
    try {    
      const result = await UserService.profile(req.user)
      return res.status(200).send({
        success:true,
        data:result
      }) 

    } catch (e) {
      return next(e);
    }

}