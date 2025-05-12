import { createSlice } from "@reduxjs/toolkit";
const storedUsers = localStorage.getItem("users");
const users =
  storedUsers == null
    ? [
        {
          login: "admin",
          email: "admin@admin.admin",
          password: "admin123",
          role: "admin",
          cart: [],
          favorites: [],
        },
      ]
    : JSON.parse(storedUsers);

localStorage.setItem("users", JSON.stringify(users));

const initialState = {
  isAuthenticated: JSON.parse(localStorage.getItem("userAuth")) ? true : false,
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
        if (state.error !== "Wrong login or password") {
          state.error = "Wrong login or password";
        }
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userAuth = null;
      state.error = null;
      localStorage.removeItem("userAuth");
    },
    register: (state, action) => {
      state.error = null;
      const { login, email } = action.payload;

      const loginExists = state.users.some((u) => u.login === login);
      const emailExists = state.users.some((u) => u.email === email);

      if (emailExists && loginExists) {
        state.error = "Email and login already exist";
        state.isAuthenticated = false;
      } else if (emailExists) {
        state.error = "Email already exists";
        state.isAuthenticated = false;
      } else if (loginExists) {
        state.error = "Login already exists";
        state.isAuthenticated = false;
      } else {
        const newUser = {
          ...action.payload,
          role: "user",
          cart: [],
          favorites: [],
        };
        state.users.push(newUser);
        localStorage.setItem("users", JSON.stringify(state.users));
        state.userAuth = newUser;
        localStorage.setItem("userAuth", JSON.stringify(newUser));
        state.isAuthenticated = true;
      }
    },
    deleteUser: (state, action) => {
      const { login } = action.payload;
      state.users = state.users.filter((u) => u.login !== login);
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    updateUser: (state, action) => {
      const { login, email, password } = action.payload;
      state.users = state.users.map((u) =>
        u.login === login || u.email === email
          ? { ...u, login, email, password }
          : u
      );
      localStorage.setItem("users", JSON.stringify(state.users));
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
    removeFromCartById: (state, action) => {
      if (!state.userAuth) return;

      const { id } = action.payload;
      const updatedUser = { ...state.userAuth };

      if (!updatedUser.cart) {
        updatedUser.cart = [];
      }

      updatedUser.cart = updatedUser.cart.filter((p) => p.id !== id);

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

    addToFavorites: (state, action) => {
      if (!state.userAuth) return;

      const { pizza } = action.payload;
      const updatedUser = { ...state.userAuth };

      if (!updatedUser.favorites) {
        updatedUser.favorites = [];
      }

      const alreadyFavorite = updatedUser.favorites.find(
        (p) => p.id === pizza.id
      );

      if (!alreadyFavorite) {
        updatedUser.favorites.push(pizza);
      }

      state.userAuth = updatedUser;
      localStorage.setItem("userAuth", JSON.stringify(updatedUser));

      state.users = state.users.map((u) =>
        u.login === updatedUser.login ? updatedUser : u
      );
      localStorage.setItem("users", JSON.stringify(state.users));
    },

    removeFromFavoritesById: (state, action) => {
      if (!state.userAuth) return;

      const { id } = action.payload;
      const updatedUser = { ...state.userAuth };

      if (!updatedUser.favorites) {
        updatedUser.favorites = [];
      }

      updatedUser.favorites = updatedUser.favorites.filter((p) => p.id !== id);

      state.userAuth = updatedUser;
      localStorage.setItem("userAuth", JSON.stringify(updatedUser));

      state.users = state.users.map((u) =>
        u.login === updatedUser.login ? updatedUser : u
      );
      localStorage.setItem("users", JSON.stringify(state.users));
    },

    toggleFavorite: (state, action) => {
      if (!state.userAuth) return;

      const { pizza } = action.payload;
      const updatedUser = { ...state.userAuth };

      if (!updatedUser.favorites) {
        updatedUser.favorites = [];
      }

      const exists = updatedUser.favorites.find((p) => p.id === pizza.id);

      if (exists) {
        updatedUser.favorites = updatedUser.favorites.filter(
          (p) => p.id !== pizza.id
        );
      } else {
        updatedUser.favorites.push(pizza);
      }

      state.userAuth = updatedUser;
      localStorage.setItem("userAuth", JSON.stringify(updatedUser));

      state.users = state.users.map((u) =>
        u.login === updatedUser.login ? updatedUser : u
      );
      localStorage.setItem("users", JSON.stringify(state.users));
    },
  },
});

export const {
  login,
  logout,
  register,
  deleteUser,
  updateUser,
  addToCart,
  removeFromCart,
  clearCart,
  addToFavorites,
  removeFromFavoritesById,
  toggleFavorite,
} = authSlice.actions;
export default authSlice.reducer;
