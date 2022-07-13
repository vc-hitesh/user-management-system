import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BeforeAuthGuard implements CanActivate {
  constructor(
    private router: Router,
  ){}
  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if ( token ) {
      this.router.navigateByUrl('/user');
      return false;
    }
    return true;
}
  
}
