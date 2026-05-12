import { Routes, Route } from "react-router-dom";
import Contact from "./Components/Contact/Contact";
import Footer from "./Components/Footer/Footer";
import Hero from "./Components/Hero/Hero";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={<Hero />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
