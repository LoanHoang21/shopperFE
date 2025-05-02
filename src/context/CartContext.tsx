import React, { createContext, useContext, useEffect, useState } from 'react';

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
}

interface CartContextType {
    items: CartItemI[];
    toggleItem: (id: string) => void;
    changeQty: (id: string, delta: number) => void;
    removeSelected: () => void; // 👈 thêm dòng này
  }
  

interface CartContextType {
  items: CartItemI[];
  toggleItem: (id: string) => void;
  changeQty: (id: string, delta: number) => void;
}

const CartContext = createContext<CartContextType>({
  items: [],
  toggleItem: () => {},
  changeQty: () => {},
  removeSelected: () => {},
});

const convertCartItemFromApi = (apiItem: any): CartItemI => {
  const product = apiItem.product_id;
  const category = product?.category_id;
  const shop = category?.shop_id;
  const attributes = apiItem?.product_attributes?.flatMap((attr: any) => {
    return attr.attributions.map((option: any) => ({
      label: attr.category_attribution_name,
      value: option.name,
    }));
  }) || [];

  return {
    id: apiItem._id,
    brand_id: shop?._id || '',
    brand: shop?.name || '',   // ✅ lấy tên shop ở đây
    title: product?.name || '',
    price: product?.discount  ? product?.price*(100-product?.discount)/100 : product?.price,
    oldPrice: product?.price || 0,
    thumbnail: product?.images[0] || '',
    quantity: apiItem.quantity,
    stock: product?.quantity || 0,
    checked: apiItem.isSelected || false,
    attributes: attributes,
  };
};



export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [items, setItems] = useState<CartItemI[]>([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await fetch('http://10.0.2.2:3001/api/cartitems'); // ⚡ Sửa lại URL theo server bạn
        const data = await res.json();

        if (Array.isArray(data)) {
          const converted = data.map((item) => convertCartItemFromApi(item));
          setItems(converted);
        }
      } catch (error) {
        console.error('Failed to fetch cart items:', error);
      }
    };

    fetchCartItems();
  }, []);
  
  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const changeQty = (id: string, delta: number) => {
    setItems((prev) => {
      return prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0); // ✅ xoá sản phẩm nếu số lượng ≤ 0
    });
  };

  const removeSelected = () => {
    setItems((prev) => prev.filter((item) => !item.checked));
  };
  
  

  return (
    <CartContext.Provider value={{ items, toggleItem, changeQty, removeSelected }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
