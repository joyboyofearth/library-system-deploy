
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const favoriteCount = useSelector((state) => state.favorites.length);
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("user"))
  );

  useEffect(() => {
    function updateUser() {
      setUser(JSON.parse(localStorage.getItem("user")));
    }

    window.addEventListener("authChange", updateUser);

    return () => {
      window.removeEventListener("authChange", updateUser);
    };
  }, []);

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/books">Books</Link>
      <Link to="/favorites">Favorites ({favoriteCount})</Link>

      {user ? (
        <>
          <span>Welcome, {user.name}</span>
          <Link to="/logout">Logout</Link>
        </>
      ) : (
        <>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
