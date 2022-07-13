import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  showToaster( message: string, duration = 3000 ) {
    this.snackBar.open( message, '', {
      duration
    } );
  }
}
