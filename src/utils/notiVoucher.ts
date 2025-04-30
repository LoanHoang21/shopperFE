// utils/voucherNotifier.ts
import { getAllVoucher } from "../apis/Voucher";
import { createNotiVoucher } from "../apis/Noti";
import AsyncStorage from "@react-native-async-storage/async-storage";

const isExpiringSoon = (startDate: string, endDate: string) => {
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = (end.getTime() - today.getTime()) / (1000 * 3600 * 24);
    return diff <= 3 && diff >= 0 && start <= today;
};

export const checkAndNotifyExpiringVouchers = async () => {
  try {
    const res = await getAllVoucher();
    const userData = await AsyncStorage.getItem("user");
    if (!userData) return;
    const user = JSON.parse(userData);
    const fcmToken = await AsyncStorage.getItem("fcmToken");

    if (res?.data?.EC === 0) {
      const vouchers = res.data.DT;
      const expiringVouchers = vouchers.filter((voucher: any) =>
        isExpiringSoon(voucher.start_date, voucher.end_date)
      );

      const randomNames = [
        "Voucher sắp hết hạn!",
        "NẠP ĐẦY MÃ GIẢM GIÁ",
        "Mã giảm giá sắp hết hạn. Nhanh tay dùng ngay!",
        "Đừng bỏ lỡ ưu đãi này!",
        "Chỉ còn chút thời gian sử dụng voucher!"
      ];

      const randomDecs = [
        `✨Mã giảm 500K, 200K đã sẵn sàng\n🧡Video tung thêm mã giảm đến 50%\n🚀Muốn mua gì vào ngay bạn ơi!`,
        `🎫Còn voucher Xtra đến 1 Triệu\n🚛Cùng ưu đãi Freeship đến 300K`,
        `🧡Ngập tràn mã giảm 500K, 200K,...\n🔥Duy nhất hôm nay - Mua ngay!`,
      ];
      const randomName = randomNames[Math.floor(Math.random() * randomNames.length)];
      const randomDec = randomDecs[Math.floor(Math.random() * randomDecs.length)];
    //   senderId, receiveId, name, image, description, fcmToken,
      for (const voucher of expiringVouchers) {
        await createNotiVoucher(user._id, user._id, randomName, voucher.image, randomDec, fcmToken);
      }

      if (expiringVouchers.length > 0) {
        console.log("Đã gửi thông báo voucher sắp hết hạn.");
      }
    }
  } catch (err) {
    console.log("Lỗi khi gửi thông báo voucher:", err);
  }
};
