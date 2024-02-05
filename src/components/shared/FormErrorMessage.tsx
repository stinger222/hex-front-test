import { FieldErrors } from "react-hook-form"

const FormErrorMessage = ({ errors }: {errors: FieldErrors<object>}) => {
  const errorKeys = Object.keys(errors) as Array<keyof FieldErrors<object>>

  const firstErrorMessage = errorKeys.find((key: keyof FieldErrors<object>) => {
    return !!errors[key]?.message
  })

  const errorToDisplay = firstErrorMessage && errors[firstErrorMessage]?.message || null

  return errorToDisplay && <div className="text-red-500 md:text-xl md:mb-2">{errorToDisplay}</div>
}

export default FormErrorMessage