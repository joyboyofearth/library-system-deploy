
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../features/favoriteSlice";

function BookCard({ book, onDelete }) {
  const dispatch = useDispatch();
  const isFavorite = useSelector((state) =>
    state.favorites.some((favorite) => favorite.id === book.id)
  );

  return (
    <div className="card">
      {book.image && (
  <img src={book.image} alt={book.title} />
)}
      <h3>{book.title}</h3>

      <p>Author: {book.author}</p>
      <p>Category: {book.category}</p>
      <p>ISBN: {book.isbn}</p>

      <p>
        Status: {book.available ? "Available" : "Borrowed"}
      </p>

      <button
        className="favorite-btn"
        type="button"
        aria-pressed={isFavorite}
        onClick={() => dispatch(isFavorite ? removeFavorite(book.id) : addFavorite(book))}
      >
        {isFavorite ? "♥ Remove from Favorites" : "♡ Add to Favorites"}
      </button>

      <Link to={`/books/${book.id}`}>
        View Details
      </Link>

      <br />

      <Link to={`/edit-book/${book.id}`}>
        Edit
      </Link>

      <br />

      <button onClick={() => onDelete(book.id)}>
        Delete
      </button>
    </div>
  );
}

export default BookCard;
