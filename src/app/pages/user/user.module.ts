import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from 'src/app/shared/guard/role.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./list/list.module').then(m => m.ListModule),
    canActivate: [RoleGuard],
    data: {
      roles: ['admin']
    }
  },
  {
    path: 'add',
    loadChildren: () => import('./add-user/add-user.module').then(m => m.AddUserModule),
    canActivate: [RoleGuard],
    data: {
      roles: ['admin']
    }
  },{
    path: 'edit/:id',
    loadChildren: () => import('./add-user/add-user.module').then(m => m.AddUserModule),
    canActivate: [RoleGuard],
    data: {
      roles: ['admin']
    }
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class UserModule { }
