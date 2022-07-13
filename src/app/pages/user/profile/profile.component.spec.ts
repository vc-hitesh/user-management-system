import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, RouterTestingModule, HttpClientModule, MatSnackBarModule ],
      declarations: [ ProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    component.userDetail = {
      name: '',
      address: '',
      age: 15,
      username: '',
      password: '',
      phone: 8989898989
    };
    component.createForm();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.profileForm.valid).toBeFalsy();
  });

  it('form after adding value', () => {
    expect(component.profileForm.valid).toBeFalsy();
    component.profileForm.controls['name'].setValue('test');
    component.profileForm.controls['phone'].setValue(8989898989);
    component.profileForm.controls['address'].setValue('City');
    component.profileForm.controls['age'].setValue(25);
    component.profileForm.controls['username'].setValue('test');
    component.profileForm.controls['password'].setValue('123456789');
    expect(component.profileForm.valid).toBeTruthy();
  });

});
