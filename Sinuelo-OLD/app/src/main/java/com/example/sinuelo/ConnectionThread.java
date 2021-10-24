package com.example.sinuelo;

import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothServerSocket;
import android.bluetooth.BluetoothSocket;
import android.os.Bundle;
import android.os.Message;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Arrays;
import java.util.UUID;

public class ConnectionThread extends Thread{

  BluetoothSocket btSocket = null;
  BluetoothServerSocket btServerSocket = null;
  InputStream input = null;
  OutputStream output = null;
  String btDevAddress = null;
  String myUUID = "00001101-0000-1000-8000-00805F9B34FB";
  boolean running = false;
  boolean isConnected = false;

  /*  Este construtor prepara o dispositivo para atuar como cliente.
      Tem como argumento uma string contendo o endereço MAC do dispositivo
  Bluetooth para o qual deve ser solicitada uma conexão.
   */
  public ConnectionThread(String btDevAddress) {
    this.btDevAddress = btDevAddress;
  }

  public void run() {

    this.running = true;
    BluetoothAdapter btAdapter = BluetoothAdapter.getDefaultAdapter();

    try {
      BluetoothDevice btDevice = btAdapter.getRemoteDevice(btDevAddress);
      btSocket = btDevice.createRfcommSocketToServiceRecord(UUID.fromString(myUUID));

      btAdapter.cancelDiscovery();

      if (btSocket != null) {
        btSocket.connect();
      }

    } catch (IOException e) {

      e.printStackTrace();
      toActivity("---N".getBytes());
    }

    if(btSocket != null) {

      this.isConnected = true;
      toActivity("---S".getBytes());

      try {
        input = btSocket.getInputStream();
        output = btSocket.getOutputStream();

        while(running) {

          byte[] buffer = new byte[1024];
          int bytes;
          int bytesRead = -1;

          do {
            bytes = input.read(buffer, bytesRead+1, 1);
            bytesRead+=bytes;
          } while(buffer[bytesRead] != '\n');

          toActivity(Arrays.copyOfRange(buffer, 0, bytesRead-1));

        }

      } catch (IOException e) {

        e.printStackTrace();
        toActivity("---N".getBytes());
        this.isConnected = false;
      }
    }

  }

  private void toActivity(byte[] data) {

    Message message = new Message();
    Bundle bundle = new Bundle();
    bundle.putByteArray("data", data);
    message.setData(bundle);
    RotinasAnimaisActivity.handler.sendMessage(message);
  }
}
