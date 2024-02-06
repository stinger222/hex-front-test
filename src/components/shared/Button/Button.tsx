import { cn } from "../../../utils"

const vriants = {
  base: "px-2 py-1 rounded-md shadow-md outline-none active:scale-95 disabled:opacity-60 disabled:active:scale-100",
  default: "border bg-white focus:border-gray-400",
  dark: "bg-black text-white font-medium"
}

type CoreProps =  {
  variant?: Exclude<keyof typeof vriants, "base">,
  className?: string
}

type HtmlProps = React.ButtonHTMLAttributes<HTMLButtonElement>

type Props = CoreProps & HtmlProps

const Button = ({ variant = "default", className, children, ...rest }: Props) => {
	return (
		<button
      className={cn(vriants[variant], vriants.base, className)}
      {...rest}
    >
			{children}
		</button>
	)
}

export default Button
