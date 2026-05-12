import { Routes, Route } from "react-router-dom";
import Contact from "./Components/Contact/Contact";
import Footer from "./Components/Footer/Footer";
import Hero from "./Components/Hero/Hero";
import Navbar from "./Components/Navbar/Navbar";
import About from "./Components/About/About";
import Vision from "./Components/Vision/Vision";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/vision" element={<Vision />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
