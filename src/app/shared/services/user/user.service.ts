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

  /**
   * Get current logged in user information.
   */
  get currentUser() : User | null {
    return this.userSubject.value;
  }

  /**
   * Login api call.
   * @param data Username and password
   * @returns 
   */
  public userLogin(data: Login): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.API_URL}/auth/login`, data)
      .pipe(tap((res: LoginResponse) => {
        localStorage.setItem('token', res?.token);
        localStorage.setItem('currentUser', JSON.stringify(res?.user));
        this.userSubject.next(res.user);
      }));
  }

  /**
   * Clear storage and logout.
   */
  public logout() : void {
    localStorage.clear();
    this.userSubject.next(null);
  }
  /**
   * Get user data by id api call.
   * @param id User id to get specific user data.
   * @returns 
   */
  public getUserById(id: number): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${environment.API_URL}/user/${id}`);
  }

  /**
   * Update api of user own profile.
   * @param data User profile information
   * @returns Result of the update
   */
  public updateProfile(data: UpdateProfilePayload ): Observable<SuccessResponse> {
    return this.http.put<SuccessResponse>(`${environment.API_URL}/profile`, data);
  }

  /**
   * Api to get user list.
   * @returns User list
   */
  public getUsersList(): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(`${environment.API_URL}/users`);
  }

  /**
   * Add/Edit user information.
   * @param payload Has information to add or update user.
   * @returns 
   */
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
