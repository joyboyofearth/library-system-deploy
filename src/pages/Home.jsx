
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    api.get("/books")
      .then(response => setBooks(response.data))
      .catch(error => console.log(error));
  }, []);

  const available = books.filter(book => book.available).length;

  const categories = [...new Set(books.map((book) => book.category).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b));

  return (
    <div className="home">

      <section className="hero">
        <div className="hero-text">
          <span>WELCOME TO YOUR LIBRARY</span>
          <h1>Every book opens a new world.</h1>
          <p>
            Find your next favourite read.
            Explore stories, ideas and knowledge
            from our growing collection.
          </p>
          <Link to="/books" className="hero-btn">
            Explore Books →
          </Link>
        </div>

        <img
          src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1000"
          alt="Beautiful library bookshelves"
        />
      </section>

      <section className="home-section">
        <div className="home-heading">
          <div>
            <span>OUR COLLECTION</span>
            <h2>Featured Books</h2>
          </div>
          <Link to="/books">View all →</Link>
        </div>

        <div className="home-books">
          {books.slice(0, 4).map(book => (
            <Link
              to={`/books/${book.id}`}
              className="home-book"
              key={book.id}
            >
              <div className="home-book-image">
                <img
                  src={book.image || "https://placehold.co/300x400?text=Book"}
                  alt={book.title}
                />
              </div>
              <h3>{book.title}</h3>
              <p>{book.author}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="category-section">
        <span>FIND YOUR INTEREST</span>
        <h2>Explore Categories</h2>

        <div className="category-list">
          {categories.map(category => (
            <Link
              key={category}
              to={`/books?category=${encodeURIComponent(category)}`}
            >
              {category} →
            </Link>
          ))}
        </div>
      </section>

      <section className="library-summary">
        <div>
          <h2>Your space for discovery.</h2>
          <p>
            A growing collection of books, ready
            to inspire your next idea.
          </p>
        </div>

        <div className="summary-numbers">
          <div>
            <h2>{books.length}</h2>
            <p>Total Books</p>
          </div>
          <div>
            <h2>{available}</h2>
            <p>Available</p>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;
