import { Component } from '@angular/core';
import { AuthService } from '../../../services/authentication/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  constructor(private authService: AuthService) {
    this.getName();
  }

  name: string;
  bio: string = 'Full Stack Developer | Tech Enthusiast | Artist'

  getName() {
    const item = JSON.stringify(localStorage.getItem(this.authService.tokenKey)) ? JSON.stringify(localStorage.getItem(this.authService.tokenKey)) : 'empty data';
    this.name = item;
  }

  logOut() {
    this.authService.logout();
  }
}
