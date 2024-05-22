import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Error500 from "./components/Error/Error500";
import Error404 from "./components/Error/Error404";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pageNotFound" element={<Error404 />} />
          <Route path="/error-500" element={<Error500 />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
        <div className="fixed">
          <ToastContainer />
        </div>
      </Router>
    </>
  );
}

export default App;
