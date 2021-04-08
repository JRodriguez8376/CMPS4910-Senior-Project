package pathogen.contacttracing;

import android.content.Context;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.mohsenoid.closetome.CloseToMe;
import com.mohsenoid.closetome.CloseToMeCallback;
import com.mohsenoid.closetome.model.Beacon;

import org.jetbrains.annotations.NotNull;
import org.unimodules.interfaces.filesystem.Permission;

import java.util.Map;
import java.util.Random;
import java.util.UUID;

public class BLE extends ReactContextBaseJavaModule {
    CloseToMe closeToMe;
    String userUUID;
    String manufacturerUUID;
    ReactContext reactContext;
    UUID newUUID = UUID.randomUUID();
    Context context;


    public BLE() {
        Log.d("BLE", "Starting BLE Constructor");

    }
    public BLE(ReactContext reactContext) {
        Log.d("BLE", "Starting BLE Constructor");
        this.reactContext = reactContext;

    }
    public BLE(Context context) {
        Log.d("BLE", "Starting BLE Constructor");
        this.context = context;

    }
    @ReactMethod
    public void setUserUUID(String userUUID) {
        this.userUUID = userUUID;
    }
    @ReactMethod
    public void setManufacturerUUID(String manufacturerUUID) {
        this.manufacturerUUID = manufacturerUUID;
    }
    @ReactMethod
    public String getContactInfo() {
        if(closeToMe.getResults().getValue() == null) {
            return "No info";
        }
        return closeToMe.getResults().getValue().toString();
    }
    @ReactMethod
    public void BLEInit() {
        if(userUUID == null || manufacturerUUID == null) {
            Log.d("BLE", "Missing UUID! userUUID:" + userUUID + "manufacturerUUID: "
                    + manufacturerUUID);
            userUUID = newUUID.toString();
            manufacturerUUID = "0fc96cd5-8292-46e6-ab13-5b55c1003825";
        }
        Log.d("BLE", "Starting BLE Init");
        closeToMe = new CloseToMe
                .Builder(context, UUID.fromString(manufacturerUUID))
                .setUserUuid(UUID.fromString(userUUID))
                .setVisibilityDistanceMeter(2.0)
                .setVisibilityTimeoutMs(5_000)
                .build();
        Log.d("BLE", "CloseToMeObject built");
    }
    @ReactMethod
    public void start() {
            if(!closeToMe.isBluetoothEnabled().getValue()) {
                Log.d("BLE", "BT is being enabled");
                closeToMe.enableBluetooth(new CloseToMeCallback() {
                    @Override
                    public void onSuccess() {
                        Log.d("BLE", "BT is now on");
                    }

                    @Override
                    public void onError(Throwable throwable) {
                        Log.d("BLE", "BT failed to turn on: " + throwable.getMessage());
                    }
                });
            }


        closeToMe.start(new CloseToMeCallback() {
                            @Override
                            public void onSuccess() {
                                Log.d("closeToMeCallBack", "Success!");
                            }

                            @Override
                            public void onError(Throwable throwable) {
                                Log.d("closeToMeCallback", "Failure: " + throwable.getMessage());
                            }
                        });

        Log.d("BLE", "BLE start() finished");
    }

    @NonNull
    @Override
    public String getName() {
        return("BLE");
    }
}
