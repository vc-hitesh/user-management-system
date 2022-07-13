import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private showLoader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public showLoader$: Observable<boolean> = this.showLoader.asObservable();
  private requestCount: number = 0;
  constructor() { }

  startLoader() : void {
    this.requestCount += 1;
    if ( this.requestCount && !this.showLoader.value) {
      this.showLoader.next(true);
    }
  }

  stopLoader() {
    this.requestCount -= 1;
    if ( this.requestCount < 1 ) {
      this.showLoader.next(false);
    }
  }
}
