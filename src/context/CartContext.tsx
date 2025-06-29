import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteCartItems, updateCartItemQuantity } from '../apis/Cart';
import { API_BASE_URL } from '../utils/const';

export interface CartItemI {
  id: string;
  brand_id: string;
  brand: string;
  title: string;
  price: number;
  oldPrice: number;
  thumbnail: any;
  quantity: number;
  stock: number;
  checked: boolean;
  attributes?: { label: string; value: string }[];
  variantId?: string;
}

interface CartContextType {
    items: CartItemI[];
    toggleItem: (id: string) => void;
    changeQty: (id: string, delta: number) => void;
    removeSelected: () => void;
    reloadCart: () => void;
    deleteSelectedItems: () => void;
  }
  

interface CartContextType {
  items: CartItemI[];
  toggleItem: (id: string) => void;
  changeQty: (id: string, delta: number) => void;
  reloadCart: () => void;
  deleteSelectedItems: () => void;
}

const CartContext = createContext<CartContextType>({
  items: [],
  toggleItem: () => {},
  changeQty: () => {},
  removeSelected: () => {},
  reloadCart: () => {},
  deleteSelectedItems: () => {},
});

const convertCartItemFromApi = (apiItem: any): CartItemI => {
  const product = apiItem.product_id;
  const category = product?.category_id;
  const shop = category?.shop_id;
  const variant = apiItem?.variant_id; 
  const attributions = variant?.attribution_ids

  const attributes = attributions?.map((attr: any) => ({
    label: attr.category_attribution_id.name,
    value: attr.name
  }));


  return {
    id: apiItem._id,
    brand_id: shop?._id || '',
    brand: shop?.name || '',
    title: product?.name || '',
    // price: product?.discount ? product?.price * (100 - product?.discount) / 100 : product?.price,
    price: variant?.price ?? product?.price,
    oldPrice: product?.price || 0,
    thumbnail: variant?.image ?? product?.images?.[0] ?? '',
    quantity: apiItem.quantity,
    stock: ( variant?.quantity - variant?.sale_quantity || 0),
    checked: apiItem.isSelected || false,
    attributes: attributes,
    variantId: variant?._id,
  };
};




export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [items, setItems] = useState<CartItemI[]>([]);

    const fetchCartItems = async () => {
      try {
        const userStr = await AsyncStorage.getItem('user');
        const user = userStr ? JSON.parse(userStr) : null;
        if (!user || !user._id) return;
  
        const res = await axios.get(`${API_BASE_URL}/cart/user/${user._id}`);
        const data = res.data?.data;
  
        if (Array.isArray(data)) {
          const converted = data.map((item) => convertCartItemFromApi(item));
          setItems(converted);
        }
      } catch (error) {
        console.error( error);
      }
    };
  
    useEffect(() => {
      fetchCartItems();
    }, []);
    
  
  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const changeQty = async (id: string, delta: number) => {
    setItems((prev) => {
      return prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0); 
    });

    try {
      const item = items.find((i) => i.id === id);
      if (!item) return;
      const newQuantity = item.quantity + delta;
  
      if (newQuantity <= 0) {
        await deleteCartItems([id]);
      } else {
        console.log(id, newQuantity)
        await updateCartItemQuantity(id, newQuantity);
      }
  
    } catch (err) {
      console.error( err);
    }
  };

  const removeSelected = () => {
    setItems((prev) => prev.filter((item) => !item.checked));
  };

  const getSelectedItemIds = () => {
    return items.filter(item => item.checked).map(item => item.id);
  };
  
  const deleteSelectedItems = async () => {
    try {
      const itemIds = getSelectedItemIds();
      if (itemIds.length === 0) return;
  
      await deleteCartItems(itemIds);
    } catch (err) {
      console.error( err);
    }
  };
  
  return (
    <CartContext.Provider value={{ items, toggleItem, changeQty, removeSelected, reloadCart: fetchCartItems, deleteSelectedItems  }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
