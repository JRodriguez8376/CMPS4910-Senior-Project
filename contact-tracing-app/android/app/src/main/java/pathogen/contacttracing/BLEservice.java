package pathogen.contacttracing;

import android.bluetooth.BluetoothAdapter;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactContextBaseJavaModule;

public class BLEservice extends ReactContextBaseJavaModule {
    public static BLE ble;
    BluetoothAdapter bluetoothAdapter;

    @NonNull
    @Override
    public String getName() {
        return null;
    }
}

