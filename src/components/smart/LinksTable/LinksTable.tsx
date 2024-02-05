import { useAppDispatch } from "../../../hooks/store"
import { setSort, fetchLinks } from "../../../store/linkSlice"
import { ILink } from "../../../types/store"
import HeadCell from "./extensions/HeadCell"
import ShortCell from "./extensions/ShortCell"
import TargetCell from "./extensions/TargetCell"

interface IProps {
  links: ILink[]
}

interface ILinksTableExtensions {
  HeadeCell: typeof HeadCell,
  ShortCell: typeof ShortCell,
  TargetCell: typeof TargetCell
}

const LinksTable: React.FC<IProps> & ILinksTableExtensions = ({ links }) => {
  const dispatch = useAppDispatch()

  const handleSort = (e: React.MouseEvent<HTMLTableCellElement, MouseEvent>) => {
    e.stopPropagation()
    const columnId = e.currentTarget?.id as "short" | "target" | "counter" | undefined
    if (!columnId) return

    dispatch(setSort(columnId))
    dispatch(fetchLinks())
  }

  if (!links.length) return <h1>Table is empty</h1>

  return (
    <table>
      <thead>
        <tr>
          <LinksTable.HeadeCell id="short" onSort={handleSort} className="w-1/6">
            Short
          </LinksTable.HeadeCell>
          <LinksTable.HeadeCell id="target" onSort={handleSort}>
            Long
          </LinksTable.HeadeCell>
          <LinksTable.HeadeCell id="counter" onSort={handleSort} className="w-1/12 text-center">
            Clicks
          </LinksTable.HeadeCell>
        </tr>
      </thead>
      <tbody>
        {links?.map(row => (
          <tr key={row.id}>
            <LinksTable.ShortCell row={row}/>
            <LinksTable.TargetCell row={row}/>
            <td className="text-center">{row.counter}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

LinksTable.HeadeCell = HeadCell
LinksTable.ShortCell = ShortCell
LinksTable.TargetCell = TargetCell

export default LinksTable