package pathogen.contacttracing;

import android.content.Context;
import android.content.Intent;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.BaseJavaModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

public class Services extends ReactContextBaseJavaModule {

    BLEService bleService = new BLEService();
    public Services(ReactApplicationContext context) {
        super(context);
        Intent intent = new Intent(context, Services.class);
        bleService.onCreate();
        bleService.onStartCommand(intent, 0, 1);
    }

    @NonNull
    @Override
    public String getName() {
        return "Services";
    }
}
