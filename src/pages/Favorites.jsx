import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFavorite } from "../features/favoriteSlice";

function Favorites() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  return (
    <section className="favorites-page">
      <h1>Favorite Books</h1>
      {favorites.length === 0 ? (
        <div className="empty-favorites">
          <h2>No favorite books yet</h2>
          <p>Add books to your favorites from the Books page.</p>
          <Link to="/books">Browse books</Link>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map((book) => (
            <article className="favorite-card" key={book.id}>
              {book.image && <img src={book.image} alt={book.title} />}
              <div className="favorite-content">
                <h2>{book.title}</h2>
                <p>Author: {book.author}</p>
                <p>Category: {book.category}</p>
                {book.rating != null && <p>Rating: {book.rating}</p>}
                <Link to={`/books/${book.id}`}>View details</Link>
                <button type="button" onClick={() => dispatch(removeFavorite(book.id))}>
                  Remove from Favorites
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Favorites;
