import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteProductFromApi,
  updateProductInApi,
  createProductInApi,
} from "../../api/productApi";

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      await deleteProductFromApi(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await updateProductInApi(id, updatedData);
      if (!response) {
        throw new Error("Failed to update product");
      }
      console.log(response, "updateProduct");

      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (newProduct, { rejectWithValue }) => {
    try {
      const response = await createProductInApi(newProduct);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
