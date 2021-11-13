import { IDynamicObj } from '@/interfaces/IGlobal';
import * as UserDal from '../dal/user'

export const create =async (payload: IDynamicObj)=>{
    const { email } = payload;
    const emailExists = await UserDal.checkUserExists(email)
    if(emailExists){

    }else{
        return UserDal.create(payload)
    }
    

}
export const profile =async (payload:IDynamicObj)=>{
    const user = await UserDal.get(payload.id);
    return user ;
}   