import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../hooks/store"

// Props passing is unnecessary for page components
function withAuth(AuthorizedComponent: () => JSX.Element) {
  return function WithAuthorizeComponent() {
    const navigate = useNavigate()
    const isAuthorized = useAppSelector((state) => state.auth.isAuthorized)

    useEffect(() => {
      if (!isAuthorized) navigate('/login')
    }, [isAuthorized, navigate])

    return <AuthorizedComponent />
  }
}



export default withAuth