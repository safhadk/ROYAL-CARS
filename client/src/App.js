import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminRoute from "./Routes/admin";
import UserRoute from "./Routes/user";
import OwnerRoute from "./Routes/owner";
import './App.css'

function App() { 
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/*" element={<UserRoute />} />
                    <Route path="/admin/*" element={<AdminRoute />} />
                    <Route path="/owner/*" element={<OwnerRoute />} />   
                </Routes>
            </Router>
        </div>
    );
}

export default App;
