import { BrowserRouter, Routes, Route } from "react-router"
import Navbar from "./Navbar"
import Home from "../User/Home"

function App() {

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
