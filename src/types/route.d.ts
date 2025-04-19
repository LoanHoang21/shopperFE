import { Product } from '../components/ProductCard';

type RootStackParamList = {
    home: undefined;
    order: { id: number };
    cart: undefined;
    productDetail: { product: Product };    
    compare: { products: Product[] };
    compareResult: { products: Product[] };
    search: undefined;
    searchResult: {
        query: string;
        products: Product[];
      };
      

    // Feed: { sort: 'latest' | 'top' } | undefined;
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
};

declare module "*.png";

// declare module "react-native-vector-icons/fontawesome6";
