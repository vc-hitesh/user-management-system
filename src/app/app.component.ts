import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './shared/services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'userManagementSystem';
  constructor(
    public userService: UserService,
    private router: Router,
  ) {

  }

  logout() {
    this.userService.logout();
    this.router.navigateByUrl('/login');
  }
}
