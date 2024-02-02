import { SubmitHandler, useForm } from "react-hook-form"
import { IFormData } from "../../../types/forms"

const RegisterForm = () => {

  const { register, handleSubmit, formState } = useForm<IFormData>({
    defaultValues: {
      username: "",
      password: ""
    }, mode: "onSubmit"
  })

  const registerUsername = () => register("username", {
    required: "Username is required!",
    maxLength: {
      value: 30,
      message: "Username is too long! 30 characters max"
    }
  })

  const registerPassword = () => register("password", {
    required: "Password is required!",
    minLength: {
      value: 8,
      message: "Minimum password length is 8 characters!"
    },
    maxLength: {
      value: 80,
      message: "Maximum password length is 80 characters!"
    }
  })

  const onSubmit: SubmitHandler<IFormData> = (values) => {
    console.log(values) // plug
  }

	return (
		<form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center p-3 w-96 border border-slate-200 rounded-md shadow-md"
    >
      <h1 className="mb-8 text-blue-300">Registration</h1>
      
      <p className="text-red-500">
        {formState.errors.username?.message ||formState.errors.password?.message || null}
      </p>

      <input {...registerUsername()} placeholder="Username"/>
      <input {...registerPassword()} placeholder="Password"/>
      <button className="mt-2" type="submit">Submit</button>
		</form>
	)
}

export default RegisterForm
