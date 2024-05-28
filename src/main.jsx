import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./index.css";
import "./i18n.js";

import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import UserNavigation from "./pages/Navigation/UserNavigate/UserNavigate.jsx";
import { UserProvider } from "./Context/UserContext/UserContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Router>
        <UserProvider>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Signup />} />
                <Route path="/*" element={<UserNavigation />} />
            </Routes>
            <ToastContainer />
        </UserProvider>
    </Router>
);
