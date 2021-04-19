/*package pathogen.contacttracing;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactContextBaseJavaModule;


public class BLEservice extends ReactContextBaseJavaModule {

    @NonNull
    @Override
    public String getName() {
        MainActivity.ble.start();
        return null;
    }
    public String Appstatus() {
       if(getReactApplicationContextIfActiveOrWarn()) {
    }

}

    /*ble = BluetoothAdapter.getDefaultAdapter();

    if(ble == null)

    {
        Toast.makeText(getApplicationContext(), "Device does not support bluetooth", Toast.LENGTH_LONG).show();
    }
    else

    {
        if (!ble.isEnabled()) {
            ble.enable();
            Toast.makeText(getApplicationContext(), "Bluetooth switched ON", Toast.LENGTH_LONG).show();
        }
    }

    @NonNull
    @Override
    public String getName() { return null;}*/


/*
   private static BluetoothAdapter gatble() {
       return BluetoothAdapter.getDefaultAdapter();
   }
   public static void BT_ON() {
       BA = getble();
       BA.enable();
   }
   public static void BT_STATUS(){
       BA = getble();
   }*/
  /*  public void start() {
        CloseToMe closeToMe;
        String userUUID;

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

    private void sendEvent(String bleStartDone, WritableMap data) {
    }*/


