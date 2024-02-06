import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../hooks/store"
import { fetchLinks } from "../../../store/linkSlice"
import withAuth from "../../../HOC/withAuth"
import Loader from "../../shared/Loader/Loader"
import LinksTable from "../../smart/LinksTable/LinksTable"
import Pagination from "../../smart/Pagination/Pagination"
import SqueezePopup from "../../smart/SqueezePopup/SqueezePopup"

const MainPage = withAuth(() => {
  const dispatch = useAppDispatch()
  const { isFetching, links } = useAppSelector((state) => state.link)

  useEffect(() => {
    dispatch(fetchLinks())
  }, [dispatch])

  if (isFetching) return <Loader className="mt-32"/>

	return (
		<div>
			<h1>Main page</h1>
      <p>This is secured route and it can't be accessed without authorization... in theory...</p>

      <br />

      <SqueezePopup />

      <br />

      <LinksTable links={links}/>
      <Pagination />
		</div>
	)
})

export default MainPage
