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
import Login from "./Components/Login/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminDashboard from "./Components/Dashboard/Dashboard";

import { AddBeliever } from "./Components/AddBelievers/addBelivers";

import { ViewBeliever } from "./Components/ViewBeliever/ViewBeliever";

import { AddEvent } from "./Components/AddEvent/AddEvent";

import { ViewEvents } from "./Components/ViewEvents/ViewEvents";

import { ViewContact } from "./Components/ViewContact/ViewContact";

import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { AddSermons } from "./Components/AddSermons/AddSermons";
import NotFound from "./Components/NotFound/NotFound";

function App() {
  return (
    <>
      <ScrollToTop />
      <ToastContainer position="top-right" autoClose={2000} />

      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/about" element={<About />} />

        <Route path="/books" element={<Books />} />

        <Route path="/sermons" element={<Sermons />} />

        <Route path="/songs" element={<Songs />} />

        <Route path="/events" element={<Events />} />

        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addsermons"
          element={
            <ProtectedRoute>
              <AddSermons />
            </ProtectedRoute>
          }
        />

        <Route
          path="/addbeliever"
          element={
            <ProtectedRoute>
              <AddBeliever />
            </ProtectedRoute>
          }
        />

        <Route
          path="/viewbelievers"
          element={
            <ProtectedRoute>
              <ViewBeliever />
            </ProtectedRoute>
          }
        />

        <Route
          path="/addevent"
          element={
            <ProtectedRoute>
              <AddEvent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/viewevents"
          element={
            <ProtectedRoute>
              <ViewEvents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/viewcontacts"
          element={
            <ProtectedRoute>
              <ViewContact />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
