import { Link } from "react-router-dom";
import { ILink } from "../../../../types/store";


interface IProps {
  row: ILink,
  className?: string
}

const ShortCell = ({ row, className }: IProps) => {
  return (
    <td className={className}>
      <Link to={`https://front-test.hex.team/s/${row.short}`}>
        {`s/${row.short}`}
      </Link>
    </td>
  )
}

export default ShortCell