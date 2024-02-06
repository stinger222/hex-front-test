import clsx from "clsx"
import { useAppSelector } from "../../../../hooks/store"

interface IProps {
  id: string,
  onSort: (e: React.MouseEvent<HTMLTableCellElement, MouseEvent>) => void,
  className?: string,
  children: React.ReactNode
}

const HeadCell = ({ onSort, id, className, children }: IProps) => {
  const { sortBy, sortDir } = useAppSelector(state => state.link.sort)
  const isSorted = sortBy === id

  return (
    <th id={id} onClick={onSort} className={clsx("cursor-pointer", className)}>
      {children}
      { isSorted && (sortDir === "asc" ? ' 🔼' : ' 🔽')}
    </th>
  )
}

export default HeadCell