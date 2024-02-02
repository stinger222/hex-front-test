export interface ILoginFormData {
  username: string,
  password: string
}

export interface IRegisterFormData extends ILoginFormData {
  confirmPassword: string
}