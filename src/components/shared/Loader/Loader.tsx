import { cn } from "../../../utils"

const Loader = ({ className }: {className?: string}) => {
  const baseStyles = "mx-auto w-24 h-24 border-8 border-blue-200 border-t-transparent rounded-full animate-spin"
	return (
    <div className={cn(baseStyles, className)}></div>
	)
}

export default Loader
