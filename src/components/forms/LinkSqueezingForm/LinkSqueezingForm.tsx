import { useForm } from "react-hook-form"
import { urlValidationRules } from "../../../constants/validation"
import { squeezeLink } from "../../../store/linkSlice"
import { useAppDispatch } from "../../../hooks/store"
import Input from "../../shared/Input/Input"
import FormErrorMessage from "../../shared/FormErrorMessage/FormErrorMessage"
import Button from "../../shared/Button/Button"

const LinkSqueezingForm = () => {
  const dispatch = useAppDispatch()
  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      url: ""
    },
    mode: "onSubmit"
  })

  const onSubmit = async ({ url }: { url: string }) => {
    await dispatch(squeezeLink(url))
  }

	return (
		<form
      onSubmit={ handleSubmit(onSubmit) }
      className="bg-white p-4 rounded-lg shadow-lg shadow-gray-700"
    >
      <h1 className="mb-5 text-blue-300 text-3xl">Squeeze Link</h1>

      <FormErrorMessage errors={formState.errors}/>
      
      <Input name="url" control={control} placeholder="URL" rules={urlValidationRules}/>
      
      <Button type="submit" className="mt-3" disabled={formState.isSubmitting}>
        Squeeze
      </Button>
		</form>
	)
}

export default LinkSqueezingForm
