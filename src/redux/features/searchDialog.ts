import { createSlice } from "@reduxjs/toolkit";

interface DialogState {
  open: boolean;
}

const initialState: DialogState = {
  open: false,
};

export const dialog = createSlice({
  name: "searchDialog",
  initialState,
  reducers: {
    openSearchDialog: (state) => {
      state.open = true;
    },
    closeSearchDialog: (state) => {
      state.open = false;
    },
  },
});

// Export actions and reducer
export const { openSearchDialog, closeSearchDialog } = dialog.actions;
export default dialog.reducer;
