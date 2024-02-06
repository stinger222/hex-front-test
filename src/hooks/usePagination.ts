import { useCallback } from "react"
import { fetchLinks, setPage } from "../store/linkSlice"
import { useAppDispatch, useAppSelector } from "./store"

export const usePagination = () => {
  const dispatch = useAppDispatch()
  const { page: currentPage, totalCount, pageLimit } = useAppSelector(state => state.link.pagination)

  const handlePagination = useCallback((page: number) => {
    dispatch(setPage(page))
    dispatch(fetchLinks())
  }, [dispatch])

  interface INavigate {
    start: () => void
    to: (page: number) => void
    end: () => void
  }

  const navigate: INavigate = {
    start: () => handlePagination(0),
    to: handlePagination,
    end: () => handlePagination(totalPagesCount - 1)
  }

  const visiblePages: number[] = []
  const totalPagesCount = Math.ceil((totalCount || 0) / pageLimit)
  const windowWidth = Math.min(9, totalPagesCount)
  const windowStartIndex =  Math.max(0, Math.min(totalPagesCount - 9, currentPage - 4))

  for (let i = 0; i < windowWidth; i++) {
    visiblePages.push(i +windowStartIndex)
  }

  return [navigate, visiblePages, currentPage] as [INavigate, number[], number]
}
