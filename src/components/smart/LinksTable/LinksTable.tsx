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
  HeadCell: typeof HeadCell,
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

  if (!links.length) return (
    <>
      <h1 className="text-center mt-14 mb-3">Table is empty</h1>
      <p className="text-center">Squeeze your first link by clicking the button above!</p>
    </>
  )

  return (
    <main>
      <table>
        <thead>
          <tr>
            <LinksTable.HeadCell id="short" onSort={handleSort} className="w-1/6 pl-12">
              Short
            </LinksTable.HeadCell>
            <LinksTable.HeadCell id="target" onSort={handleSort}>
              Long
            </LinksTable.HeadCell>
            <LinksTable.HeadCell id="counter" onSort={handleSort} className="w-1/12 text-center">
              Clicks
            </LinksTable.HeadCell>
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
    </main>
  )
}

LinksTable.HeadCell = HeadCell
LinksTable.ShortCell = ShortCell
LinksTable.TargetCell = TargetCell

export default LinksTable
