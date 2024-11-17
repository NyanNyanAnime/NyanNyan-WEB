import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Component/AnimePage/Header";
import Footer from "./Component/AnimePage/Footer";
import Home from "./Component/AnimePage/Home";
import NotFound from "./Component/NotFound/NotFound";
import Detail from "./Component/AnimePage/Detail";
import Video from "./Component/AnimePage/Video";
import MoreAnime from "./Component/AnimePage/MoreAnime";
import Scroll from "./Component/AnimePage/Scroll";
import AnimeList from "./Component/AnimePage/AnimeList";
import SearchAnime from "./Component/AnimePage/SearchAnime";
import Genre from "./Component/AnimePage/Genre";
import Schedule from "./Component/AnimePage/Schedule";

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
          path="/anime/completed"
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
