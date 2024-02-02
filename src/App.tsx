import { Route, Routes } from "react-router-dom"
import RegisterPage from "./components/pages/RegisterPage/RegisterPage"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>Main page</h1>} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<h1>Login Page</h1>} />
    </Routes>
  )
}

export default App
