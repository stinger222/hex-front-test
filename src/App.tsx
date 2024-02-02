import { Route, Routes } from "react-router-dom"
import RegisterPage from "./components/pages/RegisterPage/RegisterPage"
import LoginPage from "./components/pages/LoginPage/LoginPage"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>Main page</h1>} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
}

export default App
