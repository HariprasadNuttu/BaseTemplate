import { Request } from 'express';
export interface IDynamicObj  {
    [key: string]: any
}



export function  safeQuery<T extends string>(q: Request): { [k in T]: string } {
    return q.query as any;
}