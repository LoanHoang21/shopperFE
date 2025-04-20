import {View, Text, TouchableOpacity} from 'react-native';
import OrderProduct from './OrderProduct';

type OrderProduct = {
  name: string;
  variant: string;
  quantity: number;
  originalPrice: number;
  salePrice: number;
  imageUrl: string;
};

type OrderItemProps = {
  shopName: string;
  status: string;
  products: OrderProduct[];
};

const OrderItem = ({shopName, status, products}: OrderItemProps) => {
  const totalPrice = products.reduce(
    (sum, item) => sum + item.salePrice * item.quantity,
    0,
  );

  return (
    <View
      style={{
        backgroundColor: '#fff',
        paddingHorizontal: 12,
        paddingVertical: 15,
        marginTop: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={{color: '#e53935', fontWeight: '600'}}>{shopName}</Text>
        <Text style={{color: 'red'}}>{status}</Text>
      </View>

      {products.map((product, index) => (
        <OrderProduct key={index} {...product} />
      ))}

      <View style={{justifyContent: 'flex-end'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginBottom: 10,
          }}>
          <Text>Tổng số tiền ({products.length} sản phẩm): </Text>
          <Text style={{color: '#e53935', fontWeight: '700'}}>
            {`₫${totalPrice.toLocaleString('vi-VN')}`}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            gap: 10,
          }}>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              padding: 10,
              borderRadius: 5,
            }}>
            <Text>Liên hệ shop</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: '#e53935',
              padding: 10,
              borderRadius: 5,
            }}>
            <Text style={{color: '#e53935'}}>Hủy đơn hàng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OrderItem;
