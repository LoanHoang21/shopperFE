type RootStackParamList = {
    beforeLogin: undefined;
    login: undefined;
    register: undefined;
    home: undefined;
    order: { id: number } | undefined;
    cart: undefined;
    notification: undefined;
    promotionNotification: {id: number, type: string, desc: string, quantity: number} | undefined;
    // Feed: { sort: 'latest' | 'top' } | undefined;
    updateOrder: undefined;
    profile: undefined;
    voucher: undefined;
    homeAdmin: undefined;
    notiTypeAdmin: undefined;
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
};

declare module "*.png";

// declare module "react-native-vector-icons/fontawesome6";
