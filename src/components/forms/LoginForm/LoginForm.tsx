import { Link } from "react-router-dom"
import { SubmitHandler, useForm } from "react-hook-form"
import { passwordValidationRules, usernameValidationRules } from "../../../constants/validation"
import { useAppDispatch } from "../../../hooks/store"
import { ILoginFormData } from "../../../types/forms"
import { authorize } from "../../../store/authSlice"
import Input from "../../shared/Input/Input"
import FormErrorMessage from "../../shared/FormErrorMessage/FormErrorMessage"
import Button from "../../shared/Button/Button"

const LoginForm = () => {
  const dispatch = useAppDispatch()
  const { handleSubmit, formState, control } = useForm<ILoginFormData>({
    defaultValues: {
      username: "",
      password: ""
    },
    mode: "onSubmit"
  })

  const onSubmit: SubmitHandler<ILoginFormData> = (values) => {
    dispatch(authorize(values))
  }

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="mb-8 text-blue-300 md:text-3xl">Log In</h1>
      
      <FormErrorMessage errors={formState.errors} />

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

      <Button className="my-3 md:my-4" type="submit">
        Submit
      </Button>

      <Link to="/register" className="text-sm font-normal md:text-base">No account yet?</Link>
		</form>
	)
}

export default LoginForm
