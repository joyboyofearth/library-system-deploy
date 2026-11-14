

import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../services/api";
import BookCard from "../components/BookCard";

function Books() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [availability, setAvailability] = useState("all");
  const [sort, setSort] = useState("default");

  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "";

  useEffect(() => {
    let ignore = false;

    async function fetchBooks() {
      try {
        const response = await api.get("/books");
        if (!ignore) setBooks(response.data);
      } catch (error) {
        if (!ignore) console.log(error);
      }
    }

    fetchBooks();
    return () => {
      ignore = true;
    };
  }, []);

  let filteredBooks = books.filter((book) => {
    const searchTerm = search.trim().toLowerCase();
    const matchesSearch =
      (book.title || "").toLowerCase().includes(searchTerm) ||
      (book.author || "").toLowerCase().includes(searchTerm);

    const matchesCategory =
      category === "" || book.category === category;

    const matchesAvailability =
      availability === "all" ||
      (availability === "available" && book.available) ||
      (availability === "borrowed" && !book.available);

    return matchesSearch && matchesCategory && matchesAvailability;
  });

  const sortedBooks = [...filteredBooks];
  if (sort === "az") {
    sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sort === "newest") {
    sortedBooks.sort((a, b) => (b.publishedYear || 0) - (a.publishedYear || 0));
  } else if (sort === "oldest") {
    sortedBooks.sort((a, b) => (a.publishedYear || 0) - (b.publishedYear || 0));
  }

  const categories = [...new Set(books.map((book) => book.category).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b));

  async function handleDelete(id) {
    try {
      await api.delete(`/books/${id}`);
      setBooks((previousBooks) =>
        previousBooks.filter((book) => book.id !== id)
      );
    } catch (error) {
      console.log(error);
      alert("Could not delete book");
    }
  }

  return (
    <div className="books-page">
      <h1>Available Books</h1>

      <Link to="/add-book">Add Book</Link>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => {
            const nextParams = new URLSearchParams(searchParams);
            if (e.target.value) {
              nextParams.set("category", e.target.value);
            } else {
              nextParams.delete("category");
            }
            setSearchParams(nextParams);
          }}
        >
          <option value="">All Categories</option>
          {categories.map((bookCategory) => (
            <option key={bookCategory} value={bookCategory}>{bookCategory}</option>
          ))}
        </select>

        <select
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
        >
          <option value="all">All Books</option>
          <option value="available">Available</option>
          <option value="borrowed">Borrowed</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="default">Default Order</option>
          <option value="az">Title: A to Z</option>
          <option value="newest">Newest Published</option>
          <option value="oldest">Oldest Published</option>
        </select>
      </div>

      <p>{sortedBooks.length} {sortedBooks.length === 1 ? "book" : "books"} found</p>

      <div className="books">
        {sortedBooks.length > 0 ? (
          sortedBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </div>
  );
}

export default Books;
