package pathogen.contacttracing;

import android.app.Service;
import android.content.Intent;
import android.os.IBinder;
import android.util.Log;

import androidx.annotation.Nullable;

public class BLEService extends Service {
    BLEPeripheralModule blePeripheralModule;

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onCreate() {
       blePeripheralModule = new BLEPeripheralModule();
        Log.d("SERVICE", "BLE Service Created: Advertising/Peripheral");
    }

    public BLEService() {
        super();
    }


    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        blePeripheralModule.startAdvertising();
        return super.onStartCommand(intent, flags, startId);

    }

    @Override
    public void onDestroy() {
        super.onDestroy();
    }
}
