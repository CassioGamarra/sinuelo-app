package com.example.sinuelo;

import androidx.appcompat.app.AppCompatActivity;

import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothSocket;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Toast;

import java.io.IOException;
import java.util.UUID;

public class MainActivity extends AppCompatActivity {
    String token = "";
    String enderecoDispositivo = "";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Intent it = getIntent();
        token = it.getSerializableExtra("token").toString();
    }

    public void abrirRotinasAnimais(View v) {
        Intent it = new Intent(this, RotinasAnimaisActivity.class);
        startActivity(it);
    }

    public void abrirConfiguracoes(View v) {
        Intent it = new Intent(this, ConfiguracoesActivity.class);
        startActivityForResult(it, 1); //Selecionar o bluetooth
        startActivity(it);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == 1) { //SELECT_PAIRED_DEVICE
            if (resultCode == RESULT_OK) {
                String msg = "Você selecionou " + data.getStringExtra("btDevName") + "\n" + data.getStringExtra("btDevAddress");
                Toast.makeText(this, msg, Toast.LENGTH_SHORT).show();
                enderecoDispositivo = data.getStringExtra("btDevAddress");
            } else {
                Toast.makeText(this, "Nenhum dispositivo selecionado", Toast.LENGTH_SHORT).show();
            }
        }
    }
}