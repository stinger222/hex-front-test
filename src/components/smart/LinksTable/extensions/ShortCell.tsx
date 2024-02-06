import { useRef } from "react"
import { ILink } from "../../../../types/store"
import CopyButton from "../../../shared/CopyButton/CopyButton"

interface IProps {
  row: ILink,
}

const ShortCell = ({ row }: IProps) => {
  const contentRef = useRef<HTMLAnchorElement>(null)

  return (
    <td>
      <div className="flex justify-between items-center px-8">
        <a href={`https://front-test.hex.team/s/${row.short}`} target="_blank" ref={contentRef}>
          {`s/${row.short}`}
        </a>

        <CopyButton value={contentRef.current?.href} className="shrink-0" />
      </div>
    </td>
  )
}

export default ShortCell
