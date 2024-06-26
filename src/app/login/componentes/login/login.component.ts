import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../services/authentication/auth.service';
import { fadeInOut } from '../../../shared/animations';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeInOut]
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  loginForm: FormGroup;
  openErrMsg: boolean;

  constructor(private authService: AuthService, private appComp: AppComponent) {
    this.appComp.isLoginOn = true;
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.loginForm;
    this.authService.openErrMsgSubject.subscribe((value: boolean) => {
      this.openErrMsg = value;
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const credentials = {
        username: this.loginForm.get('username')?.value,
        password: this.loginForm.get('password')?.value
      };
      this.authService.login(credentials);
    }
  }
}