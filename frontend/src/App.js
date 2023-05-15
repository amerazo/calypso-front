// import route and our components
import "./index.css";
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from "./components/Footer";
import Header from "./components/Header";
import Boards from "./pages/Boards";
import Home from "./pages/Home";
import About from "./pages/About";
import Board from "./pages/Board";
// https://www.npmjs.com/package/react-smooth-dnd - drag and drop

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/boards" element={<Boards />} />
        <Route path="/myboard" element={<Board />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
