import React, { createContext, useContext, useState } from 'react';

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

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItemI[]>([
        {
          id: '1',
          brand_id: 'b1',
          brand: 'Happy Bedding',
          title: 'Bộ ga gối Cotton',
          price: 169000,
          oldPrice: 205000,
          thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR9aM8aQyWtcV41nBhSw4JDBEI8QernSD5mw&s',
          quantity: 1,
          stock: 3,
          checked: false,
          attributes: [
            { label: 'Kích thước', value: 'M8-2m' },
            { label: 'Màu sắc', value: 'Caro Xanh nhạt' },
          ],
        },
        {
          id: '2',
          brand_id: 'b2',
          brand: 'ONATREE',
          title: 'Set quà nến thơm',
          price: 169000,
          oldPrice: 205000,
          thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR9aM8aQyWtcV41nBhSw4JDBEI8QernSD5mw&s',
          quantity: 2,
          stock: 4,
          checked: true,
          attributes: [
            { label: 'Chất liệu', value: 'Sáp đậu nành' },
            { label: 'Dung tích', value: '200ml' },
          ],
        },
        {
            id: '3',
            brand_id: 'b2',
            brand: 'ONATREE',
            title: 'Set quà valentine',
            price: 200000,
            oldPrice: 250000,
            thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR9aM8aQyWtcV41nBhSw4JDBEI8QernSD5mw&s',
            quantity: 1,
            stock: 5,
            checked: false,
            attributes: [
              { label: 'Chất liệu', value: 'Sáp đậu nành' },
              { label: 'Dung tích', value: '200ml' },
            ],
          },
      ]);

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
