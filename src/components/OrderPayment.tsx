import { View, Text } from 'react-native';
import OrderProduct from './OrderProduct';
import { GroupedCartItemsByShop } from '../screens/payment/Payment';
import Icon from '@react-native-vector-icons/ant-design';

const OrderPayment = ({ shop, items }: GroupedCartItemsByShop) => {

    return (
        <View
            style={{
                backgroundColor: '#fff',
                paddingHorizontal: 3,
            }}>
            <Text style={{ color: '#e53935', fontWeight: '600' }}><Icon name="shop" size={20} color="#f50057"/>{shop.name}</Text>

            {items.map((product, index) => (
                <OrderProduct
                    key={index}
                    name={product.product_id.product_id.name}
                    imageUrl={product.product_id.image}
                    quantity={product.quantity}
                    variant={product.type}
                    originalPrice={product.product_id.price}
                    salePrice={product.product_id.price * (1 - product.product_id.discount / 100)}
                />))}

        </View>
    );
};

export default OrderPayment;
