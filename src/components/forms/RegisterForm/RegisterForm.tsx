import { SubmitHandler, useForm } from "react-hook-form"
import { IRegisterFormData } from "../../../types/forms"
import { useAppDispatch } from "../../../hooks/store"
import { register } from "../../../store/authSlice"
import FormErrorMessage from "../../shared/FormErrorMessage/FormErrorMessage"
import Input from "../../shared/Input/Input"
import {
  confirmPasswordValidationRules,
  passwordValidationRules,
  usernameValidationRules
} from "../../../constants/validation"
import Button from "../../shared/Button/Button"

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

      <Input
        control={control}
        name="username"
        placeholder="Username"
        rules={usernameValidationRules}
      />

      <Input
        control={control}
        name="password"
        type="password"
        placeholder="Password"
        rules={passwordValidationRules}
        />

      <Input
        control={control}
        name="confirmPassword"
        type="password"
        placeholder="Confirm"
        rules={confirmPasswordValidationRules}
      />

      <Button className="mt-3 md:mt-5" type="submit">Submit</Button>
		</form>
	)
}

export default RegisterForm
