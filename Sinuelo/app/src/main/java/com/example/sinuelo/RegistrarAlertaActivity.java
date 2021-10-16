package com.example.sinuelo;
 
import android.content.Intent;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;

public class RegistrarAlertaActivity extends AppCompatActivity {

  String codigoBrinco = "";
  TextView textViewCodigoBrinco;
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_registrar_alerta);

    Intent it = getIntent();
    codigoBrinco = it.getSerializableExtra("codigoBrinco").toString();

    textViewCodigoBrinco = findViewById(R.id.textViewCodigoBrinco);
    textViewCodigoBrinco.setText(codigoBrinco);
  }
}