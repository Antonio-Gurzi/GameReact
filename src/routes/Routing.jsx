import Layout from "../layout/Layout";
import Homepage from "../pages/homepage/Homepage";
import ErrorPage from "../pages/errorPage/ErrorPage";
import GenrePage from "../pages/genrePage/GenrePage";
import GamePage from "../pages/gamePage/GamePage ";
import RegisterPage from "../pages/register/RegisterPage";
import { BrowserRouter, Routes, Route } from "react-router";
import SearchPage from "../pages/searchpage/SearchPage";
import LoginPage from "../pages/login/LoginPage";

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/games/:genre" element={<GenrePage />} />
          <Route path="/games/:slug/:id" element={<GamePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
