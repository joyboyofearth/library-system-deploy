import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer from "../features/favoriteSlice";

function loadFavorites() {
  try {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    return Array.isArray(savedFavorites) ? savedFavorites : [];
  } catch {
    return [];
  }
}

export const store = configureStore({
  reducer: {
    favorites: favoriteReducer
  },
  preloadedState: {
    favorites: loadFavorites()
  }
}); 

store.subscribe(() => {
  try {
    localStorage.setItem("favorites", JSON.stringify(store.getState().favorites));
  } catch {
    // Keep the in-memory favorites available if browser storage is unavailable.
  }
});
