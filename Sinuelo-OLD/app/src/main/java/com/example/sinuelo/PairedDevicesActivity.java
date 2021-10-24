package com.example.sinuelo;

import android.bluetooth.BluetoothSocket;
import androidx.appcompat.app.AppCompatActivity;

import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import java.io.IOException;
import java.util.Set;
import java.util.UUID;

public class PairedDevicesActivity extends AppCompatActivity {

    public static int ENABLE_BLUETOOTH = 1;
    String myUUID = "00001101-0000-1000-8000-00805F9B34FB";
    BluetoothAdapter bluetoothAdapter = BluetoothAdapter.getDefaultAdapter();

    public ArrayAdapter<String> arrayAdapter;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_paired_devices);
        ListView listaDispositivos = (ListView) findViewById(R.id.listaDispositivos);
        LayoutInflater inflater = getLayoutInflater();
        View header = inflater.inflate(R.layout.text_header, listaDispositivos, false);
        ((TextView) header.findViewById(R.id.textView)).setText("\nDispositivos pareados\n");
        listaDispositivos.addHeaderView(header, null, false);
        arrayAdapter = new ArrayAdapter<>(this, android.R.layout.simple_list_item_1);
        listaDispositivos.setAdapter(arrayAdapter);

        listaDispositivos.setOnItemClickListener(
            new AdapterView.OnItemClickListener() {
                @Override
                public void onItemClick(AdapterView adapterView, View view, int position, long id) {
                    String item = arrayAdapter.getItem(position-1);
                    String devName = item.substring(0, item.indexOf("\n"));
                    String devAddress = item.substring(item.indexOf("\n")+1, item.length());
                    if(!devName.equals("HC-06")) {
                        Toast.makeText(PairedDevicesActivity.this, "Por favor, selecione o bastão: HC-06", Toast.LENGTH_SHORT).show();
                    } else if(conectarDispositivo(devAddress)) {
                        Intent returnIntent = new Intent();
                        returnIntent.putExtra("btDevName", devName);
                        returnIntent.putExtra("btDevAddress", devAddress);
                        setResult(RESULT_OK, returnIntent);
                        finish();
                    } else {
                        Toast.makeText(PairedDevicesActivity.this, "Ocorreu um erro ao conectar", Toast.LENGTH_SHORT).show();
                    }
                }
            }
        );

        BluetoothAdapter btAdapter = BluetoothAdapter.getDefaultAdapter();
        Set<BluetoothDevice> pairedDevices = btAdapter.getBondedDevices();
        if (pairedDevices.size() > 0) {
            for (BluetoothDevice device : pairedDevices) {
                arrayAdapter.add(device.getName() + "\n" + device.getAddress());
            }
        } else {
            arrayAdapter.add("Nenhum dispositivo pareado...");
        }
    }

    private boolean conectarDispositivo(String enderecoDispositivo) {
        BluetoothDevice btDevice = bluetoothAdapter.getRemoteDevice(enderecoDispositivo);
        BluetoothSocket btSocket;
        try{
            btSocket = btDevice.createRfcommSocketToServiceRecord(UUID.fromString(myUUID));
        } catch(Exception e){
            return false;
        }
        bluetoothAdapter.cancelDiscovery();
        try{
            if(btSocket != null) {
                btSocket.connect();
                return true;
            } else {
                return false;
            }
        } catch(IOException connectException){
            try{
                btSocket.close();
            }catch(IOException closException){
                return false;
            }
        }
        return false;
    }
}