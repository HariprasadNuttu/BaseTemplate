import { IDynamicObj } from '@/interfaces/IGlobal';
import db from '../models';
import { isEmpty } from 'lodash';
const { User } = db;

export const create = async (payload: IDynamicObj): Promise<Array<IDynamicObj>> => {
    const user = await User.create(payload);
    return user;
}

export const checkUserExists = async (email: any): Promise<boolean> => {
    const userWithEmail = await User.findOne({
        where: {
            email
        }
    });

    return !isEmpty(userWithEmail)
}

export const authenticateUser = async (email: any, password: any): Promise<boolean> => {
    const user = await User.findOne({
        where: {
            email,
            password
        }
    });

    return user;
}

export const get = async (id: Number): Promise<boolean> => {
    const user = await User.findOne({
        where: {
            id
        },
        attributes: ['id', 'email', 'first_name', 'last_name', 'role']
    });

    return user;
}
