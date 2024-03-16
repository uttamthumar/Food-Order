import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProductList from "../components/productList";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import Test from "../components/test";

function Rout() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-grow p-4 overflow-auto">
          <Routes>
            {/* <Route path="/" element={<Add/>} /> */}
            <Route path="/" element={<ProductList />} />
            <Route path="/test" element={<Test />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default Rout;
