import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      try {
        const { email, password } = this.loginForm.value;
        await this.afAuth.signInWithEmailAndPassword(email, password);
        // Handle successful login (redirect or other actions)
      } catch (error) {
        console.error('Error logging in:', error);
        // Handle login error (show error message, etc.)
      }
    }
  }

  async loginWithGoogle() {
    // try {
    //   await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    //   // Handle successful Google login (redirect or other actions)
    // } catch (error) {
    //   console.error('Error logging in with Google:', error);
    //   // Handle Google login error (show error message, etc.)
    // }
    console.log('Login with Google not implemented yet');
  }
}
