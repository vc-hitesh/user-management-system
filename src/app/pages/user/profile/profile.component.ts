import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize, take } from 'rxjs';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { User, UserProfile } from 'src/app/shared/models/user.model';
import { ToasterService } from 'src/app/shared/services/toaster/toaster.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public userDetail!: UserProfile;
  public profileForm: FormGroup;
  constructor(
    private userService: UserService,
    private loaderService: LoaderService,
    private toast: ToasterService,
  ) {
  }

  ngOnInit(): void {
    this.getUserProfile();
  }

  public getUserProfile(): void {
    if (this.userService.currentUser) {
      this.loaderService.startLoader();
      this.userService.getUserById(this.userService.currentUser.id).pipe(
        take(1),
        finalize(() => { this.loaderService.stopLoader() })
      ).subscribe((res: UserProfile)=> {
        this.userDetail = res;
        this.createForm();
      });
    }
  }

  public createForm() : void {
    this.profileForm = new FormGroup({
      username: new FormControl(this.userDetail.name, Validators.required),
      password: new FormControl(this.userDetail.password, Validators.required),
      name: new FormControl(this.userDetail.name, Validators.required),
      phone: new FormControl(this.userDetail.phone, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(10),
      ]),
      address: new FormControl(this.userDetail.address, [Validators.required]),
      age: new FormControl(this.userDetail.age, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
    });
  }

  public submit(): void {
    if (this.profileForm.invalid) {
      this.toast.showToaster('Check the red highlighted detail and submit again.');
      return;
    }
    this.loaderService.startLoader();
    const inputData = JSON.parse(JSON.stringify(this.profileForm.value));
    delete inputData.username;
    inputData.id = Number(this.userDetail.id);
    this.userService.updateProfile(inputData).pipe(
      take(1),
      finalize(() => { this.loaderService.stopLoader() })
    ).subscribe((res: any) => {
      this.toast.showToaster('Profile updated successfully!');
    });
  }
}
