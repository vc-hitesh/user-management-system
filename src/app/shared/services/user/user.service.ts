import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { Login, LoginResponse, SuccessResponse, UpdateProfilePayload, User, UserProfile } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject: BehaviorSubject<User|null> = new BehaviorSubject<User|null>(null);
  public currentUser$: Observable<User|null> = this.userSubject.asObservable();
  constructor(
    private http: HttpClient,
  ) {
    const user = localStorage.getItem('currentUser');
    if ( user ) {
      this.userSubject.next(JSON.parse(user));
    }
  }

  get currentUser() : User | null {
    return this.userSubject.value;
  }

  public userLogin(data: Login): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.API_URL}/auth/login`, data)
      .pipe(tap((res: LoginResponse) => {
        localStorage.setItem('token', res?.token);
        localStorage.setItem('currentUser', JSON.stringify(res?.user));
        this.userSubject.next(res.user);
      }));
  }

  public logout() : void {
    localStorage.clear();
    this.userSubject.next(null);
  }

  public getUserById(id: number): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${environment.API_URL}/user/${id}`);
  }

  public updateProfile(data: UpdateProfilePayload ): Observable<SuccessResponse> {
    return this.http.put<SuccessResponse>(`${environment.API_URL}/profile`, data);
  }

  public getUsersList(): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(`${environment.API_URL}/users`);
  }

  public addEditUser(
    payload: UserProfile
  ): Observable<SuccessResponse> {
    if (payload?.id) {
      return this.http.put<SuccessResponse>(`${environment.API_URL}/user/edit`, payload);
    } else {
      return this.http.post<SuccessResponse>(`${environment.API_URL}/user/add`, payload);
    }
  }

}
