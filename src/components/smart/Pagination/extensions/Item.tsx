import { memo } from "react"
import { cn } from "../../../../utils"

interface IProps {
  isActive: boolean,
  onClick: (page: number) => void,
  index: number
}

const Item = memo(({ isActive, onClick, index }: IProps) => {
  const baseStyles = "w-10 p-2 border border-gray-200 rounded-md font-medium text-sm leading-none"
  const activeStyles = "text-blue-400 shadow-md border-gray-300"

  return (
    <button
      onClick={() => onClick(index)}
      className={isActive ? cn(baseStyles, activeStyles) : baseStyles}
    >
      {index + 1}
    </button>
  )
})

export default Item