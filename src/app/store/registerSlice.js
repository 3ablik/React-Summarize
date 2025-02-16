import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accounts: [
    {
      login: "admin",
      email: "admin@admin.admin",
      password: "admin123",
      id: 0,
    },
  ],
  userReg: null,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    addAccount: (state, action) => {
      const newId = state.accounts.length;
      const newAccount = { ...action.payload, id: newId };

      state.accounts.push(newAccount);
      state.userReg = newAccount;
    },
  },
});

export const { addAccount } = registerSlice.actions;
export default registerSlice.reducer;
