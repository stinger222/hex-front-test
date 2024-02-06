import { usePagination } from "../../../hooks/usePagination"
import Item from "./extensions/Item"

interface IPaginationExtensions {
  Item: typeof Item
}

const Pagination: React.FC & IPaginationExtensions = () => {
  const [navigate, pages, currentPage] = usePagination()

  if (pages.length <= 1) return null

	return (
		<nav className="flex justify-center my-12 gap-2 text-xl">
      <button className="pagination-nav" onClick={navigate.start}>
        {"<< start"}
      </button>

      {pages.map((i) => (
        <Pagination.Item
          key={i}
          isActive={i === currentPage}
          onClick={navigate.to}
          index={i}
        />
      ))}

        <button className="pagination-nav" onClick={navigate.end}>
          {"end >>"}
        </button>
		</nav>
	)
}

Pagination.Item = Item

export default Pagination
