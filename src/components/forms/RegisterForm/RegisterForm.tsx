import { SubmitHandler, useForm } from "react-hook-form"
import { IRegisterFormData } from "../../../types/forms"
import { useAppDispatch } from "../../../hooks/store"
import { register } from "../../../store/authSlice"
import FormErrorMessage from "../../shared/FormErrorMessage"
import Input from "../../shared/Input/Input"
import {
  confirmPasswordValidationRules,
  passwordValidationRules,
  usernameValidationRules
} from "../../../constants/validation"

const RegisterForm = () => {
  const dispatch = useAppDispatch()
  const { handleSubmit, formState, setError, control } = useForm<IRegisterFormData>({
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: ""
    },
    mode: "onSubmit"
  })

  const onSubmit: SubmitHandler<IRegisterFormData> = (values) => {
    if (values.password !== values.confirmPassword) {
      return setError("root", { message: "Passwords doesn't match!" })
    }

    dispatch(register(values))
  }

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="mb-8 text-blue-300 md:text-3xl">Registration</h1>
      
      <FormErrorMessage errors={formState.errors}/>

      <Input control={control} name="username" placeholder="Username" rules={usernameValidationRules}/>
      <Input control={control} name="password" placeholder="Password" rules={passwordValidationRules}/>
      <Input control={control} name="confirmPassword" placeholder="Confirm" rules={confirmPasswordValidationRules} />

      <button className="mt-3 md:mt-5" type="submit">Submit</button>
		</form>
	)
}

export default RegisterForm
