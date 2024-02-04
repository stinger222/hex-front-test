import { useEffect } from "react"
import withAuth from "../../../HOC/withAuth"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { fetchLinks } from "../../../store/linkSlice"
import Loader from "../../shared/Loader/Loader"
import LinksTable from "../../smart/LinksTable/LinksTable"

const MainPage = withAuth(() => {
  const dispatch = useAppDispatch()
  const { isLoading, links } = useAppSelector((state) => state.link)

  useEffect(() => {
    dispatch(fetchLinks())
  }, [])

  if (isLoading) return <Loader className="mt-32"/>

	return (
		<div>
			<h1>Main page</h1>
      <p>This is secured route and it can't be accessed without authorization... in theory...</p>
      <br />
      <LinksTable links={links}/>
		</div>
	)
})

export default MainPage
