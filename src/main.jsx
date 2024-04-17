import React from 'react'
import './index.css'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify'

import Login from './pages/login/Login.jsx';
import Signup from './pages/signup/Signup.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Signup />} />
            </Routes>
            <ToastContainer />
        </Router>
    </React.StrictMode>,
)
