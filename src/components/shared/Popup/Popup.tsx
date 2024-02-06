import { ReactNode, memo } from "react"

interface IProps {
  handleClose: () => void,
  children: ReactNode
}

const Popup = memo(({ handleClose, children }: IProps) => {
  return (
		<div
      className="fixed inset-0 flex justify-center items-center bg-[rgba(0,0,0,40%)]"
      onClick={handleClose}
    >
      <div onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
		</div>
	)
})

export default Popup
