import axios from "axios";

const BASE_URL = "https://67f55318913986b16fa42b4b.mockapi.io/pizzas";

export const deleteProductFromApi = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};

export const updateProductInApi = async (id, updatedData) => {
  console.log(id, updatedData, "updateProductInApi");

  const response = await axios.put(`${BASE_URL}/${id}`, updatedData);
  console.log(response, "updateProductInApi");
  return response.data;
};

export const createProductInApi = async (newProduct) => {
  const response = await axios.post(BASE_URL, newProduct);
  return response.data;
};
