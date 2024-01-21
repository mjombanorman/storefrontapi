import "./App.css";
import AllProducts from "./pageassets/AllProducts";
import Home from "./pageassets/Home";
function App() {

  return (
    <>
      {/* <AllProducts /> */}
      <Home />
    </>
  );
}

export default App;
// import React from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import CheckOut from "./pageassets/CheckOut";
// import PaymentForm from "./pageassets/checkout/PaymentForm";
// import ReviewForm from "./pageassets/checkout/Review";
// import Home from "./pageassets/Home";

// const App = () => {
//   return (
//     <>
//           <Router>
    
//         <Route path="/checkout" component={CheckOut} />
//         <Route path="/payment" component={PaymentForm} />
//         <Route path="/review" component={Review} />
  
//       </Router>
//        <Home />
//     </>

//   );
// };

// export default App;
