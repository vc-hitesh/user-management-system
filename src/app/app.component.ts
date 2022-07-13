import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './shared/services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // Page title
  title = 'userManagementSystem';
  constructor(
    public userService: UserService,
    private router: Router,
  ) {

  }
  /**
   * Logout from system.
   */
  logout() {
    this.userService.logout();
    this.router.navigateByUrl('/login');
  }
}
