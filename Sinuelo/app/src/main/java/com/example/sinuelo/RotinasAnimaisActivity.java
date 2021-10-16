package com.example.sinuelo;

import android.content.Intent;
import android.os.Handler;
import android.os.Message;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;

public class RotinasAnimaisActivity extends AppCompatActivity {

  static EditText editTextCodigoBrinco;
  ConnectionThread connectionThread;
  String enderecoBt = "";
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_rotinas_animais);
    editTextCodigoBrinco = findViewById(R.id.editTextCodigoBrinco);

    Intent it = getIntent();
    //enderecoBt = it.getSerializableExtra("enderecoBt").toString();

    connectionThread = new ConnectionThread("98:D3:91:FD:3A:61");
    connectionThread.start();

    /* Um descanso rápido, para evitar bugs esquisitos.
     */
    try {
      Thread.sleep(1000);
    } catch (Exception E) {
      E.printStackTrace();
    }
  }

  public void registrarAlerta(View v) {
    if (editTextCodigoBrinco.getText().toString().trim().equals("")) {
      Toast.makeText(this, "Por favor, preencha o código", Toast.LENGTH_SHORT).show();
    } else {
      Intent it = new Intent(this, RegistrarAlertaActivity.class);
      it.putExtra("codigoBrinco", editTextCodigoBrinco.getText().toString());
      startActivity(it);
    }
  }

  public static Handler handler = new Handler() {
    @Override
    public void handleMessage(Message msg) {
      Bundle bundle = msg.getData();
      byte[] data = bundle.getByteArray("data");
      String dataString= new String(data);
      if(dataString.equals("---N"))
        editTextCodigoBrinco.setText("Ocorreu um erro durante a conexão D:");
      else if(dataString.equals("---S"))
        editTextCodigoBrinco.setText("Conectado :D");
      else {
        editTextCodigoBrinco.setText(dataString);
      }
    }
  };
}