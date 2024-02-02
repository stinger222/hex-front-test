import { SubmitHandler, useForm } from "react-hook-form"
import { IRegisterFormData } from "../../../types/forms"
import { confirmPasswordValidationRules, passwordValidationRules, usernameValidationRules } from "../../../constants/validation"
import FormErrorMessage from "../../shared/FormErrorMessage"

const RegisterForm = () => {

  const { register, handleSubmit, formState, setError } = useForm<IRegisterFormData>({
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: ""
    }, mode: "onSubmit"
  })

  const onSubmit: SubmitHandler<IRegisterFormData> = (values) => {
    if (values.password !== values.confirmPassword) {
      setError("root", { message: "Passwords doesn't match!" })
    }

    console.log(values) // plug
  }

	return (
		<form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center p-3 w-96 border border-slate-200 rounded-md shadow-md"
    >
      <h1 className="mb-8 text-blue-300">Registration</h1>
      
      <FormErrorMessage errors={formState.errors}/>
      {/* <p className="text-red-500"> { displayError } </p> */}

      <input {...register("username", usernameValidationRules)} placeholder="Username"/>
      <input {...register("password", passwordValidationRules)} placeholder="Password"/>
      <input {...register("confirmPassword", confirmPasswordValidationRules)} placeholder="Confirm Password"/>
      <button className="mx-2" type="submit">Submit</button>
		</form>
	)
}

export default RegisterForm
