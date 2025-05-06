import axios from "axios";

const BASE_URL = 'http://10.0.2.2:3001/api/cart';

interface Attribute {
  category: string;
  value: string;
}

export const addToCart = (
  userId: string,
  product_id: string,
  quantity: number,
  attributions: Attribute[],
  variant_id: any
) => {
  return axios.post(`${BASE_URL}/add`, {
    userId,
    product_id,
    quantity,
    attributions,
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