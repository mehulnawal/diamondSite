import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar"; 
import Home from "../User/Home";
import Product from "../User/Product"; 
import About from "../User/About"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="product" element={<Product />} />
          <Route path="about" element={<About />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
