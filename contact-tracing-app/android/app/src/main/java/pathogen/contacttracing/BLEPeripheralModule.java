package pathogen.contacttracing;

import android.bluetooth.BluetoothAdapter;
import android.bluetooth.le.AdvertiseCallback;
import android.bluetooth.le.AdvertiseData;
import android.bluetooth.le.AdvertiseSettings;
import android.bluetooth.le.AdvertisingSet;
import android.bluetooth.le.AdvertisingSetCallback;
import android.bluetooth.le.AdvertisingSetParameters;
import android.bluetooth.le.BluetoothLeAdvertiser;
import android.bluetooth.le.ScanFilter;
import android.bluetooth.le.ScanSettings;
import android.content.Context;
import android.os.Build;
import android.os.ParcelUuid;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.nio.charset.Charset;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;
import java.util.UUID;

//https://source.android.com/devices/bluetooth/ble_advertising
public class BLEPeripheralModule extends ReactContextBaseJavaModule {

    AdvertiseSettings advertiseSettings;
    BluetoothLeAdvertiser advertiser;
    ParcelUuid parcelUuid;
    AdvertiseData advertiseData;


    BLEPeripheralModule() {
    }
    BLEPeripheralModule(ReactApplicationContext context) {
        super(context);

    }
    @ReactMethod
    public void startAdapter(String id) {
        Log.d("BLEPeripheralModule", "Called BLE adapter start function with ID" + id);
        advertiser = BluetoothAdapter
                .getDefaultAdapter()
                .getBluetoothLeAdvertiser();
        advertiseSettings = new AdvertiseSettings.Builder()
                .setAdvertiseMode(AdvertiseSettings.ADVERTISE_MODE_LOW_LATENCY)
                .setTxPowerLevel(AdvertiseSettings.ADVERTISE_TX_POWER_MEDIUM)
                .setConnectable(false)
                .build();
        String bleUuid = "80cceb5-a225-4ad2-bc4b-57302b1e1557";
        parcelUuid = new ParcelUuid(UUID.fromString(bleUuid));
        advertiseData = new AdvertiseData.Builder()
                .addServiceData(new ParcelUuid(UUID.fromString(bleUuid)), id.getBytes(Charset.forName("UTF-8")))
                .build();

        startAdvertising();
    }
    public void startAdvertising() {
        AdvertiseCallback advertiseCallback = new AdvertiseCallback() {
            @Override
            public void onStartSuccess(AdvertiseSettings settingsInEffect) {
                super.onStartSuccess(settingsInEffect);
            }

            @Override
            public void onStartFailure(int errorCode) {
                super.onStartFailure(errorCode);
            }
        };
        advertiser.startAdvertising(advertiseSettings, advertiseData, advertiseCallback);
    }

    @NonNull
    @Override
    public String getName() {
        return "BLEPeripheralModule";
    }
}
