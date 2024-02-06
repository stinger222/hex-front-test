import { Control, ControllerRenderProps, RegisterOptions, useController } from "react-hook-form"
import { cn } from "../../../utils"

type CoreProps = {
  control: Control<any, any, any>,
  name: string,
  rules?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>
}

type HtmlProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof ControllerRenderProps>

type Props = CoreProps & HtmlProps

const Input = ({ control, name, rules, className, ...rest }: Props) => {

  const { field } = useController({
    name, control, rules
  })

  const baseStyles = "w-4/5 md:text-2xl"

	return (
		<input
      {...field}
      {...rest }
      autoComplete="off"
      className={cn(baseStyles, className)}
    />
	)
}

export default Input
