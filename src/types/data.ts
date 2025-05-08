import { Product } from '../components/ProductCard';

export type RootStackParamList = {
    beforeLogin: undefined;
    login: undefined;
    register: undefined;
    home: undefined;
    order: { id: number } | undefined;
    cart: undefined;
    notiType: undefined;
    notiTypeDetails: {_id: string, name: string} | undefined;
    productDetail: { product: Product };
    compare: { products: Product[] };
    compareResult: { products: Product[]; related: Product[] };
    search: undefined;
    searchResult: {
        query: string;
        products: Product[];
    };
    payment: {
        product?: { product_id: string, quantity: number, type?: string }[];
        paymentMethodId?: string;
        voucherId?: string;
    };
    paymentMethod: {
        product?: { product_id: string, quantity: number, type?: string }[];
    };
    paymentSuccess: undefined;
    updateOrder: undefined;
    profile: undefined;
    voucher: {
        product?: { product_id: string, quantity: number, type?: string }[];
        paymentMethodId?: string;
    };
    homeAdmin: undefined;
    notiTypeAdmin: undefined;
    orderAdmin: { id: number } | undefined;
    recommendedProduct: undefined;
    notiAdmin: {_id: string, name: string} | undefined;
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
};

declare module "*.png";
// declare module "react-native-vector-icons/fontawesome6";
