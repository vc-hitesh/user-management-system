import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, take } from 'rxjs';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { UserProfile } from 'src/app/shared/models/user.model';
import { ToasterService } from 'src/app/shared/services/toaster/toaster.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  /**
   * Form with field of user information required.
   */
  public userForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
      Validators.minLength(10),
    ]),
    address: new FormControl('', [Validators.required]),
    age: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
  });

  /**
   * User id will get from nav param when admin editing user info.
   */
  public userId: string;
  constructor(
    private activeRoute: ActivatedRoute,
    private userService: UserService,
    private loaderService: LoaderService,
    private router: Router,
    private toast: ToasterService,
  ) { }

  /**
   * Observer for the navigation param
   */
  ngOnInit(): void {
    this.activeRoute.params.subscribe(({id}) => {
      if (id) {
        this.userId = id;
        this.getUser();
      }
    });
  }

  /**
   * Get user information from backend when edit
   */
  public getUser(): void {
    this.userService.getUserById(+this.userId).pipe(
      take(1)
    ).subscribe((res: UserProfile) => {
      this.userForm.patchValue(res);
    });
  }

  /**
   * Update user information into backend.
   */
  public submit(): void {
    if (this.userForm.invalid) {
      this.toast.showToaster('Check red highlighted fields and submit again.');
      return;
    }
    const payload = this.userForm.value;
    if (this.userId) {
      this.userForm.value.id = Number(this.userId);
    }
    this.loaderService.startLoader();
    this.userService
      .addEditUser(this.userForm.value)
      .pipe(
        take(1),
        finalize(()=> {this.loaderService.stopLoader();})
      )
      .subscribe((res: any) => {
        this.router.navigate(['/user/']);
        this.toast.showToaster('Updated successfully!');
      });
  }

}
