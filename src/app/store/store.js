import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import registerReducer from "./slices/registerSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
  },
});

export default store;
