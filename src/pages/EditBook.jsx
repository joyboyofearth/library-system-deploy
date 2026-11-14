
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    isbn: "",
    publishedYear: "",
    available: true,
    description: ""
  });

  useEffect(() => {
    let ignore = false;

    async function fetchBook() {
      try {
        const response = await api.get(`/books/${id}`);
        if (!ignore) setFormData(response.data);
      } catch (error) {
        if (!ignore) console.log(error);
      }
    }

    fetchBook();
    return () => {
      ignore = true;
    };
  }, [id]);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await api.put(`/books/${id}`, {
        ...formData,
        publishedYear: Number(formData.publishedYear)
      });

      alert("Book updated successfully!");
      navigate("/books");
    } catch (error) {
      console.log(error);
      alert("Update failed");
    }
  }

  return (
    <div className="form-container">
      <h1>Edit Book</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Book Title"
          required
        />

        <input
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Author"
          required
        />

        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          required
        />

        <input
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          placeholder="ISBN"
          required
        />

        <input
          type="number"
          name="publishedYear"
          value={formData.publishedYear}
          onChange={handleChange}
          placeholder="Published Year"
          required
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
        />

        <button className="submit-btn">
          Update Book
        </button>
      </form>
    </div>
  );
}

export default EditBook;
