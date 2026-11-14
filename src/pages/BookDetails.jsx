import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function BookDetails() {
  const { id } = useParams();

  const [book, setBook] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function fetchBook() {
      try {
        const response = await api.get(`/books/${id}`);
        if (!ignore) setBook(response.data);
      } catch (error) {
        if (!ignore) console.log(error);
      }
    }

    fetchBook();
    return () => {
      ignore = true;
    };
  }, [id]);

  if (!book || String(book.id) !== id) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="details">
      <h1>{book.title}</h1>

      <h3>Author</h3>
      <p>{book.author}</p>

      <h3>Category</h3>
      <p>{book.category}</p>

      <h3>ISBN</h3>
      <p>{book.isbn}</p>

      <h3>Published Year</h3>
      <p>{book.publishedYear}</p>

      <h3>Description</h3>
      <p>{book.description}</p>

      <h3>Availability</h3>
      <p>{book.available ? "Available" : "Currently Borrowed"}</p>
    </div>
  );
}

export default BookDetails;
