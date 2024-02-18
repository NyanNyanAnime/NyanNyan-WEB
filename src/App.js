import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Component/AnimePage/Header";
import Footer from "./Component/AnimePage/Footer";
import Card from "./Component/AnimePage/Card";
import NotFound from "./Component/NotFound/NotFound";
import Detail from "./Component/AnimePage/Detail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Card />
              <Footer />
            </>
          }
        />
        <Route
          path="/about/:id"
          element={
            <>
              <Navbar />
              <Detail />
              <Footer />
            </>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
