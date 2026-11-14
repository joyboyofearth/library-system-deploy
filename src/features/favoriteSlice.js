import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorites",

  initialState: [],

  reducers: {

    addFavorite: (state, action) => {

      const exists = state.find(
        book => book.id === action.payload.id
      );

      if (!exists) {
        state.push(action.payload);
      }

    },

    removeFavorite: (state, action) => {

      return state.filter(
        book => book.id !== action.payload
      );

    }

  }
});

export const {
  addFavorite,
  removeFavorite
} = favoriteSlice.actions;

export default favoriteSlice.reducer;
