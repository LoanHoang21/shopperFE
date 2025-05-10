import axios from "axios";
import { API_BASE_URL } from "../utils/const";

const BASE_URL = `${API_BASE_URL}/cart`;

export const addToCart = (
  userId: string,
  product_id: string,
  quantity: number,
  variant_id: any
) => {
  return axios.post(`${BASE_URL}/add`, {
    userId,
    product_id,
    quantity,
    variant_id
  });
};

export const updateCartItemQuantity = async (itemId: string, quantity: number) => {
  return axios.put(`${BASE_URL}/cartitems/quantity`, {
    itemId,
    quantity,
  });
};

export const deleteCartItems = async (itemIds: string[]) => {
  return axios.post(`${BASE_URL}/cartitems/delete-many`, {
    itemIds,
  });
};