// import route and our components
import "./index.css";
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Footer from "./components/Footer";
import Header from "./components/Header";
import Boards from "./pages/Boards";
import Home from "./pages/Home";
import About from "./pages/About";
import Board from "./components/Board";
import { connect } from 'react-redux';
// https://www.npmjs.com/package/react-smooth-dnd - drag and drop

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/boards" element={<Boards />} />
        <Route path="/boards/:id" element={<Board />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}

const mapStateToProps = state => ({
  cards: state.cards
})

export default App;
