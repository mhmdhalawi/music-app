export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister extends ILogin {
  name: string;
  age: number;
  country: string;
  tos: boolean;
  password_confirm: string;
}
