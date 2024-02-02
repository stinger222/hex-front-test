import { SubmitHandler, useForm } from "react-hook-form"
import { ILoginFormData } from "../../../types/forms"
import { passwordValidationRules, usernameValidationRules } from "../../../constants/validation"
import { Link } from "react-router-dom"
import FormErrorMessage from "../../shared/FormErrorMessage"

const LoginForm = () => {

  const { register, handleSubmit, formState } = useForm<ILoginFormData>({
    defaultValues: {
      username: "",
      password: ""
    }, mode: "onSubmit"
  })

  const onSubmit: SubmitHandler<ILoginFormData> = (values) => {
    console.log(values) // plug
  }

	return (
		<form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center p-3 w-96 border border-slate-200 rounded-md shadow-md"
    >
      <h1 className="mb-8 text-blue-300">Log In</h1>
      
      <FormErrorMessage errors={formState.errors} />

      <input {...register("username", usernameValidationRules)} placeholder="Username"/>
      <input {...register("password", passwordValidationRules)} placeholder="Password"/>
      <button className="my-2" type="submit">Submit</button>
      <Link to="/register" className="text-sm font-normal">No account yet?</Link>
		</form>
	)
}

export default LoginForm
