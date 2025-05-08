@echo off

set PACKAGE=com.mobile
set APK_PATH=android\app\build\outputs\apk\debug\app-debug.apk
set REAL_DEVICE=BKB00231981
set EMULATOR=emulator-5554

echo Building APK...
cd android
call gradlew assembleDebug
cd ..

echo Installing on real device (%REAL_DEVICE%)...
adb -s %REAL_DEVICE% install -r %APK_PATH%

echo Installing on emulator (%EMULATOR%)...
adb -s %EMULATOR% install -r %APK_PATH%

echo Launching on real device...
adb -s %REAL_DEVICE% shell am start -n %PACKAGE%/.MainActivity

echo Launching on emulator...
adb -s %EMULATOR% shell am start -n %PACKAGE%/.MainActivity

echo Done!
pause
