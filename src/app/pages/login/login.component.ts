import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, take } from 'rxjs';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { LoginResponse } from 'src/app/shared/models/user.model';
import { ToasterService } from 'src/app/shared/services/toaster/toaster.service';
import { UserService } from 'src/app/shared/services/user/user.service';

/**
 * User login page component.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  /**
   * Login form with required fields
   */
  public form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required),
  });
  constructor(
    private loaderService: LoaderService,
    private toast: ToasterService,
    private userService: UserService,
    private router: Router,
  ) { }

  /**
   * Check validation and initiate login api to verify user.
   * @returns 
   */
  public submit() : void {
    if (!this.form.valid){
      this.toast.showToaster('Check the red highlight field and submit again.')
      return;
    }
    this.loaderService.startLoader();
    this.userService.userLogin({
      username: this.form.value.username,
      password: this.form.value.password,
    }).pipe(
      take(1),
      finalize(() => { this.loaderService.stopLoader(); })
    ).subscribe((res: LoginResponse) => {
      if (res?.user?.role === 'admin' ) {
        this.router.navigate(['/user'])
      } else {
        this.router.navigate(['/user/profile'])
      }
    });
  }
}
