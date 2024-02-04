import { Link } from "react-router-dom";
import { ILink } from "../../../../types/store";

interface IProps {
  row: ILink,
  className?: string
}

const TargetCell = ({ row, className }: IProps) => {
  return (
    <td className={className}>
      <Link to={row.target}> {row.target} </Link>
    </td>
  )
}

export default TargetCell