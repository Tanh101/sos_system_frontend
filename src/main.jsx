import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";

import "./index.css";
import "./i18n.js";

import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import UserNavigation from "./pages/Navigation/UserNavigate/UserNavigate.jsx";
import { LocaleProvider } from "./Context/LocaleContext/LocaleContext.jsx";
import store from '../src/redux/store/index';
import RescuerSignup from "./pages/RescuerSignup/RescuerSignup.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <Router>
            <LocaleProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Signup />} />
                    <Route path="/rescuer-register" element={<RescuerSignup />} />
                    <Route path="/*" element={<UserNavigation />} />
                </Routes>
                <ToastContainer />
            </LocaleProvider>
        </Router>
    </Provider>
);
