
import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function AddBook() {
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

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await api.post("/books", {
        ...formData,
        publishedYear: Number(formData.publishedYear)
      });

      alert("Book added successfully!");
      navigate("/books");
    } catch (error) {
      console.log(error);
      alert("Failed to add book");
    }
  }

  return (
    <div className="form-container">
      <h1>Add New Book</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Book Title"
          onChange={handleChange}
          required
        />

        <input
          name="author"
          placeholder="Author"
          onChange={handleChange}
          required
        />

        <input
          name="category"
          placeholder="Category"
          onChange={handleChange}
          required
        />

        <input
          name="isbn"
          placeholder="ISBN"
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="publishedYear"
          placeholder="Published Year"
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />

        <button className="submit-btn">
          Add Book
        </button>
      </form>
    </div>
  );
}

export default AddBook;
