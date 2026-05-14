import { Routes, Route } from "react-router-dom";
import Contact from "./Components/Contact/Contact";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import About from "./Components/About/About";
import Vision from "./Components/Vision/Vision";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
import { Home } from "./Components/Home/Home";

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/vision" element={<Vision />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
