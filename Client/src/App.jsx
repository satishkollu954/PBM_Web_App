import { Routes, Route } from "react-router-dom";
import Contact from "./Components/Contact/Contact";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import About from "./Components/About/About";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
import { Home } from "./Components/Home/Home";
import Books from "./Components/Books/Books";
import Sermons from "./Components/Sermons/Sermons";
import Songs from "./Components/Songs/Songs";
import Events from "./Components/Events/Events";

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/books" element={<Books />} />
        <Route path="/sermons" element={<Sermons />} />
        <Route path="/songs" element={<Songs />} />
        <Route path="/events" element={<Events />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
