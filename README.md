# Hướng dẫn chạy script để chạy đồng thời cho cả 2 máy
## Bước 1: Cài mở port 8081 cho FE sau khi kết nối với máy thật 

```sh
# Using abd chạy trong terminal
adb -s BKB00231981 reverse tcp:8081 tcp:8081
```
```sh
# Có thể sử dụng thêm lệnh này để kiểm tra kết nối với máy thật trước
adb devices
```

## Bước 2: Khởi động Metro
```sh
# Using npx
npx react-native start
```
## Bước 3: Build ứng dụng đồng thời trên cả máy ảo và máy thật
```sh
# Run file .sh
.\run-app-both.bat
```
