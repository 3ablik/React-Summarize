import { createSlice } from "@reduxjs/toolkit";

const storedUsers = localStorage.getItem("users");
const users =
  storedUsers == null
    ? [
        {
          login: "admin",
          email: "admin@admin.admin",
          password: "admin123",
          cart: [],
        },
      ]
    : JSON.parse(storedUsers);

localStorage.setItem("users", JSON.stringify(users));

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
      const userExists = state.users.find(
        (u) => u.login === action.payload.login
      );

      if (userExists) {
        state.error = "User already exists";
        state.isAuthenticated = false;
      } else {
        const newUser = { ...action.payload, cart: [] };
        state.users.push(newUser);
        localStorage.setItem("users", JSON.stringify(state.users));
        state.userAuth = newUser;
        localStorage.setItem("userAuth", JSON.stringify(newUser));
        state.isAuthenticated = true;
      }
    },
    addToCart: (state, action) => {
      if (!state.userAuth) return;

      const { pizza } = action.payload;
      const updatedUser = { ...state.userAuth };

      if (!updatedUser.cart) {
        updatedUser.cart = [];
      }

      const existingPizza = updatedUser.cart.find((p) => p.id === pizza.id);

      if (existingPizza) {
        existingPizza.quantity += 1;
      } else {
        updatedUser.cart.push({ ...pizza, quantity: 1 });
      }

      state.userAuth = updatedUser;
      localStorage.setItem("userAuth", JSON.stringify(updatedUser));

      state.users = state.users.map((u) =>
        u.login === updatedUser.login ? updatedUser : u
      );
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    removeFromCart: (state, action) => {
      if (!state.userAuth) return;

      const { pizza } = action.payload;
      const updatedUser = { ...state.userAuth };

      if (!updatedUser.cart) {
        updatedUser.cart = [];
      }

      const existingPizza = updatedUser.cart.find((p) => p.id === pizza.id);

      existingPizza.quantity -= 1;

      if (existingPizza.quantity === 0) {
        updatedUser.cart = updatedUser.cart.filter((p) => p.id !== pizza.id);
      }

      state.userAuth = updatedUser;
      localStorage.setItem("userAuth", JSON.stringify(updatedUser));

      state.users = state.users.map((u) =>
        u.login === updatedUser.login ? updatedUser : u
      );
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    clearCart: (state) => {
      if (!state.userAuth) return;

      const updatedUser = { ...state.userAuth };

      updatedUser.cart = [];

      state.userAuth = updatedUser;
      localStorage.setItem("userAuth", JSON.stringify(updatedUser));

      state.users = state.users.map((u) =>
        u.login === updatedUser.login ? updatedUser : u
      );
      localStorage.setItem("users", JSON.stringify(state.users));
    },
  },
});

export const { login, logout, register, addToCart, removeFromCart, clearCart } =
  authSlice.actions;
export default authSlice.reducer;
