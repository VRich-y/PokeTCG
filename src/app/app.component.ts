import { Component } from '@angular/core';
import { fadeInOut } from './shared/animations';
import { AuthService } from './services/authentication/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeInOut]
})
export class AppComponent {
  constructor(private authService: AuthService) { }
  title = 'testeL5';
  isLoginOn = true;
  sidebarOpen = false;
  profileOptions = false;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  toggleProfileOptions() {
    this.profileOptions = !this.profileOptions;
  }

  logOut() {
    this.authService.logout();
  }

}