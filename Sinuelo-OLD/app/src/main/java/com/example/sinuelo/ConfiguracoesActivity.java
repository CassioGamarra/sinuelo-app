package com.example.sinuelo;

import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothSocket;
import android.content.Intent;
import android.view.View;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;

import java.io.IOException;
import java.util.UUID;

public class ConfiguracoesActivity extends AppCompatActivity {
  String nomeDispositivo = "";
  String enderecoDispositivo = "";
  String myUUID = "00001101-0000-1000-8000-00805F9B34FB";
  BluetoothAdapter bluetoothAdapter = BluetoothAdapter.getDefaultAdapter();

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_configuracoes);
  }

  public void conectarBastao(View v) {
    if(!bluetoothAdapter.isEnabled()) {
      Toast.makeText(this, "Ative seu bluetooth", Toast.LENGTH_SHORT).show();
      Intent enableBtIntent = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
      startActivityForResult(enableBtIntent, 1); //Habilitar bluetooth
      Toast.makeText(this, "Ativando Bluetooth...", Toast.LENGTH_SHORT).show();
    } else {
      Intent searchPairedDevicesIntent = new Intent(this, PairedDevicesActivity.class);
      startActivityForResult(searchPairedDevicesIntent, 2); //SELECT_PAIRED_DEVICE
    }
  }

  @Override
  protected void onActivityResult(int requestCode, int resultCode, Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    if (requestCode == 2) { //SELECT_PAIRED_DEVICE
      if (resultCode == RESULT_OK) {
        String msg = "Você selecionou " + data.getStringExtra("btDevName") + "\n" + data.getStringExtra("btDevAddress");
        Toast.makeText(this, msg, Toast.LENGTH_SHORT).show();
        nomeDispositivo = data.getStringExtra("btDevName");
        enderecoDispositivo = data.getStringExtra("btDevAddress");
        Intent returnIntent = new Intent();
        returnIntent.putExtra("btDevName", nomeDispositivo);
        returnIntent.putExtra("btDevAddress", enderecoDispositivo);
        setResult(RESULT_OK, returnIntent);
        finish();
      } else {
        Toast.makeText(this, "Nenhum dispositivo selecionado", Toast.LENGTH_SHORT).show();
      }
    }
  }
}