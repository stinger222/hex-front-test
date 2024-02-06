import { ILink } from "../../../../types/store"
import CopyButton from "../../../shared/CopyButton/CopyButton"

interface IProps {
  row: ILink,
}

const TargetCell = ({ row }: IProps) => {

  return (
    <td>
      <div className="flex justify-between items-center gap-8">
        <a href={row.target} target="_blank">{row.target}</a>
        <CopyButton value={row.target} className="shrink-0" />
      </div>
    </td>
  )
}

export default TargetCell
