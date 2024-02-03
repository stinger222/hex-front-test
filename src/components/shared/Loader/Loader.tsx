import clsx from "clsx"

const Loader = ({ className }: {className?: string}) => {
  const baseStyles = "mx-auto w-24 h-24 border-8 border-blue-200 border-t-transparent rounded-full animate-spin"
	return (
    <div className={clsx(baseStyles, className)}></div>
	)
}

export default Loader
