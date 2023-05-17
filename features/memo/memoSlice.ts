import { createSlice } from "@reduxjs/toolkit";

interface MemoState {
  value: number;
  isFormOpen: boolean;
}

const initialState: MemoState = {
  value: 0,
  isFormOpen: true,
};

const memoSlice = createSlice({
  name: "memo",
  initialState,
  reducers: {
    toggleForm: (state) => {
      state.isFormOpen = !state.isFormOpen;
    },
    openForm: (state) => {
      state.isFormOpen = true;
    },
  },
});

const { actions, reducer: memoReducer } = memoSlice;

export const { toggleForm, openForm } = actions;

export default memoReducer;
