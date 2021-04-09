package pathogen.contacttracing;

import android.content.Context;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.mohsenoid.closetome.CloseToMe;
import com.mohsenoid.closetome.CloseToMeCallback;
import com.mohsenoid.closetome.model.Beacon;

import org.jetbrains.annotations.NotNull;
import org.json.JSONObject;
import org.unimodules.interfaces.filesystem.Permission;

import java.util.HashMap;
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
    Map<String, Beacon> map;


    public BLE() {
        Log.d("BLE", "Starting BLE Constructor");

    }
    public BLE(Context context) {
        Log.d("BLE", "Starting BLE Constructor");
        this.context = context;
        this.userUUID = this.newUUID.toString();

    }

    public void setReactContext(ReactContext reactContext) {
        this.reactContext = reactContext;
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
    public void getContactInfo(Promise promise) {
        if(closeToMe.getResults().getValue() == null) {
            Log.d("BLE", "No info to return");
            promise.reject("getContactInfo", "No info to return");
            return;
        }
        map = closeToMe.getResults().getValue();
        WritableMap mapData = Arguments.createMap();
        for(Map.Entry<String, Beacon> entry : map.entrySet()) {
            Log.d("BLE", "MAP DATA: " + entry.toString());
            mapData.putString(entry.getValue().getUserUuid(), String.valueOf(entry.getValue().isVisible()));
        }
        promise.resolve(mapData);
        Log.d("BLE", map.toString());

        return;
    }
    @ReactMethod
    public void BLEInit() {
        if(userUUID == null || manufacturerUUID == null) {
            Log.d("BLE", "Missing UUID! userUUID:" + userUUID + "manufacturerUUID: "
                    + manufacturerUUID);
            if(userUUID == null) {
                userUUID = "0fc96cd5-8292-46e6-ab13-5b55c1003825";
            }
            if(manufacturerUUID == null) {
                manufacturerUUID = "0fc96cd5-8292-46e6-ab13-5b55c1003824";
            }
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
        WritableMap data = Arguments.createMap();
        data.putString("userUUID", userUUID);
        Log.d("BLE", data.toString());
        sendEvent("BLEStartDone", data);
    }

    private void sendEvent(String eventName, @Nullable WritableMap params) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }
    @NonNull
    @Override
    public String getName() {
        return("BLE");
    }
}
