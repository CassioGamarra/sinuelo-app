package com.example.sinuelo;

import android.content.Intent;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;

public class RotinasAnimaisActivity extends AppCompatActivity {

  EditText editTextCodigoBrinco;
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_rotinas_animais);

    editTextCodigoBrinco = findViewById(R.id.editTextCodigoBrinco);
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
}