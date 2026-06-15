import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../components/MainLayout";

import Home from "../pages/Home";
import About from "../pages/About";
import ContactUs from "../pages/ContactUs";
import Login from "../pages/Login";
import Logout from "../pages/Logout";

import Feed from "../components/Feed/Index";
import Post from "../pages/post/Index";

import PrivateRoute from "./PrivateRoute";

export default function AppRouter() {

  return (
    <BrowserRouter>

      <MainLayout>

        <Routes>

          <Route
            path="/"
            element={<Login />}
          />

          <Route
            path="/logout"
            element={<Logout />}
          />

          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

          <Route
            path="/about"
            element={
              <PrivateRoute>
                <About />
              </PrivateRoute>
            }
          />

          <Route
            path="/contact"
            element={
              <PrivateRoute>
                <ContactUs />
              </PrivateRoute>
            }
          />

          <Route
            path="/feed"
            element={
              <PrivateRoute>
                <Feed />
              </PrivateRoute>
            }
          />

          <Route
            path="/feed/novo"
            element={
              <PrivateRoute>
                <Post />
              </PrivateRoute>
            }
          />

        </Routes>

      </MainLayout>

    </BrowserRouter>
  );
}