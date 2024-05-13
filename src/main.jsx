import "./index.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import UserNavigation from "./pages/Navigation/UserNavigate/UserNavigate.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Router>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/*" element={<UserNavigation />} />
        </Routes>
        <ToastContainer />
    </Router>
);
