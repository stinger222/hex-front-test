import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../hooks/store"
import { fetchLinks } from "../../../store/linkSlice"
import withAuth from "../../../HOC/withAuth"
import Loader from "../../shared/Loader/Loader"
import LinksTable from "../../smart/LinksTable/LinksTable"
import Pagination from "../../smart/Pagination/Pagination"
import SqueezePopup from "../../smart/SqueezePopup/SqueezePopup"
import { logOut } from "../../../store/authSlice"
import Button from "../../shared/Button/Button"

const MainPage = withAuth(() => {
  const dispatch = useAppDispatch()
  const { isFetching, links } = useAppSelector((state) => state.link)

  const handleLogout = () => {
    dispatch(logOut())
  }

  useEffect(() => {
    dispatch(fetchLinks())
  }, [dispatch])

  if (isFetching) return <Loader className="mt-32"/>

	return (
		<div className="p-5 mx-auto max-w-4xl">
      <div className="flex justify-between mb-7 pr-7">
        <SqueezePopup />
        <Button variant="dark" onClick={handleLogout}>Log out</Button>
      </div>

      <LinksTable links={links}/>
      <Pagination />
		</div>
	)
})

export default MainPage
