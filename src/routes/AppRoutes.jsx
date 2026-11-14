


import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Books from "../pages/Books";
import Favorites from "../pages/Favorites";
import BookDetails from "../pages/BookDetails";
import AddBook from "../pages/AddBook";
import EditBook from "../pages/EditBook";

import Register from "../pages/Register";
import Login from "../pages/Login";
import Logout from "../pages/Logout";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books" element={<Books />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/books/:id" element={<BookDetails />} />

      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />

      <Route
        path="/add-book"
        element={
          <ProtectedRoute>
            <AddBook />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-book/:id"
        element={
          <ProtectedRoute>
            <EditBook />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
