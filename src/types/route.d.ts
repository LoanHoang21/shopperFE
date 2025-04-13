type RootStackParamList = {
    home: undefined;
    order: { id: number };
    cart: undefined;
    productDetail: undefined;
    // Feed: { sort: 'latest' | 'top' } | undefined;
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
};

declare module "*.png";

// declare module "react-native-vector-icons/fontawesome6";
