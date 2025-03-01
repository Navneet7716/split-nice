import { HeaderSearch } from "./components/Header"
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import { Login } from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";


function App() {


  return (
    <>
      <BrowserRouter>
        <HeaderSearch />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute> <Home /> </PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
