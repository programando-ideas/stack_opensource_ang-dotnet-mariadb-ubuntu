import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { usuario } from './models/usuario';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cliente';
  isLoginProcessing = false;
  Authenticated = false;
  loginForm: FormGroup;
  public _usuario: usuario = { usuario: '', pwd: '', id: 0, nombres: '', apellidos: '', email: '', telefono: '' };

  constructor(private _router: Router,
    private fb: FormBuilder) {
    // Validaciones del formulario
    this.loginForm = fb.group({
      'usuario': [this._usuario.usuario, Validators.required],
      'password': [this._usuario.pwd, [Validators.required, Validators.minLength(6)]]
    });
  }
  
  public onSubmit(form: any) {
    this.isLoginProcessing = true;
    this.Authenticated = true;
    this.isLoginProcessing = false;
    this._router.navigate(['/home']);
  }
}
