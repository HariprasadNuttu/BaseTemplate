export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  salt: string;
}

export interface IUserInputDTO {
  email: string;
  password: string;
  firstName: string,
  lastName: string
}
