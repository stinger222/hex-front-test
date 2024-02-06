import CopyIcon from "../../../assets/copy.svg?react"
import { cn } from "../../../utils"

interface IProps {
  value: string | undefined | null,
  className?: string
}

const CopyButton = ({ value, className }: IProps ) => {
  
  const handleCopy = async () => {
    value && await window.navigator.clipboard.writeText(value)
  }

	return (
		<button
      onClick={handleCopy}
      className={cn("bg-white border p-1 shadow-md rounded-md h-fit active:scale-95", className)}
    >
      <CopyIcon fill="#494949" width={16} height={16}/>
		</button>
	)
}

export default CopyButton
