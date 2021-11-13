import { IUser } from '@/interfaces/IUser';
import { IDynamicObj } from '@/interfaces/IGlobal';

declare global {
  namespace Express {
    export interface Request {
      currentUser: IUser,
      user: IUser
    }    
  }

 
}




declare global {
  namespace NodeJS
    {
      export interface ProcessEnv
        {
          // config: IConfig
        }
    }
  namespace Express {
    export interface Request {
      // user: IDynamicObj,
      query:IDynamicObj
    }    
  }


}

