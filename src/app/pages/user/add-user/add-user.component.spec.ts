import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { AddUserComponent } from './add-user.component';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserComponent ],
      imports: [HttpClientModule,HttpClientModule, RouterTestingModule,ReactiveFormsModule, MatSnackBarModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.userForm.valid).toBeFalsy();
  });

  it('form valid when has value', () => {
    expect(component.userForm.valid).toBeFalsy();
    component.userForm.controls['name'].setValue('test');
    component.userForm.controls['phone'].setValue(8989898989);
    component.userForm.controls['address'].setValue('City');
    component.userForm.controls['age'].setValue(25);
    component.userForm.controls['username'].setValue('test');
    component.userForm.controls['password'].setValue('123456789');
    expect(component.userForm.valid).toBeTruthy();
  });
});
