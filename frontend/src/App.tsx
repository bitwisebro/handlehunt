import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ErrorBoundary } from "./components/ErrorBoundary";
import Home from "./pages/Home";
import About from "./pages/About";
import FAQs from "./pages/FAQs";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-blue-100 selection:text-blue-900">
      <Navbar />
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 md:py-8">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/faqs" element={<FAQs />} />
          </Routes>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}

export default App;
