import { useRef } from "react"
import { ILink } from "../../../../types/store"
import CopyButton from "../../../shared/CopyButton/CopyButton"

interface IProps {
  row: ILink,
}

const TargetCell = ({ row }: IProps) => {
  const contentRef = useRef<HTMLAnchorElement>(null)

  return (
    <td>
      <div className="flex justify-between items-center gap-8">
        <a href={row.target} target="_blank" ref={contentRef}>{row.target}</a>
        <CopyButton value={contentRef.current?.textContent} className="shrink-0" />
      </div>
    </td>
  )
}

export default TargetCell
