import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminPanel from "./pages/AdminPanel";
import MatchDetails from "./pages/MatchDetails";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/:id" element={<AdminPanel />} />
        <Route path="/match/:id" element={<MatchDetails />} />
      </Routes>
    </div>
  );
}
