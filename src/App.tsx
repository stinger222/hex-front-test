import { Route, Routes } from "react-router-dom"
import LoginPage from "./components/pages/LoginPage/LoginPage"
import RegisterPage from "./components/pages/RegisterPage/RegisterPage"
import MainPage from "./components/pages/MainPage/MainPage"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
}

export default App
