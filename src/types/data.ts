type RootStackParamList = {
    beforeLogin: undefined;
    login: undefined;
    register: undefined;
    home: undefined;
    order: { id: number };
    cart: undefined;
    payment: undefined;
    paymentMethod: undefined;
    paymentSuccess: undefined;
    notification: undefined;
    promotionNotification: {id: number, type: string, desc: string, quantity: number} | undefined;
    // Feed: { sort: 'latest' | 'top' } | undefined;
    updateOrder: undefined;
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
};

declare module "*.png";

// declare module "react-native-vector-icons/fontawesome6";
