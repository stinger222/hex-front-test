import { ILink } from "../../../../types/store"
import CopyButton from "../../../shared/CopyButton/CopyButton"

interface IProps {
  row: ILink,
}

const ShortCell = ({ row }: IProps) => {
  const fullURL = `${import.meta.env.VITE_BACKEND_BASE_URL}/s/${row.short}`

  return (
    <td>
      <div className="flex justify-between items-center px-8">
        <a href={fullURL} target="_blank">{`s/${row.short}`}</a>
        <CopyButton value={fullURL} className="shrink-0" />
      </div>
    </td>
  )
}

export default ShortCell
