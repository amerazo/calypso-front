// import route and our components
import "./index.css";
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from "./components/Footer";
import Header from "./components/Header";
import Boards from "./pages/Boards";
import Home from "./pages/Home";
import About from "./pages/About";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/boards" element={<Boards />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
