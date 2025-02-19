import { createSlice } from "@reduxjs/toolkit";

const users = JSON.parse(localStorage.getItem("users")) || [
  { login: "admin", email: "admin@admin.admin", password: "admin123", cart: null },
]

const initialState = {
  isAuthenticated: false,
  error: null,
  users: users,
  userAuth: JSON.parse(localStorage.getItem("userAuth")) || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { login, password } = action.payload;
      const user = state.users.find(
        (u) => u.login === login && u.password === password
      );

      if (user) {
        state.isAuthenticated = true;
        state.userAuth = user;
        state.error = null;
        localStorage.setItem("userAuth", JSON.stringify(user));
        
      } else {
        state.error = "Wrong login or password";
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userAuth = null;
      state.error = null;
      localStorage.removeItem("userAuth");
    },
    register: (state, action) => {
      state.users.push(action.payload);
      state.isAuthenticated = true;
      state.userAuth = action.payload;
      state.error = null;
      localStorage.getItem("userAuth") ?
      const users = JSON.parse(localStorage.getItem("users"))
      
      localStorage.setItem("userAuth", JSON.stringify([...users, action.payload]));
    },
  },
});

export const { login, logout, register } = authSlice.actions;
export default authSlice.reducer;
