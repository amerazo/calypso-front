// import the things we need
import "./index.css";
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Footer from "./components/Footer";
import Header from "./components/Header";
import Boards from "./pages/Boards";
import Home from "./pages/Home";
import About from "./pages/About";
import Board from "./pages/Board";


const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/boards" element={<Boards />} />
        <Route path="/boards/:boardId" element={<Board />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
