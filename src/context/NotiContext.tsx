import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NotificationContextType {
  sum: number | null;
  statusNoti: string | null;
  setSum: (sum: number | null) => void;
  setStatusNoti: (status: string | null) => void;
}

// Tạo context
const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Tạo hook để sử dụng context
export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

// Tạo Provider để bao bọc các component sử dụng context
interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [sum, setSum] = useState<number | null>(null);
  const [statusNoti, setStatusNoti] = useState<string | null>(null);
  return (
    <NotificationContext.Provider value={{ sum, setSum, statusNoti, setStatusNoti }}>
      {children}
    </NotificationContext.Provider>
  );
};
