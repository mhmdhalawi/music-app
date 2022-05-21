export const loginSchema = {
  email: 'required|email',
  password: 'required|min:8',
};

export const registerSchema = {
  name: 'required|alpha_spaces|min:3',
  email: 'required|email',
  age: 'required|numeric|between:18,100',
  password: 'required|min:8',
  password_confirm: 'required|confirmed:@password',
  country: 'required',
  tos: 'required',
};
