import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Component/Header";
import Footer from "./Component/Footer";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import Detail from "./Pages/Detail";
import Video from "./Pages/Video";
import MoreAnime from "./Pages/MoreAnime";
import Scroll from "./Component/Scroll";
import AnimeList from "./Pages/AnimeList";
import SearchAnime from "./Component/SearchAnime";
import Genre from "./Pages/Genre";
import Schedule from "./Pages/Schedule";

function App() {
  return (
    <BrowserRouter>
      <Scroll />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/anime/list"
          element={
            <>
              <Navbar />
              <AnimeList />
              <Footer />
            </>
          }
        />
        <Route
          path="/anime/genres"
          element={
            <>
              <Navbar />
              <Genre />
              <Footer />
            </>
          }
        />
        <Route
          path="/anime/schedule"
          element={
            <>
              <Navbar />
              <Schedule />
              <Footer />
            </>
          }
        />
        <Route
          path="/anime/ongoing"
          element={
            <>
              <Navbar />
              <MoreAnime />
              <Footer />
            </>
          }
        />
        <Route
          path="/anime/search"
          element={
            <>
              <Navbar />
              <SearchAnime />
              <Footer />
            </>
          }
        />
        <Route
          path="/anime/genres/:genre"
          element={
            <>
              <Navbar />
              <MoreAnime />
              <Footer />
            </>
          }
        />
        <Route
          path="/anime/ongoing"
          element={
            <>
              <Navbar />
              <MoreAnime />
              <Footer />
            </>
          }
        />
        <Route
          path="/anime/finished"
          element={
            <>
              <Navbar />
              <MoreAnime />
              <Footer />
            </>
          }
        />
        <Route
          path="/anime/details/:animeId"
          element={
            <>
              <Navbar />
              <Detail />
              <Footer />
            </>
          }
        />
        <Route
          path="/anime/episode/:episodeId"
          element={
            <>
              <Navbar />
              <Video />
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
