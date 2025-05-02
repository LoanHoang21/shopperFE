type RootStackParamList = {
    beforeLogin: undefined;
    login: undefined;
    register: undefined;
    home: undefined;
    order: { id: number } | undefined;
    cart: undefined;
    notiType: undefined;
    notiTypeDetails: {_id: string, name: string, sum: number} | undefined;
    payment: undefined;
    paymentMethod: undefined;
    paymentSuccess: undefined;
    // Feed: { sort: 'latest' | 'top' } | undefined;
    updateOrder: undefined;
    profile: undefined;
    voucher: undefined;
    homeAdmin: undefined;
    notiTypeAdmin: undefined;
    orderAdmin: { id: number } | undefined;
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
};

declare module "*.png";

// declare module "react-native-vector-icons/fontawesome6";
