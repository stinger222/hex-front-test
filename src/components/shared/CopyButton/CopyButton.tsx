import clsx from "clsx"
import CopyIcon from "../../../../public/copy.svg?react"

interface IProps {
  value: string | undefined | null,
  className?: string
}

const CopyButton = ({ value, className }: IProps ) => {
  
  const handleCopy = async () => {
    value && await navigator.clipboard.writeText(value)
  }

	return (
		<button
      onClick={handleCopy}
      className={clsx("bg-white border p-1 shadow-md rounded-md h-fit active:scale-95", className)}
    >
      <CopyIcon fill="#494949" width={16} height={16}/>
		</button>
	)
}

export default CopyButton
