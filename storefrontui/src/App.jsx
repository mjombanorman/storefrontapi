import "./App.css";
// import "bootstrap/dist/css/bootstrap.css";
// import "./assets/css/style.css";
// import "./assets/css/responsive.css";
// import { Routes, Route } from "react-router-dom";
// import Home from "./components/Home";
// import About from "./components/About";
// import Create from "./components/Create";
// import NavBar from "./components/NavBar";
// import Edit from "./components/Edit";
// import Delete from "./components/Delete";
// import Products from "./components/Products";
import NavBar from "./pageassets/NavBar";
import Products from "./pageassets/Products";
import ItemCategories from "./pageassets/ItemCategories";

function App() {
  return (
    <>
      {/* <Base/> */}
      <NavBar
        // content={
        //   <Routes>
        //     <Route path="/" element={<Home />} />
        //     <Route path="/about" element={<About />} />
        //     <Route path="/create" element={<Create />} />
        //     <Route path="/products" element={<Products />} />
        //     <Route path="/edit/:id" element={<Edit />} />
        //     <Route path="/delete/:id" element={<Delete />} />
        //   </Routes>
        // }
      />
      {/* <ItemCategories/>
      <Products /> */}
      <ProductDetail/>
    </>
  );
}

export default App;
