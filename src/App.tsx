import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import UrlPage from "./pages/UrlPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UrlPage />} />
      </Routes>
    </Router>
  );
};

export default App;
